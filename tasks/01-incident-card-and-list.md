# Task sheet 01 — IncidentCard and IncidentList

## Learning goals

- Type props using existing domain types.
- Render lists correctly (keys, empty lists).
- Wire components in `App.tsx` without duplicating the data model.

## Starting point

- Base app runs.
- Seed data and types: `src/data/incidents.ts`.
- Placeholders: `src/components/IncidentCard.tsx`, `src/components/IncidentList.tsx`.

---

## Part A — Core (required)

### Assignment

1. **`IncidentCard`**: the component receives **exactly one** incident prop; the type comes from `src/data/incidents.ts` (or a small props type derived from it).
2. Render at least **title**, **severity**, and **status**.
3. **`IncidentList`**: accepts an **array** of incidents.
4. Render an `IncidentCard` for each item.
5. Use **stable keys** (not the array index).
6. In `App.tsx`: wire seed data and show the list.

### Done when …

- an incident list is visible;
- there are no obvious TypeScript errors in the editor;
- the console shows **no** React key warnings.

### Quality check

- [ ] Empty list: the UI does not break (see optional empty state).
- [ ] You reuse the same types as the domain file — no parallel `Incident` interfaces with slightly different fields.

---

## Part B — Stretch

- Add a short **date** (`createdAt` or `updatedAt`) — readable formatting (your choice: `Intl`, `toLocaleString`, or manual).
- Use semantic HTML where it helps (`<article>`, `<ul>` / `<li>`, etc.) — only if it keeps the structure simple.
- Factor severity/status display into small helpers or constants if you see repetition.

### Done when …

- with many items the page stays scannable (spacing, not a wall of text).

---

## Part C — Expert playground

- Add a compact **card variant**, e.g. subtler emphasis when `severity === 'critical'` (keep readability first).
- Discuss: what would be the next step for **mobile** stacking? (Planning only — no mandatory CSS.)

### Reflection

- Why is `key={incident.id}` better than the index here? In which scenario would the index cause **visible** bugs?

---

## Notes

- Do not define parallel types that diverge from `Incident`.
- An array index is not a stable key here (sorted/filtered lists later).

## Optional

- Small **empty state** when `incidents.length === 0` (friendly message, not a raw error).
