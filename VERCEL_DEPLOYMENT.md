# Saiko Inventory — Vercel deployment

## Files required by Vercel

Keep these files/folders in the Vercel project:

- `api/index.py` — Vercel Python entrypoint
- `vercel.json` — Vercel routing/build configuration
- `app.py` — Flask routes/application
- `db.py` — PostgreSQL connection helper
- `services.py` — inventory/order/license business logic
- `config.py` — Flask configuration
- `license_verifier.py` — optional signed-license validation
- `schema.sql` — database schema
- `requirements.txt` — Python dependencies
- `templates/` — Jinja templates
- `static/` — CSS/images

`nginx/`, `Dockerfile`, `docker-compose.yml`, `preview_ui.py`, and `__pycache__/` are not required for Vercel.

## 1. Create a free PostgreSQL database

Use an external PostgreSQL provider such as Neon. Create a database and copy its PostgreSQL connection string. Prefer the provider's pooled connection string if it offers one.

## 2. Initialize the database

Open the provider's SQL editor and run the complete contents of `schema.sql` once.

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

Recommended:

- `INIT_SCHEMA=false`
- `SESSION_COOKIE_SECURE=true`

Optional signed licensing:

- `LICENSE_PUBLIC_KEY`
- `LICENSE_TOKEN`

Set the values in Vercel Project Settings → Environment Variables, then redeploy.

## 5. Test

After deployment, open the Vercel URL. Test:

1. Dashboard
2. Add bean
3. Add inventory
4. Create order and verify stock decreases
5. Cancel order and verify stock returns
6. Delivery completion
7. Users/license seat limit
8. `/login` → sign in as the bootstrap admin, then use **Admin → License control**

## Important Vercel notes

- Do not run Gunicorn on Vercel.
- Do not run NGINX on Vercel.
- Do not use SQLite for persistent production data.
- The filesystem is not a persistent data store; inventory data belongs in PostgreSQL.
- Keep the private licensing signing key out of this repository and out of Vercel.
- For Neon, use its pooled connection string where appropriate to reduce connection pressure from serverless functions.
