"""Local dummy tests for the Zoho invoice importer.

No network, Zoho account, or PostgreSQL database is used. Run with:
    python -m unittest tests.test_zoho_integration -v
"""

import json
from datetime import date, timedelta
from io import BytesIO
from contextlib import redirect_stdout
import os
import sys
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

import zoho_service
import services


class DummyResponse:
    def __init__(self, payload):
        self.payload = payload

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def read(self):
        return json.dumps(self.payload).encode("utf-8")


class MappingConnection:
    def __init__(self):
        self.beans = {
            "Agglomerated 100%": {"id": 11, "name": "Agglomerated 100%", "unit": "kg"},
            "Decoction 70/30": {"id": 12, "name": "Decoction 70/30", "unit": "L"},
        }
        self.row = None
        self.committed = False
        self.rolled_back = False

    def cursor(self):
        return self

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def execute(self, query, params=None):
        self.row = None
        if "SELECT * FROM beans WHERE LOWER(name)" in query:
            self.row = self.beans.get(params[0])

    def fetchone(self):
        return self.row

    def commit(self):
        self.committed = True

    def rollback(self):
        self.rolled_back = True


class ArchiveConnection:
    def __init__(self):
        self.calls = []
        self.order = None
        self.committed = False
        self.rolled_back = False

    def cursor(self):
        return self

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def execute(self, query, params=None):
        sql = " ".join(query.split())
        self.calls.append((sql, params))
        if sql.startswith("INSERT INTO orders"):
            self.order = {"id": 42, "status": "historical", "external_id": "90001"}

    def fetchone(self):
        return self.order if self.calls[-1][0].startswith("INSERT INTO orders") else None

    def commit(self):
        self.committed = True

    def rollback(self):
        self.rolled_back = True


