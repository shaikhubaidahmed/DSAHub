# Redesign V2 Page Overrides

> **PROJECT:** DSA Hub
> **Generated:** 2026-09-29 22:58:53
> **Page Type:** General

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1280px content frame with an open editorial hero
- **Grid:** Compact 3-column pattern grid and dense problem rows

### Spacing Overrides

- **Content Density:** High — optimize for information display

### Typography Overrides

- **Family:** Outfit / Work Sans / Inter fallback stack
- **Use:** Display type for the home headline; mono for counts, labels, and source metadata

### Color Overrides

- **Signal:** Restrained rose accent on an editorial black + warm paper palette
- **Rule:** Accent is reserved for navigation, links, progress, and focused rows; no gradients

### Component Overrides

- Avoid: Depend on animationend or transitionend for required state correctness
- Avoid: Make every pill clickable or encode status with color alone
- Avoid: Use a clickable div or reveal the only action on hover

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Quiet hover/focus transitions only; avoid decorative motion
- Animation: Cancel or replace prior motion; set the final semantic state directly and handle cancellation cleanup
- Content: Choose static or interactive markup from the label's meaning and ownership
- Accessibility: Prefer a button and expose pressed or selected state that matches the visible label

### Product Guardrails

- Keep the hero open and content-first rather than placing the entire homepage in a rounded card.
- Keep filters visible during long problem-list scans, but keep them single-row and compact.
- Use Lucide icons, visible focus states, reduced motion, and keyboard-friendly controls.
- Do not add parallax, decorative animation, gradients, glassmorphism, or fake user metrics.
