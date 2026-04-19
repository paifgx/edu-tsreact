# Task sheet 09 — Testing with Vitest and React Testing Library

## When to use this sheet

After the core path (sheets 00–08), when there is room for **quality and safe refactoring** — ideal for afternoon of day 3 or a parallel track for faster participants.

## Learning goals

- Set up minimal testing for React + TypeScript (Vite ecosystem).
- Write at least **two** meaningful tests: one for **pure logic**, one for **component behavior** with RTL.
- Understand what is worth testing vs. collecting snapshots.

## Prerequisites

The repo does **not** ship with Vitest wired up — that is part of the assignment.

---

## Part A — Core (required)

### 1. Install tooling

Install (pin versions to your Vite/React stack — instructors may provide a fixed combo):

- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

Add scripts in `package.json`, e.g. `"test": "vitest"` and optionally `"test:run": "vitest run"`.

Configure Vitest for React (e.g. `vitest.config.ts` with `environment: 'jsdom'` and the appropriate Vite plugin).

### 2. First test — pure function

Extract or use a **pure** function from your project, e.g.:

- `filterIncidents` from sheet 02, or
- a small helper for normalizing search text.

Write at least **three** `it(...)` cases: happy path, edge case, “empty does not mean nothing matches.”

### 3. Second test — component

Pick a **small** component (`SearchBar`, `SeverityFilter`, or part of `IncidentCard`).

Test **behavior**, not implementation details:

- Example: typing in search fires `onChange` with the expected value **or** visible text updates (depending on your component API).

### Done when …

- `npm run test:run` (or your equivalent) passes **green** locally;
- tests are **deterministic** (no real-time/fetch without mocking).

---

## Part B — Stretch

- Mock `fetch` with `vi.fn()` and add a test for an **error** response from the mock API.
- Remove any `screen.debug()` before you commit.
- Mention MSW (Mock Service Worker) only as an option — full integration is optional and heavier.

### Done when …

- you can explain why you **do not** snapshot the entire `App`.

---

## Part C — Expert playground

- Test `useIncidents` with `renderHook` (RTL) or a small wrapper component test.
- Run coverage once (`vitest --coverage`) — which lines are “uselessly green”?

### Reflection

- Which three files would you test next in **your** project — and why those?

---

## Notes

- Tests should not accidentally hit a production API on the training network.
- If setup blocks you, ask the instructor for a starter `vitest.config` — the goal is understanding, not hours fighting config.
