# V3 authentication and roles

This version adds real application authentication to the Vercel build.

- `/login` username/password sign-in.
- `/logout` POST sign-out.
- Flask session persistence with secure-cookie support.
- Passwords stored only as Werkzeug password hashes.
- `admin` and `user` roles.
- All operational routes require login.
- Licensed-user management is admin-only.
- License Control is admin-only and no longer relies on an `ADMIN_KEY` URL query parameter.
- Admin-only `/admin/accounts` page creates/disables login accounts.
- Bootstrap admin can be provisioned from `ADMIN_USERNAME` and `ADMIN_PASSWORD` when the account table is empty.

Before running V3, rerun the updated `schema.sql` against Neon so `app_users` exists.
