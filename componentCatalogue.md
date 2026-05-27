# Component Catalogue

A reference of every reusable component and style file in this project, grouped by category.

---

## Layout Components

### `AppLayout`
**Location:** `src/components/layout/AppLayout.jsx`

Shell that wraps every page. Renders `<Sidebar>` on the left and an `<Outlet>` on the right for React Router's nested routes. All routes in `App.jsx` are children of this component.

---

### `Sidebar`
**Location:** `src/components/layout/Sidebar.jsx`

Fixed-width left navigation (`w-64`). Contains:
- **Brand logo** — RegIQ logotype with icon
- **Nav sections** — driven by the `NAV_ITEMS` array defined in the same file; each section has a label and a list of `<NavLink>` entries with SVG icons
- **User footer** — avatar, name, and role for the logged-in user

To add a nav item, update the `NAV_ITEMS` array. SVG icons are defined as local functions at the bottom of the file.

---

### `TopBar`
**Location:** `src/components/layout/TopBar.jsx`

Page-level header bar rendered at the top of every page (inside the `<Outlet>` region). Accepts:

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Primary heading |
| `subtitle` | `string` | Optional subdued line below the title |
| `actions` | `ReactNode` | JSX rendered on the right (e.g. a `<Button>`) |

---

## UI Components

### `Button`
**Location:** `src/components/ui/Button.jsx`
**Styles:** `src/styles/buttons.css`

General-purpose button. Composes `.btn` base class with variant and size modifier classes.

| Prop | Options | Default |
|---|---|---|
| `variant` | `primary` `secondary` `ghost` `danger` | `primary` |
| `size` | `sm` `md` `lg` | `md` |
| `type` | `button` `submit` `reset` | `button` |
| `disabled` | `boolean` | — |
| `onClick` | `function` | — |
| `className` | `string` | Extra classes |

---

### `Card` · `CardHeader` · `CardBody`
**Location:** `src/components/ui/Card.jsx`
**Styles:** `src/styles/cards.css`

White panel with rounded corners and a subtle border.

- **`Card`** — outer container. Pass `onClick` to get `.card-interactive` (hover shadow + border tint). Pass `className` for layout overrides.
- **`CardHeader`** — `px-6 py-4` section with a bottom border; intended for `<h2 className="card-heading">` titles.
- **`CardBody`** — `px-6 py-4` content area; pass `className` to add `space-y-*` or other layout utilities.

---

### `ApplicationCard`
**Location:** `src/components/ui/ApplicationCard.jsx`

Clickable summary card for a single regulatory application. Navigates to `/applications/:id` on click. Renders:
- Product name + `<StatusBadge>`
- Four detail rows: Dosage Form, Strength, Manufacturer, Target Market
- Submission type + last-updated date footer
- `<ReadinessScoreRing size="md">` on the right

Accepts a single `app` prop (shape defined in `src/data/mockData.js`).

---

### `Badge` — `StatusBadge` · `CategoryBadge`
**Location:** `src/components/ui/Badge.jsx`

Two inline label chips:

- **`StatusBadge`** — renders the `label` and `color` from `STATUS_LABELS` in `mockData.js` for a given `status` string (`draft`, `in_review`, `submitted`, `approved`, `rejected`). Pill shape.
- **`CategoryBadge`** — color-coded by document category (`Quality`, `Manufacturing`, `Clinical`, `Regulatory`). Square-rounded shape.

---

### `ReadinessScore` — `ReadinessScoreRing` · `ReadinessScoreBar`
**Location:** `src/components/ui/ReadinessScore.jsx`

Two display forms of the 0–100 readiness score. Color thresholds: ≥ 80 green · ≥ 50 amber · < 50 red.

- **`ReadinessScoreRing`** — SVG circular progress ring. `size="md"` used on cards; `size="lg"` used on the detail overview sidebar.
- **`ReadinessScoreBar`** — horizontal progress bar with label and percentage text. Used on the details page.

Both accept a single `score` (`number`) prop.

---

### `StatCard`
**Location:** `src/components/ui/StatCard.jsx`
**Styles:** `src/styles/cards.css`

KPI tile used in the Dashboard stats row. Renders a label, a large bold value, and an optional subtitle line.

| Prop | Default | Description |
|---|---|---|
| `label` | — | Small text above the value |
| `value` | — | Large number or string |
| `sub` | — | Optional small text below |
| `colorClass` | `text-slate-900` | Tailwind color class for the value |
| `bgClass` | `bg-white` | Background override |

---

### `FormField` · `Input` · `Select`
**Location:** `src/components/ui/FormField.jsx`
**Styles:** `src/styles/forms.css`

Form primitives designed to compose together:

- **`FormField`** — wrapper that provides a `<label>` (with optional required asterisk) and an error message slot. Accepts `label`, `required`, `error`, and `children`.
- **`Input`** — `<input>` styled with `.form-control`. Forwards all native input props.
- **`Select`** — `<select>` styled with `.form-control`. Forwards all native select props.

---

### `DocumentChecklist`
**Location:** `src/components/ui/DocumentChecklist.jsx`

Full document checklist for an application's detail page. Groups all 12 documents from `DOCUMENT_CHECKLIST` (in `mockData.js`) by category, showing upload status for each. Uploaded items show green background + filename. Missing items show an inline **Upload** `<label>` that triggers a hidden file input (placeholder — no backend connected).

Accepts a `documents` prop: the `documents` array from an application object.

---

## Style Modules

All files live in `src/styles/` and are imported via `src/index.css`. Each file uses `@layer components` so Tailwind places them correctly in the cascade.

### `layout.css`
| Class | Expands to |
|---|---|
| `.page-wrapper` | `flex flex-col flex-1` — root div on every page |
| `.page-content` | `flex-1 px-8 py-8` — standard page `<main>` |
| `.page-content-sm` | `flex-1 px-8 py-6` — tighter top padding variant |

### `typography.css`
| Class | Expands to |
|---|---|
| `.section-heading` | `text-base font-semibold text-slate-800` — content section titles |
| `.card-heading` | `text-sm font-semibold text-slate-700 uppercase tracking-wide` — `CardHeader` titles |

### `buttons.css`
| Class | Role |
|---|---|
| `.btn` | Base — layout, focus ring, disabled state |
| `.btn-primary` | Blue fill |
| `.btn-secondary` | White with border |
| `.btn-ghost` | No background, slate text |
| `.btn-danger` | Red fill |
| `.btn-sm` / `.btn-md` / `.btn-lg` | Padding + font-size sizes |

### `forms.css`
| Class | Expands to |
|---|---|
| `.form-control` | Full-width, bordered, rounded input base shared by `Input` and `Select` |

### `cards.css`
| Class | Expands to |
|---|---|
| `.card` | `bg-white rounded-xl border border-slate-200 shadow-sm` |
| `.card-interactive` | Extends `.card` with hover shadow and brand border tint |
