\set ON_ERROR_STOP on

-- Local-only reference state. Upserts make this safe to run repeatedly.
INSERT INTO license_status (id, is_active, max_users, note)
VALUES (1, true, 5, 'Local development licence')
ON CONFLICT (id) DO UPDATE
SET is_active = EXCLUDED.is_active,
    max_users = EXCLUDED.max_users,
    note = EXCLUDED.note,
    updated_at = now();
