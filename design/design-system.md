# Design System — hello-word-A

> Source of truth: the approved `index.html`.
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2025-02-14

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-text` | `#000000` | Body text |

#### Contrast audit

Every text-on-background pair actually used. Body text ≥ 4.5:1, large text (≥ 18.66px bold or ≥ 24px) ≥ 3:1, UI borders ≥ 3:1.

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `21:1` | AA / AA Large |

### 1.2 Spacing

Base unit: `4px`. Layout uses viewport centering; no internal spacing scale is applied in approved screen.

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |

### 1.3 Typography

Font families:

- Body: `Arial, Helvetica, sans-serif`
- Headings: `Arial, Helvetica, sans-serif`
- Mono: not used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-xs` | `12px` | `1.2` | `400` | Not used |
| `--text-sm` | `14px` | `1.3` | `400` | Not used |
| `--text-base` | `16px` | `1.5` | `400` | Not used |
| `--text-lg` | `18px` | `1.5` | `400` | Not used |
| `--text-xl` | `20px` | `1.2` | `400` | Not used |
| `--text-2xl` | `40px` | `1` | `400` | Greeting text at small viewport |
| `--text-3xl` | `80px` | `1` | `400` | Greeting text at large viewport |

Heading levels are used in order and never skipped for visual sizing. Approved screen uses one `h1` only.

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | `0` | Not used |
| `--radius-md` | `0` | Not used |
| `--radius-lg` | `0` | Not used |
| `--radius-full` | `0` | Not used |
| `--border-width` | `0` | Not used |
| `--shadow-sm` | `none` | Not used |
| `--shadow-md` | `none` | Not used |
| `--shadow-lg` | `none` | Not used |
| `--duration-fast` | `0ms` | No motion |
| `--duration-base` | `0ms` | No motion |
| `--easing` | `linear` | No motion |

Motion respects `prefers-reduced-motion: reduce`: state changes remain, movement is removed. Approved screen has no motion at all.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| `sm` | `0px` | `100%` | `1` | `0` |
| `md` | `768px` | `100%` | `1` | `0` |
| `lg` | `1024px` | `100%` | `1` | `0` |
| `xl` | `1280px` | `100%` | `1` | `0` |

Z-index scale (only these values are allowed):

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | `0` |
| Dropdown | `0` |
| Modal backdrop | `0` |
| Modal | `0` |
| Toast | `0` |

## 2. Components

One subsection per reusable component. Every component lists **all** states.

### 2.1 Greeting screen

**Purpose** — full-viewport static display for centered greeting text; do not use for interactive content.

**Anatomy** — `[main] [h1]`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `--color-bg`, `--color-text` | Only screen in product |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| Default | `100vh` | `0` | `--text-2xl` / `--text-3xl` |

**States** — every row must be filled in.

| State | Visual change | Tokens |
|---|---|---|
| Default | White background, black centered text | `--color-bg`, `--color-text` |
| Hover | None | None |
| Focus (keyboard) | No interactive target; document focus does not alter layout | None |
| Active / pressed | None | None |
| Disabled | Not applicable | None |
| Loading | Not applicable | None |
| Error | Not applicable | None |
| Empty | Not applicable; content is always one text row | None |

**Accessibility** — semantic `main` landmark, `h1` for greeting, centered text remains readable at all viewport sizes.

## 3. Content and formatting

- Voice and tone: plain, neutral, no marketing copy.
- Date, time, number, and currency formats: not used.
- Capitalization rule for buttons, headings, and labels: heading text preserves source copy exactly; only heading is title case by content, not by style.
- Empty-state and error-message wording pattern: not used on this screen.

## 4. Known deviations

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Layout and components | No interactive components, no loading/error/empty states, no borders/shadows/radius, no z-index layering use | Approved design is a single static proof page | None |
| 1.4 Radius, border, shadow, motion | Tokens shown as `0` or `none` for unused categories | The mockup does not use those systems | None |
| 1.5 Layout and breakpoints | Same full-width centered layout at all sizes; no real container or column system | One-screen design needs no responsive grid | None |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2025-02-14 | Initial design system extracted from approved single-screen mockup | pending |
