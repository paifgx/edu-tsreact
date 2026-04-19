# Task sheet 05 — Incident form

## Goal

Build a single form that can both create new incidents and edit existing ones.

## Starting point

- Routing and the detail page work.
- `IncidentForm.tsx` exists as a placeholder.

## Assignment

- Build a controlled form with at least these fields:
  - title
  - description
  - severity
  - tags
- Use **one** form component for create and edit.
- Add suitable routes for “new” and “edit.”
- When editing, pre-fill existing values.
- Validate at least: title must not be empty.
- After a successful save, navigate back to the incident list.

## Done when …

- new incidents can be created
- existing incidents can be edited
- the form gives visible feedback for invalid data

## Notes

- Keep form state and domain state separate when it simplifies input.
- `tags` do not need to live as `string[]` in form state from day one.
- Remember that form submit can otherwise reload the page in the browser.

## Optional

- Add a cancel button that navigates back.
