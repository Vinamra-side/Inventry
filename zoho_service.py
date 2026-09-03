"""Direct Zoho invoice ingestion without a third-party connector.

Zoho calls the webhook with an invoice ID. This module uses a server-side
refresh token to fetch the authoritative invoice, maps its line items to the
local catalog, and creates one idempotent local order.
"""

import json
import math
import os
import secrets
import threading
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from db import get_connection, release_connection
from services import create_order


class ZohoConfigurationError(RuntimeError):
    """Raised when required Zoho environment settings are missing."""


class ZohoAPIError(RuntimeError):
    """Raised when Zoho cannot return a usable API response."""


class ZohoInvoiceError(ValueError):
    """Raised when an invoice cannot be converted into a local order."""


_token_lock = threading.Lock()
_access_token = None
_access_token_expires_at = 0.0


def _required_setting(name):
    value = (os.environ.get(name) or "").strip()
    if not value:
        raise ZohoConfigurationError(f"{name} is not configured.")
    return value


def _base_url(name, default):
    value = (os.environ.get(name) or default).strip().rstrip("/")
    if not value.startswith("https://"):
        raise ZohoConfigurationError(f"{name} must use HTTPS.")
    return value


def verify_webhook_secret(provided_secret):
    expected = _required_setting("ZOHO_WEBHOOK_SECRET")
    return bool(provided_secret) and secrets.compare_digest(expected, provided_secret)


def _decode_response(response):
    try:
        return json.loads(response.read().decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise ZohoAPIError("Zoho returned an invalid response.") from exc


def _refresh_access_token():
    global _access_token, _access_token_expires_at
    with _token_lock:
        if _access_token and time.time() < _access_token_expires_at:
            return _access_token

        accounts_url = _base_url("ZOHO_ACCOUNTS_URL", "https://accounts.zoho.in")
        payload = urlencode(
            {
                "grant_type": "refresh_token",
                "client_id": _required_setting("ZOHO_CLIENT_ID"),
                "client_secret": _required_setting("ZOHO_CLIENT_SECRET"),
                "refresh_token": _required_setting("ZOHO_REFRESH_TOKEN"),
            }
        ).encode("ascii")
        request = Request(
            f"{accounts_url}/oauth/v2/token",
            data=payload,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            method="POST",
        )
        try:
            with urlopen(request, timeout=15) as response:
                data = _decode_response(response)
        except (HTTPError, URLError, TimeoutError) as exc:
            raise ZohoAPIError("Unable to refresh the Zoho access token.") from exc

        token = data.get("access_token")
        if not token:
            raise ZohoAPIError("Zoho did not return an access token.")
        expires_in = max(120, int(data.get("expires_in") or 3600))
        _access_token = token
        _access_token_expires_at = time.time() + expires_in - 60
        return token


def fetch_invoice(invoice_id):
    invoice_id = str(invoice_id or "").strip()
    if not invoice_id or len(invoice_id) > 120 or not invoice_id.isdigit():
        raise ZohoInvoiceError("A valid Zoho invoice ID is required.")

    api_base = _base_url(
        "ZOHO_API_BASE_URL", "https://www.zohoapis.in/inventory/v1"
    )
    organization_id = _required_setting("ZOHO_ORGANIZATION_ID")
    query = urlencode({"organization_id": organization_id})
    request = Request(
        f"{api_base}/invoices/{invoice_id}?{query}",
        headers={"Authorization": f"Zoho-oauthtoken {_refresh_access_token()}"},
        method="GET",
    )
    try:
        with urlopen(request, timeout=20) as response:
            data = _decode_response(response)
    except HTTPError as exc:
        if exc.code == 401:
            global _access_token_expires_at
            _access_token_expires_at = 0
        raise ZohoAPIError(f"Zoho invoice request failed with status {exc.code}.") from exc
    except (URLError, TimeoutError) as exc:
        raise ZohoAPIError("Unable to reach the Zoho invoice API.") from exc

    invoice = data.get("invoice")
    if not isinstance(invoice, dict):
        raise ZohoAPIError("Zoho did not return an invoice.")
    return invoice


def _resolve_local_items(line_items):
    conn = get_connection()
    resolved = []
    missing = []
    try:
        with conn.cursor() as cur:
            cur.execute("ALTER TABLE beans ADD COLUMN IF NOT EXISTS zoho_item_id VARCHAR(120)")
            cur.execute(
                """
                CREATE UNIQUE INDEX IF NOT EXISTS idx_beans_zoho_item_id
                ON beans(zoho_item_id) WHERE zoho_item_id IS NOT NULL
                """
            )
            for line in line_items:
                zoho_item_id = str(line.get("item_id") or "").strip()
                name = str(line.get("name") or "").strip()
                try:
                    quantity = float(line.get("quantity"))
                except (TypeError, ValueError) as exc:
                    raise ZohoInvoiceError(f"Invalid quantity for Zoho item '{name or zoho_item_id}'.") from exc
                if not math.isfinite(quantity) or quantity <= 0:
                    raise ZohoInvoiceError(f"Invalid quantity for Zoho item '{name or zoho_item_id}'.")

                cur.execute("SELECT * FROM beans WHERE zoho_item_id = %s", (zoho_item_id,))
                bean = cur.fetchone()
                if bean is None and name:
                    cur.execute(
                        """
                        SELECT * FROM beans
                        WHERE LOWER(name) = LOWER(%s)
                          AND (zoho_item_id IS NULL OR zoho_item_id = %s)
                        """,
                        (name, zoho_item_id),
                    )
                    bean = cur.fetchone()
                    if bean and zoho_item_id:
                        cur.execute(
                            "UPDATE beans SET zoho_item_id = %s WHERE id = %s",
                            (zoho_item_id, bean["id"]),
                        )
                if bean is None:
                    missing.append(name or zoho_item_id or "Unnamed item")
                else:
                    resolved.append({"bean_id": bean["id"], "quantity": quantity})
        conn.commit()
    finally:
        release_connection(conn)

    if missing:
        raise ZohoInvoiceError(
            "No matching local catalog item for: " + ", ".join(sorted(set(missing)))
        )
    if not resolved:
        raise ZohoInvoiceError("The Zoho invoice has no usable line items.")
    return resolved


def import_invoice(invoice_id):
    invoice = fetch_invoice(invoice_id)
    if str(invoice.get("status") or "").lower() in {"void", "voided", "cancelled"}:
        raise ZohoInvoiceError("Cancelled or void Zoho invoices are not imported.")

    line_items = invoice.get("line_items")
    if not isinstance(line_items, list) or not line_items:
        raise ZohoInvoiceError("The Zoho invoice has no line items.")

    items = _resolve_local_items(line_items)
    invoice_number = str(invoice.get("invoice_number") or invoice_id).strip()
    invoice_notes = str(invoice.get("notes") or "").strip()
    notes = f"Zoho invoice {invoice_number}"
    if invoice_notes:
        notes = f"{notes}: {invoice_notes}"

    return create_order(
        customer_name=str(invoice.get("customer_name") or "Zoho customer").strip(),
        items=items,
        notes=notes[:255],
        external_source="zoho_invoice",
        external_id=str(invoice.get("invoice_id") or invoice_id),
    )
