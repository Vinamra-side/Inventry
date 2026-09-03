"""Generate a Zoho OAuth URL or exchange its one-time grant code.

This helper reads the client credentials from environment variables so the
client secret does not appear in shell history.
"""

import argparse
import json
import os
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


REGIONS = {
    "in": "https://accounts.zoho.in",
    "us": "https://accounts.zoho.com",
    "eu": "https://accounts.zoho.eu",
    "au": "https://accounts.zoho.com.au",
    "ca": "https://accounts.zohocloud.ca",
}


def required(name):
    value = (os.environ.get(name) or "").strip()
    if not value:
        raise SystemExit(f"Set {name} before running this helper.")
    return value


def main():
    parser = argparse.ArgumentParser(description="Set up direct Zoho invoice OAuth access.")
    parser.add_argument("--region", choices=sorted(REGIONS), default="in")
    parser.add_argument("--redirect-uri", required=True)
    parser.add_argument("--product", choices=("inventory", "books"), default="inventory")
    parser.add_argument("--code", help="One-time grant code returned by Zoho")
    args = parser.parse_args()

    accounts_url = REGIONS[args.region]
    client_id = required("ZOHO_CLIENT_ID")
    scope = "ZohoInventory.invoices.READ" if args.product == "inventory" else "ZohoBooks.invoices.READ"

    if not args.code:
        query = urlencode(
            {
                "scope": scope,
                "client_id": client_id,
                "response_type": "code",
                "access_type": "offline",
                "prompt": "consent",
                "redirect_uri": args.redirect_uri,
            }
        )
        print("Open this URL in your browser, approve access, then copy the code parameter:")
        print(f"{accounts_url}/oauth/v2/auth?{query}")
        return

    payload = urlencode(
        {
            "grant_type": "authorization_code",
            "client_id": client_id,
            "client_secret": required("ZOHO_CLIENT_SECRET"),
            "redirect_uri": args.redirect_uri,
            "code": args.code,
        }
    ).encode("ascii")
    request = Request(
        f"{accounts_url}/oauth/v2/token",
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=20) as response:
            result = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        raise SystemExit(f"Zoho rejected the token exchange (HTTP {exc.code}).") from exc
    except (URLError, TimeoutError, json.JSONDecodeError) as exc:
        raise SystemExit("Could not complete the Zoho token exchange.") from exc

    refresh_token = result.get("refresh_token")
    if not refresh_token:
        raise SystemExit("No refresh token was returned. Re-authorize with offline access and consent.")
    print("Token exchange succeeded. Store this as a protected server environment variable:")
    print(f"ZOHO_REFRESH_TOKEN={refresh_token}")


if __name__ == "__main__":
    main()
