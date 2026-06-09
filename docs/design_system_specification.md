# 🎨 Design System & Token Specification

This document serves as the authoritative, machine-readable specification for the blog's visual language, fluid mathematics, theme variables, and component token states.

---

## 📐 1. The Fluid Mathematical Engine

To achieve 100% fluid responsiveness without media-query breakpoints, all typography and spacing metrics leverage a Utopia-inspired linear interpolation formula. These variables map directly to custom CSS custom properties.

### 1.1 Responsive Viewport Boundaries

* **Minimum Viewport Width ($W_{min}$):** `320px` (`20rem`)
* **Maximum Viewport Width ($W_{max}$):** `1200px` (`75rem`)

### 1.2 Fluid Typography Scale

The typography scale relies on a `clamp()` calculation that transitions smoothly between mobile sizes (at $W_{min}$) and desktop sizes (at $W_{max}$).

| Token Name | CSS Custom Property | Mobile Size ($W_{min}$) | Desktop Size ($W_{max}$) | Interpolated CSS Formula | 
| ----- | ----- | ----- | ----- | ----- | 
| **Small** | `--type-size-small` | `13px` (`0.8125rem`) | `15px` (`0.9375rem`) | `clamp(0.8125rem, calc(0.2vw + 0.77rem), 0.9375rem)` | 
| **Body (Base)** | `--type-size-body` | `16px` (`1rem`) | `20px` (`1.25rem`) | `clamp(1rem, calc(0.45vw + 0.91rem), 1.25rem)` | 
| **H5 Header** | `--type-size-h5` | `16px` (`1rem`) | `19px` (`1.1875rem`) | `clamp(1rem, calc(0.28vw + 0.94rem), 1.1875rem)` | 
| **H4 Header** | `--type-size-h4` | `18px` (`1.125rem`) | `24px` (`1.5rem`) | `clamp(1.125rem, calc(0.57vw + 1.07rem), 1.5rem)` | 
| **H3 Header** | `--type-size-h3` | `22px` (`1.375rem`) | `32px` (`2rem`) | `clamp(1.375rem, calc(1.14vw + 1.15rem), 2rem)` | 
| **H2 Header** | `--type-size-h2` | `26px` (`1.625rem`) | `44.8px` (`2.8rem`) | `clamp(1.625rem, calc(2.13vw + 1.2rem), 2.8rem)` | 
| **H1 Header** | `--type-size-h1` | `32px` (`2rem`) | `64px` (`4rem`) | `clamp(2rem, calc(3.64vw + 1.27rem), 4rem)` | 

* **Line Heights:**
  * Body Text: `1.6` (`--line-height-body`)
  * Headings: `1.15` (`--line-height-heading`)
  * Compact UI Elements: `1.3` (`--line-height-tight`)

### 1.3 Fluid Spacing Scales

All margins, paddings, gaps, and structural layouts must exclusively utilize the linear progression step tokens listed below.

* **Step 1 (Micro Spacing / Gaps):** `--step-1`
  * *Formula:* `clamp(0.75rem, calc(0.11vw + 0.7rem), 0.875rem)`
* **Step 2 (Component Padding / Content Margins):** `--step-2`
  * *Formula:* `clamp(1.5rem, calc(0.2vw + 1.4rem), 1.75rem)`
* **Step 3 (Structural Component Margins):** `--step-3`
  * *Formula:* `clamp(2.25rem, calc(0.4vw + 2.1rem), 2.75rem)`
* **Step 4 (Section Gaps / Page Footers):** `--step-4`
  * *Formula:* `clamp(3rem, calc(0.91vw + 2.82rem), 4rem)`

---

## 🎨 2. Aesthetic & Color Tokens

Our theme targets a stark, high-contrast, structural aesthetic. The system is designed to support **dynamic theme toggling** via a native attribute selector.

### 2.1 Theme Swapping Protocol

* **Default State:** The site compiles and renders in **Dark Mode** by default.
* **Toggle Selector:** Light Mode is triggered globally by applying the attribute `data-theme="light"` to the `<html>` element (e.g., `<html data-theme="light">`).
* **JavaScript & System Preference:** Components must support reading a user's local theme preference from `localStorage` or falling back dynamically to their system-wide standard (`prefers-color-scheme`).

### 2.2 Theme Token Mapping

To ensure flawless color transitions, developers must always use the exact semantic variables mapped below.

