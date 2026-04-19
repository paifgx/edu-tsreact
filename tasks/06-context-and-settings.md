# Task sheet 06 — Context and settings

## Learning goals

- Share two concerns via **React Context**: theme and current user.
- Providers on the tree and **hooks** with a clear failure mode when the provider is missing.
- Settings page as a control surface for preferences.

## Starting point

- Routing exists.
- Settings route exists.
- Placeholders: `ThemeContext.tsx`, `UserContext.tsx`.

---

## Part A — Core (required)

### Assignment

1. **`ThemeContext`**: provider + public hook (e.g. `useTheme()`).
2. **`UserContext`**: provider + hook (e.g. `useUser()` / `useCurrentUser()`).
3. Wrap the app with **both** providers (order should not matter — pick one and document).
4. On `/settings`:
   - show current theme;
   - toggle to switch theme;
   - show current user or a **clear fallback** when none is set.

### Done when …

- theme and user are readable **without prop drilling** in at least two areas (e.g. header + settings);
- using a hook **outside** providers fails with a **clear** error (throw with message or dev-only guard).

### Quality check

- [ ] No extra state-management library.
- [ ] Defaults are consistent (initial theme / user).

---

## Part B — Stretch

- Apply theme visibly on `document.body` or a root wrapper (CSS classes like `theme-light` / `theme-dark`).
- User selection: dropdown from `users` (seed/API), not only static text.
- Persist theme in **`localStorage`** (small helpers; same key everywhere).

### Done when …

- reload preserves theme choice (if you implement persistence).

---

## Part C — Expert playground

- Discuss: when would **one** combined `AppSettingsContext` be worse than two separate contexts?

### Reflection

- Why do context mistakes often surface late? How do hook guards help?

---

## Notes

- Context is not a substitute for server state — API users vs “selected UI user” remain different topics.

## Optional

- Visible theme on root (if not Stretch).
