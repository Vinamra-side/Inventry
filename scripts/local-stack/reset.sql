\set ON_ERROR_STOP on

-- Return all mutable application tables to a deterministic empty state.
TRUNCATE TABLE
    login_attempts,
    app_users,
    stock_movements,
    order_items,
    orders,
    inventory_additions,
    subscribers,
    beans
RESTART IDENTITY CASCADE;

DELETE FROM license_status WHERE id <> 1;
