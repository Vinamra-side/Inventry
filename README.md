# Saiko Inventory — Vercel Edition

Flask inventory and order management application adapted for Vercel serverless hosting with an external PostgreSQL database.

See **VERCEL_DEPLOYMENT.md** for the complete deployment procedure.

See **ZOHO_INTEGRATION.md** to configure Zoho Billing invoice-to-order imports
and the stock-neutral historical invoice backfill.

### Architecture

Browser → Vercel Python Function → Flask → External PostgreSQL

NGINX, Gunicorn, Docker Compose, and a persistent local filesystem are not required.
