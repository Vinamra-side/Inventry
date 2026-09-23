# Repository audit progress

## Goal

Comprehensively audit, test, fix, and harden the complete Saiko Inventory repository while preserving intended behavior and unrelated changes. The user's 2026-09-22 audit brief is the normative source. Execution plan: [docs/plan.md](plan.md). Baseline evidence: [docs/test-plan.md](test-plan.md).

## Profile

- Profile: Full
- Triage score: 8/10
- Rationale: broad repository scope (2), mostly established patterns (0), authoritative brief (0), production/security/data-integrity risk (2), independently parallelizable subsystems (2), and expected changes across more than ten files (2).
- Plan confirmation: granted by the user's instruction to start and continue through implementation and verification.
- Adapter: dev-team-codex active; selected workflow `dev-team`.
- Run counter: 22 / 40

## Acceptance criteria

- AC-001: Inventory every application, service, dependency, entrypoint, deployment path, existing test, and CI check.
- AC-002: Establish and record exact baseline commands, results, pre-existing failures, blockers, and prerequisites.
- AC-003: Review correctness, edge cases, error handling, concurrency, transactions, migrations, API contracts, performance, and deployment reliability across the repository.
- AC-004: Audit authentication, sessions, authorization, secrets, input/output handling, web security, dependencies, infrastructure, webhook integrity, replay protection, and idempotency.
- AC-005: Exercise critical workflows and permission/failure boundaries with isolated synthetic data; add meaningful regression tests for confirmed defects.
- AC-006: Implement confirmed fixes and secure defaults without unrelated rewrites or weakened assertions.
- AC-007: Perform independent review of significant fixes and finish with repository-wide verification.
- AC-008: Deliver a coverage matrix, severity-ranked findings, changes, exact verification evidence, unresolved/UNVERIFIED risks, blockers, and required operational decisions.

## Actors and use cases

Skipped: product use-case catalogue — this is a repository audit, not a new product specification. Relevant runtime actors to exercise are administrator, staff user, unauthenticated caller, Zoho Billing webhook caller, licensing owner application, and deployment operator.

## Input inventory

- User audit brief in the current task (normative).
- Existing repository documentation at project root: `README.md`, `AUTH_SETUP.md`, `FRONTEND.md`, `ROASTING.md`, `SECURITY_AND_PERFORMANCE_CHANGES.md`, `V3_CHANGES.md`, `V4_LICENSE_SEATS.md`, `VERCEL_DEPLOYMENT.md`, `ZOHO_INTEGRATION.md`, `FEATURE_AUDIT.md`.
- Existing dirty work at audit start: none (`git status --short` empty).

## Infrastructure inventory

| Dependency | Local service/emulator | Health check | Discovery setting | Criteria/suites | Status |
|---|---|---|---|---|---|
| PostgreSQL | `postgres:16-alpine` via `docker-compose.yml` | `pg_isready` | `DATABASE_URL` | AC-003/005/006/007; integration tests | harness retained; runtime BLOCKED because the user explicitly prohibited Docker and Docker Desktop was uninstalled on 2026-09-22 |
| NeonDB (deployed PostgreSQL) | No local equivalent in current user-selected workflow; production remains read-only | application page loads only; no direct database access | `DATABASE_URL` | AC-003/004/007 | user authorized non-destructive browser testing of the deployed Vercel app; direct Neon access, mutations, concurrency, and migration tests remain UNVERIFIED |
| Zoho Accounts + Billing APIs | No live testing permitted by request; deterministic HTTP contract substitute to be assessed | HTTP health endpoint if added | `ZOHO_ACCOUNTS_URL`, `ZOHO_API_BASE_URL` | AC-003/004/005 | UNVERIFIED against real Zoho; no production access |
| Vercel runtime | No complete local equivalent | N/A | Vercel deployment config | AC-003/004/007 | static/local verification only; UNVERIFIED in production |

## Local stack proof

The local stack definition, idempotent schema/seed initialization, reset script, loopback-only port, and development environment contract remain in the repository, but Docker Desktop was uninstalled at the user's explicit request on 2026-09-22. The user then explicitly selected `https://saiko-inventory.vercel.app/` for testing and prohibited Docker. This is a workflow waiver, not local-stack proof: non-destructive browser QA may run against the deployed app, but source-fix verification that depends on PostgreSQL semantics, direct Neon access, production mutations, concurrency, schema/migration behavior, and live Zoho behavior remains `UNVERIFIED` and cannot satisfy the local-proof gate.