class ZohoIntegrationTests(unittest.TestCase):
    def setUp(self):
        self.settings = patch.dict(
            os.environ,
            {
                "ZOHO_CLIENT_ID": "dummy-client",
                "ZOHO_CLIENT_SECRET": "dummy-secret",
                "ZOHO_REFRESH_TOKEN": "dummy-refresh-token",
                "ZOHO_ORGANIZATION_ID": "123456789",
                "ZOHO_WEBHOOK_SECRET": "dummy-webhook-secret",
                "ZOHO_ACCOUNTS_URL": "https://accounts.zoho.in",
                "ZOHO_API_BASE_URL": "https://www.zohoapis.in/billing/v1",
            },
            clear=False,
        )
        self.settings.start()
        zoho_service._access_token = None
        zoho_service._access_token_expires_at = 0

    def tearDown(self):
        self.settings.stop()

    def test_historical_invoice_saves_every_line_without_touching_stock(self):
        conn = ArchiveConnection()
        invoice = {
            "invoice_id": "90001", "invoice_number": "INV-90001",
            "date": (date.today() - timedelta(days=2)).isoformat(),
            "customer_name": "Cafe", "status": "paid",
            "line_items": [
                {"name": "Bean A", "quantity": 2, "unit": "kg"},
                {"name": "Bean B", "description": "Roasted Bean B", "quantity": 3, "unit": "kg"},
            ],
        }
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            order = services.archive_zoho_invoice(invoice)

        sql = " ".join(statement for statement, _ in conn.calls)
        self.assertTrue(conn.committed)
        self.assertEqual(order["status"], "historical")
        self.assertEqual([item["name"] for item in order["items"]], ["Bean A", "Roasted Bean B"])
        self.assertEqual(sql.count("INSERT INTO order_items"), 2)
        self.assertNotIn("UPDATE beans", sql)
        self.assertNotIn("INSERT INTO stock_movements", sql)

    def test_historical_import_rejects_current_invoice(self):
        with self.assertRaisesRegex(ValueError, "Only past invoices"):
            services.archive_zoho_invoice({
                "invoice_id": "90002", "date": date.today().isoformat(),
                "line_items": [{"name": "Bean", "quantity": 1}],
            })

    def test_current_invoice_uses_active_order_action_not_history(self):
        import app as app_module

        current = {"invoice_id": "90002", "invoice_number": "INV-90002", "date": date.today().isoformat()}
        past = {"invoice_id": "90001", "invoice_number": "INV-90001", "date": (date.today() - timedelta(days=2)).isoformat()}
        with patch.object(app_module, "_license_is_active", return_value=(True, None)), patch.object(
            app_module, "list_invoices", return_value=([current, past], False)
        ), patch("auth._current_active_user", return_value={"role": "admin"}), patch.object(
            app_module, "import_invoice", return_value={"id": 77, "created_from_external": True}
        ) as active_import, patch.object(app_module, "archive_zoho_invoice") as history_import:
            client = app_module.app.test_client()
            with client.session_transaction() as session:
                session["csrf_token"] = "test-csrf-token"
            listing = client.get("/zoho-invoices")
            queue = client.get("/zoho-invoices/import-queue")
            imported = client.post(
                "/zoho-invoices/90002/import-order",
                headers={"Accept": "application/json", "X-CSRF-Token": "test-csrf-token"},
            )
        self.assertIn(b"Import as order", listing.data)
        self.assertIn(b"Import to history", listing.data)
        self.assertEqual(queue.json["invoice_ids"], ["90001"])
        self.assertEqual(imported.status_code, 201)
        active_import.assert_called_once_with("90002")
        history_import.assert_not_called()

    def test_historical_lines_remain_visible_without_catalog_items(self):
        class LinesCursor:
            def execute(self, query, params):
                self.order_ids = params[0]

            def fetchall(self):
                return [
                    {"order_id": 42, "bean_id": None, "name": "Bean A", "unit": "kg", "quantity": 2},
                    {"order_id": 42, "bean_id": None, "name": "Bean B", "unit": "L", "quantity": 3},
                ]

        rows = services._attach_order_items(LinesCursor(), [{"id": 42, "status": "historical"}])
        self.assertEqual(rows[0]["item_summary"], "Bean A · 2 kg, Bean B · 3 L")

    def test_fetches_invoice_with_refreshed_token(self):
        requests = []

        def dummy_urlopen(request, timeout):
            requests.append((request, timeout))
            if request.full_url.endswith("/oauth/v2/token"):
                return DummyResponse({"access_token": "dummy-access", "expires_in": 3600})
            return DummyResponse(
                {
                    "invoice": {
                        "invoice_id": "90001",
                        "number": "INV-90001",
                        "invoice_date": "2026-09-14",
                        "customer_name": "Dummy Cafe",
                        "invoice_items": [{"name": "Coffee", "quantity": 2, "price": 100}],
                        "billing_address": {"address": "Test Street"},
                        "tax_total": 25,
                    }
                }
            )

        with patch.object(zoho_service, "urlopen", side_effect=dummy_urlopen):
            invoice = zoho_service.fetch_invoice("90001")

        self.assertEqual(invoice["customer_name"], "Dummy Cafe")
        self.assertEqual(invoice["invoice_number"], "INV-90001")
        self.assertEqual(invoice["date"], "2026-09-14")
        self.assertEqual(invoice["line_items"][0]["quantity"], 2)
        self.assertEqual(invoice["billing_address"]["address"], "Test Street")
        self.assertEqual(invoice["tax_total"], 25)
        self.assertEqual(len(requests), 2)
        token_request, invoice_request = requests[0][0], requests[1][0]
        self.assertEqual(token_request.get_method(), "POST")
        self.assertEqual(invoice_request.full_url, "https://www.zohoapis.in/billing/v1/invoices/90001")
        self.assertEqual(invoice_request.get_header("Authorization"), "Zoho-oauthtoken dummy-access")
        self.assertEqual(invoice_request.get_header("X-com-zoho-subscriptions-organizationid"), "123456789")

    def test_lists_invoices_without_importing_orders(self):
        requests = []

        def dummy_urlopen(request, timeout):
            requests.append(request)
            if request.full_url.endswith("/oauth/v2/token"):
                return DummyResponse({"access_token": "dummy-access", "expires_in": 3600})
            return DummyResponse({"invoices": [{"invoice_id": "90001", "number": "INV-90001", "invoice_date": "2026-09-14"}],
                                  "page_context": {"has_more_page": True}})

        with patch.object(zoho_service, "urlopen", side_effect=dummy_urlopen), patch.object(
            zoho_service, "create_order"
        ) as create_order:
            invoices, has_next = zoho_service.list_invoices(2)
        self.assertEqual(invoices[0]["invoice_id"], "90001")
        self.assertEqual(invoices[0]["invoice_number"], "INV-90001")
        self.assertTrue(has_next)
        self.assertIn("/invoices?", requests[-1].full_url)
        self.assertIn("page=2", requests[-1].full_url)
        self.assertNotIn("organization_id=", requests[-1].full_url)
        self.assertEqual(requests[-1].get_header("X-com-zoho-subscriptions-organizationid"), "123456789")
        create_order.assert_not_called()

    def test_rejects_old_books_api_setting_before_calling_zoho(self):
        with patch.dict(os.environ, {"ZOHO_API_BASE_URL": "https://www.zohoapis.in/books/v3"}), patch.object(
            zoho_service, "urlopen"
        ) as urlopen_mock:
            with self.assertRaisesRegex(zoho_service.ZohoConfigurationError, "Billing"):
                zoho_service.list_invoices()
        urlopen_mock.assert_not_called()

    def test_oauth_helper_requests_billing_invoice_scope(self):
        from scripts import zoho_oauth_setup

        output = BytesIO()
        class TextSink:
            def write(self, value):
                output.write(value.encode("utf-8"))
            def flush(self):
                pass

        with patch.object(sys, "argv", ["zoho_oauth_setup.py", "--region", "in", "--product", "billing",
                                        "--redirect-uri", "https://example.com/callback"]), redirect_stdout(TextSink()):
            zoho_oauth_setup.main()
        self.assertIn(b"ZohoSubscriptions.invoices.READ", output.getvalue())

    def test_billing_variants_make_two_distinct_order_lines(self):
        conn = MappingConnection()
        lines = [
            {"item_id": "generic", "name": "Instant coffee", "description": "Agglomerated 100%", "unit": "kgs", "quantity": 2},
            {"item_id": "generic", "name": "Decoction", "description": "Decoction 70/30", "unit": "litres", "quantity": 3},
        ]
        with patch.object(zoho_service, "get_connection", return_value=conn), patch.object(
            zoho_service, "release_connection"
        ):
            items = zoho_service._resolve_local_items(lines)
        self.assertEqual(items, [{"bean_id": 11, "quantity": 2.0}, {"bean_id": 12, "quantity": 3.0}])
        self.assertTrue(conn.committed)

    def test_unit_mismatch_rolls_back_mapping(self):
        conn = MappingConnection()
        with patch.object(zoho_service, "get_connection", return_value=conn), patch.object(
            zoho_service, "release_connection"
        ):
            with self.assertRaisesRegex(zoho_service.ZohoInvoiceError, "Unit mismatch"):
                zoho_service._resolve_local_items([
                    {"item_id": "12", "name": "Decoction", "description": "Decoction 70/30", "unit": "kg", "quantity": 1}
                ])
        self.assertFalse(conn.committed)
        self.assertTrue(conn.rolled_back)

    def test_zoho_400_includes_safe_response_message(self):
        def dummy_urlopen(request, timeout):
            if request.full_url.endswith("/oauth/v2/token"):
                return DummyResponse({"access_token": "dummy-access", "expires_in": 3600})
            raise HTTPError(request.full_url, 400, "Bad Request", {}, BytesIO(
                b'{"code":57,"message":"Invalid organization ID"}'
            ))

        with patch.object(zoho_service, "urlopen", side_effect=dummy_urlopen):
            with self.assertRaises(zoho_service.ZohoAPIError) as context:
                zoho_service.list_invoices()
        self.assertIn("status 400", str(context.exception))
        self.assertIn("Invalid organization ID", str(context.exception))
        self.assertNotIn("dummy-access", str(context.exception))

    def test_zoho_error_in_success_response_is_not_treated_as_empty_list(self):
        def dummy_urlopen(request, timeout):
            if request.full_url.endswith("/oauth/v2/token"):
                return DummyResponse({"access_token": "dummy-access", "expires_in": 3600})
            return DummyResponse({"code": 57, "message": "Invalid organization ID"})

        with patch.object(zoho_service, "urlopen", side_effect=dummy_urlopen):
            with self.assertRaisesRegex(zoho_service.ZohoAPIError, "Invalid organization ID"):
                zoho_service.list_invoices()

    def test_admin_invoice_views_show_full_details_without_stock_changes(self):
        import app as app_module
        from flask import session

        invoice = zoho_service._normalize_invoice({"invoice_id": "90001", "number": "INV-90001", "invoice_date": "2026-09-14", "customer_name": "Cafe",
                   "invoice_items": [{"name": "Coffee", "description": "Medium roast", "item_id": "77", "quantity": 2, "price": 100}],
                   "billing_address": {"address": "Test Street"}, "tax_total": 25}
        )
        with patch.object(app_module, "_license_is_active", return_value=(True, None)), patch.object(
            app_module, "list_invoices", return_value=([invoice], False)
        ), patch.object(app_module, "fetch_invoice", return_value=invoice), patch(
            "auth._current_active_user", return_value={"role": "admin"}
        ), patch.object(app_module, "import_invoice") as importer:
            client = app_module.app.test_client()
            listing = client.get("/zoho-invoices")
            detail = client.get("/zoho-invoices/90001")
        self.assertEqual(listing.status_code, 200)
        self.assertEqual(detail.status_code, 200)
        self.assertIn(b"INV-90001", listing.data)
        self.assertIn(b"90001", listing.data)
        self.assertIn(b"Medium roast", detail.data)
        self.assertIn(b"100", detail.data)
        self.assertIn(b"ZOHO BILLING", detail.data)
        self.assertIn(b"Test Street", detail.data)
        self.assertIn(b"tax_total", detail.data)
        self.assertEqual(detail.headers["Cache-Control"], "private, no-store")
        importer.assert_not_called()

    def test_invoice_becomes_one_multi_item_order_and_retry_is_idempotent(self):
        invoice = {
            "invoice_id": "90002",
            "number": "INV-90002",
            "customer_name": "Dummy Roastery",
            "notes": "Deliver to the front counter",
            "status": "sent",
            "invoice_items": [
                {"item_id": "z-1", "name": "Green Arabica", "quantity": 4},
                {"item_id": "z-2", "name": "Instant Coffee", "quantity": 2},
            ],
        }
        mapped_items = [
            {"bean_id": 11, "quantity": 4.0},
            {"bean_id": 12, "quantity": 2.0},
        ]
        imported = {}

        def dummy_create_order(**kwargs):
            key = (kwargs["external_source"], kwargs["external_id"])
            created = key not in imported
            imported.setdefault(key, 501)
            return {
                "id": imported[key],
                "items": kwargs["items"],
                "created_from_external": created,
                "notes": kwargs["notes"],
            }

        with (
            patch.object(zoho_service, "fetch_invoice", return_value=zoho_service._normalize_invoice(invoice)),
            patch.object(zoho_service, "_resolve_local_items", return_value=mapped_items),
            patch.object(zoho_service, "create_order", side_effect=dummy_create_order) as create,
        ):
            first = zoho_service.import_invoice("90002")
            retry = zoho_service.import_invoice("90002")

        self.assertTrue(first["created_from_external"])
        self.assertFalse(retry["created_from_external"])
        self.assertEqual(first["id"], retry["id"])
        self.assertEqual(create.call_args.kwargs["items"], mapped_items)
        self.assertEqual(create.call_args.kwargs["external_source"], "zoho_billing_invoice")
        self.assertIn("INV-90002", create.call_args.kwargs["notes"])

    def test_rejects_void_invoice(self):
        invoice = {
            "invoice_id": "90003",
            "status": "void",
            "line_items": [{"item_id": "z-1", "name": "Green Arabica", "quantity": 1}],
        }
        with patch.object(zoho_service, "fetch_invoice", return_value=invoice):
            with self.assertRaisesRegex(zoho_service.ZohoInvoiceError, "not imported"):
                zoho_service.import_invoice("90003")

    def test_webhook_secret_comparison(self):
        self.assertTrue(zoho_service.verify_webhook_secret("dummy-webhook-secret"))
        self.assertFalse(zoho_service.verify_webhook_secret("wrong-secret"))

    def test_webhook_endpoint_returns_created_order(self):
        import app as app_module

        dummy_order = {"id": 777, "created_from_external": True}
        with (
            patch.object(app_module, "_license_is_active", return_value=(True, None)),
            patch.object(app_module, "import_invoice", return_value=dummy_order) as importer,
        ):
            client = app_module.app.test_client()
            response = client.post(
                "/api/integrations/zoho/invoices",
                json={"invoice_id": "90004"},
                headers={"X-Zoho-Webhook-Secret": "dummy-webhook-secret"},
            )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json()["order_id"], 777)
        importer.assert_called_once_with("90004")


if __name__ == "__main__":
    unittest.main()
