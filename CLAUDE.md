# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build (no tsc — plain Vite)
npm run preview   # serve the production build locally
```

No test runner or linter is configured yet.

> **Note:** This project lives inside `~/Documents` which is iCloud-synced. If file reads time out (`ETIMEDOUT`) after creating new files, iCloud is mid-upload. Wait a moment or disable iCloud sync for Documents before running the dev server.

## Architecture

**Stack:** React 19, Vite 5, Tailwind CSS 3, React Router DOM 7. Plain `.jsx` (no TypeScript in source — `tsconfig.json` is present but unused in the build).

**Data layer:** All data is static mock data in `src/data/mockData.js`. It exports:
- `MOCK_APPLICATIONS` — array of application objects (the primary entity)
- `DOCUMENT_CHECKLIST` — master list of 12 documents (4 categories: Quality, Manufacturing, Clinical, Regulatory)
- `STATUS_LABELS`, `DOSAGE_FORMS` — lookup maps used across UI components

Each application object carries its own `documents` array (a subset of `DOCUMENT_CHECKLIST` with `uploaded` state), so document upload status is stored per-application inline. The `readinessScore` is a static integer on each application — not computed from `documents`.

**Routing:** `App.jsx` defines all routes. Every route is a child of `<AppLayout>` (which renders `<Sidebar>` + `<Outlet>`). Stub pages use `<Placeholder>` directly in the route definition rather than separate files.

**Component conventions:**
- `src/components/layout/` — shell components (`AppLayout`, `Sidebar`, `TopBar`). `TopBar` accepts an `actions` prop (JSX) for page-level buttons.
- `src/components/ui/` — reusable primitives. SVG icons are defined as local functions at the bottom of the file that uses them (not a shared icon library).
- `src/pages/` — one file per route. Pages own their data fetching (currently just imports from `mockData.js`) and pass slices down to UI components.

**Readiness score:** Displayed in two forms — `ReadinessScoreRing` (SVG circle, used on cards and the detail overview) and `ReadinessScoreBar` (progress bar, used in the detail page). Color thresholds: ≥80 green, ≥50 amber, <50 red.

**Adding a real page** (replacing a `<Placeholder>`): create `src/pages/MyPage.jsx`, swap the `<Placeholder .../>` in `App.jsx` for `<MyPage />`, and add the import. The sidebar nav is hard-coded in `Sidebar.jsx` — update `NAV_ITEMS` there to activate the link.
