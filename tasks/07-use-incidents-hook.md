# Task sheet 07 — useIncidents hook

## Goal

Pull all fetch logic out of components and encapsulate it in a custom hook.

## Starting point

- The app can already load incidents.
- Context and settings exist.
- `src/hooks/useIncidents.ts` is prepared.

## Assignment

- Implement a `useIncidents` hook.
- The hook should encapsulate the full load flow:
  - initial state
  - loading
  - success
  - error
- Return a single, clearly modeled value instead of many loose values.
- Replace inline fetch logic in the UI with the hook.
- Render the return value explicitly per state.

## Done when …

- components no longer fetch themselves
- app behavior stays the same
- loading and error states remain clearly visible

## Notes

- A hook returns state, not a promise.
- The effect belongs in the hook, not in the consuming component.
- If the state feels too loose, that is a hint to model it more strictly.

## Optional

- Consider a future `refetch` option, but only build it once the core is solid.
