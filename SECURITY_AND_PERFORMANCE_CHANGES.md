# Security and performance update

This update addresses the production audit findings:

- one PostgreSQL connection is shared across each Flask request;
- Vercel compute is pinned to Singapore, near the current database;
- administrator bootstrap is explicitly opt-in instead of running on each cold start;
- every state-changing form uses a per-session CSRF token;
- external post-login redirects are rejected;
- failed login attempts are rate-limited in PostgreSQL;
- disabled accounts are checked on every protected request;
- the secured machine-to-machine licensing integration remains reachable when inventory is inactive;
- login accounts and licensed users share one enforced seat total;
- owners manage activation and seat limits through a separate licence service and native Windows application;
- the web deployment is installable as a phone or desktop Progressive Web App;
- order cancellation is limited to orders awaiting delivery;
- order labels and sales insights use the actual fulfilment status;
- malformed names, dates, thresholds, quantities, notes, and phone numbers are validated;
- order, delivery, and stock-history queries are paginated;
- static responses receive browser cache headers; and
- database constraints and indexes provide a second integrity layer.

## Upgrade order

1. Back up the PostgreSQL database.
2. Run `schema.sql` in the database provider's SQL editor.
3. Confirm inventory Vercel environment variables from `.env.example`.
4. Deploy this inventory code.
5. Deploy the separate no-Neon licence service and build its native Windows application.
6. Run the checklist in `VERCEL_DEPLOYMENT.md`.
