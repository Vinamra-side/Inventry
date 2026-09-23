# Production mobile UI QA — read-only baseline

## Run summary

- Target: `https://saiko-inventory.vercel.app`
- Captured: `2026-09-22T18:03:44.438Z` (`2026-09-22 23:33:44.438` Asia/Calcutta)
- Browser: Chrome/Chromium `153.0.8010.53`
- Safety boundary: GET navigation and in-page inspection only. No credentials were used, no form was submitted, and no inventory, account, Zoho, webhook, licensing, or database action was invoked.
- Viewports: `375x812`, `390x844`, `768x1024`, and `1280x800` CSS pixels; light colour scheme and reduced-motion preference.
- Result: **4 PASS, 2 FAIL, 3 SKIP** across the cases below.

## Results

| Case | Status | Evidence |
|---|---|---|
| Public/protected GET routing | PASS | `/`, `/inventory`, `/orders`, `/deliveries`, `/insights`, and `/stock-history` ended at `/login?next=<route>`; `/users`, `/admin/accounts`, and `/zoho-invoices` ended at `/login`. Each final login response was HTTP 200. |
| Responsive public sign-in layout | PASS | All four viewports rendered the sign-in page without horizontal overflow or overflowing elements. |
| Public assets and images | PASS | Manifest, service worker, stylesheet, logo, and 192px app icon returned HTTP 200; no broken rendered images were reported. |
| Public sign-in structure and keyboard reachability | PASS | One `main`, one `h1` (“Sign in”), document language `en`, and reachable username/password/submit controls were observed. |
| Username/password label association | **FAIL** | Both labels have no `for`; both inputs have no `id`, `aria-label`, or `aria-labelledby`, so each input reports zero associated labels at every viewport. |
| Sign-in touch target | **FAIL** | The submit button measured approximately `39px` high at every viewport, below the intended `44px` minimum. Username and password inputs measured `44px`. |
| Authenticated mobile navigation/menu interaction | SKIP | No authenticated session or safe test credentials were available; protected routes redirect to sign-in. |
| Admin versus staff navigation visibility | SKIP | Runtime role coverage, including the admin-only Users destination, requires authenticated admin and non-admin sessions. Template-level acceptance coverage is handled separately. |
| Authenticated tables, forms, React inventory island, and workflow pages | SKIP | Exercising these surfaces would require a session and could cross the no-mutation boundary. Database/API behavior therefore remains UNVERIFIED. |

## Route redirects

| Requested route | Final URL |
|---|---|
| `/` | `/login?next=/` |
| `/inventory` | `/login?next=/inventory` |
| `/orders` | `/login?next=/orders` |
| `/deliveries` | `/login?next=/deliveries` |
| `/insights` | `/login?next=/insights` |
| `/stock-history` | `/login?next=/stock-history` |
| `/users` | `/login` |
| `/admin/accounts` | `/login` |
| `/zoho-invoices` | `/login` |

The recorded status is the final navigation response after redirect (`200`), not a claim about the intermediate redirect status code, which the harness did not retain.

## Console and network observations

- Each viewport logged `Service Worker registration blocked by Playwright`. This is harness-generated: the audit explicitly created browser contexts with `serviceWorkers: 'block'`. It is not classified as an application defect.
- The `375x812` run alone logged `Failed to load resource: the server responded with a status of 404 ()`. The capture contains no URL for that console message, and the same run recorded no failed request and no response with status 400 or higher. All five explicitly checked assets returned 200, and the warning did not recur at the other three viewports. The source is therefore **unattributed and not reproducible from the retained evidence**; a future read-only run should attach request/response URLs before classifying it.
- No request failures, captured HTTP error responses, broken images, or horizontal overflow were recorded.
- Response headers on the final login document included HSTS (`max-age=63072000; includeSubDomains; preload`), `Referrer-Policy: same-origin`, and `X-Content-Type-Options: nosniff`. This is an observation, not a complete header/security audit.

## Evidence

- Machine-readable results: [`test-results/mobile-ui/production-ui-results.json`](../test-results/mobile-ui/production-ui-results.json)
- Read-only collection script and safety boundary: [`test-results/mobile-ui/production-ui-audit.cjs`](../test-results/mobile-ui/production-ui-audit.cjs)
- Screenshots:
  - [`375x812`](../test-results/mobile-ui/mobile-375x812-login-before.png)
  - [`390x844`](../test-results/mobile-ui/mobile-390x844-login-before.png)
  - [`768x1024`](../test-results/mobile-ui/tablet-768x1024-login-before.png)
  - [`1280x800`](../test-results/mobile-ui/desktop-1280x800-login-before.png)

## Limitations

- This is a public/login and redirect baseline only. No login attempt was made.
- Authenticated navigation, admin/staff role differences, mobile menu operation, application tables/forms, React island behavior, CSRF submission behavior, service-worker registration/cache/offline behavior, and end-to-end workflows are SKIP/UNVERIFIED.
- No direct Neon/PostgreSQL access, migration/concurrency test, live Zoho call, webhook invocation, licensing action, production mutation, deployment, or post-fix production verification was performed.
- The production screenshots are pre-change evidence. Local template/CSS structure tests can specify and verify source changes, but cannot establish that Vercel is running those changes until a later safe, read-only post-deployment check.
