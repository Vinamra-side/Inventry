# Repository audit and hardening execution plan

## 1. Task summary

Audit, exercise, repair, and harden the established Saiko Inventory system without changing intended product behavior or overwriting unrelated work. The audit covers the Flask/PostgreSQL web application, Jinja and React/Vite UI, PostgreSQL schema and migration behavior, Zoho Billing integration, private licensing API, Windows PyWebView package, Vercel configuration, and GitHub Actions workflow. The acceptance criteria are AC-001 through AC-008 in `docs/progress.md`; there is no PRD or use-case catalogue for this repository audit.

The work is behavior-first. Each slice starts with an executable failure or boundary test, permits only fixes confirmed by evidence, and ends with local end-to-end proof plus independent review. Production, real customer data, live Zoho mutation, and active testing of the deployed Vercel application or NeonDB runtime remain out of scope. Results that cannot be established locally are reported as `UNVERIFIED`, not inferred.

### Success conditions

- Every file, runtime, service, dependency, entrypoint, route group, test, build command, deployment path, and CI check is represented in the final inventory and coverage matrix (AC-001).
- Baseline and final commands record versions, exit status, relevant output, prerequisites, blockers, and whether a failure pre-dated the audit (AC-002, AC-008).
- Every confirmed correctness or security defect has a regression test that fails before the fix and passes after it, unless the limitation is explicitly justified (AC-003 through AC-006).
- Significant changes receive an independent code/security review and the complete repository is reverified from a stable snapshot (AC-007).
- The final report distinguishes verified behavior, static-only evidence, external behavior that is `UNVERIFIED`, accepted operational risk, and required operator decisions (AC-008).

## 2. Evidence-based system inventory and affected areas

| Surface | Repository evidence | Audit and possible-fix scope |
|---|---|---|
| Flask application | `app.py` application factory and request hooks; browser, admin, Zoho, and operational routes at `app.py:56-102,108-550`; Vercel WSGI export at `api/index.py:1-4` | `app.py`, `api/index.py`, `config.py`, templates and request-level tests |
| Authentication and authorization | Login throttling, account state, sessions, role decorators, and seat checks at `auth.py:97-263`; login/admin routes at `app.py:267-299,526-550` | `auth.py`, relevant `app.py` routes, `templates/login.html`, `templates/admin_accounts.html`, auth integration tests |
| Inventory, orders, delivery, roasting, history, insights | Service operations at `services.py:266-912`; row locking in stock/order transitions at `services.py:334,370,433,454,601,614,697,711`; UI routes at `app.py:301-524` | `services.py`, associated routes/templates/static files, unit and PostgreSQL integration tests |
| PostgreSQL schema, migrations, and Neon deployment target | Catalog, orders, line items, stock ledger, licensing, users, attempts, indexes, and constraints at `schema.sql:6-196`; runtime schema mutation also appears at `services.py:52-103,306-308` and `zoho_service.py:223-240`; the user confirms production PostgreSQL is NeonDB | `schema.sql`, `db.py`, any confirmed migration repair, fresh/upgrade/idempotency and concurrency tests against local PostgreSQL only; static Neon connection/TLS/pooling/serverless/migration review with no Neon access |
| Zoho Billing | Secret verification at `zoho_service.py:91-94`; HTTP/OAuth/list/detail/import logic at `zoho_service.py:39-342`; webhook and admin import routes at `app.py:132-265`; mocked suite at `tests/test_zoho_integration.py:101-434` | `zoho_service.py`, Zoho routes/templates/setup helper, deterministic HTTP contract tests only |
| Licensing | Constant-time integration-key check and read/write API at `licensing_integration.py:13-127`; license/seat data in schema and auth/services | `licensing_integration.py`, `auth.py`, `services.py`, licensing integration tests; no sibling licensing-service repository is in scope |
| Jinja/PWA/static UI | `templates/`, `static/style.css`, `static/pwa.js`, `static/service-worker.js`, manifest and icons | Rendered browser workflows, accessibility, responsive states, security headers, cache/offline behavior; minimal source fixes only |
| React island | React 19/TypeScript 5.9/Vite 7/Tailwind 4 dependencies and scripts at `package.json:5-23`; library build to committed `static/inventory-ui` at `vite.config.ts:5-18` | `frontend/`, `components/`, `lib/`, source and committed build output, Node tests |
| Windows desktop package | PyWebView entrypoint at `desktop_app/app.py:1-13`; pinned build dependencies in `desktop_app/requirements-build.txt`; installer recipe | `desktop_app/`, local import/build smoke checks; no active navigation to the production URL |
| Vercel and CI | Vercel Singapore Python route at `vercel.json:1-9`; Windows build workflow at `.github/workflows/build-windows-app.yml:1-38` | Static config validation throughout; CI changes only after the local-proof gate; deployed behavior remains `UNVERIFIED` |
| Existing tests and fixtures | Python suites under `tests/test_*.py`, Node suites under `tests/*.cjs`, SQL catalog fixture under `data/` | Preserve useful tests, identify false/mocked coverage, add integration/browser/security regressions in `tests/` |

