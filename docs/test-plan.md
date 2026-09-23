# Repository audit test plan and pre-fix baseline

Baseline captured: 2026-09-22 (Asia/Calcutta)  
Scope: pre-fix inventory and checks that do not require the pending PostgreSQL local stack.  
Evidence rule: mocked, SQLite, and synthetic-DOM tests are identified as such and do not prove PostgreSQL, real-browser application, Zoho, Vercel, or production behavior.

## Runtime and verification inventory

### Applications, services, and deployment paths

| Surface | Entrypoint / build path | Dependencies | Existing verification | Baseline status |
|---|---|---|---|---|
| Flask/Jinja inventory web app | `app.py`; Vercel WSGI shim `api/index.py`; templates and `static/` assets | Python 3.12, Flask 3.1.3, psycopg2-binary 2.9.10, python-dotenv 1.0.1, PostgreSQL | Four `unittest` modules (40 tests), mostly fake DB connections; selected Flask test-client routes | Unit baseline passes; PostgreSQL and full route/auth behavior unverified |
| PostgreSQL persistence/schema | `db.py`, `schema.sql`, `services.py`, external provider in production | PostgreSQL; `DATABASE_URL` | SQLite-only seed import checks and mocked cursor/transaction tests | BLOCKED pending healthy local PostgreSQL proof; SQLite/mocks are not substitutes |
| React inventory island | `frontend/inventory.tsx`, `components/ui/slide-tabs.tsx`; Vite emits committed `static/inventory-ui/*` | React 19, TypeScript 5.9, Vite 7, Tailwind 4, Framer Motion 12 | strict TypeScript check; Vite build; synthetic browser script `tests/inventory-tabs.cjs` | Typecheck/build pass; browser script blocked by undeclared Playwright |
| Jinja/browser UI | `templates/`, `static/style.css`, `static/roasting.js`, PWA assets | Flask/Jinja, browser | `form-buttons.cjs`, `roasting-ui.cjs` extract partial templates into synthetic pages | BLOCKED by missing Playwright; no authenticated full-application E2E proof |
| Zoho Billing integration | `zoho_service.py`, `scripts/zoho_oauth_setup.py`, Flask webhook/admin routes | Zoho Accounts/Billing APIs and secrets | 17 dummy/mocked unit tests, including request construction, import/idempotency, and selected Flask routes | Mock contract passes; live Zoho explicitly prohibited and UNVERIFIED |
| Licensing integration | `licensing_integration.py` plus Flask integration routes | separate licensing service and shared integration secret | No dedicated existing test module | UNVERIFIED |
| Windows desktop wrapper | `desktop_app/app.py` (PyWebView); PyInstaller; Inno Setup installer | pywebview 6.1, PyInstaller 6.15, Pillow 11.3, Inno Setup 6 | `.github/workflows/build-windows-app.yml` build only | Local build blocked: build dependencies and Inno Setup absent; workflow not executed |
| Vercel deployment | `vercel.json` -> `api/index.py`, region `sin1` | Vercel Python runtime and external PostgreSQL | No deployment smoke/contract test | Static inspection only; production testing prohibited and UNVERIFIED |

The current audit is adding a local Compose/PostgreSQL harness in parallel. No container-health evidence existed for this baseline, so no database-backed result below relies on it.

### Declared dependencies and commands

- `requirements.txt`: Flask 3.1.3, psycopg2-binary 2.9.10, python-dotenv 1.0.1.
- `desktop_app/requirements-build.txt`: PyInstaller 6.15.0, pywebview 6.1, Pillow 11.3.0.
- `package.json`: only `build` (`tsc --noEmit && vite build`) and `typecheck` (`tsc --noEmit`). There is no test, lint, format, or coverage script.
- `pnpm-lock.yaml` is present and records TypeScript 5.9.3, Vite 7.3.6, React 19.2.8, Tailwind 4.3.3, and Framer Motion 12.43.0. `node_modules` existed at baseline. `npm` was unavailable; pnpm 11.19.0 and Node 24.19.0 were available.
- There is no Python test/dev requirements file, pytest configuration, lint configuration, coverage configuration, or frontend unit-test configuration.
- Playwright is required directly by all three `.cjs` browser checks but is absent from `package.json`, the lockfile, and the resolvable local modules.

## Existing test inventory and quality assessment

