# Incident Dashboard

This repository contains a clean starting point for an Incident Dashboard built with React and TypeScript.

## Quickstart

```bash
cd incident-dashboard
npm install
npm run dev
```

The app then runs at `http://localhost:5173`.

## Mock API

From day two onward, run the mock API in a second terminal:

```bash
cd incident-dashboard
npm run dev:api
```

The Vite app proxies `/api/*` to `http://localhost:4000`.

Endpoints:

- `GET /api/health`
- `GET /api/users`
- `GET /api/incidents`
- `GET /api/incidents/:id`
- `POST /api/incidents`
- `PUT /api/incidents/:id`
- `PATCH /api/incidents/:id`

For `GET /api/incidents`, the API intentionally simulates:

- about `500ms` delay
- about `10%` random 500 errors

## Setup check

```bash
cd incident-dashboard
npm run verify
```

The script checks Node, npm, git, and a Chromium-based browser. (Trainers may use pnpm locally; participants follow the commands above with npm.)

## Project layout

```text
incident-dashboard/
├── src/
│   ├── components/   # components and prepared placeholders
│   ├── context/      # prepared context files
│   ├── data/         # types and seed data
│   ├── hooks/        # hooks and prepared placeholders
│   ├── pages/        # prepared page/route files
│   ├── App.tsx
│   ├── main.tsx
│   ├── seed.ts
│   └── styles.css
├── scripts/
│   └── dev-api.mjs
├── verify-setup.sh
└── package.json
```

## What you start with

The project already includes:

- typed domain data in `src/data/`
- a local mock API for development and demos
- prepared folders for components, hooks, context, and pages
- a deliberately small, runnable scaffold without finished domain logic yet

## Task sheets

Step-by-step implementation lives under `tasks/`.

- Entry point, **three-day schedule**, core path 00–08, and optional deep dives 09–11: [`tasks/README.md`](./tasks/README.md)
- The sheets intentionally avoid spelling out solutions and build on each other; each sheet includes **Core / Stretch / Expert** tiers for mixed-speed groups.
