# Finance Dashboard

A modern finance dashboard built with React + Vite, using a layered component architecture (atoms → molecules → organisms → pages), route-based navigation, responsive layout, light/dark theme support, and profile-scoped demo data.

This README is a full technical walkthrough of how the codebase is organized and how the app works.

## Live Website

- https://finance-dashboard-8hjj.onrender.com

---

## 1) Repository Layout

This repository currently contains one app:

```
finance-dashboard/
└── frontend/   # React application (Vite)
```

> There is no backend service in this repository right now. Data is managed on the client side.

---

## 2) Tech Stack

- **Framework**: React 19
- **Bundler/Dev Server**: Vite 8
- **Routing**: `react-router-dom`
- **Styling**:
  - `styled-components` for component-scoped styles
  - global design tokens in `src/components/css/root.scss`
  - `index.css` base global styles
- **Charts**: `recharts`
- **UI libs**:
  - `react-select`
  - `react-datepicker`
  - `react-hot-toast`
  - `react-toastify`
- **Interaction libs**:
  - `@dnd-kit/*`
  - `framer-motion`
- **Linting**: ESLint 9

---

## 3) Getting Started

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+

## Install

From repository root:

```bash
cd frontend
npm install
```

## Run in development

```bash
npm run dev
```

Default local URL is usually:

- `http://localhost:5173`

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

---

## 4) NPM Scripts (frontend/package.json)

- `dev`: starts Vite dev server
- `build`: creates production bundle
- `preview`: previews built app
- `lint`: runs ESLint on project files

---

## 5) Runtime Entry Flow

### `src/main.jsx`

App bootstrapping order:

1. React root is created.
2. `BrowserRouter` wraps the app.
3. `TransactionFilterProvider` wraps the app (global filter state).
4. Global styles are loaded:
   - `src/index.css`
   - `src/components/css/root.scss`
5. `App` is rendered.

### `src/App.jsx`

- Wraps app with `ThemeProvider` (`styled-components`)
- Registers notifications (`react-hot-toast` and `react-toastify`)
- Routes all traffic to `ProtectedRouter`
- Adds fallback `PageNotFound`

### Route Bootstrap

- `src/components/web/routes/ProtectedRouter.jsx`
  - wraps app pages with `AppWrapper`
  - lazy-loads protected pages from `componentRoutes.jsx`
  - redirects `/` to `/dashboard`

---

## 6) Folder-by-Folder Architecture (frontend/src)

## `assets/`

Static app assets.

- `fonts/`: Lufga font files used by global theme
- `images/`: image assets

## `common/`

Shared domain helpers (auth/authorization placeholders and utilities).

- `authUtils.js`: authorization/token placeholder methods
- `password.js`: demo credentials
- `can/privileges.js`: privilege constants
- `can/useCan.js`: permission check hook (currently demo-allow)

## `components/`

Main UI architecture.

### `components/css/root.scss`

Global **design tokens** and base variables:

- color palette (`--primary-*`, `--gray-*`)
- semantic vars (`--color-bg`, `--text-color`, `--border-color`, etc.)
- component tokens (button sizes, z-index levels, spacing primitives)
- theme overrides in `:root[data-theme="dark"]`

### `components/routes/`

Route constants and route-to-component mapping.

- `index.js`: path constants (`protectedRoutes`, etc.)
- `componentRoutes.jsx`: lazy loaded route registry

### `components/templates/`

Layout shell and layout regions.

- `index.jsx` (`AppWrapper`): CSS grid layout for sidebar/navbar/main
- `NavigationShell.jsx`: injects `Sidebar` + `TopNavbar`
- `main.jsx`: page content container used by pages

### `components/web/`

Feature UI grouped by design hierarchy:

- `atoms/`: smallest reusable pieces (button, input, badge, icon, etc.)
- `molecules/`: composed controls (filter bar, profile block, toolbar)
- `organisms/`: larger sections (sidebar, charts, table, navbar)
- `pages/`: route-level pages (`Dashboard`, `Transactions`, etc.)
- `routes/`: route wrappers/helpers

## `context/`

React context providers.

- `TransactionFilterContext.jsx`:
  - controls filter panel visibility and selected filters
  - persists filter UI state via browser `localStorage`

## `theme/`

Styled-components theme object (`theme/index.js`).

> Current default theme object is minimal; major theming is tokenized in `root.scss`.

## `utils/`

Utility modules.

- `localStorage.js`: **profile-scoped in-memory data store abstraction** + pub/sub event
- `exportCSV.js`: transaction CSV export helper

---

## 7) UI Composition Strategy

The project follows a layered design system:

- **Atoms**: purely reusable UI primitives
- **Molecules**: combinations of atoms with local behavior
- **Organisms**: major sections with data presentation logic
- **Pages**: route pages assembling organisms + page-specific logic

This keeps reusable UI independent from page-level business rules.

---

## 8) Routing Map

Current protected routes:

- `/dashboard`
- `/transactions`
- `/budget`
- `/analytics`

Additional page folders exist (`Goal`, `Settings`, `LandingPage`), but not all are wired as active protected routes in `componentRoutes.jsx` yet.

---

## 9) Layout & Responsiveness

Main app layout is CSS grid (`components/templates/index.jsx`):

- Desktop: expanded sidebar + top navbar + main content
- `<1400px`: collapsed sidebar width token (`--sidebar-width`)
- `<768px`: sidebar moves to a mobile drawer controlled by `TopNavbar`

