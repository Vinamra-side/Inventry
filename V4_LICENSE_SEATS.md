# V4 — Login users tied to licence seats

- `app_users` is now the licensed user table for access control.
- Every active login account consumes one seat, including administrators.
- Creating or re-enabling an account is blocked when the seat limit is reached.
- When `LICENSE_TOKEN` + `LICENSE_PUBLIC_KEY` contain a valid signed licence, `payload.max_users` is authoritative and cannot be edited in the app.
- To increase seats, issue a new signed licence with `license_manager.py issue --max-users N`, then replace `LICENSE_TOKEN` in Vercel and redeploy.
- Without signed licensing (local/dev), `license_status.max_users` remains the fallback limit.
- Existing accounts are not deleted if a replacement licence has a lower limit; disable accounts until active users are within the new limit.
