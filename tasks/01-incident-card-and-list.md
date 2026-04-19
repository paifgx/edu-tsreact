# Task sheet 01 — IncidentCard and IncidentList

## Goal

Build the first two real React components for the dashboard and render a list of incidents.

## Starting point

- The base app runs.
- Seed data and types are in `src/data/incidents.ts`.
- The placeholder files `IncidentCard.tsx` and `IncidentList.tsx` exist.

## Assignment

- Type `IncidentCard` so the component expects exactly **one** incident as a prop.
- In `IncidentCard`, render at least title, severity, and status.
- Type `IncidentList` so the component accepts an array of incidents.
- In `IncidentList`, render an `IncidentCard` for each item.
- Use stable keys in the list.
- In `App.tsx`, wire in the seed data and render the list.

## Done when …

- the app renders an incident list
- there are no visible TypeScript errors
- there are no React key warnings in the console

## Notes

- Use the existing types instead of defining props as loose objects.
- An array index is not a stable key.
- If the list were empty, the component should still behave sensibly.

## Optional

- Add a small empty state when `incidents.length === 0`.
