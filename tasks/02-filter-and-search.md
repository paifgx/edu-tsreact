# Task sheet 02 — Filter and search

## Goal

Extend the list with two simple interactions: severity filter and text search.

## Starting point

- `IncidentList` already renders correctly.
- Data still comes from local seed data.
- `SearchBar.tsx` and `SeverityFilter.tsx` are prepared.

## Assignment

- Build `SeverityFilter` as a controlled `<select>`.
- Build `SearchBar` as a controlled text input.
- Put the required state in `App.tsx`.
- Filter incidents during render.
- The filter logic must combine:
  - severity
  - search text in title **or** description
- Pass only the filtered data to `IncidentList`.

## Done when …

- search updates live
- the severity filter works
- both filters work together

## Notes

- Do not store the filtered list as separate state if you can compute it from other state.
- The special case `all` deserves explicit handling.
- Search should treat upper and lower case robustly.

## Optional

- Add a “Clear filters” button.