`TopNavbar` controls mobile drawer state transitions (`opening/open/closing/closed`) and renders sidebar inside an overlay panel on mobile.

---

## 10) Theme System (Light/Dark)

Theme is controlled by setting:

- `document.documentElement.dataset.theme = "light" | "dark"`

Current control lives in `components/web/organisms/Sidebar/index.jsx`.

The design tokens in `root.scss` automatically adapt based on:

- `:root` (light default)
- `:root[data-theme="dark"]` (dark mode overrides)

This token-first setup keeps most components theme-safe without per-component color hardcoding.

---

## 11) Data Layer Behavior (Important)

### Source Data

`frontend/mockData.js` contains seed datasets per profile:

- `mockTransactions`
- `mockBudgets`

### Store Adapter (`utils/localStorage.js`)

Even though file name mentions local storage, the primary app data store is currently:

- an in-memory object (`profileStore`) initialized from mock data
- profile-scoped by active profile (`user1`, `user2`, `user3`)

Public helpers:

- `getProfiles()`, `getActiveProfile()`, `setActiveProfile()`
- `getItem(key)`, `setItem(key, value)`, `removeItem(key)`, `clearStorage()`
- `subscribeStorage(callback)` for reactive updates

Update notifications are published via custom event: `localStorageUpdated`.

### Where real browser localStorage is used

- `TransactionFilterContext` persists filter UI settings
- theme preference persists in sidebar toggle

---

## 12) Page Responsibilities

## Dashboard (`pages/Dashboard`)

- Loads transactions, budgets, goals via `getItem`
- Computes summary cards and recent transactions
- Uses analytics hook output (`useAnalyticsData`) for chart sections
- Renders:
  - summary cards
  - monthly income/expense chart
  - budget overview card
  - recent transactions table
  - saving goals preview

## Transactions (`pages/Transactions`)

- Loads profile transactions from store
- Applies:
  - date range filtering
  - context-based field filters (type, amount, method, category, status)
- Displays:
  - `TransactionsToolbar`
  - `TransactionsTable` with sort, pagination, select, delete

## Budget (`pages/Budget`)

- Loads budgets + transactions
- Computes monthly spend per category
- Evaluates budget statuses (`on track`, `need attention`, `over budget`)
- Supports date range filtering and add/edit budget workflows
- Shows budget cards + monthly budget visualization + top expense categories

## Analytics (`pages/Analytics`)

- Uses `useAnalyticsData` for normalized metrics and derived chart datasets
- Displays transaction overview, savings comparison, statistics pie chart, yearly calendar table
- Supports year/compare/type controls

## Goal / Settings

- Present as basic placeholders currently

---

## 13) Key Feature Modules

## Transactions Toolbar

`molecules/TransactionsToolbar`:

- date range picker (`react-datepicker`)
- filter bar toggle
- CSV export action
- add-new action (transaction/budget depending on props)

## Transactions Table

`organisms/TransactionsTable`:

- sortable columns
- row selection
- conditional delete action bar
- page size and pagination controls
- desktop table + mobile card rendering modes

## Profile Switching

`TopNavbar` + `ProfileBlock`:

- reads profile list from store
- updates active profile via `setActiveProfile`
- all pages refresh through `subscribeStorage`

---

## 14) Styling Conventions

- Use CSS variables from `root.scss` (`var(--...)`) for all colors/sizing where possible
- Keep reusable visual logic in `styled-components` files adjacent to components (`styles.js`)
- Prefer semantic tokens (`--surface-hover`, `--muted-text`) over raw color literals
- Maintain responsive rules around breakpoints already used by layout (`1400px`, `768px`)

---

## 15) Deployment Notes

`public/_redirects` exists for SPA hosting redirect behavior. Ensure your hosting provider supports SPA fallback routing to `index.html`.

If hosting on Netlify-style platforms, verify `_redirects` content is correctly configured.

---

## 16) Known Gaps / Improvement Areas

- Authentication and permission logic in `common/` is currently demo placeholder
- Theme object in `src/theme/index.js` is minimal
- Some page modules exist but are not fully integrated routes
- Store adapter naming (`localStorage.js`) may be confusing because data is mostly in-memory
- Analytics hook is large and could be split into smaller composable helpers

---

## 17) How to Extend the App Safely

## Add a new page

1. Create page in `components/web/pages/<NewPage>/index.jsx`
2. Add route constant in `components/routes/index.js`
3. Register lazy route in `components/routes/componentRoutes.jsx`
4. Add sidebar entry if needed in `organisms/Sidebar/index.jsx`

## Add a new shared UI component

1. Place primitive in `atoms` if reusable
2. Compose into `molecules` if combined behavior is needed
3. Use in `organisms/pages`

## Add new profile-scoped data key

1. Initialize key in `profileStore` object in `utils/localStorage.js`
2. Access through `getItem`/`setItem`
3. Subscribe via `subscribeStorage` where live updates are needed

---

## 18) Quick Reference

- App root: `frontend/`
- Source code: `frontend/src/`
- Global tokens/theme vars: `frontend/src/components/css/root.scss`
- Route map: `frontend/src/components/routes/`
- Layout shell: `frontend/src/components/templates/`
- Store adapter: `frontend/src/utils/localStorage.js`
- Mock seed data: `frontend/mockData.js`

---

## 19) Contribution Checklist

Before opening a PR/change set:

1. Run `npm run lint`
2. Run `npm run build`
3. Verify light and dark theme visuals
4. Verify responsive behavior at desktop/tablet/mobile breakpoints
5. Confirm profile switching updates all data-driven screens

---