## Coverage matrix

| Area | Critical journeys / boundary | Existing check | Verification gap | Status |
|---|---|---|---|---|
| Flask app/auth | login, logout, sessions, admin-only routes, disabled users, CSRF | Python tests to inventory | real PostgreSQL + browser permission checks | pending |
| Inventory/orders | catalog, restock, roasting, multi-item order, delivery deduction, cancellation, history | Python tests to inventory | concurrency/transaction and migration checks | pending |
| Zoho Billing | OAuth refresh, list/detail, webhook auth/idempotency, historical import | mocked tests to inventory | real third-party contract prohibited; replay/error coverage | pending / external UNVERIFIED |
| Licensing | integration key, owner desktop app, seat enforcement | tests to inventory | desktop/API boundary and secret handling | pending |
| React/Vite UI | inventory tabs and responsive states | build/typecheck | browser behavior, accessibility, console errors | pending |
| Jinja UI | dashboard/orders/deliveries/admin/Zoho pages | template/unit checks to inventory | browser workflows and responsive checks | pending |
| PostgreSQL schema | constraints, migrations, indexes, idempotent initialization | schema/test inventory | clean PostgreSQL integration proof | pending |
| Desktop app/build | owner UI, build configuration, update workflow | workflow/build inventory | Windows runtime/build smoke check | pending |
| Deployment/CI | Vercel routing, GitHub Actions permissions and reproducibility | workflow files | local parity, dependency/security scan | pending |

## Task table

