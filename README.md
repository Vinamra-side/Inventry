# Saiko Inventory — Vercel Edition

Flask inventory and order management application adapted for Vercel serverless hosting with an external PostgreSQL database.

See **VERCEL_DEPLOYMENT.md** for the complete deployment procedure.

### Architecture

Browser → Vercel Python Function → Flask → External PostgreSQL

NGINX, Gunicorn, Docker Compose, and a persistent local filesystem are not required.
