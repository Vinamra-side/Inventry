"""Regression coverage for saving and deducting a multi-item order."""

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
        if "SELECT * FROM beans WHERE id = %s FOR UPDATE" in query:
            self.selected = self.beans.get(params[0])
        elif "INSERT INTO orders" in query:
            self.selected = {"id": 42, "customer_name": params[1], "status": "pending_delivery"}

    def fetchone(self):
        return self.selected


class FakeConnection:
    def __init__(self):
        self.cur = FakeCursor()
        self.committed = False

    def cursor(self):
        return self.cur

    def commit(self):
        self.committed = True


class MultiItemOrderTests(unittest.TestCase):
    def test_two_items_share_one_order_and_each_deducts_stock(self):
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
        self.assertEqual([(row[0], row[1], row[3]) for row in movements], [(2, -3.0, 42), (5, -2.0, 42)])
        self.assertEqual(deductions, [(3.0, 2), (2.0, 5)])


if __name__ == "__main__":
    unittest.main()