### Documentation context

- `docs/progress.md` is authoritative for AC-001..AC-008, infrastructure status, constraints, OQ-001 through OQ-003, and the coverage matrix.
- `docs/test-plan.md` records the pre-fix command baseline, path-level surface inventory, passing 40-test mocked/unit baseline, undeclared Playwright blocker, and PostgreSQL/desktop/external verification gaps; it contributes evidence but does not close criteria by itself.
- `README.md` defines the supported Browser → Vercel Python Function → Flask → external PostgreSQL topology.
- `AUTH_SETUP.md`, `V3_CHANGES.md`, and `V4_LICENSE_SEATS.md` define authentication, roles, bootstrap, and shared seat-limit intent.
- `FRONTEND.md` defines the React island boundary and committed-build-output requirement.
- `ROASTING.md` defines atomic 85% green-to-roasted conversion behavior and migration prerequisites.
- `SECURITY_AND_PERFORMANCE_CHANGES.md` records intended controls that must be verified rather than assumed.
- `VERCEL_DEPLOYMENT.md` defines deployment prerequisites, operator checks, and serverless constraints.
- `ZOHO_INTEGRATION.md` defines read/import/webhook behavior, catalog matching, idempotency, and prohibited secret handling.
- `FEATURE_AUDIT.md` is historical and partly stale (for example, it says full authentication and Zoho OAuth are absent while current code/docs contain them); it is not normative for current behavior and is included in docs-code-sync review.

## 3. Acceptance and subsystem coverage map

| Criterion | Closure owner and primary coverage | Required evidence contribution |
|---|---|---|
| AC-001 | Coordinator closes at final review; repository-manifest task and Slices 1-6 contribute | Reconciled path-by-path repository/runtime inventory including hidden CI, entrypoints, dependencies, tests, generated files, and deployment paths |
| AC-002 | Tester closes after final rerun; baseline task and Slice 1 contribute | Baseline/final ledger with exact commands, exit codes, prerequisites, pre-existing failures, and stable snapshots |
| AC-003 | Coordinator closes from Slices 1-6 and final reviewer evidence | Findings/tests across correctness, errors, locking, transactions, migrations, APIs, performance, packaging, and deployment configuration; blocked runtime portions stay `UNVERIFIED` |
| AC-004 | Security reviewer closes the locally auditable portion; Slices 1, 2, 4, 5, 6 contribute | Auth/authz/session, CSRF/XSS/injection/SSRF/secrets/headers/rate-limit/dependency/webhook/replay/idempotency evidence |
| AC-005 | Tester closes the locally executable portion after Slices 1-5 | Synthetic PostgreSQL workflows, permission/failure cases, deterministic Zoho substitute, and real-browser tests; no mock substitutes for blocked runtime behavior |
| AC-006 | Coordinator closes after each accepted fix is linked to a regression test; Slices 1-6 contribute | Narrow fixes, before/after evidence, and unrelated-change preservation |
| AC-007 | Coordinator closes after per-slice reviews and final cross-cutting review | Independent sweeps, carried RV dispositions, and full final test/build/security rerun |
| AC-008 | Coordinator closes in the final evidence report | Completed matrix, severity-ranked findings, changes, commands/results, explicit `UNVERIFIED` limitations, blockers, owners, and user decisions |

Infrastructure enablement owns no AC-ID. Its health, schema, seed/reset, and isolation outputs are prerequisite evidence consumed by AC-002/003/005/007 owners; static implementation alone cannot close any of those criteria.

No UC-IDs exist because the authoritative brief intentionally skipped a product use-case catalogue. Each slice instead names the runtime actor(s) used for its end-to-end demonstration.

## 4. Pre-slice infrastructure enablement (no AC ownership)

**Owner:** `devops-engineer`; **complexity:** medium; **precondition for every slice:** complete before shared scaffolding or Slice 1.

Stand up PostgreSQL 16 in a local container with a pinned image, persistent-but-resettable test volume, `pg_isready` health check, isolated synthetic credentials/database, `.env.example` discovery, schema apply, seed, reset, and documented start/stop/test commands. Reapplying `schema.sql` to both a clean database and an upgrade-shaped fixture must be non-destructive and fail fast with `psql -v ON_ERROR_STOP=1`. A disposable deterministic HTTP stub may be added for Zoho only if the current mocked tests cannot exercise the actual HTTP boundary; it must expose a health endpoint and never forward network traffic.

