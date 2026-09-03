"""Local dummy tests for the Zoho invoice importer.

No network, Zoho account, or PostgreSQL database is used. Run with:
    python -m unittest tests.test_zoho_integration -v
"""

import json
import os
import unittest
from unittest.mock import patch

import zoho_service


class DummyResponse:
    def __init__(self, payload):
        self.payload = payload

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def read(self):
        return json.dumps(self.payload).encode("utf-8")


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
                "ZOHO_API_BASE_URL": "https://www.zohoapis.in/inventory/v1",
            },
            clear=False,
        )
        self.settings.start()
        zoho_service._access_token = None
        zoho_service._access_token_expires_at = 0

    def tearDown(self):
        self.settings.stop()

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
                        "invoice_number": "INV-90001",
                        "customer_name": "Dummy Cafe",
                        "line_items": [],
                    }
                }
            )

        with patch.object(zoho_service, "urlopen", side_effect=dummy_urlopen):
            invoice = zoho_service.fetch_invoice("90001")

        self.assertEqual(invoice["customer_name"], "Dummy Cafe")
        self.assertEqual(len(requests), 2)
        token_request, invoice_request = requests[0][0], requests[1][0]
        self.assertEqual(token_request.get_method(), "POST")
        self.assertIn("organization_id=123456789", invoice_request.full_url)
        self.assertEqual(invoice_request.get_header("Authorization"), "Zoho-oauthtoken dummy-access")

    def test_invoice_becomes_one_multi_item_order_and_retry_is_idempotent(self):
        invoice = {
            "invoice_id": "90002",
            "invoice_number": "INV-90002",
            "customer_name": "Dummy Roastery",
            "notes": "Deliver to the front counter",
            "status": "sent",
            "line_items": [
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
            patch.object(zoho_service, "fetch_invoice", return_value=invoice),
            patch.object(zoho_service, "_resolve_local_items", return_value=mapped_items),
            patch.object(zoho_service, "create_order", side_effect=dummy_create_order) as create,
        ):
            first = zoho_service.import_invoice("90002")
            retry = zoho_service.import_invoice("90002")

        self.assertTrue(first["created_from_external"])
        self.assertFalse(retry["created_from_external"])
        self.assertEqual(first["id"], retry["id"])
        self.assertEqual(create.call_args.kwargs["items"], mapped_items)
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