| Scope | Agent | Status | Evidence | Open findings | Attempt |
|---|---|---|---|---|---|
| Audit plan | planner | APPROVED | `docs/plan.md`; PLAN2 recheck passed all nine dimensions | — | 2/3 |
| Plan debate | adversarial-reviewer | REWORK completed | immutable workspace snapshot `10c7071a162199e90f8ea1c87041d07861785bd33a913fc70641eb07c4e4dd40` across 86 files | RV-PLAN-001..005 accepted | 1/2 |
| Plan rework | planner | DONE | all five findings disposed as `accepted_and_fixed` | — | 1/2 |
| Plan document review | doc-reviewer | REWORK | immutable workspace snapshot `8ccddde01f7feae32651bdc89b1f7ea740f2bf337215890f7d15067992e6b5f1` across 86 files | RV-PLAN2-001 accepted; RV-PLAN2-002 accepted | 1/2 |
| Plan document rework | planner/coordinator | DONE | RV-PLAN2-001..002 disposed as `accepted_and_fixed` | — | 1/2 |
| Plan document recheck | doc-reviewer | APPROVE | immutable workspace snapshot `29c1d168aa95c01e8567843dd06e2755022fda5180c022e45366fa3847dbedb8` across 86 files | none | 2/2 |
| Path-level repository manifest | auditor | DONE | `docs/repository-manifest.md`; 86/86 frozen paths and hashes reconciled | final snapshot reconciliation pending | 1/2 |
| Local stack enablement | devops-engineer | BLOCKED after implementation | `docker-compose.yml`, `.env.example`, `.dockerignore`, `scripts/local-stack/*`; static checks pass | Docker unavailable; runtime proof absent | 1/3 |
| Baseline and test inventory | tester | DONE_WITH_CONCERNS | `docs/test-plan.md`; 40/40 Python tests, strict TS, and Vite build pass | browser scripts lack declared Playwright; PostgreSQL/desktop/external contracts blocked | 1/3 |
| Backend/auth/data read-only review | backend/Python/PostgreSQL reviewer | DONE_WITH_CONCERNS | immutable snapshot `cc55b0fcb7dd132fd28c24632017543963db33a5eb8237fa7e1e6ab26965a10f`; RV-BACKEND-001..014 | confirmed fixes pending | 1/3 |
| Frontend/desktop/deployment read-only review | frontend/TypeScript/Vite reviewer | DONE_WITH_CONCERNS | same immutable snapshot; RV-CLIENT-001..011 | confirmed fixes pending; browser/desktop runtime blocked | 1/3 |
| Dedicated security audit | security code-reviewer | DONE_WITH_CONCERNS | same immutable snapshot; RV-SEC-001..007 | confirmed fixes pending; external runtime/advisories UNVERIFIED | 1/3 |
| Confirmed-finding fixes | bounded implementors | frontend-only deviation authorized; backend/data fixes remain blocked by OQ-003 | user directed mobile UI updates using deployed read-only baseline with no Docker; server/database behavior remains out of scope | PostgreSQL-dependent fixes blocked | 0/3 |
| Browser QA | tester using test-web-ui | queued | — | — | 0/3 |
| Production mobile browser discovery | tester using test-web-ui | DONE_WITH_CONCERNS | `docs/mobile-ui-production-qa.md`; 4 PASS / 2 FAIL / 3 SKIP across four viewports; public login has no overflow but labels are unassociated and submit target is ~39px high | authenticated-page coverage blocked; isolated 404 unattributed | 2/3 |
| Mobile UI acceptance-first tests | tester | DONE (expected-red) | `node --test --test-isolation=none tests/mobile-ui-structure.cjs`: 0 passed, 4 expected-red failures for labels, touch target, mobile toggle, and Users role guard | — | 1/3 |
| Mobile UI implementation | frontend-dev | DONE | `templates/login.html`, `templates/base.html`, `static/style.css`; 4/4 focused checks, strict TypeScript, disposable Vite build, and diff check pass | deployed post-change/authenticated runtime behavior UNVERIFIED | 1/3 |
| Mobile UI verification | tester Mode B | DONE_WITH_CONCERNS | independent 4/4 focused pass; JS syntax, strict TypeScript, diff/integrity scans pass; Vite sandbox retry blocked but frontend agent's approved Vite build passed; `docs/test-plan.md` updated | authenticated/post-deployment/full-browser behavior UNVERIFIED | 3/3 |
| Mobile UI local demo | tester/coordinator | READY | `http://127.0.0.1:4177/test-results/mobile-ui/demo/index.html` returns 200; synthetic sign-in/admin/staff pages, no backend | full browser capture incomplete; demo is non-production | 1/1 |
| Mobile UI code/UI review | code-reviewer | DONE | recheck snapshot `96d378f36d4b68263a1f94bbc9efd2217a9f997b9bb01b4d5b705a1ea2c932d8`; production source resolves RV-CLIENT-002/004/005 and the safe demo resolves RV-SLICE5-001 | RV-SLICE5-002 remains backlog; authenticated/post-deployment behavior UNVERIFIED | 2/2 |
| Mobile demo safety rework | frontend-dev (strategy change after tester attempt cap) | DONE | inert sign-in group, non-submitting CTA, no submission/network path; focused tests 4/4 and independent recheck pass | — | 2/2 |
| Cross-cutting review | code-reviewer | queued | — | — | 0/2 |

### Technical debt

- TD-001: Browser scripts require Playwright but `playwright` is undeclared/uninstalled.
- TD-002: Existing persistence tests use fakes/SQLite and do not prove PostgreSQL semantics.
- TD-003: CI builds the Windows artifact but runs no Python tests, TypeScript check, Vite build, browser tests, security scan, or database integration suite.
- RV-SLICE5-002 (`backlog`, Important): mobile authenticated navigation has no no-JavaScript fallback because the sidebar/mobile menu are hidden until JavaScript adds the open state. This predates the bounded visual fix and remains outside the current deployed-read-only verification scope.

### Review findings ledger

- RV-PLAN-001 (`must-fix-now`, Critical): `accepted_and_fixed` — OQ-003 now gates dependent slices; read-only review is separated from prohibited implementation.
- RV-PLAN-002 (`must-fix-now`, Important): `accepted_and_fixed` — owned Playwright enablement and Slice 5 rejoin gate added.
- RV-PLAN-003 (`must-fix-now`, Critical): `accepted_and_fixed` — CI covers local proof; external behavior remains UNVERIFIED with explicit user acceptance.
- RV-PLAN-004 (`must-fix-now`, Important): `accepted_and_fixed` — infrastructure evidence contribution and AC closure ownership clarified.
- RV-PLAN-005 (`must-fix-now`, Critical): `accepted_and_fixed` — path-level manifest ownership and final SHA-256 snapshot reconciliation added.
- RV-PLAN2-001 (`must-fix-now`, Important): `accepted_and_fixed` — OQ-002 now explicitly covers production Vercel and Neon runtime limitations.
- RV-PLAN2-002 (`backlog`, Important): `accepted_and_fixed` — stale progress-ledger line citations replaced with section-stable references.

