# Task sheet 10 — Accessibility and UX polish

## When to use this sheet

Alongside later sheets or after sheet 08 — when you want to polish a “done” feature without inventing new business logic.

## Learning goals

- Make forms and interactive lists **operable** (keyboard, labels, focus).
- Make loading and error states understandable for screen reader users (baseline).
- Improve visual clarity without importing an external design system.

---

## Part A — Core (required)

### Assignment

1. **All** interactive controls you built: visible `<label htmlFor=…>` or `aria-label` where no visible label fits.
2. **Keyboard**: navigate list and filters without a mouse (logical tab order; no trap in invisible overlays).
3. **Invalid fields**: link error text with `aria-invalid` and `aria-describedby` when validation fails.
4. **Loading**: region with `aria-busy` or `role="status"` / live region for “Loading…” (minimal is fine).

### Done when …

- you can complete navigation → filter → open detail → submit a form **using only the keyboard**;
- Lighthouse Accessibility (Chrome DevTools) shows **no** critical red failures on your core pages — or you can explain remaining warnings.

---

## Part B — Stretch

- **Focus management**: after submit or navigation, move focus to the destination heading or first sensible region (`useRef` + `focus()` on an allowed element).
- Contrast and font size: respect `prefers-reduced-motion` once (disable or reduce motion).

### Done when …

- at least one focus decision is documented (short comment).

---

## Part C — Expert playground

- Short **audit report** (one page): 5 issues found + priority.
- Compare your app to **WCAG** thinking at “team should not make it worse” level — no certification required.

### Reflection

- Where did you use `div onClick` — what would be more semantic?

---

## Notes

- Accessibility is not optional for many public-sector and enterprise users — these habits matter in real work.
