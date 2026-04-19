# Task sheet 07 — useIncidents hook

## Learning goals

- Move fetch logic out of components into a reusable **custom hook**.
- Model state as **one** clear value or discriminated union — not six loose booleans.
- Components render from returned state only — no hidden side effects in the view.

## Starting point

- Incidents load (from sheet 03 / routing).
- Context exists (sheet 06).
- Placeholder: `src/hooks/useIncidents.ts`.

---

## Part A — Core (required)

### Assignment

1. Implement `useIncidents`.
2. The hook wraps the full load flow:
   - initial / idle
   - loading
   - success (data)
   - error (error info)
3. Return **one** modeled result — e.g. `{ status: 'loading' } | { status: 'success'; data: … } | …` or an object with `status` + optional fields — but **type-safe**.
4. Replace inline fetch effects in UI components with the hook.
5. UI renders **explicitly** per state (no infinite “loading” with no feedback).

### Done when …

- no component calls `fetch('/api/incidents')` directly anymore (exceptions need a justification);
- behavior matches before (including loading/error);
- TypeScript **narrows** correctly when you branch on status.

### Quality check

- [ ] Abort/cleanup from sheet 03 stays correct **inside** the hook.
- [ ] No duplicate parallel fetches on mount without a reason.

---

## Part B — Stretch

- **`refetch()`** in the return value: manual reload without duplicated logic.
- Optional `{ enabled: boolean }` to skip loading when not ready (e.g. route).

### Done when …

- repeated `refetch()` calls do not race without cleanup.

---

## Part C — Expert playground

- Compare your model to **`useReducer`** for the same flow — when is the switch worth it?
- Short pseudo-test: “What must happen if the component unmounts during the first fetch?”

### Reflection

- The hook returns state — why should it **not** return a promise?

---

## Notes

- Put the effect in the hook, not again in every consumer.

## Optional

- `refetch` (if not Stretch).
