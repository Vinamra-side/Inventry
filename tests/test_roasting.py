"""Dependency-free unit tests of roasting validation and transaction behavior."""
import importlib.util
from pathlib import Path
import sys
import types
import unittest
from decimal import Decimal
from unittest.mock import MagicMock, patch

fake_db = types.ModuleType('db')
fake_db.get_connection = MagicMock()
fake_db.release_connection = MagicMock()
spec = importlib.util.spec_from_file_location('roasting_services_test', Path(__file__).resolve().parents[1] / 'services.py')
service = importlib.util.module_from_spec(spec)
with patch.dict(sys.modules, {'db': fake_db}):
    spec.loader.exec_module(service)


class RoastingTests(unittest.TestCase):
    def setUp(self):
        self.conn = MagicMock()
        self.cur = self.conn.cursor.return_value.__enter__.return_value
        self.rows = [
            {'id': 1, 'name': 'Arabica green', 'item_type': 'coffee_beans', 'bean_type': 'green', 'unit': 'kg', 'current_stock': Decimal('100')},
            {'id': 2, 'name': 'Arabica roasted', 'item_type': 'coffee_beans', 'bean_type': 'roasted', 'unit': 'kg', 'current_stock': Decimal('10')},
        ]
        self.cur.fetchall.return_value = self.rows
        self.connection_patch = patch.object(service, 'get_connection', return_value=self.conn)
        self.connection_patch.start()
        self.addCleanup(self.connection_patch.stop)

    def test_100_green_yields_85_and_paired_audit(self):
        result = service.roast_beans(1, 2, '100', 'Roaster')
        self.assertEqual(result['output'], Decimal('85.00'))
        calls = self.cur.execute.call_args_list
        self.assertIn('ORDER BY id FOR UPDATE', calls[0].args[0])
        updates = [c.args[1] for c in calls if c.args[0].startswith('UPDATE')]
        self.assertEqual(updates, [(Decimal('100'), 1), (Decimal('85.00'), 2)])
        movements = [c.args[1] for c in calls if 'INSERT INTO stock_movements' in c.args[0]]
        self.assertEqual([m[1] for m in movements], [Decimal('-100'), Decimal('85.00')])
        self.assertEqual(movements[0][3], movements[1][3])
        self.conn.commit.assert_called_once()
        self.conn.rollback.assert_not_called()

    def test_insufficient_stock_changes_nothing(self):
        with self.assertRaises(service.InsufficientStockError):
            service.roast_beans(1, 2, '101')
        self.assertEqual(self.cur.execute.call_count, 1)
        self.conn.commit.assert_not_called()
        self.conn.rollback.assert_called_once()

    def test_invalid_types_and_units(self):
        for field, value in [('unit', 'g'), ('bean_type', 'green'), ('item_type', 'herbal_teas')]:
            with self.subTest(field=field):
                original = self.rows[1][field]
                self.rows[1][field] = value
                with self.assertRaises(ValueError):
                    service.roast_beans(1, 2, '10')
                self.rows[1][field] = original
        self.conn.commit.assert_not_called()

    def test_invalid_quantities(self):
        for quantity in ['NaN', 'Infinity', '-1', '0', '0.001', None, 'invalid', '100000000']:
            with self.subTest(quantity=quantity), self.assertRaises(service.InvalidQuantityError):
                service.roast_beans(1, 2, quantity)
        self.conn.cursor.assert_not_called()

    def test_same_item_rejected(self):
        with self.assertRaises(ValueError):
            service.roast_beans(1, 1, '10')

    def test_missing_item(self):
        self.cur.fetchall.return_value = self.rows[:1]
        with self.assertRaises(service.NotFoundError):
            service.roast_beans(1, 2, '10')
        self.conn.rollback.assert_called_once()

    def test_output_rounding(self):
        self.assertEqual(service.roast_beans(1, 2, '1.10')['output'], Decimal('0.94'))

    def test_automatic_destination_created_and_reused(self):
        self.cur.fetchall.return_value = self.rows[:1]
        self.cur.fetchone.return_value = dict(self.rows[1], name='Arabica green (Roasted)')
        for _ in range(2):
            result = service.roast_beans(1, 'auto', '85')
            self.assertEqual(result['output'], Decimal('72.25'))
            self.assertEqual(result['name'], 'Arabica green (Roasted)')
        inserts = [c for c in self.cur.execute.call_args_list if 'INSERT INTO beans' in c.args[0]]
        self.assertEqual(len(inserts), 2)
        self.assertIn('ON CONFLICT (name) DO NOTHING', inserts[0].args[0])
        self.assertEqual(inserts[0].args[1][:2], ('Arabica green (Roasted)', 'kg'))

    def test_auto_name_conflict_rolls_back(self):
        self.cur.fetchall.return_value = self.rows[:1]
        self.cur.fetchone.return_value = dict(self.rows[1], item_type='herbal_teas')
        with self.assertRaises(ValueError):
            service.roast_beans(1, None, '10')
        self.conn.commit.assert_not_called()
        self.conn.rollback.assert_called_once()

    def test_auto_not_created_without_stock(self):
        with self.assertRaises(service.InsufficientStockError):
            service.roast_beans(1, 'auto', '101')
        self.assertFalse(any('INSERT' in c.args[0] for c in self.cur.execute.call_args_list))

    def test_write_failure_rolls_back(self):
        def fail(sql, args):
            if 'INSERT INTO stock_movements' in sql:
                raise RuntimeError('Simulated ledger failure')
        self.cur.execute.side_effect = fail
        with self.assertRaises(RuntimeError):
            service.roast_beans(1, 2, '10')
        self.conn.commit.assert_not_called()
        self.conn.rollback.assert_called_once()


if __name__ == '__main__':
    unittest.main()