**Writable scope:** local development infrastructure files `docker-compose.yml`, `.dockerignore`, `.env.example`, and `scripts/local-stack/`; infrastructure-specific tests under `tests/integration/`. Do not edit application behavior in this task.

**Gate evidence:** container/image versions; healthy service output; resolved `DATABASE_URL`; clean apply; repeat apply; seed/reset proof; no non-local host in the test connection; exact teardown result. If Docker/Podman is unavailable, stop the slice pipeline and use Contingency C-01 rather than substituting mocks for PostgreSQL acceptance.

### Read-only repository manifest task

**Owner:** `tester` as repository auditor; **complexity:** medium; **mode:** read-only except evidence updates to `docs/test-plan.md`/`docs/progress.md`; may run while OQ-003 is blocked.

Produce an independently assignable, path-by-path manifest with one row per file (not merely per subsystem) covering root files, `.github/`, `api/`, `components/`, `data/`, `desktop_app/`, `docs/`, `frontend/`, `lib/`, `scripts/`, `static/`, `templates/`, and `tests/`. For each path record tracked/untracked/generated/ignored status, purpose or entrypoint relationship, owning subsystem, dependency/runtime, existing check, and audit disposition (`in-scope`, `generated`, `tool/cache`, or justified exclusion). Include hidden files, lockfiles, images/binaries by metadata/hash, and CI/deployment files without loading secrets. Capture a SHA-256 inventory plus index/worktree status as the audit-start snapshot.

At final verification, the same owner regenerates the manifest and reconciles every added, deleted, or changed path against the starting snapshot and slice evidence. Each delta must be classified as pre-existing user work, approved audit change with owner/finding/test, generated artifact with source, or unexpected/unrelated. Unexpected changes fail AC-001/006/007 until investigated; nothing is silently reverted.

### Browser-test enablement prerequisite

**Owner:** `frontend-dev` for `package.json` and `pnpm-lock.yaml`; `tester` independently verifies; **complexity:** low to medium; **dependency:** local-stack runtime proof first. This is shared scaffolding, not a functional slice, and may not be dispatched while OQ-003 remains blocked.

Declare a compatible Playwright test dependency in the manifest and lockfile, add an explicit browser-test script if needed, install the pinned browser binary using the project package manager, and document the exact reproducible install/run command. If dependency or browser download requires network/process approval, request that approval; if denied or unavailable, record the command/error as a blocker and do not replace real-browser evidence with synthetic DOM success. Smoke proof is a launched Playwright browser loading a loopback-only local page, making one assertion, and exiting cleanly with no production/external request. The prerequisite gates every browser assertion in Slice 1 and Slice 5; after a blocker is cleared, rejoin at this prerequisite, rerun smoke proof, then start/restart Slice 5 browser acceptance from its first scenario.

## 5. Vertical audit/fix slices

### Slice 1 — Tracer bullet: authenticated stock lifecycle on real PostgreSQL

**Goal and demo:** As an administrator, sign in to a clean local instance, create one synthetic catalog item, add stock, create a multi-item pending order, mark it delivered, and observe the exactly-once quantity and stock-ledger result in the rendered UI. As an unauthenticated caller, confirm the same operational pages and mutations are denied. This is the thinnest path that touches configuration, schema, connection lifecycle, auth/session/CSRF, service transaction, Flask route, Jinja response, and browser behavior.

**Criteria:** AC-001, AC-002, AC-003, AC-004, AC-005, AC-006. **Complexity:** high. **Actors:** administrator and unauthenticated caller. **OQ gate:** OQ-003 — no acceptance-test or application-fix writer may be dispatched until Docker/Compose runtime proof satisfies the infrastructure gate; read-only inspection may continue. **Local services:** PostgreSQL 16; health and isolation are asserted before tests. Playwright enablement must also be proven before the rendered-browser part of this slice.

**Tester acceptance task (first):** inventory all baseline commands and existing checks; freeze `git status --short`, tool versions, environment prerequisites, and pre-existing results; add a failing PostgreSQL-backed lifecycle test plus browser smoke/denial case. Record results for `python -m unittest discover -s tests -v`, Node test runner for `tests/*.cjs`, `pnpm typecheck`, `pnpm build`, Python compilation/import, schema clean/repeat apply, and only installed security scanners (missing tools are prerequisites, never silent passes). Assertions must cover status/redirect, CSRF, database rows, stock delta, ledger rows, and repeated delivery.

**Implementation scope after failure is reproduced:** `db.py`, `config.py`, the smallest affected portions of `app.py`, `auth.py`, `services.py`, `schema.sql`, related templates, and tracer integration/browser tests. Do not rewrite working modules. `backend-dev` owns Python/SQL; `frontend-dev` owns template/static changes if required; `tester` owns tests before handoff and does not edit the same files concurrently.

