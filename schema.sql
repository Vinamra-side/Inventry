-- Saiko inventory and order management schema.
-- Safe to run more than once (uses IF NOT EXISTS throughout).
-- Run this against your external PostgreSQL database (for example Neon).
-- The Vercel deployment recommends running it once before deployment.

CREATE TABLE IF NOT EXISTS beans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'kg',
    current_stock NUMERIC(10, 2) NOT NULL DEFAULT 0,
    low_stock_threshold NUMERIC(10, 2) NOT NULL DEFAULT 2,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Immutable log of every stock increase. This is the only table that
-- is allowed to raise a bean's stock.
CREATE TABLE IF NOT EXISTS inventory_additions (
    id SERIAL PRIMARY KEY,
    bean_id INTEGER NOT NULL REFERENCES beans(id),
    quantity NUMERIC(10, 2) NOT NULL,
    added_by VARCHAR(120),
    note VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    bean_id INTEGER NOT NULL REFERENCES beans(id),
    customer_name VARCHAR(120) NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending_delivery',
    notes VARCHAR(255),
    delivery_date DATE,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    cancelled_at TIMESTAMPTZ
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_date DATE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ;

-- A complete ledger makes additions, order deductions, and cancellations
-- independently auditable without allowing a manual stock decrease.
CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    bean_id INTEGER NOT NULL REFERENCES beans(id),
    delta NUMERIC(10, 2) NOT NULL,
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('addition', 'order', 'cancellation')),
    reason VARCHAR(255),
    recorded_by VARCHAR(120),
    order_id INTEGER REFERENCES orders(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inventory_additions_bean_id ON inventory_additions(bean_id);
CREATE INDEX IF NOT EXISTS idx_orders_bean_id ON orders(bean_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_stock_movements_bean_id ON stock_movements(bean_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created_at ON stock_movements(created_at);

-- Single-row table used as a remote on/off switch for the whole app.
-- Toggle it from the database, or from the app's own
-- /admin/license page, without ever touching the code running at the
-- shop.
CREATE TABLE IF NOT EXISTS license_status (
    id INTEGER PRIMARY KEY DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    max_users INTEGER NOT NULL DEFAULT 5 CHECK (max_users >= 1),
    note VARCHAR(255),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT license_status_single_row CHECK (id = 1)
);

-- Upgrade databases created with earlier versions of the application.
ALTER TABLE license_status ADD COLUMN IF NOT EXISTS max_users INTEGER NOT NULL DEFAULT 5;

INSERT INTO license_status (id, is_active, max_users)
VALUES (1, true, 5)
ON CONFLICT (id) DO NOTHING;


-- Application authentication accounts (separate from licensed subscribers).
CREATE TABLE IF NOT EXISTS app_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(120),
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_app_users_username ON app_users(username);
