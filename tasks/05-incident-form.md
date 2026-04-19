# Task sheet 05 — Incident form

## Learning goals

- One form for **create** and **edit** (one component, two modes).
- Controlled fields, validation, submit without full page reload.
- After save: sensible navigation back to list or detail.

## Starting point

- Routing and detail page work.
- `IncidentForm.tsx` exists as a placeholder.
- API: `POST /api/incidents`, `PUT /api/incidents/:id` — see README.

---

## Part A — Core (required)

### Assignment

1. Controlled form with at least:
   - **title**
   - **description**
   - **severity**
   - **tags** (may start as a comma-separated string in state — split later)
2. **One** form component for “new” and “edit” (distinguish via route param or prop).
3. Add routes, e.g. `/incidents/new` and `/incidents/:id/edit` — or equivalent consistent paths.
4. Edit mode: **prefill** from current server data (after loading the incident).
5. Validation: **title** must not be empty — visible error at field or summary.
6. After successful save: navigate to `/incidents` or to detail — pick one approach and **stay consistent** (a short code comment is enough).

### Done when …

- new incidents can be created;
- existing incidents can be edited;
- invalid input is **visible**;
- submit does not cause a full browser reload.

### Quality check

- [ ] `preventDefault` on submit.
- [ ] Submit button **disabled** or loading during request (minimal recommendation).

---

## Part B — Stretch

- **Cancel** returns to list or previous page — without saving.
- Surface server errors (4xx/5xx) as readable message above the form.
- Tags: trim, dedupe, drop empty tokens.

### Done when …

- a deliberate failed PUT (e.g. bad id) does not fail silently.

---

## Part C — Expert playground

- **Optimistic UI**: update title immediately, rollback on error (only if you can explain the risks).
- Compare **controlled vs uncontrolled** with `defaultValue` for one field — why is controlled the course default?

### Reflection

- Where do you draw the line between form state and domain state on a large form?

---

## Notes

- Do not merge form state and domain state unnecessarily — also avoid three duplicated sources of truth.

## Optional

- Cancel button (if not Stretch).