**Dependencies:** infrastructure enablement and baseline inventory. **Slice gate:** acceptance tests green against the local container; independent code review `DONE`; security review of the touched request/data path `DONE`; demo evidence captured.

### Slice 2 — Account, session, role, seat, and licensing-control boundaries

**Goal and demo:** As an administrator, create/disable staff accounts within the shared seat cap and manage licensed subscribers; as a staff user, exercise allowed operational pages but fail every admin-only action; as a disabled or unauthenticated user, fail on the next request; as the licensing owner application, read/write license state only with the private integration key. Login throttling, logout, redirect safety, session-cookie flags, CSRF, bootstrap behavior, and license-inactive behavior must remain coherent.

**Criteria:** AC-003, AC-004, AC-005, AC-006. **Complexity:** high. **Actors:** administrator, staff user, disabled user, unauthenticated caller, licensing owner application. **OQ gate:** OQ-003 — implementation and database-backed tests remain blocked until local-stack runtime proof; read-only auth/security analysis may continue. **Local services:** PostgreSQL 16.

**Tester acceptance task (first):** add permission matrix and negative tests for every admin route and licensing endpoint, session invalidation, safe `next`, rate-limit boundary/reset, CSRF presence/rejection, missing/malformed integration key, seat changes under concurrent account/subscriber activation, bootstrap disabled by default, and sensitive error/response leakage. Use synthetic users and explicitly reset them.

**Implementation scope:** `auth.py`, `licensing_integration.py`, affected auth/licensing routes in `app.py`, `config.py`, `schema.sql`, `templates/login.html`, `templates/admin_accounts.html`, `templates/users.html`, `templates/license_inactive.html`, and corresponding tests. `backend-dev` owns Python/SQL; `frontend-dev` may own only the listed templates in a non-overlapping follow-on; `security-reviewer` is read-only.

**Dependencies:** Slice 1. **Gate:** full permission matrix and concurrency tests green; independent security/code review `DONE`; admin/staff/denial demo captured.

### Slice 3 — Transactional inventory, order, delivery, cancellation, and roasting lifecycle

**Goal and demo:** As staff, create and remove catalog entries safely, add stock, convert green beans to roasted stock, create single/multi-line orders even when stock is short, deliver only when all stock is available, reject duplicate delivery, cancel only eligible orders with correct legacy/new stock semantics, and inspect consistent history/insights. Concurrent requests must not oversell, double-deduct, double-restore, deadlock due to inconsistent lock order, or leave partial rows.

**Criteria:** AC-003, AC-005, AC-006. **Complexity:** high. **Actors:** staff user and administrator. **OQ gate:** OQ-003 — implementation and transaction/concurrency test writing remain blocked until local-stack runtime proof; read-only SQL/service analysis may continue. **Local services:** PostgreSQL 16.

**Tester acceptance task (first):** promote fake-connection unit cases to real PostgreSQL integration tests for commit/rollback, `FOR UPDATE` contention, concurrent delivery/cancellation/roasting, failure injection, quantity/date/text/unit boundaries, deletion with references, pagination, query counts for representative pages, and schema clean/upgrade/repeat application. Retain unit tests for pure validation but do not use them as transaction proof.

**Implementation scope:** `services.py`, inventory/order/delivery/roasting/history routes in `app.py`, `schema.sql`, `data/import_confirmed_catalog.sql`, affected operational templates/static code, and domain integration tests. `backend-dev` owns Python/SQL; `frontend-dev` owns affected templates/static only after the backend contract stabilizes; tester writes tests first and independently reruns them.

**Dependencies:** Slice 2. **Gate:** transactional invariants proven from database state, all legacy/new lifecycle tests green, performance evidence recorded, independent code review `DONE`, lifecycle demo captured.

### Slice 4 — Zoho invoice read/import/webhook contract without live third-party testing

**Goal and demo:** As an administrator, browse deterministic invoice list/detail data, import eligible historical invoices without stock changes, and import a current invoice as one pending multi-item order. As a webhook caller, authenticate, cause exactly one order for a valid invoice, and receive the existing result on retry; malformed, void, unmatched, unit-mismatched, replayed, and upstream-failure cases must not produce partial or duplicate state.

**Criteria:** AC-003, AC-004, AC-005, AC-006. **Complexity:** high. **Actors:** administrator and Zoho Billing webhook caller. **OQ gates:** OQ-001 — real Zoho behavior remains `UNVERIFIED` because active third-party testing is prohibited; OQ-003 — implementation and PostgreSQL idempotency/race tests remain blocked until local-stack runtime proof, while read-only integration review may continue. **Local services:** PostgreSQL 16 plus deterministic in-process/fake HTTP contract substitute if required; zero requests to Zoho domains.

