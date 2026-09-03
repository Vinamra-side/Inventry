# Saiko Inventory — Vercel Edition

Flask inventory and order management application adapted for Vercel serverless hosting with an external PostgreSQL database.

See **VERCEL_DEPLOYMENT.md** for the complete deployment procedure.

See **ZOHO_INTEGRATION.md** to configure direct invoice-to-order imports from
Zoho Inventory or Zoho Books.

### Architecture

Browser → Vercel Python Function → Flask → External PostgreSQL

NGINX, Gunicorn, Docker Compose, and a persistent local filesystem are not required.
