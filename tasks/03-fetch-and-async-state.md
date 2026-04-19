# Task sheet 03 — Fetch and asynchronous state

## Learning goals

- Connect an async data source (mock API).
- Model states: loading / success / error clearly.
- Effects with sensible dependencies; **abort** or cleanup to avoid races on unmount.

## Starting point

- Local list and filters work (or you start this sheet from seed data in the UI).
- Mock API in a second terminal: `npm run dev:api`.
- Vite proxies `/api/*` — see README.

---

## Part A — Core (required)

### Assignment

1. Replace direct seed usage in the **UI** with a fetch to `/api/incidents` (path as in README / proxy).
2. Model explicitly: **loading**, **success**, **error** (at least these three).
3. Run the fetch in `useEffect` (or an equivalent pattern — effect is the course default).
4. Render by state:
   - loading visible (skeleton, spinner, text — your choice, but not blank);
   - on error: no white screen, no uncaught exception;
   - on success: same list as before.
5. **Unmount / late responses**: if the component unmounts before the fetch finishes, avoid noisy warnings from `setState` on an unmounted component (`AbortController` or a cleanup flag).

### Done when …

- a loading state appears first;
- then the incident list appears;
- API failures (the mock API intentionally returns ~10% 500s) do not crash the app.

### Quality check

- [ ] Check HTTP status before blindly calling `json()`.
- [ ] No effect that retriggers every render and causes loops.

---

## Part B — Stretch

- **Retry** button on error: trigger another fetch.
- Decide whether to keep showing the **last successful** list during retry — or not — and justify briefly (comment or pair discussion).
- Log errors only sensibly in **development** (`import.meta.env.DEV`), not as permanent noise in production demos.

### Done when …

- rapid retries do not produce overlapping updates without cleanup.

---

## Part C — Expert playground

- Add a **manual refetch** (“Refresh”) without duplicating loading logic.
- Sketch how TanStack Query / SWR would differ — **without** adding those libraries now.

### Reflection

- Why is “fetch in render” a bad idea? What exactly breaks?

---

## Notes

- The mock API simulates **delay** and **errors** — that is training material, not a bug.
- Choose `useEffect` dependencies carefully (follow eslint-plugin-react-hooks).

## Optional

- Retry on error (if not already covered under Stretch).