**Tester acceptance task (first):** exercise the real HTTP client seam with recorded synthetic responses for token refresh, pagination, status/error bodies, timeouts, oversized/malformed payloads, organization/header contract, safe error redaction, invoice state/line mapping, competing duplicate webhooks, historical/current import races, idempotency key uniqueness, rollback, and retry. Assert request destinations against an allowlist so the suite cannot contact production/Zoho.

**Implementation scope:** `zoho_service.py`, `scripts/zoho_oauth_setup.py`, Zoho routes/templates in `app.py` and `templates/zoho_*`, necessary schema/index changes, and Zoho contract/integration tests. `backend-dev` owns Python/SQL; `frontend-dev` owns Zoho templates only after response contracts stabilize; `security-reviewer` independently checks webhook authentication, replay/idempotency, SSRF, secret exposure, and failure behavior.

**Dependencies:** Slice 3 because it relies on order and schema invariants. **Gate:** deterministic contract suite and database race tests green; independent security/code review `DONE`; mocked local demo captured; external limitation recorded as `UNVERIFIED`.

### Slice 5 — Rendered web, React island, accessibility, PWA, and browser security behavior

**Goal and demo:** As admin and staff at desktop and narrow viewports, complete the permitted catalog/order/delivery/admin/Zoho journeys using keyboard and pointer input; inventory tabs filter without mutating data; forms expose usable validation and CSRF; theme/navigation/PWA assets behave without console errors; reduced motion, focus, labels, contrast, responsive overflow, no-JavaScript fallback, and escaped untrusted values are verified.

**Criteria:** AC-003, AC-004, AC-005, AC-006. **Complexity:** high. **Actors:** administrator, staff user, unauthenticated caller. **OQ gate:** OQ-003 — application/browser test writing and fixes remain blocked until the PostgreSQL local-stack proof and Browser-test enablement prerequisite both pass; read-only UI/accessibility inspection may continue. **Local services:** PostgreSQL 16 and the local Flask server only.

**Tester acceptance task (first):** browser-test critical workflows and denial states with isolated synthetic data; capture screenshots, console/network errors, accessibility findings, focus order, viewport variants, CSP/header/cookie observations, service-worker scope/cache behavior, XSS probes rendered as inert text, and no-JavaScript inventory fallback. Run React typecheck/build and Node behavior tests; verify generated `static/inventory-ui` exactly corresponds to source without hiding unrelated diffs.

**Implementation scope:** `templates/`, `static/`, `frontend/`, `components/`, `lib/`, `vite.config.ts`, `tsconfig.json`, `components.json`, `package.json`/lockfile only for a confirmed dependency fix, generated `static/inventory-ui`, and browser/Node tests. `frontend-dev` owns UI sources/assets; `tester` owns browser tests/evidence first; backend files are out of scope unless a demonstrated API defect is separately handed back to the owning prior slice.

**Dependencies:** Slice 4 so all user-facing contracts are stable. **Gate:** browser plan green across required roles/viewports, build/typecheck/Node tests green, generated asset review clean, accessibility/security findings disposed, independent UI/code review `DONE`, demo captured.

### Slice 6 — Windows desktop wrapper and deployment-readiness path

**Goal and demo:** As a deployment operator, build or dry-run the Windows wrapper against an explicitly configured safe local/non-production URL, inspect installer/artifact behavior, and validate that the Vercel entrypoint/config and operational documentation agree with the code. The wrapper must not silently target production during tests, expose secrets, or claim capabilities absent from the repository.

**Criteria:** AC-001, AC-003, AC-004, AC-006. **Complexity:** medium. **Actors:** deployment operator and desktop user. **OQ gates:** OQ-002 — production Vercel and Neon runtime behavior remain `UNVERIFIED`; at the CI/readiness conclusion the coordinator must present the cited static evidence package and obtain explicit user acceptance without converting either external behavior to a pass; OQ-003 — any local Flask/PostgreSQL or browser-backed wrapper test and all implementation remain blocked until local-stack proof, while read-only packaging/deployment inspection may continue. **Local services:** local Flask/PostgreSQL stack for wrapper smoke where GUI automation is safe; no production URL navigation or Neon connection.

**Tester acceptance task (first):** validate desktop imports/config injection, URL scheme/host policy, icon/assets, PyInstaller analysis/build where Windows toolchain exists, installer recipe, artifact contents, pinned dependency compatibility, Vercel WSGI import/routing, environment fail-closed behavior, serverless filesystem assumptions, and dependency advisories. Statically review the confirmed NeonDB deployment target for connection-string handling, required TLS mode/certificate assumptions, pooled versus direct connection guidance, serverless connection pressure/lifecycle, timeout behavior, migration execution path, and compatibility with request-scoped connections. Do not connect to Neon or use production credentials/data. Record toolchain or provider-runtime gaps explicitly instead of declaring a pass.

