# Task sheet 08 — Capstone: filter, assignment, persistence

## Learning goals

- Combine multiple filters with AND — correct edge cases (empty means “no extra restriction”).
- Change assignment and stay consistent between **list** and **detail**.
- Use `localStorage` deliberately — do not persist the entire world.

## Starting point

- `useIncidents` exists.
- `useLocalStorage` is available (project helper hook — use it or implement persistence consistently yourself).
- Routing, detail, settings work.

---

## Approach (required order)

Work in **three stages**. Do **not** start with stage 3.
Only move on when a stage works reliably.

---

## Stage 1 — Multi-filter on `/incidents`

### Core (required)

- Extend the list with several filters at once:
  - **status**: multi-select (multi `<select>` or checkbox group)
  - **severity**: multi-select
  - **assignee**: single select (include “unassigned” / “all” — pick one model and stay consistent)
- Combine active filters with **AND**.
- Empty multi-selections mean **no** extra restriction for that dimension (not “match nothing”).

### Done when …

- each filter works alone;
- combinations are correct;
- empty filters do not incorrectly narrow the dataset.

### Stretch

- Clear filter UI with labels and an “active filters” summary (chips).
- Performance: `useMemo` for filtered data only if you have a concrete reason.

---

## Stage 2 — Assignment on the detail page

### Core (required)

- On `/incidents/:id`, change assignee (dropdown or similar).
- The change appears in the **list** again (shared source: lifted state, context, or optimistic list update — **decide deliberately**).
- “Unassigned” remains possible.

### Done when …

- reassignment is visible without reloading the whole app;
- list and detail do not contradict each other.

### Stretch

- Use `PATCH /api/incidents/:id` where appropriate — or document why you only update UI state locally.

---

## Stage 3 — Persistence with localStorage

### Core (required)

- Restore active filters across reload.
- Restore assignment changes across reload.
- Store only what truly belongs to **local UI** — not full server payloads unless necessary.

### Done when …

- reload restores filters;
- reload restores assignments;
- the app stays usable afterward (no uncontrolled zombie data).

### Stretch

- Migration: if you change the persisted shape, handle old keys safely or reset.

---

## Expert playground

- **URL sync** for filters (`?status=open,investigating`): shareable links — no backend change required.
- Write a short **manual test checklist**: 10 steps to “break and recover” the UI.

### Reflection

- What happens when server data changes but your persisted assignments reference stale ids?

---

## Notes

- Styling is secondary — behavior and data flow first.
- If persistence misbehaves, re-verify stages 1 and 2 in isolation.

## Optional

- URL-based filters (if not Expert stretch).