| CSS Custom Property | Default State (Dark) | Swapped State (Light) | Semantic Application | 
| :--- | :--- | :--- | :--- |
| `--bg-main` | `oklch(0.12 0.015 250)` | `oklch(0.96 0.01 250)` | Primary page background | 
| `--bg-surface` | `oklch(0.16 0.018 250)` | `oklch(1.0 0 0)` | Cards, buttons, and container backgrounds | 
| `--bg-surface-elevated` | `oklch(0.20 0.015 250)` | `oklch(0.92 0.01 250)` | Pre blocks, tabs, and flyouts | 
| `--text-primary` | `oklch(0.96 0.008 250)` | `oklch(0.12 0.015 250)` | Primary titles and body prose | 
| `--text-secondary` | `oklch(0.64 0.015 250)` | `oklch(0.42 0.015 250)` | Subtitles, blockquotes, and description text | 
| `--text-muted` | `oklch(0.44 0.015 250)` | `oklch(0.52 0.015 250)` | Post timestamps and disabled elements | 
| `--brand-primary` | `oklch(0.45 0.11 250)` | `oklch(0.32 0.10 250)` | Muted slate-cobalt blue primary focus color | 
| `--brand-accent` | `oklch(0.74 0.14 85)` | `oklch(0.62 0.12 85)` | Complementary gold/tan structural partner | 
| `--brand-highlight` | `oklch(0.55 0.16 50)` | `oklch(0.48 0.13 50)` | Earthy bronze/copper spotlight element | 
| `--border-main` | `var(--text-primary)` | `var(--text-primary)` | Main geometric outline borders | 
| `--border-muted` | `oklch(0.26 0.015 250)` | `oklch(0.86 0.01 250)` | Subdued borders and horizontal rules | 

---

## 🧱 3. Interactive & UI Component Tokens

To maintain visual cohesion across the site, interactive components and layout boxes must adhere to these rigid structural design rules.

### 3.1 Structural & Physical Constraints

* **Universal Content Column Max-Width:** `68ch` (`--step-max-width`)
  * This boundary is strictly applied to the container of the article body, code samples, and image blocks to guarantee reading lines remain within an accessible 55–75 character length.
* **Border Width:** `2px` (`--size-border-pixel`)
* **Thick Border Width:** `4px` (`--size-border-thick`)
* **Physical Touch Target Minimum:** `44px` (`--size-touch-target-min`)
  * Applied as the minimum height, width, or padding boundary on all clickable/tappable elements to fully satisfy WCAG 2.2 Pointer Target Size standards.

### 3.2 Tactile Drop Shadows

Shadows must remain completely flat and hard-edged (no blurs), providing an industrial, physical feel.

* **Standard Static Drop:** `--shadow-flat`
  * *Value:* `var(--size-border-pixel) var(--size-border-pixel) 0 0 var(--border-main)`
* **Interactive Base Drop:** `--shadow-thick`
  * *Value:* `4px 4px 0 0 var(--brand-primary)`
* **Interactive Hover Drop:** `--shadow-thick-hover`
  * *Value:* `6px 6px 0 0 var(--brand-accent)`

### 3.3 Micro-Interaction & Motion Timing

Transition animations must feel physical and snappy. Under system-level motion limits, these values are immediately bypassed.

* **Transition Style (Fast):** `--transition-fast`
  * *Value:* `0.1s steps(4, end)` (Creates a retro, segmented transformation)
* **Transition Style (Smooth):** `--transition-normal`
  * *Value:* `0.15s ease-out` (For standard transforms and skip-links)
* **Instant Fallback Speed:** `--duration-instant`
  * *Value:* `0s` (Enforced globally for motion restriction compatibility)

#### 3.3.1 Environmental Motion Overrides

When a user sets their operating system preference to reduce motion (`prefers-reduced-motion: reduce`), the site must instantly eliminate non-essential animations. Transitions are swapped to `--duration-instant` to prevent inner-ear and motor-sensory triggers.

### 3.4 High-Visibility Keyboard Focus Indicators

Focus rings are customized to guarantee keyboard-only users can navigate rapidly with high physical visibility, meeting WCAG 2.1 Non-Text Contrast guidelines.

* **Focus Outline Width:** `2px` (`--focus-outline-width`)
* **Focus Outline Style:** `dashed` (`--focus-outline-style`)
* **Focus Outline Offset:** `4px` (`--focus-outline-offset`)
* **Focus Outline Color:** `var(--brand-accent)` (`--focus-outline-color`)

---

## 📝 5. Structured Metadata & Content Validation

To ensure clean validation, dynamic SEO indexing, and strict quality control, all blog content must conform to Astro's content schema constraints and map cleanly to the relational `TechArticle` metadata structures.

### 5.1 Content Collections Schema Definition (`src/content/config.ts`)

Astro strictly validates blog post frontmatter using the following Zod definition. Agents must configure this layout schema without modifications:

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    coverImage: z.string(),
    coverAlt: z.string(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    auditAssert: z
      .object({
        perf: z.number().min(0).max(100),
        a11y: z.number().min(0).max(100),
        seo: z.number().min(0).max(100),
        bestPractices: z.number().min(0).max(100),
      })
      .default({ perf: 100, a11y: 100, seo: 100, bestPractices: 100 }),
  }),
});