**Implementation scope:** `desktop_app/`, `api/index.py`, `vercel.json`, deployment-related environment/docs, and packaging/config tests. CI workflow edits are excluded until the separate post-slice CI task. `implementor` owns desktop/config changes; `devops-engineer` owns deployment config after local behavior is established; reviewers are read-only.

**Dependencies:** Slice 5. **Gate:** available local desktop/build/config checks green, Neon assumptions documented from repository/official static evidence without access, no production navigation or connection, independent code/security review `DONE`, operator demo/evidence captured, OQ-002 limitation recorded.

## 6. Execution order, ownership, and gates

1. Capture the stable repository snapshot and run the independently owned path-by-path manifest task; preserve unrelated changes.
2. Run infrastructure enablement. While OQ-003 is blocked, only **read-only audit mode** may proceed: manifesting, source/config/docs inspection, threat modeling, static dependency review, and findings may be recorded. No application source, test, package manifest/lockfile, generated asset, schema, or deployment fix writer may be dispatched.
3. After PostgreSQL health, clean/repeat schema, seed/reset, isolation, and teardown proof satisfy the local-stack gate, enter **implementation mode**. First complete the Browser-test enablement prerequisite, then execute Slices 1 through 6 sequentially. Within a slice: tester writes/reproduces the acceptance failure → implementation owner makes the smallest fix → tester independently reruns focused and cumulative suites → code/security/UI reviewer performs the complete applicable sweep → owner disposes every blocking RV-ID → tester reruns after rework → demo checkpoint.
4. Slice N+1 starts only after Slice N acceptance tests pass end-to-end, independent review returns `DONE`, every `fix-in-slice` finding is fixed or explicitly reclassified, and the user has been shown evidence of the increment. Any deviation is a user decision and creates a named debt-closure slice in `docs/progress.md`.
5. Run the CI/CD task only after Slice 6 and the local-proof gate below.
6. Run final cross-cutting repository review, path-by-path snapshot reconciliation, and verification on a stable snapshot. No writer runs concurrently with this review.

### Scope ownership rules

- Tests precede implementation but test and implementation owners do not write the same file concurrently. Ownership transfers explicitly at each handoff.
- Backend files that recur across slices (`app.py`, `services.py`, `schema.sql`) are sequentially owned; earlier slice findings are closed before later edits.
- Frontend and backend work may overlap only when their writable file lists are disjoint and the API contract is frozen.
- Reviewers are read-only. Before and after each review, compare inventory, hashes, and git index/worktree state; an unexpected review write fails the gate.
- `docs/progress.md` remains the coordinator's evidence/finding ledger. Specialists do not create competing status documents.

### Post-slice CI/CD task

**Owner:** `devops-engineer` only. **Complexity:** low to medium, conditional on confirmed findings. **Precondition — local-proof gate:** the local stack is healthy and resettable; every locally verifiable portion of AC-001..AC-008 has fresh evidence against the running stack; the full unit, PostgreSQL integration, Playwright browser/e2e, typecheck/build, packaging, and applicable security/dependency suite is green; all blocking review findings are resolved; and the final local demo is accepted by the user. External portions are never treated as green-by-exception: OQ-001 (real Zoho) and OQ-002 (production Vercel/Neon runtime) remain `UNVERIFIED`. The user is the acceptance authority for those residual limitations; acceptable evidence is an explicit user decision recorded by the coordinator in `docs/progress.md` and cited in the final report. Without that recorded decision, report the limitation/blocker and do not claim overall readiness.

Only then may `.github/workflows/build-windows-app.yml` or additional CI configuration be changed. CI must encode only checks already proven green locally, use least permissions, pin/action-review dependencies appropriately, protect secrets, avoid production/Neon/Zoho access, and produce reproducible artifacts. CI closure means the locally executable checks are green and the user has explicitly accepted the named external limitations; it never means real Zoho, Neon, or Vercel behavior passed.

### Final cross-cutting review and closure

**Complexity:** high. An independent `code-reviewer` performs one exhaustive sweep across all changed and security-critical code, applying requirement, correctness, security, data, error/observability, conventions/accessibility, framework-version, test-integrity, docs-code-sync, infrastructure-contract, and dead-code dimensions. A tester then runs the full clean-stack matrix from reset through browser/build/packaging checks and performs the path-by-path final snapshot reconciliation. The coordinator completes AC-008 with severity-ranked findings and exact evidence. Any live Zoho, production Vercel/Neon, sibling licensing service, or unavailable GUI/toolchain behavior stays `UNVERIFIED` with a named owner and decision. Only the user may accept OQ-001/OQ-002 residual limitations; the coordinator records and cites that decision, never converts it to a passing external check.

## 7. Baseline and final verification matrix

Exact executable spelling may be adjusted to discovered host paths, but the recorded ledger must show the final command actually run, versions, exit code, and material output.

