# Task sheet 03 — Fetch and asynchronous state

## Goal

Replace local seed data in the UI with a real fetch against the mock API.

## Starting point

- The local list works.
- The mock API runs in a second terminal with `npm run dev:api`.

## Assignment

- Replace direct use of seed data in the UI with a fetch to `/api/incidents`.
- Add the states you need for loaded data, loading, and errors.
- Run the fetch in an effect.
- Render depending on state:
  - loading
  - error
  - success
- Ensure the component handles a late response cleanly if it unmounts first.

## Done when …

- a loading state is visible first
- then the incident list appears
- an API error does not crash the app

## Notes

- The mock API intentionally simulates delay and occasional errors.
- Check HTTP status as well as `json()`.
- An effect without a sensible dependency strategy can quickly end up in render loops.

## Optional

- Show a small retry button on error.
