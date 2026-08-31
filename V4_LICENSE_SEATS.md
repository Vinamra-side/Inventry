# V4 — Login users tied to licence seats

- `app_users` is now the licensed user table for access control.
- Every active login account consumes one seat, including administrators.
- Creating or re-enabling an account is blocked when the seat limit is reached.
- The owner manages activation, the inactive message, and the total seat limit from the dedicated native Windows application.
- Changes are saved immediately in `license_status`; no licence key, environment-variable change, or redeployment is required.
- Login accounts and licensed operational users share the same seat total.
- The fixed licence-owner credentials do not consume a user seat.
- The Windows application connects to the secured API in this inventory deployment and has no Neon/database configuration of its own.
- Existing accounts are not deleted if a replacement licence has a lower limit; disable accounts until active users are within the new limit.
