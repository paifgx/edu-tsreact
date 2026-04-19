# Task sheets

These task sheets walk you step by step through building the Incident Dashboard.

Important guidelines:

- The sheets define direction, scope, and acceptance criteria.
- They do **not** provide a reference solution.
- Hints are intentionally brief.
- Work in the given order.
- When a sheet says “optional,” it really is optional.

## Recommended order

1. [00-start-and-orientation.md](./00-start-and-orientation.md)
2. [01-incident-card-and-list.md](./01-incident-card-and-list.md)
3. [02-filter-and-search.md](./02-filter-and-search.md)
4. [03-fetch-and-async-state.md](./03-fetch-and-async-state.md)
5. [04-routing-and-detail-page.md](./04-routing-and-detail-page.md)
6. [05-incident-form.md](./05-incident-form.md)
7. [06-context-and-settings.md](./06-context-and-settings.md)
8. [07-use-incidents-hook.md](./07-use-incidents-hook.md)
9. [08-capstone-filter-assignment-persistence.md](./08-capstone-filter-assignment-persistence.md)

## Fit in the course schedule

- Before sheet 01 comes the shared bootstrap and fundamentals live coding.
- Between sheet 03 and sheet 04 comes the shared refactoring of status and severity to union types with badges.
- Between sheet 07 and sheet 08 comes the shared Error Boundary live coding.
- The first JavaScript kata from the course is intentionally **not** part of this project, because it happens outside the React app code.

## How to work

- Work in small, clear steps.
- Keep the code runnable at all times.
- Build only what the sheet actually asks for.
- Use the existing types and data instead of inventing parallel structures.
- Avoid `any`.
- If something can be derived, do not store it as its own state immediately.

## What is intentionally prepared?

- The React and TypeScript scaffold
- Seed data in `src/data/`
- The local mock API via `npm run dev:api`
- Placeholder files in `src/components/`, `src/hooks/`, `src/context/`, and `src/pages/`

Everything else should be implemented by you, step by step.
