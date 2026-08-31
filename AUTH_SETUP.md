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
- Configure only `LICENSING_INTEGRATION_KEY` here for the separate licence
  service. The owner username/password are configured only in the licence
  Vercel project and do not consume a seat.
- The licence service has no Neon access. It communicates with inventory through
  the private integration API.
