# Task sheet 11 — Performance and URL state

## When to use this sheet

For participants who finish sheet 08 early or want to go deeper on architecture — **not** required for everyone.

## Learning goals

- Measure instead of guessing: read the React DevTools Profiler at a basic level.
- Spot expensive work and unnecessary re-renders — use `useMemo` / `useCallback` **on purpose** (not everywhere).
- Optionally mirror filters or sort in the **URL** (shareable state).

---

## Part A — Core (required)

### 1. One real measurement

1. Open React DevTools → **Profiler**.
2. Run a typical flow: load list → apply filter → open detail.
3. Note **one** component that re-renders often and decide whether that is **necessary** or **avoidable**.

### 2. Targeted optimization (only if justified)

- If you have an **expensive** derivation (large list filter/sort): add `useMemo` for that derivation with a comment **why** it can get costly.
- Do not memoize every callback by default — start from profiler evidence.

### Done when …

- you can state in one sentence: “We memoized X because …” or “We memoized nothing because …”

---

## Part B — Stretch

- **`React.memo`** for a pure list card — only if you show parent re-renders dominate.
- **`useSearchParams`** from `react-router-dom`: read filters from the URL and update the URL when filters change (at least one field, e.g. `q` for search).

### Done when …

- a colleague can copy a filtered URL and see the same state after reload.

---

## Part C — Expert playground

- Compare URL state to a **global store**: when does URL state break down for complex filters?
- Optionally mention **virtualized lists** (`react-window`) — integration is effort; the idea may be enough.

### Reflection

- What is the most common performance mistake in training projects — and did you avoid it?

---

## Notes

- Avoid premature optimization: user pain or profiler first, then optimization.
