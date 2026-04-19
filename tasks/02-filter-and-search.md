# Task sheet 02 — Filter and search

## Learning goals

- Controlled inputs (`value` + `onChange`).
- Derived data: compute the filtered list from base state — avoid unnecessary duplication.
- Combined filter logic (severity **and** text search).

## Starting point

- `IncidentList` renders correctly.
- Data still comes from local seed (no fetch required for this sheet).
- Placeholders: `SearchBar.tsx`, `SeverityFilter.tsx`.

---

## Part A — Core (required)

### Assignment

1. **`SeverityFilter`**: controlled `<select>` (or an equally accessible control).
2. **`SearchBar`**: controlled text input.
3. Keep search and severity state in **`App.tsx`** first (or one clear parent — stay consistent with the course).
4. Filter **during render** from the full incident array (or memoize the result — but no second source of truth without a reason).
5. Combined logic:
   - **Severity**: handle the **all** special case explicitly.
   - **Search text**: match **title or description**, **case-insensitive**.
6. Pass only the **filtered** list to `IncidentList`.

### Done when …

- search updates live (no submit button required);
- the severity filter works;
- **both** filters apply together (AND).

### Quality check

- [ ] No infinite loops from state updates during render.
- [ ] Empty search does not accidentally hide everything unless that is intentional.

---

## Part B — Stretch

- **Clear filters** button: reset search and severity (short UX hint in the UI).
- Show **match count** (`n of m`) next to the list or in the search bar.
- Extract filtering into a pure function `filterIncidents(incidents, criteria)` in a small helper under `src/` — still without an external state library.

### Done when …

- you can reason about filter logic in **one** place (mental test or `console.assert`) without mounting a component.

---

## Part C — Expert playground

- Extend search to **tags**: an incident matches if any tag contains the search string (in addition to title/description).
- Consider: how would you add **debouncing** if the list had 10,000 rows? (Sketch the idea — implementation not required for this project.)

### Reflection

- What is the difference between “filtered list in state” and “filtered list as a computed value”? When does `useMemo` pay off?

---

## Notes

- Handle the **`all`** severity case explicitly.
- Normalize case robustly (`toLowerCase()`, etc.).

## Optional

- Clear filters button (if not already done under Stretch).