| Test artifact | Count | What it asserts | Test-double boundary / observed gap |
|---|---:|---|---|
| `tests/test_catalog_import.py` | 4 | 33 catalog rows, units/categories, idempotency, preservation of existing values, flavour list | Runs extracted INSERT statements against SQLite. It does not validate PostgreSQL syntax, constraints, migration order, locking, or production transaction behavior. |
| `tests/test_multi_item_order.py` | 8 | multi-line pending orders, no early stock deduction, availability flags, delivery deduction, shortage rollback, legacy behavior, cancellation behavior | Entire DB contract is a handwritten fake cursor/connection. SQL shape is checked, but constraints, concurrent delivery, row locking, isolation, and real rollback are unproved. |
| `tests/test_roasting.py` | 11 | fixed yield/rounding, row-lock SQL presence, audit pairing, invalid quantities/types/units, auto-destination handling, rollback paths | Uses `MagicMock` DB objects. It checks calls rather than PostgreSQL effects and cannot prove locking, conflict behavior, atomicity, or constraints. |
| `tests/test_zoho_integration.py` | 17 | historical/current invoice behavior, mocked OAuth/API requests, mapping/units, safe errors, view rendering, import idempotency, void rejection, shared-secret check, webhook success | Network, database, active-license state, and selected authentication are patched. Useful unit/contract coverage, but not real Zoho, database idempotency, replay resistance, authorization denial, or failure-boundary proof. |
| `tests/inventory-tabs.cjs` | 1 script | filtering/counts/empty state, keyboard navigation, hover, hidden removal forms, mobile overflow, theme/reduced motion, page errors | Synthetic DOM plus compiled static assets; not a Flask/authenticated page. Currently non-runnable because Playwright is undeclared. |
| `tests/form-buttons.cjs` | 1 script | desktop/mobile/light/dark alignment and 44px touch target | Extracts one template fragment; no full page or submission behavior. Currently non-runnable because Playwright is undeclared. |
| `tests/roasting-ui.cjs` | 1 script | layout, 85% preview/rounding, unit validation, mobile overflow, duplicate-submit disable, page errors | Regex-derived synthetic form, no server request/database behavior. Currently non-runnable because Playwright is undeclared. |

Quality scan found no skipped, focused (`only`), TODO, or intentionally disabled tests and no test method without a meaningful assertion or expected-exception check. The two `pass` statements found are helper-method bodies, not assertion-free tests. The central integrity limitation is dependency substitution: all persistence tests use SQLite/fakes/mocks, and all browser scripts use synthetic fixtures rather than the running application.

## CI inventory

Only `.github/workflows/build-windows-app.yml` exists. On manual dispatch or a `main` push touching `desktop_app/**` or the workflow, Windows CI:

1. checks out the repository;
2. installs Python 3.12;
3. writes `desktop_app/backend_config.py` from `INVENTORY_APP_URL` (or a hard-coded production fallback);
4. installs `desktop_app/requirements-build.txt`;
5. regenerates the icon;
6. builds a one-file GUI executable with PyInstaller;
7. builds the installer with Inno Setup; and
8. uploads `SaikoInventorySetup.exe`, failing if absent.

There is no CI job for Python tests, PostgreSQL/schema integration, TypeScript checking, Vite build, browser tests, lint/format, dependency audit, security checks, Vercel configuration, or deployment smoke tests. The desktop workflow is a build check, not a behavior test, and its hard-coded live URL fallback is not exercised in this baseline.

## Exact pre-fix command evidence

