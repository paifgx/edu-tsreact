# Task sheet 06 — Context and settings

## Goal

Share two cross-cutting pieces of information across the app: theme and current user.

## Starting point

- Routing is in place.
- The settings page already exists.
- `ThemeContext.tsx` and `UserContext.tsx` are prepared.

## Assignment

- Implement a `ThemeContext` with a provider and a dedicated hook.
- Implement a `UserContext` with a provider and a dedicated hook.
- Wrap the app with both providers.
- On the settings page, show:
  - the current theme
  - a toggle to switch theme
  - the current user or a sensible fallback

## Done when …

- the theme is available via context
- the settings page reads the current user from context
- a missing provider does not go unnoticed

## Notes

- A context without sensible guard rails hides errors quickly.
- Theme and user are two different concerns.
- Do not add an extra state library here.

## Optional

- Apply the theme visibly on `body` or a root container.
