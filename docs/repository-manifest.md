# AC-001 repository manifest

Captured: 2026-09-22 (Asia/Calcutta)  
Purpose: path-level inventory evidence only; no production, Neon, Vercel, licensing-service, or Zoho call was made.

## Snapshot identity and coverage

- The authoritative audit-start workspace digest is `29c1d168aa95c01e8567843dd06e2755022fda5180c022e45366fa3847dbedb8` across **86 files**.
- The path set below is the frozen pre-manifest workspace: **78 Git-tracked + 8 non-ignored untracked = 86 unique paths**. Of the tracked paths, 77 were worktree-clean and `.env.example` was modified. The eight untracked paths were `.dockerignore`, `docker-compose.yml`, `docs/plan.md`, `docs/progress.md`, `docs/test-plan.md`, and the three files under `scripts/local-stack/`.
- Coverage is **86/86 paths enumerated** and **86/86 paths SHA-256 hashed**. Disposition totals are **83 pending**, **0 reviewed**, and **3 generated audit artifacts** (`docs/plan.md`, `docs/progress.md`, and `docs/test-plan.md`). A `pending` disposition means the file is inventoried but is not claimed to have passed its future substantive audit.
- `docs/repository-manifest.md` is the audit artifact created from that frozen set, so it is necessarily not one of the authoritative starting 86 and cannot embed its own final SHA-256 without changing that hash. It is explicitly accounted for here rather than silently omitted. A detached hash of this file must be captured during final reconciliation; immediately after creation the repository therefore contains **87 non-ignored files** (78 tracked, 9 untracked), of which 86 are starting-snapshot inputs and one is this generated audit artifact.
- Hashes are lowercase SHA-256 of file bytes. “Tracked clean/modified” and “untracked” describe the audit-start index/worktree state, not review approval.

## One-row-per-path manifest

