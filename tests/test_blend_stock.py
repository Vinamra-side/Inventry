"""Synthetic stock-ledger tests for roasted blend delivery."""

import unittest
from decimal import Decimal
from unittest.mock import patch

import services
from blend_recipes import blend_components, roasted_blend_catalog_name


class BlendCursor:
    def __init__(self, arabica=Decimal("10"), robusta=Decimal("10")):
        self.calls = []
        self.selected = None
        self.pending = {"id": 42, "status": "pending_delivery", "stock_deducted": False,
                        "notes": None, "customer_name": "Cafe"}
        self.beans = {
            1: {"id": 1, "name": "100% Arabica Blend", "unit": "kg", "item_type": "coffee_beans", "bean_type": "roasted", "current_stock": arabica},
            2: {"id": 2, "name": "100% Robusta Blend", "unit": "kg", "item_type": "coffee_beans", "bean_type": "roasted", "current_stock": robusta},
            3: {"id": 3, "name": "Daily Brew", "unit": "kg", "item_type": "coffee_beans", "bean_type": "roasted", "current_stock": 0},
            4: {"id": 4, "name": "Signature Brew", "unit": "kg", "item_type": "coffee_beans", "bean_type": "roasted", "current_stock": 0},
        }

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def execute(self, query, params=None):
        sql = " ".join(query.split())
        self.calls.append((sql, params))
        if sql.startswith("SELECT * FROM orders"):
            self.selected = self.pending
        elif "FROM beans WHERE name = %s" in sql:
            self.selected = next((bean for bean in self.beans.values() if bean["name"].casefold() == params[0].casefold()), None)
        elif "FROM beans WHERE id = %s" in sql:
            self.selected = self.beans.get(params[0])
        elif sql.startswith("UPDATE orders"):
            self.selected = {**self.pending, "status": "delivered", "stock_deducted": True}

    def fetchone(self):
        return self.selected

    def fetchall(self):
        return [{"bean_id": 3, "quantity": Decimal("5")}, {"bean_id": 4, "quantity": Decimal("5")}]


class BlendConnection:
    def __init__(self, **stocks):
        self.cur = BlendCursor(**stocks)
        self.committed = False
        self.rolled_back = False

    def cursor(self):
        return self.cur

    def commit(self):
        self.committed = True

    def rollback(self):
        self.rolled_back = True


class BlendStockTests(unittest.TestCase):
    def test_recipes_include_pure_sources_and_named_brews(self):
        self.assertIsNone(blend_components("100% Arabica Blend", Decimal("2")))
        self.assertIsNone(blend_components("100% Robusta Blend", Decimal("2")))
        self.assertEqual(blend_components("Daily Brew", Decimal("5")), {
            "100% Arabica Blend": Decimal("1.00"), "100% Robusta Blend": Decimal("4.00")})
        self.assertEqual(blend_components("Signature Brew", Decimal("5")), {
            "100% Arabica Blend": Decimal("3.00"), "100% Robusta Blend": Decimal("2.00")})

    def test_explicit_species_order_maps_to_the_correct_existing_recipe(self):
        self.assertEqual(roasted_blend_catalog_name("70/30 Arabica Robusta Blend"), "70/30 AA Blend")
        self.assertEqual(blend_components("70/30 Arabica Robusta Blend", Decimal("10")), {
            "100% Arabica Blend": Decimal("7.00"), "100% Robusta Blend": Decimal("3.00")})
        self.assertEqual(roasted_blend_catalog_name("70/30 Robusta Arabica Blend"), "70/30 Commercial Blend")
        self.assertEqual(blend_components("70/30 Robusta Arabica Blend", Decimal("10")), {
            "100% Arabica Blend": Decimal("3.00"), "100% Robusta Blend": Decimal("7.00")})
        self.assertIsNone(roasted_blend_catalog_name("90/10 Arabica Robusta Blend"))

    def test_multi_blend_delivery_deducts_aggregated_sources_once(self):
        conn = BlendConnection()
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            order = services.mark_order_delivered(42)
        updates = [params for sql, params in conn.cur.calls if sql.startswith("UPDATE beans SET current_stock")]
        movements = [params for sql, params in conn.cur.calls if sql.startswith("INSERT INTO stock_movements")]
        self.assertEqual(updates, [(Decimal("4.00"), 1), (Decimal("6.00"), 2)])
        self.assertEqual(len(movements), 2)
        self.assertTrue(conn.committed)
        self.assertEqual(order["status"], "delivered")

    def test_short_source_blocks_entire_delivery(self):
        conn = BlendConnection(robusta=Decimal("5"))
        with patch.object(services, "get_connection", return_value=conn), patch.object(
            services, "release_connection"
        ), patch.object(services, "_ensure_order_items_schema"):
            with self.assertRaises(services.InsufficientStockError):
                services.mark_order_delivered(42)
        self.assertTrue(conn.rolled_back)
        self.assertFalse(any(sql.startswith("UPDATE beans SET current_stock") for sql, _ in conn.cur.calls))

    def test_order_availability_uses_roasted_source_balances(self):
        class LinesCursor:
            def __init__(self):
                self.query = ""
                self.params = None

            def execute(self, query, params):
                self.query = " ".join(query.split())
                self.params = params

            def fetchall(self):
                return [{"order_id": 42, "bean_id": 3, "name": "Daily Brew", "unit": "kg",
                         "catalog_item_type": "coffee_beans", "catalog_bean_type": "roasted",
                         "quantity": Decimal("5"), "current_stock": Decimal("0")}]

            def fetchone(self):
                source = {"100% Arabica Blend": {"id": 1, "name": "100% Arabica Blend", "unit": "kg",
                                                  "item_type": "coffee_beans", "bean_type": "roasted", "current_stock": Decimal("10")},
                          "100% Robusta Blend": {"id": 2, "name": "100% Robusta Blend", "unit": "kg",
                                                  "item_type": "coffee_beans", "bean_type": "roasted", "current_stock": Decimal("3")}}
                return source[self.params[0]]

        result = services._attach_order_items(
            LinesCursor(), [{"id": 42, "status": "pending_delivery", "stock_deducted": False}]
        )
        self.assertFalse(result[0]["items"][0]["available"])


if __name__ == "__main__":
    unittest.main()
