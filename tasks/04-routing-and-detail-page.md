# Task sheet 04 — Routing and detail page

## Goal

Structure the app into multiple pages and add a detail view for individual incidents.

## Starting point

- Data is already loading.
- `react-router-dom` is installed.
- Prepared files exist under `src/pages/`.

## Assignment

- Add the router at the app level.
- Define at least these routes:
  - `/`
  - `/incidents`
  - `/incidents/:id`
  - `/settings`
  - a fallback route for unknown paths
- Add a small navigation.
- Under `/incidents/:id`, show the details for the incident whose `id` is in the URL.
- If `id` is missing or does not exist, do not leave a broken page.

## Done when …

- navigation between pages works
- direct URL access works
- the detail page shows the correct data for an incident

## Notes

- For in-app navigation, use router components instead of plain `<a>` links.
- Handle the case where `useParams()` does not return a usable `id`.
- Keep the settings page deliberately small at this stage.

## Optional

- Visually indicate the active area in the navigation.
