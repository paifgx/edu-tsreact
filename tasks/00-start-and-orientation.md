# Task sheet 00 — Start and orientation

## Learning goals

- Navigate the project confidently in the editor and the browser.
- Know where domain types, entry points, and extension points live.
- Understand how the frontend and mock API fit together.

## Starting point

- Repository is installed (`npm install` completed).
- The app should start locally.
- No feature implementation yet.

---

## Part A — Core (required)

### Assignment

1. Start the app with `npm run dev` and open it in the browser.
2. Open the project in your editor and locate `src/main.tsx` and `src/App.tsx`.
3. Read `src/data/incidents.ts` and understand the types (`Severity`, `Status`, `Incident`, `User`).
4. Inspect the prepared folders: `src/components/`, `src/pages/`, `src/hooks/`, `src/context/`.
5. Start the mock API **once** with `npm run dev:api` (second terminal) so you know how it runs later. Optionally hit `curl http://localhost:4000/api/health` or test the URL in the browser (depending on proxy setup).

### Done when …

- the app is visible in the browser;
- you can point to app entry, types, and seed data paths;
- you know how to start the mock API.

---

## Part B — Stretch

- Open `package.json`: what scripts exist? What does `npm run verify` do?
- Read the project README: what endpoints does the API expose?
- Sketch the data flow in 3–5 boxes: browser → Vite → optional proxy → `dev-api.mjs` → JSON.

### Done when …

- you can explain why the list will later call `/api/incidents` while files under `src/data/` still represent “offline” data.

---

## Part C — Expert playground

- Compare `src/data/incidents.json` with an API response (browser DevTools → Network, once you use fetch later): which fields match?
- Consider: where would you put business rules (e.g. allowed severity values) — only in components or also in helpers?

### Reflection (short notes or group discussion)

- Which three files will you open most often over the next two days? Why?

---

## Notes

- Do not change domain logic in this sheet — orientation only.
- Goal is confidence in the repo, not your first implementation.
