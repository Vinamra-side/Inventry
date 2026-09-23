"""Regression coverage for pending multi-item orders and delivery deductions."""

import unittest
from unittest.mock import patch

import services


class FakeCursor:
    def __init__(self):
        self.calls = []
        self.selected = None
        self.beans = {
            2: {"id": 2, "name": "Green Arabica", "unit": "kg", "current_stock": 10},
            5: {"id": 5, "name": "Instant Coffee", "unit": "kg", "current_stock": 6},
        }

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def execute(self, query, params=None):
        self.calls.append((" ".join(query.split()), params))
        if "SELECT * FROM beans WHERE id = %s" in query:
            self.selected = self.beans.get(params[0])
        elif "INSERT INTO orders" in query:
            self.selected = {"id": 42, "customer_name": params[1], "status": "pending_delivery", "stock_deducted": False}

    def fetchone(self):
        return self.selected


class FakeConnection:
    def __init__(self):
        self.cur = FakeCursor()
        self.committed = False
        self.rolled_back = False

    def cursor(self):
        return self.cur

    def commit(self):
        self.committed = True

    def rollback(self):
        self.rolled_back = True


class MultiItemOrderTests(unittest.TestCase):
    def test_two_items_share_one_order_without_deducting_stock(self):
        conn = FakeConnection()
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            order = services.create_order(
                customer_name="Cafe",
                items=[{"bean_id": 5, "quantity": 2}, {"bean_id": 2, "quantity": 3}],
            )

        statements = conn.cur.calls
        inserted_orders = [params for sql, params in statements if sql.startswith("INSERT INTO orders")]
        lines = [params for sql, params in statements if sql.startswith("INSERT INTO order_items")]
        movements = [params for sql, params in statements if sql.startswith("INSERT INTO stock_movements")]
        deductions = [params for sql, params in statements if sql.startswith("UPDATE beans SET current_stock")]

        self.assertTrue(conn.committed)
        self.assertEqual(order["id"], 42)
        self.assertEqual(len(order["items"]), 2)
        self.assertEqual(len(inserted_orders), 1)
        self.assertEqual(lines, [(42, 2, 3.0), (42, 5, 2.0)])
        self.assertFalse(movements)
        self.assertFalse(deductions)
        self.assertTrue(any("stock_deducted" in sql for sql, _ in statements))

    def test_out_of_stock_item_can_be_ordered(self):
        conn = FakeConnection()
        conn.cur.beans[5]["current_stock"] = 0
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            order = services.create_order(customer_name="Cafe", items=[{"bean_id": 5, "quantity": 2}])
        self.assertEqual(order["status"], "pending_delivery")
        self.assertFalse(any(sql.startswith("UPDATE beans") for sql, _ in conn.cur.calls))

    def test_order_notes_are_not_truncated_at_old_limit(self):
        conn = FakeConnection()
        long_note = "Roast details: " + "medium-light " * 30
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            services.create_order(customer_name="Cafe", items=[{"bean_id": 2, "quantity": 1}], notes=long_note)
        saved = next(params for sql, params in conn.cur.calls if sql.startswith("INSERT INTO orders"))
        self.assertGreater(len(saved[3]), 255)
        self.assertEqual(saved[3], long_note.strip())


class DeliveryCursor:
    def __init__(self, stock_deducted=False, available=10):
        self.calls = []
        self.pending = {"id": 42, "status": "pending_delivery", "stock_deducted": stock_deducted,
                        "notes": None, "customer_name": "Cafe"}
        self.beans = {
            2: {"id": 2, "name": "Green Arabica", "unit": "kg", "current_stock": available},
            5: {"id": 5, "name": "Instant Coffee", "unit": "kg", "current_stock": available},
        }
        self.selected = None

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def execute(self, query, params=None):
        sql = " ".join(query.split())
        self.calls.append((sql, params))
        if sql.startswith("SELECT * FROM orders"):
            self.selected = self.pending
        elif sql.startswith("SELECT * FROM beans"):
            self.selected = self.beans.get(params[0])
        elif sql.startswith("UPDATE orders"):
            self.selected = {**self.pending, "status": "cancelled" if "cancelled" in sql else "delivered",
                             "stock_deducted": self.pending["stock_deducted"] if "cancelled" in sql else True}

    def fetchone(self):
        return self.selected

    def fetchall(self):
        return [{"bean_id": 2, "quantity": 3}, {"bean_id": 5, "quantity": 2}]


class DeliveryConnection(FakeConnection):
    def __init__(self, stock_deducted=False, available=10):
        self.cur = DeliveryCursor(stock_deducted, available)
        self.committed = False
        self.rolled_back = False


class DeliveryTests(unittest.TestCase):
    def test_pending_items_show_available_and_out_of_stock(self):
        class LinesCursor:
            def execute(self, query, params):
                pass

            def fetchall(self):
                return [
                    {"order_id": 42, "bean_id": 2, "name": "Green Arabica", "unit": "kg", "quantity": 3, "current_stock": 5},
                    {"order_id": 42, "bean_id": 5, "name": "Instant Coffee", "unit": "kg", "quantity": 2, "current_stock": 0},
                ]

        pending = services._attach_order_items(LinesCursor(), [{"id": 42, "status": "pending_delivery", "stock_deducted": False}])
        self.assertEqual([item["available"] for item in pending[0]["items"]], [True, False])
        delivered = services._attach_order_items(LinesCursor(), [{"id": 42, "status": "delivered", "stock_deducted": True}])
        self.assertEqual([item["available"] for item in delivered[0]["items"]], [None, None])

    def test_delivery_deducts_each_item_once(self):
        conn = DeliveryConnection()
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            result = services.mark_order_delivered(42)
        statements = conn.cur.calls
        self.assertTrue(conn.committed)
        self.assertEqual(result["status"], "delivered")
        self.assertEqual(
            [params for sql, params in statements if sql.startswith("UPDATE beans SET current_stock")],
            [(3, 2), (2, 5)],
        )
        self.assertEqual(sum(sql.startswith("INSERT INTO stock_movements") for sql, _ in statements), 2)

    def test_delivery_with_shortage_rolls_back_without_deduction(self):
        conn = DeliveryConnection(available=1)
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            with self.assertRaises(services.InsufficientStockError):
                services.mark_order_delivered(42)
        self.assertTrue(conn.rolled_back)
        self.assertFalse(any(sql.startswith("UPDATE beans") for sql, _ in conn.cur.calls))

    def test_legacy_pending_order_is_not_deducted_twice(self):
        conn = DeliveryConnection(stock_deducted=True, available=0)
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            result = services.mark_order_delivered(42)
        self.assertEqual(result["status"], "delivered")
        self.assertFalse(any(sql.startswith("UPDATE beans") for sql, _ in conn.cur.calls))

    def test_cancelling_new_pending_order_does_not_restore_stock(self):
        conn = DeliveryConnection(stock_deducted=False)
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            result = services.cancel_order(42)
        self.assertEqual(result["status"], "cancelled")
        self.assertFalse(any(sql.startswith("UPDATE beans") for sql, _ in conn.cur.calls))
        self.assertFalse(any(sql.startswith("INSERT INTO stock_movements") for sql, _ in conn.cur.calls))

    def test_cancelling_legacy_pending_order_restores_prior_deduction(self):
        conn = DeliveryConnection(stock_deducted=True)
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            services.cancel_order(42)
        self.assertEqual(sum(sql.startswith("UPDATE beans SET current_stock") for sql, _ in conn.cur.calls), 2)


if __name__ == "__main__":
    unittest.main()