export const collections = { blog };
```

### 5.2 Open Graph & Social Metadata Mapping

Social media tags must resolve gracefully on all compiled article nodes:
* **Fallbacks:** If `ogTitle` or `ogDescription` are not explicitly defined in the MDX frontmatter, the render template must gracefully fall back to the primary `<title>` and `<description>` properties.
* **Cover Assets:** Open Graph preview image elements must utilize the path provided in `coverImage` paired with the accessible label in `coverAlt`.

### 5.3 Quality Gate & Lighthouse Performance Assertions (`auditAssert`)

Our deployment pipelines and evaluators log core performance indicators to prevent progressive regressions, but they do not enforce a rigid hard-stop on build tasks:
* **The Range Validation:** Standard core-web metrics (`perf`, `a11y`, `seo`, and `bestPractices`) are validated as standard percentage values between `0` and `100`.
* **Non-blocking Audits:** These parameters are stored exclusively for tracking, reporting, and structured SEO JSON-LD rendering. Builds and publishing tasks are non-blocking and will succeed even if a post scores below 90 on individual metrics during a verification cycle.
* **The Default Engine:** If not specified, the system asserts standard flawless defaults of `100` on all metrics.

### 5.4 Relational TechArticle Schema Mapping (@id Linking)

To maintain a connected graph for search engines, article render loops compile the frontmatter data above into a unified JSON-LD `@graph` block matching these structural relationships:
* **Headline Limitation:** Mapped directly from the frontmatter's validated `title` property (validated to a maximum length of 60 characters).
* **Dependencies & Difficulty:** Mapped dynamically from the post's taxonomy descriptors to feed the standard properties `dependencies` and `proficiencyLevel`.
* **Author `@id` Link:** `{ "@id": "#author" }`
* **Publisher `@id` Link:** `{ "@id": "#publisher" }`
* **Website `@id` Link:** `{ "@id": "#website" }`

---

## 🧑‍💻 6. Machine Compliance Rules for Agents

When creating, refactoring, or reviewing components, agents like **Hermes** must validate output markup against this checklist.

1. **Rule 1: No Inline Metrics:** All padding, margins, gaps, font sizes, and absolute dimension properties in Astro templates must use our declared token variables. Direct values like `12px` or `2rem` are forbidden.
2. **Rule 2: Semantic Containment:** Style cascading must not target raw element selectors globally outside of `<article>`. General page cards and interactive triggers must use the `.box` and `.btn` classes.
3. **Rule 3: Contrast Verification:** Dark surfaces (`--bg-surface-elevated`) must not display text styled with `--text-muted`. Only `--text-primary` or `--text-secondary` are valid on elevated card surfaces to maintain WCAG contrast compliance.
4. **Rule 4: Theme Independence:** Hardcoded color declarations (e.g., `background-color: #000`) are strictly prohibited in components. All colors must utilize semantic custom properties to guarantee UI elements dynamically shift when the `data-theme` changes. All custom scripts and styles must be tested to ensure the layout remains accessible and contrast-compliant in both dark and light modes.
5. **Rule 5: High-Visibility Focus Indicators:** Standard default focus outlines (`outline: none`) are prohibited unless overridden with a highly visible focus indicator using `:focus-visible` bound directly to our focus outline tokens (`--focus-outline-color`, `--focus-outline-width`, `--focus-outline-offset`).
6. **Rule 6: Motion Resiliency:** All transition animations, slide offsets, or scaling operations must be safely wrapped inside a `@media (prefers-reduced-motion: reduce)` media block that forces transition behaviors to utilize `--duration-instant`.
7. **Rule 7: Inclusive Touch Targets:** Clickable interactive controls, page links, navigation markers, and form buttons must satisfy the minimum dimensions of `--size-touch-target-min` (`44px` or `2.75rem`). When smaller inline triggers are required, structural padding block/inline expansions must be declared to enforce the safe physical boundary.
8. **Rule 8: Schema Integrity & Validation:** Agents must verify that the compiled output of any blog post template contains a valid JSON-LD `<script type="application/ld+json">` tag satisfying the exact `TechArticle` schema properties and Astro schema frontmatter rules (such as validating maximum lengths for headline/description and auditing Lighthouse assertions).
9. **Rule 9: Biome Linter & Editor Settings Adherence:** Agents are strictly required to compile, write, and format all codebase modifications using the strict configuration limits specified in `biome.json` and local editor settings. Prior to declaring any task complete or committing code:
   * **Formatting Engine:** All file outputs must strictly match an `indentWidth` of `2`, using the `space` indent style, standard single quotes (`'`) for JavaScript/TypeScript, trailing commas enabled globally, semicolons enforced (`always`), and `LF` line endings to prevent host cross-platform corruption.
   * **Import Sorting:** All script files must pass the automatic import organization run (`organizeImports` enabled).
   * **Linter Standards:** All recommended code guidelines must pass with clean exit codes. The Hermes variable override (`noUnusedVariables: "off"`) must be respected; however, no other errors may exist. Manual suppression lines (e.g., `// biome-ignore ...`) are entirely forbidden unless explicitly authorized by the human operator.
   