| Area | Baseline/final proof |
|---|---|
| Repository | Independently owned one-row-per-path manifest; `git status --short`, tracked/untracked/ignored/generated inventory including `.github`, SHA-256 snapshot, last commit; final delta reconciliation with owner/finding/test/source for every change |
| Python | interpreter and pip versions; clean isolated dependency install; `pip check`; compilation/import; `python -m unittest discover -s tests -v` plus new PostgreSQL integration suite |
| PostgreSQL | container/version/health; schema apply to clean DB; repeat apply; representative upgrade fixture; constraints/indexes; transaction/concurrency tests; reset proof |
| Node/UI | Node and pnpm versions; frozen-lockfile install or verified existing install; Node tests; `pnpm typecheck`; `pnpm build`; generated-asset diff |
| Browser | local Flask server only; role/denial workflows; accessibility/responsive/console/network/security-header evidence; screenshots for material defects/fixes |
| Security/dependencies | Python and pnpm advisory scans using installed/approved tools; secret scan of tracked content/history where available; manual auth/session/input/webhook/SSRF/headers review; findings are not waived because a scanner is unavailable |
| Desktop | dependency/import checks; safe URL injection; PyInstaller/installer build or explicit toolchain blocker; artifact inspection; no production navigation |
| Deployment/CI | Vercel config/WSGI static validation; Neon connection/TLS/pooling/serverless/migration assumptions reviewed statically; workflow lint/static review; CI run only if locally reproduced and safely available; no Neon access and production behavior `UNVERIFIED` |

## 8. Decomposition alternatives and decision

### Alternative A — layer-first audit

Audit all Python/SQL, then all UI, then integrations, then deployment; implement accumulated fixes afterward. This maximizes reviewer specialization but delays runnable evidence, encourages large cross-layer change sets, and makes it difficult to attribute regressions or demonstrate any complete actor journey before the end.

### Alternative B — risk-ranked vertical journeys (selected)

Start with a complete authenticated stock tracer on real PostgreSQL, then advance through protected identity/licensing, transactional operations, Zoho ingestion, rendered UI/PWA, and desktop/deployment readiness. Each slice owns tests, the smallest confirmed fixes, independent review, and a demo. This surfaces stack and schema failures in Slice 1, keeps security denial cases beside the capability they protect, bounds rework, and maps directly to the runtime actors and gaps in `docs/progress.md:27-61`.

### Trade-off

Several central files are touched sequentially across slices, so Alternative B may repeat focused review of `app.py`, `services.py`, and `schema.sql`. That cost is accepted because each edit has a smaller causal scope and cumulative tests prevent later slices from invalidating earlier evidence. Parallelism is reserved for disjoint inventory/testing or UI/backend files after contracts stabilize.

## 9. Dependency and uncertainty register

| ID | Dependency or uncertainty | Owner | Current evidence | Impact | Confidence | Resolution trigger |
|---|---|---|---|---|---|---|
| D-01 | Local PostgreSQL/container runtime / OQ-003 | devops-engineer | Harness implemented but Docker absent; `docs/progress.md` local-stack proof and OQ-003 | high | high | Before any application/test/package writer or Slice 1 |
| D-02 | Schema supports clean and incremental apply without unsafe runtime DDL | backend-dev | DDL exists in both `schema.sql` and request-path modules | high | high | Slice 1/3 schema tests |
| D-03 | Real transaction/concurrency semantics are not proven by fake connections | tester | Existing order/roasting tests include fake connection classes | high | high | Slice 1 then Slice 3 |
| D-04 | Zoho live contract and credentials unavailable by policy | coordinator | `docs/progress.md` §Infrastructure inventory and §Open questions (OQ-001) | high | high | Slice 4 and final readiness |
| D-05 | Production Vercel and Neon runtime behavior cannot be exercised | coordinator/devops-engineer | `docs/progress.md` §Infrastructure inventory and §Open questions (OQ-002) | high | high | Slice 6 CI/readiness conclusion and explicit user acceptance |
| D-06 | Sibling licensing backend is referenced but absent | coordinator | Root deployment/auth docs describe a separate service | medium | high | Slice 2 scope check; report boundary |
| D-07 | Windows PyInstaller/Inno Setup toolchain availability | implementor/tester | Workflow specifies Windows/Python 3.12 and Inno Setup; host capability not yet recorded | medium | medium | Slice 6 baseline |
| D-08 | Historical docs disagree with current implementation | coordinator/reviewer | `FEATURE_AUDIT.md` says auth/Zoho absent; current code contains both | medium | high | Final docs-code-sync review |
| D-09 | Security/advisory scanner availability and network access | tester/security-reviewer | No scanner config is declared in repository | medium | unknown | Baseline; request approval or record blocker |
| D-10 | Existing committed frontend artifacts may not match source | frontend-dev/tester | Vite emits directly to `static/inventory-ui` and docs require committing output | medium | medium | Slice 5 clean rebuild/diff |
| D-11 | Playwright is undeclared and browser binaries are absent | frontend-dev/tester | `docs/test-plan.md` browser baseline and TD-001 | high | high | Browser-test enablement before Slice 1/Slice 5 |
| D-12 | Production database is NeonDB, but active access is prohibited | devops-engineer/security-reviewer | User-confirmed provider; `docs/progress.md` §Infrastructure inventory and §Open questions (OQ-002); repository documents recommend pooled external PostgreSQL | high | high | Slice 6 static evidence package and OQ-002 user acceptance at CI/readiness conclusion |

