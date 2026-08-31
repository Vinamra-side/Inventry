# Authentication setup (V3)

1. Run the updated `schema.sql` in Neon. It creates the new `app_users` table.
2. In local `.env` and Vercel Environment Variables set:
   - `ADMIN_USERNAME` (example: `admin`)
   - `ADMIN_PASSWORD` (minimum 8 chars; use a strong unique password)
   - `ADMIN_DISPLAY_NAME` (optional)
   - existing `SECRET_KEY`, `DATABASE_URL`, etc.
3. Restart/redeploy. If `app_users` is empty, the first admin account is created automatically.
4. Visit `/login` and sign in.
5. Admins can open **Admin → Login accounts** to create staff users and more admins.

Roles:
- `admin`: all operational pages + licensed user management + login-account management.
- `user`: dashboard, inventory, orders, deliveries, insights, and stock history.

Security notes:
- Never commit `.env` or your admin password.
- Set `SESSION_COOKIE_SECURE=true` on Vercel.
- Configure `LICENSE_ADMIN_USERNAME` and `LICENSE_ADMIN_PASSWORD` here for the
  dedicated native Windows licence application. This fixed owner login does not
  consume a seat.
- The Windows application connects directly to this inventory deployment. It
  has no database configuration and no separate web backend.
