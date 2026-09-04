# Inventory category tabs

The application remains Flask/Jinja (`templates/` and `static/style.css`). A
React island mounts only the inventory category navigation; existing stock
cards and CSRF-protected forms remain server-rendered.

## Structure and setup

- `components/ui/slide-tabs.tsx`: reusable typed React component, adapted from
  the supplied Framer Motion example. Accepts `tabs`, `value`, `onValueChange`,
  and `panelId`. No context provider or image/icon assets are needed.
- `components/demo.tsx`: isolated usage example.
- `frontend/inventory.tsx`: catalog filtering adapter.
- `frontend/styles.css`: Tailwind v4 utilities and scoped navigation styles.
  Preflight is intentionally omitted to preserve the existing application CSS.
- `components.json`, `tsconfig.json`: shadcn-compatible aliases and TypeScript.
  `@/components/ui` resolves to the root `components/ui` directory. This folder
  gives copied/CLI-generated UI components a consistent import destination;
  Flask did not previously have a component directory.
- `static/inventory-ui/`: compiled assets served by Flask. Commit these when
  changing frontend code because the current Vercel deployment is Python-only.

Install Node.js 22.12+ (includes npm), then run:

```sh
npm install
npm run build
```

Alternatively, use `pnpm install --frozen-lockfile` followed by `pnpm build`.
React, React DOM, Framer Motion, TypeScript, Tailwind and Vite are declared in
package.json. No whole-app migration or separate production Node server is needed.

The shadcn configuration is already supplied; do not scaffold over this Flask
repository. For a separate new React application, the shadcn CLI can scaffold it:

```sh
npx shadcn@latest init -t vite
```

See https://ui.shadcn.com/docs/installation/vite and
https://tailwindcss.com/docs/installation/using-vite for upstream setup details.

## Behavior

Green Beans is initially selected. Clicking a category filters cards and updates
the title/count without a request. Hover moves the cursor temporarily; mouse
leave restores the selection. Arrow keys, Home and End select/focus tabs.
Reduced-motion preferences disable sliding; narrow screens scroll the tab row.
The card grid retains auto-fit behavior and Green Beans uses compact cards.
Older coffee items without a subtype are grouped under Roasted Beans. Each empty
category displays a message. Without JavaScript, all stock cards remain usable.
No stock, order, Zoho, or invoice data is changed by the tabs.