| Path | SHA-256 | Surface / subsystem | Assigned future owner / check | Current evidence / result | Disposition |
|---|---|---|---|---|---|
| `.dockerignore` | `831ab05e2b83f0e9437ab2769b833426cfeb86c8a9f3a64d8cd873332e205a6d` | Local PostgreSQL stack | devops-engineer; tester verifies build context and isolation | Untracked; static local-stack contract only; runtime blocked by OQ-003 | pending |
| `.env.example` | `c8faf0fbd0f9f857ac007161b1a4b3beee3b571915d606da1d5362fa6c35f9bf` | Environment/configuration | backend-dev + security-reviewer; fail-closed, secret, DB/TLS checks | Tracked, worktree modified; template present; no secret values loaded | pending |
| `.github/workflows/build-windows-app.yml` | `c3ad8a70f52fb38ee9f1ea11c712d2d6081ad8c8a189a1f154a7af42d32a7c01` | Windows CI / packaging | devops-engineer; tester validates workflow parity and artifact contract | Tracked clean; static workflow inventory only; CI not executed | pending |
| `.gitignore` | `647e4adca346cf6727591f47ed12268ec13bb9bf0653e17aae1c6333cc6641d0` | Repository governance | repository auditor; final ignored/generated reconciliation | Tracked clean; ignore rules applied to this inventory | pending |
| `api/index.py` | `439a4a538f62a10ac129658f5c19262723d15b2450d6279ef1e10182d32a8b67` | Vercel WSGI entrypoint | implementor/devops-engineer; import, route, serverless checks | Tracked clean; AST baseline passed; provider runtime UNVERIFIED | pending |
| `app.py` | `f25f91946cca851f408256a884aded208a5476e57734a4076eb47c303b342bd4` | Flask routes/application | backend-dev; tester route/auth/CSRF/lifecycle suites | Tracked clean; existing unit baseline passes only selected mocked/test-client paths | pending |
| `AUTH_SETUP.md` | `f5b2a118bf0a7688819434d619bc3ec3b44ec65f67df7125f39b7a814c9d36a8` | Auth operations documentation | doc-reviewer + security-reviewer; docs-code-sync | Tracked clean; inventoried as intent, not runtime proof | pending |
| `auth.py` | `8938ee9c454127af50d2f243c8bdaba3229b57d56236e5a6fb3df00449560bf4` | Authentication/authorization | backend-dev + security-reviewer; permission/session/seat matrix | Tracked clean; syntax baseline passed; comprehensive auth behavior UNVERIFIED | pending |
| `components.json` | `644d29430587e3330fd9160ef3aa660aefa34f254727c674d65a03f1d0f41000` | React/shadcn configuration | frontend-dev; tester validates source/build contract | Tracked clean; included in passing TypeScript/build baseline | pending |
| `components/demo.tsx` | `810f77eab35c703ab027724525d7bb203cc52706365fdb1b3ebb1717fdcaa916` | React demonstration component | frontend-dev; UI/code review and dead-code check | Tracked clean; TypeScript/build baseline passed | pending |
| `components/ui/slide-tabs.tsx` | `be889619c16dc4efccdbb27a9b4422db7e1646260b6a184427962575f84aec18` | React inventory tabs | frontend-dev; tester keyboard/a11y/browser checks | Tracked clean; typecheck/build pass; real-browser test blocked | pending |
| `config.py` | `5a67e1a31c1957f2fb0c9dc88d8b61bd141ad7b925fd4a2f7fcae2db2c8834cf` | Flask/environment configuration | backend-dev + security-reviewer; startup, cookie, DB fail-closed checks | Tracked clean; AST baseline passed; runtime configuration not fully verified | pending |
| `data/import_confirmed_catalog.sql` | `a5f8141da4b78ba47661f09470e141ab0e46f92f7715dcedf99df1be8f963948` | Catalog seed data | backend-dev; tester PostgreSQL idempotency/preservation checks | Tracked clean; four SQLite extraction tests pass; PostgreSQL behavior blocked | pending |
| `db.py` | `7a8a4ae6e9507efb4e0acdc52fa5aec5f3fc17aec8ffe4e8574c3c04ab68b871` | PostgreSQL connection layer | backend-dev; tester connection lifecycle/TLS/rollback checks | Tracked clean; syntax baseline passed; real PostgreSQL blocked | pending |
| `desktop_app/app.py` | `49d38cf4948f6d4a2190f64ef72a8060bba162d7ace216b87eaae9a8e49340e2` | Windows PyWebView entrypoint | implementor; tester safe-URL/import/window smoke | Tracked clean; AST baseline passed; GUI/runtime dependencies absent | pending |
| `desktop_app/assets/saiko-icon-512.png` | `9b87f03eed17664c606f20f380f25543b1a393073c1fb066794beea39772d1d2` | Desktop image asset | implementor; tester packaging/metadata check | Tracked clean; binary present, 56,328 bytes; content/build review pending | pending |
| `desktop_app/assets/saiko-icon.ico` | `7d4bce917a867dd1192fac896d9992c41167b0a2c4d0dccade8fe7b665a124bd` | Windows icon asset | implementor; tester installer/PyInstaller metadata check | Tracked clean; binary present, 30,490 bytes; build review pending | pending |
| `desktop_app/backend_config.py` | `f222034496e7de619cf61fc3a41b6eb99d3ce13c04b0a4b674c1ae54ed1edc53` | Desktop URL configuration | implementor + security-reviewer; safe-host/no-production-default check | Tracked clean; AST baseline passed; navigation not exercised | pending |
| `desktop_app/installer.iss` | `c999af5d71fb4ff19a3d0c2d0555298d862900b988a431952ef000dfbf070ce4` | Inno Setup installer | implementor; tester installer recipe/artifact/install-uninstall check | Tracked clean; static only; Inno Setup unavailable locally | pending |
| `desktop_app/make_icon.py` | `6690908218d2a32486d83a1ba82d87979f4b3c0f16d955be7bf72ad47cae1a27` | Desktop asset generation | implementor; tester deterministic icon-generation check | Tracked clean; AST baseline passed; Pillow unavailable locally | pending |
| `desktop_app/requirements-build.txt` | `05a39c5433372ed6703de5e47bc677ff7b4d003f00eb79f08c4b9996e4f3e5b9` | Desktop build dependencies | implementor + security-reviewer; pin/advisory/compatibility check | Tracked clean; pins inventoried; dependencies/toolchain unavailable | pending |
| `docker-compose.yml` | `5b62e89f5ace6023c017bab36ed603b70fa827d9f54bb8603149c4c88117189b` | Local PostgreSQL stack | devops-engineer; tester health/isolation/reset/teardown gate | Untracked; static contract present; Docker/Compose runtime blocked | pending |
| `docs/plan.md` | `13136ff8b2f26cb0747fdc7b3f2d115cb5ce24f3da183a413d791a3345c86bb0` | Audit control documentation | coordinator + doc-reviewer; maintain plan/evidence consistency | Untracked; approved/rechecked audit plan; not product runtime evidence | generated audit artifact |
| `docs/progress.md` | `572df36a7a05da3f7f941f952566813747fa96f2b6e7181cd5116b47986b0104` | Audit evidence ledger | coordinator; final AC/finding/decision reconciliation | Untracked; authoritative AC and session ledger | generated audit artifact |
| `docs/test-plan.md` | `2c4cd123aab41c47a8c7804abd67c19443e500d4130e768a3b7a7bb77ae7e7a6` | Audit baseline/test evidence | tester; final exact-command rerun and matrix closure | Untracked; baseline commands/results and blockers recorded | generated audit artifact |
| `FEATURE_AUDIT.md` | `3340416764c5d8f58eb35a3c589e4f2a2a72048f0fe3e846fb0f34e3ee2d95af` | Historical feature documentation | doc-reviewer; current-code synchronization/staleness check | Tracked clean; known historical/stale statements; non-normative | pending |
| `FRONTEND.md` | `414b9b8b0a3f6493d1624448c5c385dede1fdc7ecb08c7e6a264c24727e7e22e` | Frontend architecture documentation | frontend-dev + doc-reviewer; source/output sync check | Tracked clean; inventoried as intended React boundary | pending |
| `frontend/inventory.tsx` | `f0d84bf041d83143e3831a1db3948139b733f1ce138a2950297846b932facf0f` | React inventory island | frontend-dev; tester build/browser/a11y scenarios | Tracked clean; typecheck/build pass; real browser blocked | pending |
| `frontend/styles.css` | `08a266a0c08cc23273028584b226e7e501afbb3b009c9bd60fc4e68dc438bf78` | React/Tailwind styling | frontend-dev; tester responsive/theme/reduced-motion checks | Tracked clean; build passes; rendered-browser verification blocked | pending |
| `lib/utils.ts` | `d1f1e0d62cb8d8d1e04c26e14de842d8a151f75812d81b046c65b5d1fe8e4b27` | Frontend utilities | frontend-dev; typecheck/unit/code review | Tracked clean; TypeScript/build baseline passed | pending |
| `licensing_integration.py` | `b44feb9d1dc40bfd0fe3469b8764132c3d0c4912da221744155de21224f685df` | Private licensing API | backend-dev + security-reviewer; key/authz/seat/error tests | Tracked clean; syntax baseline passed; dedicated behavior tests absent | pending |
| `package.json` | `b8ae4dfad2e6a2c4374901d27d4b49e99e4b78eb0fd5889cebe4c494118f1c20` | Node scripts/dependencies | frontend-dev; tester dependency/browser-script reproducibility check | Tracked clean; typecheck/build scripts work via local binaries; Playwright undeclared | pending |
| `pnpm-lock.yaml` | `4561e76c5842e8e78bf46d62d534e74427fffc013f602892ecfe7decbc942fb3` | Node dependency lock | frontend-dev + security-reviewer; frozen install/advisory check | Tracked clean; versions inventoried; no dependency audit yet | pending |
| `pnpm-workspace.yaml` | `ac02d96368617c760f093cfe61fdec64b6244007ab3553e0d6621f706f54a353` | pnpm workspace configuration | frontend-dev; tester reproducible command check | Tracked clean; workspace recognized in baseline | pending |
| `README.md` | `479129df24281aca837bcf029a3c6ef4c0f9e8750bb470391c1c0128df2b4195` | Primary operator documentation | doc-reviewer; topology/setup/docs-code-sync check | Tracked clean; topology inventoried; runtime claims not acceptance proof | pending |
| `requirements.txt` | `7cdb57719e49e7afa07669550a16aaa07e8fae74efb84d503c1d11e0ba098cad` | Python runtime dependencies | backend-dev + security-reviewer; clean install/pin/advisory check | Tracked clean; approved disposable install succeeded; no advisory scan yet | pending |
| `ROASTING.md` | `616ca9f95e7bc35da5ec47a76941a4c1415031fbffe93c8a95ed228c0d77a236` | Roasting behavior documentation | backend-dev + doc-reviewer; invariant/docs-code-sync check | Tracked clean; intent inventoried; database behavior unverified | pending |
| `schema.sql` | `145f9e09f5d87cf1ce5281b0790acfb5fc9a7ddda7c20d412589cee1808b7e58` | PostgreSQL schema/migrations | backend-dev; tester clean/repeat/upgrade/concurrency checks | Tracked clean; SQLite is not proof; PostgreSQL gate blocked | pending |
| `scripts/local-stack/reset.ps1` | `9e75aca7facc6f74c2e1fcfa69cc8bffa81c2af08212f0b4d52c21de8cc74ebc` | Local-stack reset orchestration | devops-engineer; tester safe-target/reset/teardown check | Untracked; static only; Docker/Compose runtime blocked | pending |
| `scripts/local-stack/reset.sql` | `5c592a3dbff62893f32be547c58ac2f3a1049eebdabc86916d04be4ff18e4f21` | Local PostgreSQL reset SQL | devops-engineer; tester isolation/idempotency check | Untracked; static only; not run against PostgreSQL | pending |
| `scripts/local-stack/seed.sql` | `bfda64bd5d7a501e56cea563118b637ef03d64e4551491fd694490c5d95736aa` | Local PostgreSQL synthetic seed | devops-engineer; tester synthetic-data/seed idempotency check | Untracked; static only; not run against PostgreSQL | pending |
| `scripts/zoho_oauth_setup.py` | `6064d524c9e22bb192f736bedacce2e60c0e04c3a932a610e709153d5b5d16d1` | Zoho OAuth setup helper | backend-dev + security-reviewer; safe-secret/redirect/manual-flow review | Tracked clean; AST baseline passed; no Zoho call made | pending |
| `SECURITY_AND_PERFORMANCE_CHANGES.md` | `0436d6c4c5fc93846e8fc6162f636c83e21859048417c39a762aaa7b2875cb61` | Security/performance documentation | security-reviewer + doc-reviewer; claim-to-code verification | Tracked clean; intended controls inventoried, not assumed verified | pending |
| `services.py` | `65ad776f8e4ae460980a1bea9c92061f5af54a5d7046e016c7a6c254814c6f72` | Inventory/order/roasting services | backend-dev; tester real-PostgreSQL transaction/concurrency suite | Tracked clean; mocked unit paths pass; DB invariants unverified | pending |
| `static/app-icon-192.png` | `284d7c7f6173dbb649d8a4f8fdb95d3c28655acbeb6f49c8ca9daad07cddb220` | PWA icon asset | frontend-dev; tester manifest/render/cache metadata check | Tracked clean; binary present, 13,003 bytes; browser verification pending | pending |
| `static/app-icon-512.png` | `9b87f03eed17664c606f20f380f25543b1a393073c1fb066794beea39772d1d2` | PWA icon asset | frontend-dev; tester manifest/render/cache metadata check | Tracked clean; binary present, 56,328 bytes; browser verification pending | pending |
| `static/inventory-ui/inventory.css` | `92972c38a479b614bfe1445c0ace97ac05996527ffc1ef1ff4ac75593e29a7ae` | Generated React build output | frontend-dev; tester rebuild/source-output equality check | Tracked clean; committed output; Vite baseline emitted corresponding bundle names | pending |
| `static/inventory-ui/inventory.js` | `763ff2f7e18ba560f5cb3f6defef36e14ea4b341d891276588159583a4c75c60` | Generated React build output | frontend-dev; tester rebuild/source-output equality and browser check | Tracked clean; committed output; build passes; real browser blocked | pending |
| `static/manifest.webmanifest` | `ec410f440cf5d76d8c53e1f4e00e3fc4ef3ed17dbca3f5a4d0d6796941fe2c7a` | PWA manifest | frontend-dev; tester installability/icon/scope checks | Tracked clean; present; real-browser/PWA behavior unverified | pending |
| `static/offline.html` | `97ddac67d60d2e3f9101118889f2a7cb667004a85f449f5dcdfa6b630ffa9541` | PWA offline fallback | frontend-dev; tester offline/cache/XSS/accessibility checks | Tracked clean; present; browser behavior unverified | pending |
| `static/pwa.js` | `de5bde0d886d963ecd3e5e760859b64b62307dd7439aaa012586dffdc6e8d356` | PWA registration/client | frontend-dev; tester scope/update/console checks | Tracked clean; present; browser behavior unverified | pending |
| `static/roasting.js` | `3d67662b4d693f250842fdbb210c96e0d0c80bf33c0066f14b05682eb07f3083` | Roasting browser behavior | frontend-dev; tester rendered workflow/validation/double-submit check | Tracked clean; synthetic script exists but Playwright is missing | pending |
| `static/saiko-logo-clean.png` | `91aa5d6e1559749fa28f53bd6f2132b6f9b694059a69edb2df0a3b09142f758d` | Web brand asset | frontend-dev; tester render/metadata check | Tracked clean; binary present, 54,191 bytes; visual review pending | pending |
| `static/saiko-logo.png` | `6c1c8e6bd9852f53357a21a26cc73723d9aea97019082e9fb605066071b3031e` | Web brand asset | frontend-dev; tester render/metadata check | Tracked clean; binary present, 61,217 bytes; visual review pending | pending |
| `static/service-worker.js` | `2f6c69aa0af8d54a365d24652a5a319b7a9dddd4ba1e6a8037ab2c95fab6c01c` | PWA service worker | frontend-dev + security-reviewer; tester cache/scope/update/offline checks | Tracked clean; present; browser behavior unverified | pending |
| `static/style.css` | `4ddcbfa71e06ca5674e246d4fa6020e7454b687281bf7eb8446c35b9a587e6cf` | Jinja application styling | frontend-dev; tester responsive/theme/a11y/browser checks | Tracked clean; synthetic partial checks blocked by missing Playwright | pending |
| `templates/admin_accounts.html` | `0193d1961ac735b56cd3138fbafcddd14053eddf338b9b785b4c885890df3e59` | Admin account UI | frontend-dev; tester admin/staff denial, CSRF, a11y browser checks | Tracked clean; route/template inventory only | pending |
| `templates/base.html` | `e3fe8501311f586d589cc74a8861f4a80f616a2b15ac7fc0729bf40f214dc568` | Shared Jinja shell/PWA | frontend-dev + security-reviewer; tester headers/nav/escape/a11y checks | Tracked clean; partial synthetic extraction only; real browser blocked | pending |
| `templates/dashboard.html` | `7354c249982f09d7a6a7d7712caa10e28ae02455c08fc498b871058990206d25` | Dashboard UI | frontend-dev; tester role/data/render/browser checks | Tracked clean; no full rendered workflow evidence | pending |
| `templates/deliveries.html` | `ba5d99fc109118829416e51418d8c7fe9c018bc0d943827f00f2af8a2f0f4d3a` | Delivery lifecycle UI | frontend-dev; tester delivery/denial/CSRF browser checks | Tracked clean; domain runtime blocked by PostgreSQL gate | pending |
| `templates/insights.html` | `dc70db21f827a07331a84e8a3dda144bfe67602384db48cf8859f7f011d6221e` | Insights UI | frontend-dev; tester representative-data/query/render checks | Tracked clean; no real database/browser evidence | pending |
| `templates/inventory.html` | `9eeb3ed60014b859c7b5e2ad360e7f5eb5dd4dda68c5af13d4e4a039cba02907` | Inventory Jinja/React host | frontend-dev; tester no-JS/React tabs/forms/a11y checks | Tracked clean; synthetic tab script blocked; real app unverified | pending |
| `templates/license_inactive.html` | `c69b0228ff2e979a8bc35c771f1f78a1f3f69fd3be1ca75f4f5d21559085f4dc` | Licensing state UI | frontend-dev; tester inactive/escape/authorization browser checks | Tracked clean; no dedicated licensing test | pending |
| `templates/login.html` | `2e994a7b1470a35e531d978954b141a671e7b3566d2af510a96012cf59508925` | Authentication UI | frontend-dev + security-reviewer; tester login/throttle/redirect/CSRF checks | Tracked clean; comprehensive login behavior unverified | pending |
| `templates/new_bean.html` | `13c3d710a3993d5282ecd285de7ee07c68a77d9a79d7911547818d6b42b341ce` | Catalog/roasting input UI | frontend-dev; tester validation/CSRF/a11y browser checks | Tracked clean; synthetic roasting partial only | pending |
| `templates/orders.html` | `5d3123ec97ad63991930b7454c5d4d5e4f5444822b99034aefe3329e98b3ab62` | Order lifecycle UI | frontend-dev; tester create/cancel/availability/CSRF browser checks | Tracked clean; mocked service tests only; browser unverified | pending |
| `templates/stock_history.html` | `7a6aeba3dcaf2026e9801bee019623d6fcdedc7b2583d620acbb1401cd8a3cae` | Stock ledger/history UI | frontend-dev; tester database/render/pagination checks | Tracked clean; no real PostgreSQL/browser evidence | pending |
| `templates/users.html` | `2475dae9c9b04199159cd34922c624066f66d90f6f0806001bf622e72b215102` | User/licensing administration UI | frontend-dev; tester role/seat/CSRF/browser checks | Tracked clean; dedicated licensing coverage absent | pending |
| `templates/zoho_invoice_detail.html` | `c128a34a4fd9a64ed27ff8ad5c9ce71e76e0e2e97746b21134a78b129aa6408c` | Zoho invoice detail UI | frontend-dev; tester deterministic contract/render/escape checks | Tracked clean; mocked selected render coverage only | pending |
| `templates/zoho_invoices.html` | `52d325e1caefdf2bed7ec5353d21756da9419eeca23591457deac573c7b95202` | Zoho invoice list/import UI | frontend-dev; tester admin/CSRF/import/error browser checks | Tracked clean; mocked selected route coverage only | pending |
| `tests/__init__.py` | `49a13b1651affd4bd8120a7bc0556773f84510916cd3fec9911c33eefc2c0b96` | Python test package marker | tester; test-discovery integrity check | Tracked clean; discovery included package successfully | pending |
| `tests/form-buttons.cjs` | `ed4928ca6ae09bd5886dba3924fa7108ebffa5c4bfc1a8ed8edfc0d3b5ef7e67` | Synthetic UI browser check | tester; declare Playwright then run/replace with real-app coverage | Tracked clean; exits 1 before assertions because Playwright is absent | pending |
| `tests/inventory-tabs.cjs` | `cae0994080fa22fb3d617d360bf61b38d51208775ea8f0ef1ecbfb63f910a0de` | Synthetic React browser check | tester; declare Playwright then run plus real-app coverage | Tracked clean; exits 1 before assertions because Playwright is absent | pending |
| `tests/roasting-ui.cjs` | `4c5d3e8a68789fb65b764d37d5af3ec168e09749e75c56d139306d08a2b791d4` | Synthetic roasting browser check | tester; declare Playwright then run plus real-app coverage | Tracked clean; exits 1 before assertions because Playwright is absent | pending |
| `tests/test_catalog_import.py` | `a019143fcdf79e8bb6b55b6238c0c1cc97f9d7e2137270afdc6bd88f1e195a50` | Catalog import unit tests | tester; promote to PostgreSQL clean/repeat/preservation checks | Tracked clean; 4 tests pass against extracted SQL on SQLite | pending |
| `tests/test_multi_item_order.py` | `7c4c2741545f7cf7f2060114f39727c9721eab289dcee5cda30d10f1bea81bc0` | Order lifecycle unit tests | tester; add real DB atomicity/locking/concurrency/failure tests | Tracked clean; 8 fake-connection tests pass | pending |
| `tests/test_roasting.py` | `f0e329031310db320ed8e5852515fd8d0df81c7e68f04dbbeabaa0fe58bcf87f` | Roasting unit tests | tester; add real DB atomicity/locking/concurrency tests | Tracked clean; 11 mock-based tests pass | pending |
| `tests/test_zoho_integration.py` | `c015d2836f22dc91f402e9711d8e4f182b249ff0fa2b68eff92ab7e665288506` | Zoho unit/contract tests | tester + security-reviewer; deterministic HTTP/DB/replay/race suite | Tracked clean; 17 mocked tests pass; live Zoho prohibited/UNVERIFIED | pending |
| `tsconfig.json` | `60f231e81bdd53fc0f36e14fb718571e2eadd5a56f648229cb1564efe4d1ed70` | TypeScript compiler config | frontend-dev; tester strict typecheck/build verification | Tracked clean; `tsc --noEmit` baseline passes | pending |
| `V3_CHANGES.md` | `34fdbf55d876b57f1bde0d6ede36823a7cbe9bb87c751e287e461f0ec1e096af` | Product-change documentation | doc-reviewer; current code/schema behavior synchronization | Tracked clean; inventoried as intent/history | pending |
| `V4_LICENSE_SEATS.md` | `ed87d80afbff83a1294daf591243ed18a1d81b3352bb5832b6942602f9fc7b7e` | Licensing/seat documentation | backend-dev + doc-reviewer; seat invariant/docs-code-sync check | Tracked clean; behavior unverified | pending |
| `VERCEL_DEPLOYMENT.md` | `5fa7b8f162f6396fa6c8e2ca611f053e332aad6b64583319d8d34761b59ff9da` | Deployment documentation | devops-engineer + doc-reviewer; Vercel/Neon static evidence sync | Tracked clean; provider runtime explicitly UNVERIFIED | pending |
| `vercel.json` | `e651ba9b7b28064c49e3b6b4c9159d5e068efdc40c19027a97c77ad6dfeb84ec` | Vercel deployment configuration | devops-engineer; tester route/region/environment static checks | Tracked clean; static inspection only; deployment not exercised | pending |
| `vite.config.ts` | `d1551bb563bb1828a0d4ad6efc35c45f10204286ed8e6df551e0ed86faabfe84` | React library build configuration | frontend-dev; tester deterministic committed-output check | Tracked clean; Vite baseline build passes | pending |
| `ZOHO_INTEGRATION.md` | `17f361f40097e504cb322cff5a884a5ed3c568037846d6fa285f2d600e85b0e9` | Zoho operations documentation | backend-dev + security/doc reviewers; contract/docs-code-sync check | Tracked clean; intent inventoried; live Zoho prohibited/UNVERIFIED | pending |
| `zoho_service.py` | `40e218ca0243f1a968493cec0e098d279d9bbd42094c1dd57acb3bb411765481` | Zoho OAuth/API/import service | backend-dev + security-reviewer; tester deterministic HTTP/DB contract suite | Tracked clean; mocked tests pass selected paths; external behavior UNVERIFIED | pending |