| Command | Exit | Result / interpretation |
|---|---:|---|
| `node --version` | 0 | `v24.19.0` |
| `npm --version` | command unavailable | PowerShell: `npm` is not recognized. README's npm path is unavailable in this environment. |
| `pnpm --version` | 0 | `11.19.0` |
| `python --version` | 0 | `Python 3.12.10` |
| `python -c "import flask, psycopg2, dotenv; ..."` | 1 | Initial environment prerequisite failure: `ModuleNotFoundError: No module named 'flask'`. |
| `python -m pip install --target .baseline-python-deps -r requirements.txt` (sandbox) | 1 | Restricted network produced `No matching distribution found for Flask==3.1.3`; environment failure, not a repository dependency-resolution result. |
| same install with approved network access | 0 | Installed the three pinned packages and Flask transitive dependencies into a disposable project-local directory; no global install. Directory removed after tests. |
| `$env:PYTHONPATH=...; python -m unittest discover -s tests -v` (sandbox) | 1 | 17 discovered, 15 passed, 2 module import errors because the approved dependency directory's ACL was inaccessible inside the sandbox; test-environment artifact, not a code failure. |
| same `unittest discover` command with approved access | 0 | `Ran 40 tests in 0.260s` / `OK`; 40 passed, 0 failed, 0 errors, 0 skipped. No PostgreSQL or live network used. |
| `pnpm run typecheck` | 1 | pnpm wrapper attempted a network/meta fetch and interactive `node_modules` purge, then aborted (`ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`). Tool-wrapper/environment failure. |
| `.\\node_modules\\.bin\\tsc.cmd --noEmit` | 0 | Strict TypeScript check passed with no diagnostics. |
| `pnpm run build -- --outDir .baseline-vite-dist` | 1 | Same pnpm wrapper/install guard failure before the project script executed. |
| `.\\node_modules\\.bin\\vite.cmd build --outDir .baseline-vite-dist` (sandbox) | 1 | `spawn EPERM` while Vite attempted to start esbuild; sandbox failure. |
| same Vite command with approved process spawn | 0 | Vite 7.3.6 transformed 428 modules and emitted `inventory.css` (2.76 kB) and `inventory.js` (495.68 kB); non-fatal Framer Motion `"use client"` warnings. Disposable output removed. |
| `node tests\\inventory-tabs.cjs` | 1 | BLOCKED before assertions: `Cannot find module 'playwright'`. |
| `node tests\\form-buttons.cjs` | 1 | BLOCKED before assertions: `Cannot find module 'playwright'`. |
| `node tests\\roasting-ui.cjs` | 1 | BLOCKED before assertions: `Cannot find module 'playwright'`. |
| Python AST parse over root/API/desktop/scripts/tests | 0 | `AST parse OK: 16 Python files`. Syntax-only check; not import/runtime proof. |
| Desktop dependency/tool preflight | 0 | `PyInstaller=False`, `PIL=False`, `webview=False`, Inno Setup path absent; local desktop CI parity is blocked. |

No formatter or linter was run because none is declared/configured. No dependency installation beyond the disposable Python target was performed. No production, Vercel, licensing service, or Zoho endpoint was contacted.

## Acceptance-criteria coverage and traceability

| Criterion | Baseline scenarios and evidence | Status before fixes | Required follow-up |
|---|---|---|---|
| AC-001 | Application/service/deployment inventory above; 40 Python tests, three browser scripts, package commands, dependencies, and one CI workflow inventoried | PARTIAL PASS | Reconcile parallel local-stack artifacts and final implementation inventory after fixes |
| AC-002 | Exact commands, exit codes, prerequisites, environment-only failures, three browser blockers, and clean check results recorded above | PASS (baseline scope) | Re-run after fixes and retain pre-/post-fix distinction |
| AC-003 | Existing service tests exercise selected validation and rollback-call paths; no real database behavior, concurrency, migration, API-contract, performance, or deployment proof | UNVERIFIED / BLOCKED | Healthy PostgreSQL; schema/migration idempotency; real transaction, locking/concurrency, route contract, pagination/performance, and Vercel-static checks |
| AC-004 | Selected CSRF/admin-view/webhook-secret behavior appears in mocked tests; no comprehensive auth/session/role denial, secrets scan, headers, replay, dependency, or infrastructure security suite | UNVERIFIED | Add admin/staff/anonymous denial matrix, session/disabled-user/CSRF tests, webhook replay/signature/idempotency boundaries, dependency/security and config checks |
| AC-005 | 40 isolated unit tests pass; three synthetic browser scripts exist but are blocked; no real PostgreSQL or full app workflow execution | PARTIAL | Make browser runner reproducible; exercise login, inventory, order/delivery/cancel, roasting, licensing, and Zoho failure boundaries with synthetic data against local services |
| AC-006 | Baseline-only dispatch; no fixes or regression tests authored | NOT IN BASELINE SCOPE | Map each confirmed fix to a non-weakened regression test and rerun affected/full suites |
| AC-007 | Typecheck and build pass; Python unit suite passes, but independent post-fix review and repository-wide verification have not occurred | NOT YET APPLICABLE | Independent review plus final unit/integration/browser/build/desktop verification |
| AC-008 | This document supplies the initial coverage matrix, evidence, gaps, blockers, and UNVERIFIED risks | PARTIAL | Final report must add severity-ranked findings, changes, post-fix evidence, and operational decisions |

## Planned behavior matrix