## 10. Bounded contingency branches

### C-01 — Container engine unavailable

**Trigger:** no approved Docker/Podman runtime can start PostgreSQL 16 or expose a healthy isolated database. **Fallback:** record OQ-003 and continue only read-only inventory/static review plus already-existing pure unit tests; do not author application tests/fixes, change package manifests, implement transaction/schema fixes from mocks, or close AC-003/005/007. **Verification:** demonstrate the missing runtime command/error and that neither Neon nor any other non-local `DATABASE_URL` was used. **Rejoin:** restart at infrastructure enablement when a container engine is available, prove the full gate, run Browser-test enablement, then start Slice 1 from the beginning.

### C-02 — Worst plausible migration outcome

**Trigger:** applying `schema.sql` to an upgrade-shaped database fails, blocks, loses data, or conflicts with request-time DDL. **Fallback:** take an isolated dump, reduce to a reproducible synthetic fixture, design an explicit forward-only migration with preflight/rollback instructions, and prohibit `INIT_SCHEMA`/request-time migration as a substitute until reviewed. **Verification:** row-count/content checks plus clean, upgrade, failure-injection, and second-apply runs. **Rejoin:** Slice 1 if foundational; otherwise Slice 3 before transactional closure.

### C-03 — Zoho substitute cannot faithfully model a required contract

**Trigger:** official/repository evidence is insufficient to determine a field, header, state, retry, or pagination semantic without contacting Zoho. **Fallback:** test fail-closed behavior around the ambiguity, avoid speculative production changes, and mark that item `UNVERIFIED` under OQ-001 with an operator-owned verification script/checklist. **Verification:** deterministic tests prove no partial local state or secret disclosure for the unknown case. **Rejoin:** Slice 4 with the external item intentionally open; it cannot be used to claim real-Zoho readiness.

### C-04 — Desktop or production runtime cannot be reproduced

**Trigger:** required Windows packaging tools are unavailable, or behavior depends on production Vercel or Neon runtime. **Fallback:** perform import/config/artifact and Neon-assumption static checks plus local WSGI smoke only, with no production navigation, deployment, or Neon connection. **Verification:** exact missing tool/runtime plus the cited static evidence package. **Rejoin:** at the CI/readiness conclusion under OQ-002; both external behaviors remain `UNVERIFIED`, and only explicit user acceptance recorded by the coordinator can accept the residual limitation.

## 11. Decisions and residual risks

- **Decision:** use the authoritative audit brief and `docs/progress.md` instead of creating a PRD, architecture, or use-case document. This is an audit of an established system, and `docs/progress.md:16-29` already owns acceptance and actor scope.
- **Decision:** preserve behavior and make no opportunistic rewrites. Every application change requires a reproducible defect or concrete hardening gap and before/after evidence.
- **Decision:** treat PostgreSQL as mandatory local infrastructure, not a mocked optional dependency, because row locks, constraints, transactions, and migrations are central to AC-003/005/007.
- **Decision:** NeonDB is the deployed PostgreSQL target, but it is a static deployment-review surface only. All active database, migration, concurrency, and destructive/error-path verification uses isolated local PostgreSQL with synthetic data; no Neon credentials, network access, or production data are permitted.
- **Decision:** place denial/security tests inside the slice that exposes each capability; the final security sweep is defense in depth, not deferred authorization work.
- **Decision:** defer CI edits until the local-proof gate and keep CI/CD after every functional slice.
- **Residual risk:** real Zoho API semantics, production Vercel/Neon behavior, and the absent sibling licensing service cannot be fully verified in this repository. They remain explicit external limitations with operator checklists and cannot be described as passing; only the user may accept them for closure, with the decision recorded in `docs/progress.md` and cited in the final report.
- **Residual risk:** Windows packaging may be static-only if the host lacks PyInstaller/Inno Setup. The final report must distinguish source/import proof from a produced/installed artifact.
- **Residual risk:** dependency advisory results are time-sensitive. Record scanner database/time and separate unavailable-network/tooling from a clean result.
- **Residual risk:** schema upgrades against every historical production shape cannot be proven without production data. Use representative synthetic fixtures and require backup/preflight instructions for operator execution.