## Ignored and generated areas (excluded from the 86 path rows)

These paths were reported by `git status --short --ignored` and are excluded because they are dependency/cache artifacts rather than repository source. Counts are observational only and may change whenever tools run.

| Ignored area | Observed files | Observed bytes | Classification / final treatment |
|---|---:|---:|---|
| `.pnpm-store/` | 1 | 8,192 | pnpm tool cache; generated/tool state; exclude, but confirm still ignored at final snapshot |
| `node_modules/` | 1,961 | 84,808,742 | installed third-party dependencies; exclude from path manifest; verify via manifest/lockfile and clean install instead |
| `__pycache__/` | 7 | 125,096 | root Python bytecode cache; generated; exclude and ensure no tracked output appears |
| `api/__pycache__/` | 1 | 206 | Python bytecode cache; generated; exclude |
| `desktop_app/__pycache__/` | 3 | 1,807 | Python bytecode cache; generated; exclude |
| `scripts/__pycache__/` | 1 | 4,343 | Python bytecode cache; generated; exclude |
| `tests/__pycache__/` | 5 | 69,499 | Python test bytecode cache; generated; exclude |
| `.git/` | not enumerated | not enumerated | Git internals; expressly outside repository-file coverage |

No ignored area is treated as evidence that the corresponding runtime or dependency works. At final verification, any new non-ignored file must become a path row; any newly ignored area must be justified and classified rather than disappearing from coverage.