Backend/data findings accepted for remediation: RV-BACKEND-001..014. Highest impact: public fallback session key plus exposed debugger; case-insensitive account/catalog ambiguity; request-time DDL and long-lived Neon transactions; destructive history deletion; multi-item insight undercount; numeric/input validation; bootstrap race; Zoho error/cache handling.

Security findings accepted for remediation: RV-SEC-001..007. RV-SEC-001/002 and RV-SEC-004 overlap backend findings; unique security work covers trusted-proxy/account throttling, fail-closed licensing, webhook replay controls, and durable redacted security auditing.

Client/deployment findings accepted for remediation: RV-CLIENT-001..011. Work covers reachable PWA installation, mobile navigation, safe service-worker activation, role-aware navigation, labels/accessibility, distribution/release integrity, immutable CI permissions/actions, runnable browser tests, package-manager reproducibility, and bundle cost.

Mobile Slice 5 review: RV-CLIENT-002, RV-CLIENT-004, and RV-CLIENT-005 are resolved at source level. RV-SLICE5-001 (`must-fix-now`, Important) is `accepted_and_fixed`; the localhost demo is structurally inert with or without JavaScript and the independent recheck found no new blocking issue. RV-SLICE5-002 remains recorded in Technical debt.

## Decisions log

- Preserve all intended current product behavior unless a confirmed correctness/security defect requires a narrowly scoped change.
- The user explicitly authorized non-destructive browser testing of `https://saiko-inventory.vercel.app/` on 2026-09-22. Do not submit state-changing forms, alter production data/settings, call live Zoho actions, or access Neon directly; those behaviors remain UNVERIFIED.
- Treat NeonDB as the production PostgreSQL provider. Do not connect to it; statically review TLS, connection/pooling, migration, and serverless-runtime assumptions, and use only local PostgreSQL with synthetic data for active verification.
- Existing user changes are absent at baseline; future unrelated changes remain preserved.
- CI changes, if needed, are gated until local checks are proven.
- The infrastructure change is not accepted as runtime-proven: Docker Desktop was explicitly removed and the user prohibited Docker. The repository harness remains, but the mandatory local-stack gate is waived only for read-only deployed-browser discovery, not for implementation or database-backed acceptance closure.
- On 2026-09-23 the user resumed with "dev-team mobile ui update" after directing that the deployed Vercel app be used for testing with no Docker. This authorizes a bounded frontend-only deviation: templates/static/React UI may be changed and verified with acceptance-first structure tests, typecheck/build, synthetic browser checks where available, and deployed pre-change screenshots. It does not authorize deployment or production mutations; post-change deployed behavior and every PostgreSQL-backed criterion remain UNVERIFIED until separately demonstrated.
- Baseline evidence: 40/40 Python unit tests pass using pinned isolated dependencies; strict TypeScript and Vite builds pass. Three browser scripts fail before assertions because Playwright is absent. Desktop packaging prerequisites are unavailable.

## Open questions

- OQ-001: Live Zoho contract verification is prohibited by the audit boundary. Trigger: final readiness assessment. Status: constrained; report as UNVERIFIED unless a safe recorded contract already exists.
- OQ-002: Owner/acceptance authority: user. Status: partially answered on 2026-09-22 — non-destructive Vercel browser testing is authorized; direct Neon access and production mutation remain prohibited and UNVERIFIED. Trigger: CI/readiness conclusion still requires explicit acceptance of those residual limitations.
- OQ-003: Status: answered by user decision on 2026-09-22 and refined 2026-09-23 — do not use Docker; Docker Desktop was uninstalled. Frontend-only mobile UI work may proceed under the recorded deviation, but database-backed verification and backend/data source-fix closure remain BLOCKED unless the user later authorizes a safe isolated PostgreSQL alternative.

## Session state

- Current phase: PAUSED by user on 2026-09-23 after the mobile UI demo/review completed
- Current slice: 0
- Local stack: unavailable by explicit user decision; Docker Desktop uninstalled; repository harness retained but unproven
- Next pending action: none while paused. On explicit resume, restart the local demo if requested and obtain user acceptance before any production push. Deployed post-change behavior remains UNVERIFIED until separately deployed.
