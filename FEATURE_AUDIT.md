# Product-document audit

The supplied `features.md` and `Product.md` describe a later React,
FastAPI, MongoDB system. This repository is a Flask/Postgres application,
so the requirements below have been mapped to its existing architecture
rather than claiming a framework migration that was not present here.

| Requirement | Status in this repository |
| --- | --- |
| Stock only added directly; orders deduct atomically | Implemented before this update |
| Low-stock warnings and order cancellation restoration | Implemented before this update |
| Remote whole-app licence enable/disable | Implemented before this update |
| Light/dark theme, persisted across visits | Added in this update |
| Licence user limit | Added in this update; caps active users in the current data model |
| Stock-movement audit trail | Added in this update for new additions, orders, and cancellations |
| 7/30-day demand, stockout and reorder insights | Added in this update |
| Reachable from external networks through Nginx | Added Docker/Gunicorn/Nginx deployment files and instructions |
| Full owner/admin/staff authentication | Not present; requires a security-reviewed account migration |
| Daily Gmail delivery/scheduler | Not present; SMTP credentials and a scheduler/worker are required |
| Zoho OAuth, token refresh and invoice synchronisation | Not present; requires Zoho client credentials and callback configuration |
| Multi-line order API / React/FastAPI/MongoDB migration | Not present; this is a distinct architecture change |

The three unavailable integrations cannot safely be treated as complete
without the business owner's credentials, callback URL, and operational
choices. The current README documents these limitations explicitly.
