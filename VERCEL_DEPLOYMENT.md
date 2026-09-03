# Saiko Inventory — Vercel deployment

## Files required by Vercel

Keep these files/folders in the Vercel project:

- `api/index.py` — Vercel Python entrypoint
- `vercel.json` — Vercel routing/build configuration
- `app.py` — Flask routes/application
- `db.py` — PostgreSQL connection helper
- `services.py` — inventory/order/license business logic
- `config.py` — Flask configuration
- `schema.sql` — database schema
- `requirements.txt` — Python dependencies
- `templates/` — Jinja templates
- `static/` — CSS/images

`nginx/`, `Dockerfile`, `docker-compose.yml`, `preview_ui.py`, and `__pycache__/` are not required for Vercel.

## 1. Create a free PostgreSQL database

Use an external PostgreSQL provider such as Neon. Create a database and copy its PostgreSQL connection string. Prefer the provider's pooled connection string if it offers one.

## 2. Initialize the database

Open the provider's SQL editor and run the complete contents of `schema.sql` once.

Run it again when upgrading an existing deployment. The migration adds login
throttling, integrity constraints, and query indexes without deleting data.

This is preferred over allowing a Vercel function to create/alter tables.

## 3. Deploy

Upload/push this folder as a Git repository and import it into Vercel. Vercel will use `vercel.json` and `api/index.py`.

## 4. Add environment variables in Vercel

Required:

- `DATABASE_URL`
- `SECRET_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_DISPLAY_NAME` (optional)
- `LICENSING_INTEGRATION_KEY` (same random machine key as the separate licence service)

Recommended:

- `INIT_SCHEMA=false`
- `BOOTSTRAP_ADMIN=false` after the first administrator has been created
- `SESSION_COOKIE_SECURE=true`

Required for Zoho invoice imports:

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_ORGANIZATION_ID`
- `ZOHO_WEBHOOK_SECRET`

For an India Zoho account, keep the default `.in` account and API URLs from
`.env.example`. For another Zoho data centre, set `ZOHO_ACCOUNTS_URL` and
`ZOHO_API_BASE_URL` to the matching regional endpoints.

Set the values in Vercel Project Settings → Environment Variables, then redeploy.

This repository targets Vercel's Singapore region (`sin1`) so application code
runs near the Singapore PostgreSQL database. If you move the database, update
`regions` in `vercel.json` to the closest Vercel compute region.

## 5. Test

After deployment, open the Vercel URL. Test:

1. Dashboard
2. Add bean
3. Add inventory
4. Create order and verify stock decreases
5. Cancel order and verify stock returns
6. Delivery completion
7. Users/license seat limit
8. Open the native Windows licence application, sign in with the fixed owner credentials, and update Licence Control
9. Disable a temporary login account and confirm its already-open session is rejected
10. Confirm delivered orders do not offer or accept cancellation
11. Send a Zoho invoice webhook and confirm that one order is created with all invoice line items
12. Retry the same webhook and confirm it does not create a duplicate order

## Install as an app

The deployment is also a Progressive Web App. On Android or desktop Chrome/Edge,
open the account menu and select **Install Saiko app** (or use the browser's
Install command). On iPhone/iPad, open the site in Safari, choose **Share**, then
**Add to Home Screen**. The installed app and the website use the same database,
accounts, and deployment.

## Manage the licence from Windows

Deploy the sibling `saiko_inventory_licensing` repository as its own Vercel
service, with no Neon or database variables. Give both Vercel projects the same
`LICENSING_INTEGRATION_KEY`. The native Windows app signs in to that separate
licence service with its one fixed owner username and password. Licence changes
then reach inventory through the private integration API and apply immediately.

## Important Vercel notes

- Do not run Gunicorn on Vercel.
- Do not run NGINX on Vercel.
- Do not use SQLite for persistent production data.
- The filesystem is not a persistent data store; inventory data belongs in PostgreSQL.
- For Neon, use its pooled connection string where appropriate to reduce connection pressure from serverless functions.