| Area / actor boundary | Minimum scenario set | Layer | Baseline evidence | Gap |
|---|---|---|---|---|
| Authentication/session | admin and staff login/logout; invalid credentials; throttling; disabled account invalidates open session; safe redirect; secure cookie configuration | PostgreSQL integration + Flask/browser | None comprehensive | BLOCKED pending PostgreSQL; denial paths absent |
| Authorization | anonymous denied all operational pages; staff denied admin accounts/license controls/Zoho admin actions; admin allowed | Flask integration + browser | Zoho admin route patches current user as admin only | No denied-role matrix |
| CSRF/input handling | every state-changing form rejects missing/invalid CSRF; malformed names, quantities, dates, thresholds, notes, phone numbers | Flask integration | One Zoho POST supplies a valid CSRF header | Negative boundaries broadly absent |
| Inventory/catalog | create categories, restock, remove, threshold warnings, history, pagination, invalid/duplicate items | PostgreSQL integration + browser | catalog seed unit tests; synthetic tabs | Real CRUD/schema/history unverified |
| Orders/deliveries | multi-line create with no early deduction; out-of-stock display; atomic delivery once; shortage rollback; cancel pending only; concurrency | PostgreSQL integration + browser | fake-connection unit tests | Atomicity, locking, constraints, race/retry behavior unverified |
| Roasting | validation, fixed yield/rounding, automatic destination conflict/reuse, paired ledger, rollback, concurrent batches | PostgreSQL integration + browser | mock unit tests; browser script blocked | Real transaction and UI submission unverified |
| Zoho | request construction, configuration errors, admin visibility, current/history import, unit mismatch, void, idempotent retry, unauthorized/replayed webhook, upstream failure | unit HTTP contract + PostgreSQL integration | 17 mocked tests pass | Real Zoho prohibited; DB idempotency, unauthorized/replay/failure routes incomplete |
| Licensing | correct integration-key acceptance/rejection, inactive behavior, seat limits, owner propagation, external failure/timeout | unit + service-contract substitute + browser | No dedicated tests | Entire boundary unverified; external production access prohibited |
| React/Jinja/PWA | keyboard/accessibility, focus, responsive/theme/reduced motion, no console errors, no-JS fallback, service worker/offline/install metadata | real app browser | three synthetic scripts blocked | Playwright undeclared; no complete page/auth/PWA run |
| Schema/migrations | clean init, repeat application, upgrade compatibility, constraints/indexes, seed idempotency | PostgreSQL integration | SQLite seed subset only | BLOCKED pending PostgreSQL |
| Desktop | URL configuration, window launch smoke, icon/build, installer artifact and install/uninstall | unit + Windows build/smoke | GitHub build workflow only | Local toolchain absent; no behavior test |
| Deployment | Vercel entrypoint/import, routes, static assets, environment contract, serverless-safe initialization | static + local import/smoke | configuration inspection and AST parse | Runtime/deployment remains UNVERIFIED |

## Not covered in this baseline

- Any check needing PostgreSQL or a healthy local stack: explicitly BLOCKED, not replaced with mocks.
- Live Zoho, production inventory/licensing data, and production Vercel: prohibited by scope and UNVERIFIED.
- Browser behavior: blocked because Playwright is not a declared/installable project dependency in the baseline.
- Desktop executable/installer: blocked by missing project-local build dependencies and Inno Setup; CI was inventoried but not invoked.
- Formatting, linting, coverage thresholds, dependency audit, and security scanner: no repository command/configuration exists.
- Performance/load and concurrency: no harness or healthy database was available.
- Post-fix regression and independent-review evidence: later audit phases, not baseline evidence.

## Post-fix mobile UI verification (2026-09-23)

- `node --test --test-isolation=none tests/mobile-ui-structure.cjs`: PASS — 4/4 checks cover login label association, a 44px login submit target, a visible/accessibly named mobile-menu SVG control, and the admin-only Users role guard.
- `node --check` for the focused structure test, production audit script, post-fix demo audit script, and demo JavaScript: PASS.
- `.\node_modules\.bin\tsc.cmd --noEmit`: PASS with no diagnostics.
- `.\node_modules\.bin\vite.cmd build --outDir .tmp-vite-mobile-ui-verifier`: BLOCKED by sandbox `spawn EPERM` while Vite/esbuild loaded `vite.config.ts`; the exact disposable directory was not created, and the check was not looped or escalated.
- `git diff --check -- templates/login.html templates/base.html static/style.css tests/mobile-ui-structure.cjs`: PASS; Git emitted only LF-to-CRLF working-copy notices.
- Static integrity scan: PASS — no skip/only/TODO/FIXME weakening in the focused test; the demo prevents form submission and contains no network API or form action/method; the admin demo includes Users while the staff demo omits it. `test-results/mobile-ui/post-fix/login-375x812.png` exists, but the prior post-fix browser audit hung after that single screenshot and the full browser set is incomplete.
- **UNVERIFIED:** post-deployment source parity, authenticated mobile-menu interaction, real admin/staff role behavior, responsive/browser rendering across the intended viewport set, form/network behavior outside the synthetic demo, service-worker/PWA behavior, production Vercel/Neon behavior, PostgreSQL-backed workflows, live Zoho, and deployment. No server, browser, Docker, production mutation, or deployment action was run in this verification.
