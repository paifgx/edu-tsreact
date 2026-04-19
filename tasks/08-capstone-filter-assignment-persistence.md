# Task sheet 08 — Capstone: filter, assignment, persistence

## Goal

Combine the pieces built so far into a small, coherent feature set that feels like real product progress.

## Starting point

- `useIncidents` exists.
- `useLocalStorage` is available.
- Routing, detail page, and settings work.

## Approach for this sheet

- Work in three clear stages.
- Do **not** start with stage 3.
- Only move on when a stage works reliably.

## Stage 1 — Multi-filter on `/incidents`

- Extend the list view with several filters at once.
- Required:
  - status as multi-select
  - severity as multi-select
  - assignee as single select
- All active filters must be combined with AND.

### Done when …

- each filter type works on its own
- multiple filters work together
- empty filters do not incorrectly narrow the dataset

## Stage 2 — Assignment on the detail page

- On `/incidents/:id`, add a way to change the assignee.
- The change should also show up in the list view.
- Think clearly about **where** this change lives:
  - local UI state
  - an overlay structure
  - or another deliberate choice

### Done when …

- an incident can be reassigned on the detail page
- the new assignment is visible in the list
- an “unassigned” state remains possible

## Stage 3 — Persistence with localStorage

- Persist active filters across reloads.
- Also persist assignments you make.
- Store only what truly belongs to the local UI.

### Done when …

- a reload restores filters
- a reload restores assignments
- the app remains usable afterward

## Notes

- Do not persist the entire incident list if only filters and local assignments are needed.
- If persistence gets stuck, step back and verify stages 1 and 2 first.
- Styling is secondary in this sheet. Behavior and data flow come first.

## Optional

- If you finish early, consider URL-based filters. That is not required for this sheet.
