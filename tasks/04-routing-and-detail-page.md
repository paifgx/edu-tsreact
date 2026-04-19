# Task sheet 04 — Routing and detail page

## Learning goals

- Multi-page app with `react-router-dom`: routes, params, links.
- Detail view driven by the URL (`/incidents/:id`).
- Solid failure modes: unknown id, missing params.

## Starting point

- Data loads (fetch from sheet 03).
- `react-router-dom` is installed.
- Placeholders exist under `src/pages/`.

---

## Part A — Core (required)

### Assignment

1. Add the router at app level (`BrowserRouter` / `createBrowserRouter` — pick one approach and stay consistent).
2. Define at least these routes:
   - `/`
   - `/incidents`
   - `/incidents/:id`
   - `/settings`
   - fallback for unknown paths (404 or redirect — **predictable** behavior).
3. Small **navigation** between main areas — use router components (`Link`, `NavLink`), not `<a href>` for in-app navigation.
4. Under `/incidents/:id`: show details for the incident whose id is in the URL (`GET /api/incidents/:id` or data from loaded state — but **correct data for the param**).
5. If the id is missing, invalid, or the incident does not exist: **no** broken page — friendly message or redirect.

### Done when …

- in-app navigation works;
- **deep links** work (paste URL, reload);
- the detail page shows the correct incident.

### Quality check

- [ ] Guard `useParams()` for missing/invalid values.
- [ ] Loading/error for a single incident considered (minimal is fine).

---

## Part B — Stretch

- **Active nav** styling (`NavLink` with `className` callback or a small wrapper).
- Breadcrumb or **back to list** on the detail page (`navigate(-1)` vs explicit `Link` — tradeoffs in a sentence).
- On `/`, a short **dashboard teaser**: e.g. count of open incidents (computed from loaded data).

### Done when …

- you can go list → detail → back without losing the mental model of the URL.

---

## Part C — Expert playground

- **Nested routes**: optional layout route for `/incidents` with `Outlet` (if your router API supports it).
- Consider: how would you **prefetch** the next detail page? (Not required to implement.)

### Reflection

- When is it better to **find** the incident from the list response vs fetching again? What are the tradeoffs?

---

## Notes

- Keep the settings page small — context arrives in sheet 06.
- External links (docs, imprint) may stay `<a target="_blank">` — internal navigation should not.

## Optional

- Active nav item (if not already Stretch).
