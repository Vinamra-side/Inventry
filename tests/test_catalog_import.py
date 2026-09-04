"""Check seed data and insertion semantics in a disposable in-memory database.

PostgreSQL-specific transaction locks and migration syntax require PostgreSQL;
these tests execute the shared INSERT statements only, without live credentials.
"""
from pathlib import Path
import sqlite3
import unittest

SQL = (Path(__file__).resolve().parents[1] / 'data/import_confirmed_catalog.sql').read_text(encoding='utf-8')


class CatalogImportTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(':memory:')
        self.addCleanup(self.db.close)
        self.db.execute('CREATE TABLE confirmed_catalog_import (name TEXT, item_type TEXT, bean_type TEXT, unit TEXT)')
        self.db.execute('CREATE TABLE beans (id INTEGER PRIMARY KEY, name TEXT UNIQUE, item_type TEXT, bean_type TEXT, unit TEXT, current_stock NUMERIC, low_stock_threshold NUMERIC)')
        start = SQL.index('INSERT INTO confirmed_catalog_import')
        self.db.execute(SQL[start:SQL.index(';', start)])

    def run_import(self):
        start = SQL.index('INSERT INTO beans')
        return self.db.execute(SQL[start:SQL.index(';', start)]).fetchall()

    def test_all_33_items_and_units(self):
        self.assertEqual(len(self.run_import()), 33)
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM beans WHERE unit='L' AND item_type='decoction'").fetchone()[0], 3)
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM beans WHERE unit='kg'").fetchone()[0], 30)
        self.assertEqual(self.db.execute('SELECT COUNT(*) FROM beans WHERE current_stock=0 AND low_stock_threshold=2').fetchone()[0], 33)
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM beans WHERE bean_type='green'").fetchone()[0], 8)
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM beans WHERE bean_type='roasted'").fetchone()[0], 5)

    def test_repeat_does_not_duplicate(self):
        self.run_import()
        self.assertEqual(self.run_import(), [])

    def test_preserves_existing_stock_units_and_categories(self):
        self.db.execute("INSERT INTO beans VALUES (1, ' arabica cherry aa ', 'coffee_beans', NULL, 'lb', 25, 10)")
        self.assertEqual(len(self.run_import()), 32)
        self.assertEqual(self.db.execute('SELECT unit, current_stock, low_stock_threshold, bean_type FROM beans WHERE id=1').fetchone(), ('lb', 25, 10, None))

    def test_flavours(self):
        self.run_import()
        names = {row[0] for row in self.db.execute("SELECT name FROM beans WHERE item_type='instant_coffee'")}
        self.assertIn('Agglomerated Butterscotch', names)
        self.assertNotIn('Freeze Dried Butterscotch', names)
        self.assertEqual(len(names), 12)


if __name__ == '__main__':
    unittest.main()
