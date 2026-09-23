# Mobile UI update — 23 September 2026

Implemented in `static/style.css` and `templates/base.html`, preserving earlier uncommitted changes.

- Reserved independent header positions for navigation, logo, notifications, account, and theme controls.
- Constrained dropdowns to phone width and viewport height; menus close with Escape or outside clicks.
- Added visible dark-mode theme controls and resilient local-storage handling.
- Kept navigation available without JavaScript.
- Made forms use 44px targets and 16px input text on phones; stacked order item selectors above quantity/remove controls.
- Converted tables into labeled records below 600px while retaining table roles, headings, and desktop columns. Without JavaScript, tables remain horizontally scrollable.
- Improved page actions, panel headings, cancel buttons, long names, and login/unavailable layouts.

## Verification

`node test-results/mobile-ui/check-pages.cjs`: PASS, 130 combinations — all 13 page templates at 320, 390, 720, 768, and 1280px in light and dark themes. Every page returned HTTP 200 with an application heading; no document overflow or JavaScript exceptions. Mobile dropdown bounds, navigation open/close/Escape, and no-JavaScript navigation passed.

`node test-results/mobile-ui/check-interactions.cjs`: PASS — add/remove order rows, expanded notes, theme switching, staff role navigation, item type/unit selection, and catalog category filtering. All non-GET requests blocked.

`node --test --test-isolation=none tests/mobile-ui-structure.cjs`: PASS, 4/4.

`git diff --check`: PASS, line-ending notices only.

Representative screenshots were visually inspected for Orders, Inventory, Deliveries, and invoice detail. Screenshots and JSON results are in `test-results/mobile-ui/`.

## Preview and limits

Run `python test-results/mobile-ui/preview.py`, then open http://127.0.0.1:4188/inventory. Jinja2 is installed into `test-results/mobile-ui/preview-deps`. The server renders actual templates with synthetic records, never imports the application, and does not support POST. Forms are inert in the interactive preview. Production writes, authentication, Neon, Zoho, PWA updates, and real-device Safari were not exercised. External fonts were omitted from the preview; system fallbacks were used. No Docker, push, or deployment was performed.

An initial 4177 run hit the previous static demo and is invalid evidence. The final 4188 run explicitly verifies HTTP status and application headings. Initial preview-only navigation sizing overflow was corrected before the final passing run.