## Final snapshot reconciliation requirement

The repository auditor must regenerate the sorted tracked/non-ignored-untracked path set and byte-level SHA-256 values from a stable worktree after all authorized slices and before AC-001/006/007 closure. Reconcile against both the authoritative 86-file starting snapshot above and this generated manifest artifact. Every added, deleted, renamed, or hash-changed path must be recorded exactly once as one of:

1. pre-existing user work;
2. approved audit change, linked to its owner, finding/AC-ID, regression check, and result;
3. generated artifact, linked to its reproducible source; or
4. unexpected/unrelated change requiring investigation.

The final check must also record `git status --short`, tracked/untracked/ignored counts, the final aggregate workspace digest, a detached SHA-256 for this manifest, and any change in the ignored-area inventory. Unexpected or unexplained deltas fail AC-001/006/007; no path may be silently dropped, reverted, or converted into an ignored exclusion.

## Manifest self-check

- Starting path rows: **86**.
- Starting paths from Git inventory: **86** (**78 tracked + 8 untracked**, no duplicate paths).
- Starting SHA-256 values recorded: **86**, all 64 lowercase hexadecimal characters.
- Surface/owner-check/evidence/disposition fields populated: **86/86**.
- Starting disposition totals: **83 pending + 0 reviewed + 3 generated audit artifacts = 86**.
- Separately identified ignored/generated areas: **7**, plus `.git/` internals as an explicit exclusion.
- Post-creation accounting: **87 non-ignored files = 86 frozen inputs + this manifest**; the manifest's detached hash remains a required final-snapshot output because a file cannot contain its own final byte hash.
