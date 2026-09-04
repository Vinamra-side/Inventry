-- Confirmed catalog, 2026-09-04. Run in the intended production database's SQL editor.
-- New items only: 0 opening stock, threshold 2; all units kg except decoction (L).
-- Existing names (case/space insensitive) and all their stock/history are untouched.
-- Does NOT import invoices, define blend recipes, or apply roasting conversions.
BEGIN;

-- Serialize the short import against concurrent catalog writes.
LOCK TABLE beans IN SHARE ROW EXCLUSIVE MODE;

CREATE TEMP TABLE confirmed_catalog_import (
    name VARCHAR(120) PRIMARY KEY,
    item_type VARCHAR(30) NOT NULL,
    bean_type VARCHAR(20),
    unit VARCHAR(20) NOT NULL
) ON COMMIT DROP;

INSERT INTO confirmed_catalog_import (name, item_type, bean_type, unit) VALUES
('Arabica Cherry A', 'coffee_beans', 'green', 'kg'),
('Arabica Cherry AA', 'coffee_beans', 'green', 'kg'),
('Arabica Plantation A', 'coffee_beans', 'green', 'kg'),
('Arabica Plantation AA', 'coffee_beans', 'green', 'kg'),
('Ratnagiri Rose Cultured', 'coffee_beans', 'green', 'kg'),
('Ratnagiri Jasmine Cultured', 'coffee_beans', 'green', 'kg'),
('Ratnagiri Arabica AAA', 'coffee_beans', 'green', 'kg'),
('Ratnagiri Robusta', 'coffee_beans', 'green', 'kg'),
('Whiskey Barrel Aged', 'coffee_beans', 'roasted', 'kg'),
('Rum Barrel Aged', 'coffee_beans', 'roasted', 'kg'),
('Mysore Nuggets', 'coffee_beans', 'roasted', 'kg'),
('KDP', 'coffee_beans', 'roasted', 'kg'),
('Monsoon Malabar', 'coffee_beans', 'roasted', 'kg'),
('Agglomerated 70/30', 'instant_coffee', NULL, 'kg'),
('Agglomerated 100%', 'instant_coffee', NULL, 'kg'),
('Agglomerated 53/47', 'instant_coffee', NULL, 'kg'),
('Agglomerated Hazelnut', 'instant_coffee', NULL, 'kg'),
('Agglomerated Vanilla', 'instant_coffee', NULL, 'kg'),
('Agglomerated Mocha', 'instant_coffee', NULL, 'kg'),
('Agglomerated Butterscotch', 'instant_coffee', NULL, 'kg'),
('Freeze Dried 100%', 'instant_coffee', NULL, 'kg'),
('Freeze Dried 70/30', 'instant_coffee', NULL, 'kg'),
('Freeze Dried Hazelnut', 'instant_coffee', NULL, 'kg'),
('Freeze Dried Mocha', 'instant_coffee', NULL, 'kg'),
('Freeze Dried Vanilla', 'instant_coffee', NULL, 'kg'),
('Decoction 70/30', 'decoction', NULL, 'L'),
('Decoction 80/20', 'decoction', NULL, 'L'),
('Decoction 100%', 'decoction', NULL, 'L'),
('Matcha Ceremonial', 'herbal_teas', NULL, 'kg'),
('Matcha Culinary', 'herbal_teas', NULL, 'kg'),
('Matcha A Grade', 'herbal_teas', NULL, 'kg'),
('Ube', 'herbal_teas', NULL, 'kg'),
('Hojicha', 'herbal_teas', NULL, 'kg');

-- First result set: newly created items. On repeat execution this is empty.
INSERT INTO beans (name, item_type, bean_type, unit, current_stock, low_stock_threshold)
SELECT incoming.name, incoming.item_type, incoming.bean_type, incoming.unit, 0, 2
FROM confirmed_catalog_import AS incoming
WHERE NOT EXISTS (
    SELECT 1 FROM beans AS existing
    WHERE LOWER(TRIM(existing.name)) = LOWER(TRIM(incoming.name))
)
ON CONFLICT (name) DO NOTHING
RETURNING id, name, item_type, bean_type, unit, current_stock, low_stock_threshold;

-- Second result set: existing names with different categories/units to review.
-- They are intentionally NOT edited: changing units could corrupt stock meaning.
SELECT existing.id, existing.name,
       existing.item_type AS existing_type, incoming.item_type AS requested_type,
       existing.bean_type AS existing_subtype, incoming.bean_type AS requested_subtype,
       existing.unit AS existing_unit, incoming.unit AS requested_unit
FROM beans AS existing
JOIN confirmed_catalog_import AS incoming
  ON LOWER(TRIM(existing.name)) = LOWER(TRIM(incoming.name))
WHERE existing.item_type IS DISTINCT FROM incoming.item_type
   OR existing.bean_type IS DISTINCT FROM incoming.bean_type
   OR existing.unit IS DISTINCT FROM incoming.unit;

COMMIT;
