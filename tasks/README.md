# Task sheets (Incident Dashboard)

These sheets walk you through building the Incident Dashboard step by step.

**Important:**

- Sheets define direction, scope, and acceptance criteria — not a reference solution.
- Hints stay intentionally short.
- Follow the order below unless your instructor agrees otherwise.
- “Optional” really is optional — but it is often where faster participants can go deeper.

## Order (core path)

1. [00-start-and-orientation.md](./00-start-and-orientation.md)
2. [01-incident-card-and-list.md](./01-incident-card-and-list.md)
3. [02-filter-and-search.md](./02-filter-and-search.md)
4. [03-fetch-and-async-state.md](./03-fetch-and-async-state.md)
5. [04-routing-and-detail-page.md](./04-routing-and-detail-page.md)
6. [05-incident-form.md](./05-incident-form.md)
7. [06-context-and-settings.md](./06-context-and-settings.md)
8. [07-use-incidents-hook.md](./07-use-incidents-hook.md)
9. [08-capstone-filter-assignment-persistence.md](./08-capstone-filter-assignment-persistence.md)

## Deep dives (capacity permitting)

10. [09-testing-react-testing-library.md](./09-testing-react-testing-library.md)
11. [10-accessibility-and-ux-polish.md](./10-accessibility-and-ux-polish.md)
12. [11-performance-and-url-state.md](./11-performance-and-url-state.md)

## Three training days — suggested mapping

| Day | Focus | Core sheets | Trainer notes |
|-----|--------|-------------|---------------|
| **Day 1** | Components, local state, props, first interactions | 00 → 01 → 02 | Allow time for orientation and experimenting with JSX/CSS; sheet 02 may run into the afternoon. |
| **Day 2** | Async, routing, forms, context | 03 → 04 → 05 → (start 06) | Introduce the mock API in parallel; shared refactoring with union types / badges happens outside these sheets (see below). |
| **Day 3** | Architecture (hooks), capstone, quality | finish 06 → 07 → 08 → optional 09–11 | Error Boundary is often a shared live session; point faster groups at sheets 09–11. |

### Alignment with shared live sessions

- Before sheet **01**: shared bootstrap and fundamentals on project structure.
- Between sheet **03** and **04**: shared refactor of status/severity to union types with badges (not part of the individual sheets).
- Between sheet **07** and **08**: shared Error Boundary topic (optional complement to the sheets).
- The first **JavaScript kata** from the course is **not** part of this project.

## Working guidelines

- Work in small, clear steps; commit or save progress often.
- Keep the app **runnable** at all times (even when features are still minimal).
- Build only what the sheet asks — avoid “cleaning up” the whole repo on the side.
- Use existing types and data from `src/data/`; do not invent parallel models.
- Avoid `any`.
- If a value can be **derived**, it does not have to live in its own state immediately.

## What is provided for you?

- React and TypeScript scaffold
- Seed data under `src/data/`
- Local mock API (`npm run dev:api`)
- Placeholders under `src/components/`, `src/hooks/`, `src/context/`, `src/pages/`

Everything else is for you to implement during the course.

## Different paces in the room

- **Core:** the “Core (required)” section on each sheet.
- **Stretch:** explicitly marked; for anyone who moves ahead comfortably.
- **Expert / playground:** open experiments and reflection prompts, often at the end of a sheet — good for self-paced work or pair programming (navigator focuses on these parts).
