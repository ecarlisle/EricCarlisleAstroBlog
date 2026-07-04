# AstroBlog compact source/style export

Generated: 2026-07-04

This export contains only the visual source needed to understand the site shell, styling system, shared components, primary routes, and one representative MDX article. Generated output, dependencies, lockfiles, build artifacts, and unrelated content are excluded.

## Included files

- `src/styles/components.css`
- `src/styles/feed.css`
- `src/styles/global.css`
- `src/styles/pagefind.css`
- `src/layouts/BlogPost.astro`
- `src/components/BaseHead.astro`
- `src/components/Card.astro`
- `src/components/Footer.astro`
- `src/components/FormattedDate.astro`
- `src/components/GoogleAnalytics.astro`
- `src/components/Header.astro`
- `src/components/HeaderLink.astro`
- `src/components/PaginationNav.astro`
- `src/components/PostGrid.astro`
- `src/components/SchemaOrg.astro`
- `src/components/ShareStrip.astro`
- `src/components/SocialLinks.astro`
- `src/components/TagFilterBar.astro`
- `src/components/ThemeToggle.astro`
- `src/components/Webmentions.astro`
- `src/pages/index.astro`
- `src/pages/blog.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/blog/page/[page].astro`
- `src/content/blog/markdown-style-guide.mdx`

### `src/styles/components.css`

``````css
.card {
  position: relative;
  padding: var(--space-component);
  background: var(--bg-surface);
  border: var(--size-border-pixel) solid var(--bg-surface-elevated);
  border-radius: var(--radius-lg);
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal),
    border-color var(--transition-normal);
}

.card .card-title {
  margin: 0;
  font-size: var(--type-size-card-title);
  line-height: 1.2;
}

.card .prose > p:not(.meta) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px oklch(0 0 0 / 0.15);
  border-color: var(--color-action);
}

.card > * + * {
  margin-top: var(--space-inline-strong);
}

.card-image {
  margin: calc(-1 * var(--space-component));
  margin-bottom: var(--space-inline-strong);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
}

.card-image img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 1;
  transition: transform var(--transition-slow);
}

.card:hover .card-image img {
  transform: scale(1.03);
}

.callout {
  padding: var(--space-component);
  border-left: var(--size-border-thick) solid var(--color-link);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
}

.callout strong {
  color: var(--text-primary);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.2em 0.6em;
  font-family: var(--font-mono);
  font-size: var(--type-size-small);
  border-radius: 999px;
  background: var(--bg-surface-elevated);
  color: var(--text-secondary);
  text-decoration: none;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.tag:hover {
  background: var(--color-action);
  color: var(--bg-main);
}

.meta {
  font-size: var(--type-size-small);
  color: var(--text-muted);
  display: flex;
  gap: var(--space-inline);
  flex-wrap: wrap;
  align-items: center;
}

.meta time,
.meta strong {
  font-family: var(--font-mono);
  color: var(--text-secondary);
  font-size: 0.9375em;
}

.meta .tag {
  font-family: var(--font-mono);
  font-size: inherit;
}

.grid {
  display: grid;
  gap: var(--space-component);
}

.grid--cards {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid--cards > :first-child {
  grid-column: 1 / -1;
}

.grid--cards > :first-child .card-title {
  font-size: var(--type-size-featured-card-title);
}

.collection-header {
  margin-bottom: var(--space-component-lg);
}

.collection-header h1 {
  margin-bottom: var(--space-inline);
}

.collection-description {
  margin-bottom: 0;
  color: var(--text-secondary);
}

@media (max-width: 720px) {
  .grid--cards {
    grid-template-columns: 1fr;
  }

  .grid--cards > :first-child {
    grid-column: auto;
  }
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-inline) var(--space-component);
  border-radius: var(--radius-md);
  background: var(--color-action);
  color: var(--bg-surface);
  border: none;
  text-decoration: none;
  font-size: var(--type-size-body);
  cursor: pointer;
  transition:
    background var(--transition-fast),
    transform var(--transition-fast);
}

.button:hover {
  background: var(--color-action-hover);
  transform: translateY(-1px);
}

.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-component);
  margin-top: var(--space-xl);
  padding-top: var(--space-component);
  border-top: var(--size-border-pixel) solid var(--border-main);
}

.post-nav a {
  padding: var(--space-component);
  background: var(--bg-surface);
  border: var(--size-border-pixel) solid var(--border-muted);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition:
    border-color var(--transition-fast),
    background var(--transition-fast);
}

.post-nav a:hover {
  border-color: var(--brand-primary);
  background: var(--bg-surface-elevated);
}

.post-nav .post-nav-label {
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--text-muted);
  font-size: var(--type-size-small);
}

.post-nav .post-nav-title {
  font-family: var(--font-headers);
  font-weight: 700;
}

.post-nav .post-nav-next {
  text-align: right;
}

@media (max-width: 720px) {
  .post-nav {
    grid-template-columns: 1fr;
  }

  .post-nav .post-nav-next {
    text-align: left;
  }
}

.toc {
  position: sticky;
  top: calc(var(--header-height, 4.5rem) + var(--space-component));
  font-size: var(--type-size-small);
}

.toc h3 {
  margin-bottom: var(--space-inline);
  color: var(--text-muted);
  font-size: inherit;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toc nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc nav li {
  margin-bottom: var(--space-xs);
}

.toc nav a {
  display: block;
  padding: 0.2em 0;
  padding-left: var(--space-inline);
  color: var(--text-secondary);
  border-left: var(--size-border-pixel) solid transparent;
  text-decoration: none;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.toc nav a:hover,
.toc nav a.active {
  color: var(--color-action);
  border-left-color: var(--color-action);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-component);
  color: var(--text-muted);
  font-size: var(--type-size-small);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-link);
}

.reading-time {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--type-size-small);
}

.reading-time::before {
  content: "\00b7";
  margin: 0 var(--space-inline);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-component);
  max-width: var(--layout-max-width);
  margin-inline: auto;
  margin-bottom: var(--space-section);
}

.stat {
  padding: var(--space-component);
  text-align: center;
  background: var(--bg-surface);
  border: var(--size-border-pixel) solid var(--border-muted);
  border-radius: var(--radius-md);
}

.stat-value {
  display: block;
  color: var(--color-action);
  font-family: var(--font-mono);
  font-size: var(--type-size-h3);
  font-weight: 700;
  line-height: 1.2;
}

.stat-label {
  display: block;
  margin-top: var(--space-xs);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: var(--type-size-small);
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
``````

### `src/styles/feed.css`

``````css
ul.grid {
  list-style: none;
  padding: 0;
  margin: 0;
}

#no-results {
  text-align: center;
  margin-bottom: var(--space-component);
}
``````

### `src/styles/global.css`

``````css
@import "@fontsource-variable/inter/wght.css";
@import "@fontsource-variable/plus-jakarta-sans/wght.css";
@import "@fontsource-variable/fira-code/wght.css";
@import "./components.css";
@import "./pagefind.css";

:root {
  /* Fonts */
  --font-copy: "Inter Variable", system-ui, sans-serif;
  --font-headers: "Plus Jakarta Sans Variable", system-ui, sans-serif;
  --font-mono: "Fira Code Variable", ui-monospace, monospace;

  /* Type sizes */
  --type-size-body: clamp(1rem, calc(0.45vw + 0.91rem), 1.25rem); /* 16px -> 20px */
  --type-size-small: clamp(0.8125rem, calc(0.2vw + 0.77rem), 0.9375rem); /* 13px -> 15px */
  --type-size-h1: clamp(2rem, calc(3.64vw + 1.27rem), 4rem); /* 32px -> 64px */
  --type-size-h2: clamp(1.625rem, calc(2.13vw + 1.2rem), 2.8rem); /* 26px -> 45px */
  --type-size-h3: clamp(1.375rem, calc(1.14vw + 1.15rem), 2rem); /* 22px -> 32px */
  --type-size-h4: clamp(1.125rem, calc(0.57vw + 1.07rem), 1.5rem); /* 18px -> 24px */
  --type-size-h5: clamp(1rem, calc(0.28vw + 0.94rem), 1.1875rem); /* 16px -> 19px */
  --type-size-base: var(--type-size-body);
  --type-size-large: clamp(1.125rem, calc(0.35vw + 1.05rem), 1.375rem);
  --type-size-card-title: clamp(1.375rem, calc(0.7vw + 1.2rem), 2rem);
  --type-size-featured-card-title: clamp(1.75rem, calc(1.25vw + 1.45rem), 2.75rem);
  --type-size-blockquote: 1.1em;

  /* Line heights */
  --line-height-body: 1.65;
  --line-height-h1: 1.3;
  --line-height-h2: 1.35;
  --line-height-h3: 1.45;
  --line-height-h4: 1.55;
  --line-height-h5: 1.6;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* ========================================================================
     Warm Dark Theme (OKLCH) — amber/coral editorial palette
     ======================================================================== */
  --bg-main: oklch(0.12 0.015 280);
  --bg-surface: oklch(0.16 0.02 280);
  --bg-surface-elevated: oklch(0.2 0.025 280);

  --text-primary: oklch(0.95 0.008 280);
  --text-secondary: oklch(0.77 0.015 280);
  --text-muted: oklch(0.72 0.02 280);

  /* Primary Amber */
  --brand-primary: oklch(0.64 0.16 75);
  /* Accent Coral */
  --brand-accent: oklch(0.6 0.18 35);
  /* Highlight Chartreuse */
  --brand-highlight: oklch(0.81 0.15 110);
  /* Anchor Slate */
  --neutral-anchor: oklch(0.58 0.08 230);
  /* Interaction Cerulean */
  --accent-cold: oklch(0.69 0.15 250);

  --border-main: oklch(0.25 0.025 280);
  --border-muted: oklch(0.19 0.015 280);
  --border-control: oklch(0.52 0.04 280);

  /* Vertical rhythm follows the fluid body line box: 26.4px -> 33px. */
  --rhythm: clamp(1.65rem, calc(0.75vw + 1.5rem), 2.0625rem);

  /* Spacing — clean multiples of the baseline rhythm */
  --space-xs: calc(var(--rhythm) * 0.5);
  --space-sm: calc(var(--rhythm) * 0.75);
  --space-md: calc(var(--rhythm) * 1);
  --space-lg: calc(var(--rhythm) * 1.5);
  --space-xl: calc(var(--rhythm) * 2);

  /* Semantic spacing */
  --space-inline: var(--space-xs);
  --space-inline-strong: var(--space-sm);
  --space-component: var(--space-md);
  --space-component-lg: var(--space-lg);
  --space-section: calc(var(--rhythm) * 2.5);
  --space-layout: calc(var(--rhythm) * 3);

  /* Semantic color roles */
  --color-link: var(--brand-accent);
  --color-link-hover: var(--brand-highlight);
  --color-action: var(--brand-primary);
  --color-action-hover: var(--brand-highlight);
  --color-focus: var(--brand-accent);
  --color-success: var(--brand-highlight);

  --focus-outline-width: var(--size-border-pixel);
  --focus-outline-style: dashed;
  --focus-outline-color: var(--color-focus);
  --focus-outline-offset: 4px;

  /* Transition & motion tokens */
  --transition-fast: 0.15s ease-out;
  --transition-normal: 0.25s ease-out;
  --transition-slow: 0.4s ease-out;

  /* Structural sizing tokens */
  --size-border-pixel: 2px;
  --size-border-thick: 4px;
  --size-touch-target-min: 44px;

  /* Layout */
  --layout-max-width: 68ch;
  --layout-max-width-wide: 75rem;

  /* Breakpoints */
  --bp-mobile: 720px;
}

/* ========================================================================
   Light theme: explicit user toggle.
   ======================================================================== */
[data-theme="light"] {
  --bg-main: oklch(0.985 0.003 280);
  --bg-surface: oklch(1 0 0);
  --bg-surface-elevated: oklch(0.92 0.008 280);

  --text-primary: oklch(0.13 0.015 280);
  --text-secondary: oklch(0.25 0.02 280);
  --text-muted: oklch(0.38 0.025 280);

  /* Rich Amber */
  --brand-primary: oklch(0.55 0.15 75);
  /* Deep Coral */
  --brand-accent: oklch(0.46 0.16 35);
  /* High-Contrast Chartreuse */
  --brand-highlight: oklch(0.45 0.14 110);
  /* Dark Slate Anchor */
  --neutral-anchor: oklch(0.35 0.06 230);
  /* Deep Interactive Cerulean */
  --accent-cold: oklch(0.52 0.14 250);

  --border-main: oklch(0.85 0.01 280);
  --border-muted: oklch(0.92 0.005 280);
  --border-control: oklch(0.62 0.03 280);
}

html {
  box-sizing: border-box;
  min-height: 100%;
  color-scheme: dark light;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

img {
  max-width: 100%;
  height: auto;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* =========================
   PAGE STRUCTURE
   ========================= */

body {
  margin: 0;
  padding: 0;
  background: var(--bg-main);
  color: var(--text-primary);
  font-family: var(--font-copy);
  font-size: var(--type-size-body);
  line-height: var(--line-height-body);
  text-align: left;
  overflow-wrap: break-word;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-frame {
  padding: var(--space-component);
}

main {
  max-width: var(--layout-max-width-wide);
  margin-inline: auto;
  padding: var(--space-layout) var(--space-component);
  flex: 1;
}

:focus-visible {
  outline: var(--size-border-pixel) dashed var(--color-focus);
  outline-offset: 4px;
}

::selection {
  background: var(--brand-primary);
  color: var(--bg-main);
}

/* =========================
   TYPOGRAPHY
   ========================= */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-headers);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

h1,
h2,
h3 {
  text-wrap: balance;
}

h1 {
  font-size: var(--type-size-h1);
  line-height: var(--line-height-h1);
  margin-bottom: calc(var(--rhythm) * 1);
}
h2 {
  font-size: var(--type-size-h2);
  line-height: var(--line-height-h2);
  margin-top: calc(var(--rhythm) * 2);
  margin-bottom: calc(var(--rhythm) * 1);
}
h3 {
  font-size: var(--type-size-h3);
  line-height: var(--line-height-h3);
  margin-top: calc(var(--rhythm) * 1.5);
  margin-bottom: calc(var(--rhythm) * 0.5);
}
h4 {
  font-size: var(--type-size-h4);
  line-height: var(--line-height-h4);
  margin-top: calc(var(--rhythm) * 1.5);
  margin-bottom: calc(var(--rhythm) * 0.5);
}
h5 {
  font-size: var(--type-size-h5);
  line-height: var(--line-height-h5);
  margin-top: calc(var(--rhythm) * 1);
  margin-bottom: calc(var(--rhythm) * 0.5);
}

strong,
b {
  font-weight: 700;
}
em,
i {
  font-style: italic;
}

a {
  color: var(--color-link);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-link-hover);
}

.prose {
  margin-inline: auto;
}

p {
  margin-bottom: var(--space-component);
}

.prose p,
.prose li {
  max-width: var(--layout-max-width);
}

.prose p {
  line-height: var(--line-height-body);
  text-wrap: pretty;
}

.prose h2,
.prose h3 {
  margin-top: var(--space-section);
}

code {
  padding: 0.2em 0.4em;
  background-color: var(--bg-surface);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.95em;
}

pre {
  margin-bottom: var(--space-component);
  padding: var(--space-component);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  border: 1px solid var(--border-main);
  overflow-x: auto;
}

div.expressive-code {
  margin-bottom: var(--space-component);
}

blockquote {
  border-left: 4px solid var(--color-link);
  padding: 0 var(--space-component);
  margin: var(--space-section) 0;
  font-size: var(--type-size-blockquote);
  color: var(--text-secondary);
}

hr {
  border: none;
  border-top: 1px solid var(--border-main);
}

@media (max-width: 720px) {
  main {
    padding: var(--space-component);
  }
}

/* Skip-link */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-component);
  z-index: 9999;
  padding: var(--space-inline) var(--space-component);
  background: var(--bg-surface);
  color: var(--text-primary);
  border: var(--size-border-pixel) solid var(--color-focus);
  font-weight: 700;
  text-decoration: none;
  transition: top var(--transition-normal);
}

.skip-link:focus {
  top: var(--space-component);
}

.sr-only {
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  white-space: nowrap;
}

/* =========================
   READING PROGRESS BAR
   ========================= */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  height: 3px;
  background: var(--color-link);
  width: 0%;
  pointer-events: none;
  transition: width 50ms linear;
}

/* =========================
   CARD ANIMATIONS
   ========================= */
@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter {
  animation: card-enter 0.4s ease-out both;
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .card-enter {
      animation: card-enter 0.6s ease-out both;
      animation-timeline: view();
      animation-range: entry 0% entry 25%;
    }
  }
}
``````

### `src/styles/pagefind.css`

``````css
/* Reserve space to prevent CLS before Pagefind hydrates */
pagefind-modal {
  display: block;
  min-height: 0;
}

/* ========================================================================
   Pagefind Component UI — map --pf-* vars to design tokens
   Uses :root:root to beat Pagefind's own :root and [data-pf-theme="dark"]
   specificity (0,2,0 vs 0,1,1).
   ======================================================================== */
:root:root {
  --pf-text: var(--text-primary);
  --pf-text-secondary: var(--text-secondary);
  --pf-text-muted: var(--text-muted);
  --pf-background: var(--bg-surface);
  --pf-border: var(--border-main);
  --pf-border-focus: var(--brand-primary);
  --pf-skeleton: var(--bg-surface);
  --pf-skeleton-shine: var(--bg-surface-elevated);
  --pf-hover: oklch(0.22 0.025 280);
  --pf-mark: var(--brand-highlight);
  --pf-scroll-shadow: rgba(255, 255, 255, 0.08);

  --pf-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --pf-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --pf-shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.5);

  --pf-outline-focus: var(--brand-primary);
  --pf-modal-backdrop: rgba(0, 0, 0, 0.7);
  --pf-border-radius: var(--radius-lg);
  --pf-font: var(--font-copy);
  --pf-modal-max-width: 640px;
}

:root:root[data-theme="light"] {
  --pf-hover: oklch(0.92 0.008 280);
  --pf-mark: var(--brand-highlight);
  --pf-scroll-shadow: rgba(0, 0, 0, 0.08);

  --pf-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --pf-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --pf-shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.2);

  --pf-modal-backdrop: rgba(0, 0, 0, 0.5);
}

/* Header search trigger — match theme toggle styling.
   Pagefind uses :is(*,#\#):is(*,#\#):is(*,#\#) for (0,3,0). Match it. */
:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger {
  display: flex;
  align-items: center;
  width: 44px;
  min-width: 44px;
}

:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger .pf-trigger-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background var(--transition-fast);
}

:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger .pf-trigger-btn:hover {
  color: var(--brand-primary);
  background: transparent;
}

:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger .pf-trigger-btn:focus-visible {
  outline: var(--size-border-pixel) dashed var(--brand-accent);
  outline-offset: 3px;
}

:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger .pf-trigger-icon {
  width: 20px;
  height: 20px;
  background: currentColor;
  -webkit-mask-image: var(--pf-icon-search);
  mask-image: var(--pf-icon-search);
  -webkit-mask-size: 100%;
  mask-size: 100%;
}

:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger .pf-trigger-text,
:is(*, #\#):is(*, #\#):is(*, #\#) pagefind-modal-trigger .pf-trigger-shortcut {
  display: none;
}
``````

### `src/layouts/BlogPost.astro`

``````astro
---
import { Image } from 'astro:assets';
import BaseHead from '@components/BaseHead.astro';
import Footer from '@components/Footer.astro';
import FormattedDate from '@components/FormattedDate.astro';
import Header from '@components/Header.astro';
import PaginationNav from '@components/PaginationNav.astro';
import ShareStrip from '@components/ShareStrip.astro';
import TagFilterBar from '@components/TagFilterBar.astro';
import Webmentions from '@components/Webmentions.astro';
import type { TagData } from '@lib/blog-utils';
import type { Webmention } from '@lib/webmentions';
import type { ImageMetadata } from 'astro';

interface Props {
  title: string;
  description: string;
  pageType?: 'article' | 'about' | 'contact' | 'portfolio';
  pubDate?: Date;
  updatedDate?: Date;
  heroImage?: ImageMetadata;
  coverAlt?: string;
  tags?: string[];
  socialTitle?: string;
  socialDescription?: string;
  socialImage?: ImageMetadata;
  twitterHandle?: string;
  share?: { enabled?: boolean; networks?: string[]; scheduledFor?: Date };
  wordCount?: number;
  prevPost?: { title: string; slug: string };
  nextPost?: { title: string; slug: string };
  tagData?: TagData;
  webmentions?: Webmention[];
}

const {
  title,
  description,
  pubDate,
  updatedDate,
  heroImage,
  coverAlt,
  tags,
  socialTitle,
  socialDescription,
  socialImage,
  twitterHandle,
  wordCount = 0,
  pageType = 'article',
  prevPost,
  nextPost,
  share,
  tagData,
  webmentions,
} = Astro.props;

const readingTimeMin = Math.ceil(wordCount / 200);
const pageUrl = new URL(Astro.url.pathname, Astro.site).href;
---

<html lang="en">
	<head>
		<BaseHead
      {title}
      {description}
      {socialTitle}
      {socialDescription}
      image={socialImage ?? heroImage}
      {pageType}
      {pubDate}
      {updatedDate}
      {tags}
      {wordCount}
      {twitterHandle}
    />
	<style>
		.hero-image {
			width: 100%;
      max-width: 1020px;
      margin: 0 auto var(--space-section);
		}

		.hero-image img {
			display: block;
			margin: 0 auto;
			border-radius: var(--radius-lg);
		}

		.post-layout {
			display: grid;
			grid-template-columns: 1fr;
			gap: var(--space-component-lg);
      position: relative;
		}

		@media (min-width: 1024px) {
			.post-layout {
				grid-template-columns: 1fr 220px;
			}

			.post-layout .post-content {
				grid-column: 1;
        min-width: 0;
			}

			.post-layout .post-sidebar {
				grid-column: 2;
			}

			.post-layout--no-sidebar {
				grid-template-columns: 1fr;
			}

			.post-sidebar-inner {
				position: sticky;
				top: var(--space-component-lg);
			}

			.sidebar-share {
				padding: var(--space-component) 0 var(--space-component);
				margin-bottom: var(--space-component);
				border-bottom: var(--size-border-pixel) solid var(--border-main);
			}

			.sidebar-share :global(.share) {
				padding: 0;
				justify-content: flex-start;
			}
		}

		.prose {
			padding: var(--space-component);
		}

		:global(.prose--portfolio) {
			padding: 0;
		}

    .page-header {
      max-width: var(--layout-max-width);
      margin: 0 auto var(--space-component-lg);
      padding-top: var(--space-component);
    }

    .page-header--article {
      max-width: 1020px;
    }

    .page-header--portfolio {
      max-width: none;
    }

    .page-header h1 {
      max-width: 20ch;
    }

		.date {
			margin-bottom: var(--space-xs);
			color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 0;
      font-family: var(--font-mono);
		}

		.last-updated-on {
			font-style: italic;
      width: 100%;
		}

    .article-tags {
      margin-top: var(--space-sm);
      text-align: center;
    }
	</style>
	</head>

	<body>
    {pageType === 'article' && (
      <div class="reading-progress" id="reading-progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Reading progress"></div>
    )}
		<a href="#main-content" class="skip-link">Skip to main content</a>
		<Header />
		<main id="main-content" tabindex="-1">
      {pageType === 'article' && (
        <a href="/blog" class="back-link">&larr; Back to all posts</a>
      )}
			<article>
        <header
          class:list={[
            'page-header',
            pageType === 'article' ? 'page-header--article' : 'page-header--standard',
            pageType === 'portfolio' && 'page-header--portfolio',
          ]}
        >
          {pageType === 'article' && pubDate && (
            <div class="date">
              <FormattedDate date={pubDate} />
              {readingTimeMin > 0 && <span class="reading-time">{readingTimeMin} min read</span>}
              {updatedDate && (
                <div class="last-updated-on">
                  Last updated on <FormattedDate date={updatedDate} />
                </div>
              )}
            </div>
          )}
          <h1>{title}</h1>
          <hr />
        </header>
        {heroImage && (
          <div class="hero-image">
            <Image
              width={1020}
              height={510}
              src={heroImage}
              alt={coverAlt || title}
              widths={[510, 765, 1020]}
              sizes="(min-width: 1200px) 1020px, (min-width: 720px) calc(100vw - 3.5rem), calc(100vw - 3rem)"
            />
          </div>
        )}
				<div class:list={['post-layout', pageType !== 'article' && 'post-layout--no-sidebar']}>
					<div class="post-content">
						<div class:list={['prose', pageType === 'portfolio' && 'prose--portfolio']}>
							<slot />
						</div>

            {pageType === 'article' && tags && tags.length > 0 && (
              <div class="prose article-tags">
                <TagFilterBar tags={tags} tagData={tagData} />
              </div>
            )}

            {pageType === 'article' && (prevPost || nextPost) && (
              <PaginationNav
                prev={prevPost ? { url: `/blog/${prevPost.slug}/`, label: '← Previous', title: prevPost.title } : undefined}
                next={nextPost ? { url: `/blog/${nextPost.slug}/`, label: 'Next →', title: nextPost.title } : undefined}
              />
            )}

            {pageType === 'article' && webmentions && (
              <Webmentions mentions={webmentions} />
            )}
					</div>

          {pageType === 'article' && (
            <aside class="post-sidebar">
              <div class="post-sidebar-inner">
                {share?.enabled !== false && (
                  <div class="sidebar-share">
                    <ShareStrip {title} {pageUrl} />
                  </div>
                )}
                <div class="toc" id="table-of-contents">
                  <h3>On this page</h3>
                  <nav aria-label="Table of contents">
                    <ul id="toc-list"></ul>
                  </nav>
                </div>
              </div>
            </aside>
          )}
				</div>
			</article>
		</main>
		<Footer />
		<pagefind-modal></pagefind-modal>
	</body>
</html>

<script>
  const progressBar = document.getElementById('reading-progress') as HTMLDivElement;

  function updateProgress(): void {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', String(Math.round(progress)));
  }

  if (progressBar) {
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  const article = document.querySelector('article');
  const tocList = document.getElementById('toc-list');
  if (article && tocList) {
    const headings = article.querySelectorAll('.post-content h2, .post-content h3');
    const items: Array<{ id: string; text: string; level: number }> = [];

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id =
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || '';
      }
      items.push({
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3,
      });
    });

    if (items.length > 0) {
      items.forEach((item) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${item.id}`;
        link.textContent = item.text;
        if (item.level === 3) {
          link.style.paddingLeft = 'var(--space-component)';
        }
        li.appendChild(link);
        tocList.appendChild(li);
      });

      const tocLinks = tocList.querySelectorAll('a');
      function updateActiveToc(): void {
        let currentId = '';
        items.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element && element.getBoundingClientRect().top < 100) {
            currentId = item.id;
          }
        });
        tocLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
      }
      window.addEventListener('scroll', updateActiveToc, { passive: true });
      updateActiveToc();
    } else {
      const toc = document.getElementById('table-of-contents') as HTMLElement;
      toc.style.display = 'none';
    }
  }
</script>
``````

### `src/components/BaseHead.astro`

``````astro
---
// Import the global.css file here so that it is included on
// all pages through the use of the <BaseHead /> component.
import '../styles/global.css';
import FallbackImage from '@images/og-image.jpg';
import type { ImageMetadata } from 'astro';
import PagefindConfig from 'astro-pagefind/components/PagefindConfig.astro';
import { AUTHOR_GITHUB, SITE_TITLE, WEBMENTION_IO_DOMAIN } from '../consts';
import GoogleAnalytics from './GoogleAnalytics.astro';
import SchemaOrg from './SchemaOrg.astro';

interface Props {
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
  image?: ImageMetadata;
  pageType?:
    | 'homepage'
    | 'about'
    | 'contact'
    | 'portfolio'
    | 'article'
    | 'collection'
    | 'not-found';
  collectionType?: 'main-feed' | 'tag-filter' | 'tags-index';
  tagName?: string;
  posts?: Array<{ title: string; url: string }>;
  pubDate?: Date;
  updatedDate?: Date;
  tags?: string[];
  wordCount?: number;
  twitterHandle?: string;
  robots?: string;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const {
  title,
  description,
  socialTitle,
  socialDescription,
  image = FallbackImage,
  pageType,
  collectionType,
  tagName,
  posts,
  pubDate,
  updatedDate,
  tags,
  wordCount,
  twitterHandle,
  robots = 'index, follow',
} = Astro.props;
---

<!-- Theme: apply stored preference before first paint to prevent flash -->
<script is:inline>
  (function () {
    var t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
  })();
</script>

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="sitemap" href="/sitemap-index.xml" />
<link rel="webmention" href={`https://webmention.io/${WEBMENTION_IO_DOMAIN}/webmention`} />
<link rel="me" href={AUTHOR_GITHUB} />
<link
	rel="alternate"
	type="application/rss+xml"
	title={SITE_TITLE}
	href={new URL('rss.xml', Astro.site)}
/>
<meta name="generator" content={Astro.generator} />
<GoogleAnalytics />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<meta name="robots" content={robots} />

<!-- Open Graph / Facebook -->
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content={SITE_TITLE} />
<meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
{pageType === 'article' && pubDate && (
  <meta property="article:published_time" content={pubDate.toISOString()} />
)}
{pageType === 'article' && updatedDate && (
  <meta property="article:modified_time" content={updatedDate.toISOString()} />
)}
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={socialTitle ?? title} />
<meta property="og:description" content={socialDescription ?? description} />
<meta property="og:image" content={new URL(image.src, Astro.url)} />
<meta property="og:image:width" content={String(image.width)} />
<meta property="og:image:height" content={String(image.height)} />
{pageType === 'article' && (<meta property="article:author" content="Eric Carlisle" />)}
{pageType === 'article' && tags && tags.length > 0 && (
  <meta property="article:section" content={tags[0]} />
)}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={socialTitle ?? title} />
<meta property="twitter:description" content={socialDescription ?? description} />
<meta property="twitter:image" content={new URL(image.src, Astro.url)} />
{twitterHandle && (<meta property="twitter:site" content={twitterHandle} />)}
{twitterHandle && pageType === 'article' && (
  <meta property="twitter:creator" content={twitterHandle} />
)}

{pageType === 'article' && tags && tags.map((tag) => (
  <meta property="article:tag" content={tag} />
))}

<!-- JSON-LD Structured Data -->
{pageType && (
  <SchemaOrg
    type={pageType}
    title={title}
    description={socialDescription ?? description}
    url={canonicalURL.toString()}
    image={new URL(image.src, Astro.url).toString()}
    collectionType={collectionType}
    tagName={tagName}
    posts={posts}
    pubDate={pubDate}
    updatedDate={updatedDate}
    tags={tags}
    wordCount={wordCount}
  />
)}
<PagefindConfig />
``````

### `src/components/Card.astro`

``````astro
---
type TagType = 'div' | 'article' | 'li';

const {
  as: Tag = 'div',
  href,
  title,
  class: className,
  author,
  pubDate,
  tags,
  readingTime,
  index = 0,
  headingLevel: HeadingTag = 'h2',
} = Astro.props as {
  as?: TagType;
  href?: string;
  title?: string;
  class?: string;
  author?: string;
  pubDate?: Date;
  tags?: string[];
  readingTime?: number;
  index?: number;
  headingLevel?: 'h2' | 'h3' | 'h4';
};

const hasImage = Astro.slots.has('image');
const hasFooter = Astro.slots.has('footer');

const dateISO = pubDate?.toISOString();
const dateDisplay = pubDate?.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const readingTimeMin = readingTime ? Math.ceil(readingTime / 200) : undefined;
---

<Tag
  class:list={['card', className, 'card-enter']}
  data-tags={tags?.join(',')}
  style={`animation-delay: ${index * 0.05}s`}
>
  {hasImage && (
    <div class="card-image">
      <slot name="image" />
    </div>
  )}

  <div class="prose">
    {title && href && (
      <HeadingTag class="card-title">
        <a href={href} class="card-link">{title}</a>
      </HeadingTag>
    )}
    {title && !href && <HeadingTag class="card-title">{title}</HeadingTag>}

    <slot />

    <p class="meta">
      {author && <strong>{author}</strong>}
      {pubDate && <time datetime={dateISO}>{dateDisplay}</time>}
      {readingTimeMin && <span class="reading-time">{readingTimeMin} min read</span>}
    </p>

    {tags && tags.length > 0 && (
      <p class="meta meta-tags">
        {tags.slice(0, 3).map((tag: string) => (
          <a href={`/tags/${tag}/`} class="tag">{tag}</a>
        ))}
      </p>
    )}
  </div>

  {hasFooter && (
    <div class="card-footer">
      <slot name="footer" />
    </div>
  )}
</Tag>

<style>
  .card-link {
    color: inherit;
    text-decoration: none;
  }

  .card-link::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .card-link:not(:focus-visible)::after {
    pointer-events: auto;
  }

  .card-link:hover {
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }

  .card-footer {
    position: relative;
    z-index: 1;
  }

  .tag {
    position: relative;
    z-index: 1;
  }

  .meta-tags {
    margin-top: var(--space-inline);
  }
</style>
``````

### `src/components/Footer.astro`

``````astro
---
import SocialLinks from './SocialLinks.astro';

const today = new Date();
---

<footer class="site-frame">
		&copy; {today.getFullYear()} Eric Carlisle. All rights reserved.
		<div class="social-links">
			<SocialLinks />
		</div>
</footer>
<style>
footer {
  text-align: center;
  color: var(--text-secondary);
}

/* social links layout only */
.social-links {
  display: flex;
  justify-content: center;
  gap: var(--space-inline);
  margin-top: var(--space-component);
}

.social-links a {
  text-decoration: none;
  color: inherit;
}
</style>
``````

### `src/components/FormattedDate.astro`

``````astro
---
interface Props {
  date: Date;
}

const { date } = Astro.props;
---

<time datetime={date.toISOString()}>
	{
		date.toLocaleDateString('en-us', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}
</time>
``````

### `src/components/GoogleAnalytics.astro`

``````astro
---
import { GA_MEASUREMENT_ID } from '../consts';
---

<script
  is:inline
  type="text/partytown"
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
></script>
<script is:inline type="text/partytown" define:vars={{ GA_MEASUREMENT_ID }}>
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
</script>
``````

### `src/components/Header.astro`

``````astro
---
import { SITE_TITLE } from '../consts';
import HeaderLink from './HeaderLink.astro';
import SocialLinks from './SocialLinks.astro';
import ThemeToggle from './ThemeToggle.astro';
---

<header id="site-header" class="site-header site-frame">
  <nav aria-label="Main navigation">
    <h2><a href="/">{SITE_TITLE}</a></h2>
    <div class="internal-links" id="primary-navigation">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/blog">Blog</HeaderLink>
      <HeaderLink href="/about">About</HeaderLink>
      <HeaderLink href="/portfolio">Portfolio</HeaderLink>
      <HeaderLink href="/contact">Contact</HeaderLink>
    </div>
    <div class="nav-controls">
      <button
        class="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="primary-navigation"
      >
        Menu
      </button>
      <ThemeToggle />
      <div class="social-links">
        <SocialLinks />
      </div>
    </div>
  </nav>
</header>

<style>
  /* position: fixed + will-change: transform puts the header on its own compositor layer. */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-muted);
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    padding-block: 0;
  }

  /* translateY(-100%) is self-measuring: always equals the exact rendered height. */
  .site-header.header--hidden {
    transform: translateY(-100%);
  }

  @media (prefers-reduced-motion: reduce) {
    .site-header {
      transition: none;
    }
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 4.5rem;
    max-width: var(--layout-max-width-wide);
    margin-inline: auto;
    position: relative;
  }

  h2 {
    margin: 0;
    font-size: var(--type-size-h4);
    line-height: 1.1;
    white-space: nowrap;
  }

  h2 a {
    text-decoration: none;
    color: inherit;
  }

  nav a {
    padding: var(--space-inline) var(--space-inline-strong);
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 2px solid transparent;
  }

  nav a.active {
    border-bottom-color: var(--color-link);
  }

  .internal-links {
    display: flex;
    align-items: center;
  }

  .nav-controls {
    display: flex;
    align-items: center;
    gap: var(--space-inline);
  }

  .social-links {
    display: flex;
    gap: var(--space-inline);
  }

  .menu-toggle {
    display: none;
    min-width: var(--size-touch-target-min);
    min-height: var(--size-touch-target-min);
    padding-inline: var(--space-inline);
    border: 1px solid var(--border-main);
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-primary);
    font: inherit;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .social-links {
      display: none;
    }
  }

  @media (max-width: 840px) {
    nav {
      min-height: 4rem;
    }

    .menu-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .nav-controls {
      margin-left: auto;
    }

    .internal-links {
      position: absolute;
      top: 100%;
      left: calc(-1 * var(--space-component));
      right: calc(-1 * var(--space-component));
      display: none;
      padding: var(--space-inline) var(--space-component) var(--space-component);
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-main);
      box-shadow: 0 12px 24px oklch(0 0 0 / 0.2);
    }

    .site-header[data-menu-open] .internal-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .internal-links :global(a) {
      min-height: var(--size-touch-target-min);
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 420px) {
    h2 {
      font-size: var(--type-size-h5);
    }
  }
</style>

<!--
  Body offset: because the header is removed from normal flow by position:fixed,
  the first page content would otherwise render underneath it. This rule pushes
  the body down by exactly the header's rendered height, measured precisely in
  JS below and written back as --header-height. The fallback value covers the
  instant before JS runs (avoids a flash of content-under-header on load).
-->
<style is:global>
  body {
    padding-top: var(--header-height, 4.5rem);
  }
</style>

<script>
  const header = document.getElementById('site-header') as HTMLElement;
  const menuToggle = header.querySelector('.menu-toggle') as HTMLButtonElement;
  const menu = header.querySelector('.internal-links') as HTMLElement;

  function setMenuOpen(open: boolean): void {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Close' : 'Menu';
    header.toggleAttribute('data-menu-open', open);
  }

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setMenuOpen(false);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.matchMedia('(min-width: 841px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  // --- Body offset calibration -----------------------------------------
  // Measure the actual rendered header height and publish it as a CSS custom
  // property so the body padding-top in the global style above stays exact
  // across all breakpoints. ResizeObserver keeps it current if the header
  // height changes (e.g. font scaling, viewport resize, content change).
  function syncHeaderHeight(): void {
    document.documentElement.style.setProperty(
      '--header-height',
      `${header.offsetHeight}px`,
    );
  }

  syncHeaderHeight();
  new ResizeObserver(syncHeaderHeight).observe(header);

  // --- Scroll direction tracking ---------------------------------------
  // lastScrollY seeds from the current position so a page that loads mid-scroll
  // (e.g. via browser scroll restoration) doesn't fire a spurious hide on load.
  let lastScrollY: number = window.scrollY;

  // rafPending gates how many animation frames are queued at once.
  // Without this flag, rapid scrolling could queue hundreds of RAF calls
  // per second — one is enough because each frame reads the latest scrollY.
  let rafPending: boolean = false;

  function updateHeaderVisibility(): void {
    const currentScrollY = window.scrollY;

    if (header.hasAttribute('data-menu-open') || currentScrollY <= 0) {
      // Absolute page top: always show regardless of scroll direction.
      // Covers rubber-band over-scroll on iOS that can produce negative values.
      header.classList.remove('header--hidden');
    } else if (currentScrollY > lastScrollY) {
      // Scrolling DOWN: hide to reclaim vertical reading space.
      header.classList.add('header--hidden');
    } else {
      // Scrolling UP (any amount): immediately show — the user is signalling
      // intent to access the navigation.
      header.classList.remove('header--hidden');
    }

    lastScrollY = currentScrollY;
    rafPending = false;
  }

  // { passive: true } tells the browser this listener will never call
  // preventDefault(), allowing it to begin compositing the scroll immediately
  // on a separate thread without waiting for JS to complete — critical for
  // smooth 60 fps / 120 fps scrolling on mobile.
  window.addEventListener(
    'scroll',
    () => {
      if (!rafPending) {
        rafPending = true;
        window.requestAnimationFrame(updateHeaderVisibility);
      }
    },
    { passive: true },
  );

  // --- Keyboard focus accessibility ------------------------------------
  // When a keyboard user Tabs into the header while it is hidden off-screen,
  // the focused element and its :focus-visible ring are invisible. Listening
  // for focusin (which bubbles from any descendant) and stripping the hidden
  // class restores the header before the browser scrolls to the focused element,
  // keeping the focus indicator fully visible at all times.
  header.addEventListener('focusin', () => {
    header.classList.remove('header--hidden');
  });
</script>
``````

### `src/components/HeaderLink.astro`

``````astro
---
import type { HTMLAttributes } from 'astro/types';

type Props = HTMLAttributes<'a'>;

const { href, class: className, ...props } = Astro.props;
const pathname = Astro.url.pathname.replace(import.meta.env.BASE_URL, '');
const subpath = pathname.match(/[^/]+/g);
const isActive = href === pathname || href === `/${subpath?.[0] || ''}`;
---

<a href={href} class:list={[className, { active: isActive }]} aria-current={isActive ? 'page' : undefined} {...props}>
	<slot />
</a>
<style>
	a {
		display: inline-block;
		text-decoration: none;
		padding: var(--space-inline) var(--space-inline-strong);
		color: var(--text-primary);
    border-bottom: var(--size-border-pixel) solid transparent;
    transition: color var(--transition-fast), border-color var(--transition-fast);
	}

  a:hover {
    color: var(--color-action);
    border-bottom-color: var(--color-action);
  }

	a.active {
		font-weight: 700;
		border-bottom-color: var(--color-link);
	}

</style>
``````

### `src/components/PaginationNav.astro`

``````astro
---
const { prev, next } = Astro.props;
---

<nav class="post-nav" aria-label="Pagination">
  {prev ? (
    <a href={prev.url} rel="prev">
      <span class="post-nav-label">{prev.label}</span>
      {prev.title && <span class="post-nav-title">{prev.title}</span>}
    </a>
  ) : <div />}
  {next ? (
    <a href={next.url} rel="next" class="post-nav-next">
      <span class="post-nav-label">{next.label}</span>
      {next.title && <span class="post-nav-title">{next.title}</span>}
    </a>
  ) : <div />}
</nav>
``````

### `src/components/PostGrid.astro`

``````astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import Card from '@components/Card.astro';
import { getPostWordCount } from '@lib/word-count';

interface Props {
  posts: CollectionEntry<'blog'>[];
  author: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

const { posts, author, headingLevel = 'h2' } = Astro.props;
---

<ul class="grid grid--cards" id="post-grid">
  {posts.map((post, i) => {
    const wc = getPostWordCount(post);
    return (
      <Card
        as="li"
        title={post.data.title}
        href={`/blog/${post.id}/`}
        author={author}
        pubDate={post.data.pubDate}
        tags={post.data.tags}
        readingTime={wc}
        index={i}
        headingLevel={headingLevel}
      >
        {post.data.heroImage && (
          <Image
            slot="image"
            src={post.data.heroImage}
            alt={post.data.coverAlt || post.data.title}
            width={720}
            height={360}
          />
        )}
        <p>{post.data.description}</p>
      </Card>
    );
  })}
</ul>

<style>
  ul.grid {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
``````

### `src/components/SchemaOrg.astro`

``````astro
---
import {
  AUTHOR_AVATAR,
  AUTHOR_BLUESKY,
  AUTHOR_GITHUB,
  AUTHOR_JOB_TITLE,
  AUTHOR_LINKEDIN,
  AUTHOR_MASTODON,
  AUTHOR_NAME,
  AUTHOR_ORG,
  AUTHOR_WEBSITE,
} from '../consts';

type PostItem = {
  title: string;
  url: string;
};

type Props = {
  type: 'homepage' | 'about' | 'contact' | 'portfolio' | 'article' | 'collection' | 'not-found';
  title: string;
  description: string;
  url: string;
  image: string;
  collectionType?: 'main-feed' | 'tag-filter' | 'tags-index';
  tagName?: string;
  posts?: PostItem[];
  pubDate?: Date;
  updatedDate?: Date;
  tags?: string[];
  wordCount?: number;
};

const {
  type,
  title,
  description,
  url,
  image,
  collectionType = 'main-feed',
  tagName,
  posts = [],
  pubDate,
  updatedDate,
  tags,
  wordCount,
} = Astro.props;

const siteUrl = Astro.site?.toString().replace(/\/$/, '') ?? 'https://ericcarlisle.com';
const pageUrl = url.replace(/\/$/, '');

const personEntity = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: AUTHOR_NAME,
  url: siteUrl,
  image: {
    '@type': 'ImageObject',
    '@id': `${siteUrl}/#personImage`,
    url: `${siteUrl}${AUTHOR_AVATAR}`,
  },
  sameAs: [AUTHOR_WEBSITE, AUTHOR_GITHUB, AUTHOR_LINKEDIN, AUTHOR_BLUESKY, AUTHOR_MASTODON],
  jobTitle: AUTHOR_JOB_TITLE,
  worksFor: {
    '@type': 'Organization',
    name: AUTHOR_ORG,
  },
};

const websiteEntity = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: AUTHOR_NAME,
  publisher: { '@id': `${siteUrl}/#person` },
};

const graphArray: object[] = [personEntity, websiteEntity];

switch (type) {
  case 'homepage':
  case 'collection': {
    const collectionPageEntity: Record<string, unknown> = {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}/#webpage`,
      url,
      name:
        type === 'homepage'
          ? title
          : collectionType === 'tag-filter'
            ? `Articles tagged with "${tagName}"`
            : title,
      description,
      isPartOf: { '@id': `${siteUrl}/#website` },
    };

    if (collectionType === 'tag-filter' && tagName) {
      collectionPageEntity.breadcrumb = {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Tags', item: `${siteUrl}/tags` },
          { '@type': 'ListItem', position: 3, name: tagName, item: url },
        ],
      };
    } else if (collectionType === 'tags-index') {
      collectionPageEntity.breadcrumb = {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Tags', item: `${siteUrl}/tags` },
        ],
      };
    } else if (type === 'collection' && collectionType === 'main-feed') {
      collectionPageEntity.breadcrumb = {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
        ],
      };
    }

    if (posts.length > 0) {
      collectionPageEntity.mainEntity = {
        '@type': 'ItemList',
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: post.title,
          url: post.url.startsWith('http') ? post.url : `${siteUrl}${post.url}`,
        })),
      };
    }

    graphArray.push(collectionPageEntity);
    break;
  }

  case 'article': {
    const articleBreadcrumb = {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    };

    graphArray.push(
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}/#article`,
        mainEntityOfPage: url,
        headline: title,
        description,
        datePublished: pubDate ? pubDate.toISOString() : new Date().toISOString(),
        ...(updatedDate && { dateModified: updatedDate.toISOString() }),
        ...(tags && tags.length > 0 && { articleSection: tags.join(', ') }),
        ...(wordCount && { wordCount }),
        ...(wordCount && { timeRequired: `PT${Math.ceil(wordCount / 200)}M` }),
        author: { '@id': `${siteUrl}/#person` },
        publisher: { '@id': `${siteUrl}/#person` },
        image: {
          '@type': 'ImageObject',
          '@id': `${pageUrl}/#primaryimage`,
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
        },
        inLanguage: 'en-US',
      },
      articleBreadcrumb,
    );
    break;
  }

  case 'about':
  case 'contact':
    graphArray.push({
      '@type': type === 'about' ? 'ProfilePage' : 'ContactPage',
      '@id': `${pageUrl}/#webpage`,
      url,
      name: title,
      description,
      mainEntity: { '@id': `${siteUrl}/#person` },
    });
    break;

  case 'portfolio':
    graphArray.push({
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      url,
      name: title,
      description,
      mainEntity: {
        '@type': 'CreativeWork',
        name: title,
        description,
        url,
        author: { '@id': `${siteUrl}/#person` },
        creator: { '@id': `${siteUrl}/#person` },
        inLanguage: 'en-US',
        about: [
          'Frontend engineering',
          'UX architecture',
          'Design systems',
          'Web performance',
          'Accessibility',
          'Technical leadership',
        ].map((topic) => ({ '@type': 'Thing', name: topic })),
      },
    });
    break;

  case 'not-found':
    break;
}

const schemaGraph = {
  '@context': 'https://schema.org',
  '@graph': graphArray,
};
---

<script is:inline type="application/ld+json" set:html={JSON.stringify(schemaGraph)} />
``````

### `src/components/ShareStrip.astro`

``````astro
---
interface Props {
  title: string;
  pageUrl: string;
  enabled?: boolean;
}

const { title, pageUrl, enabled = true } = Astro.props;

if (!enabled) return;
---

<div class="share">
  <span class="share-label">Share</span>
  <div class="share-links">
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on X / Twitter"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on LinkedIn"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    </a>
    <a
      href={`https://toot.kytta.dev/?text=${encodeURIComponent(title)}%20${encodeURIComponent(pageUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Mastodon"
    >
      <svg viewBox="0 0 216.4144 232.00976" aria-hidden="true" width="20" height="20"><path fill="currentColor" fill-rule="evenodd" d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"/></svg>
    </a>
    <!-- Bluesky share -->
    <a
      href={`https://bsky.app/intent/compose?text=${encodeURIComponent(title)}%20${encodeURIComponent(pageUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Bluesky"
    >
      <svg viewBox="0 0 600 530" aria-hidden="true" width="20" height="20"><path fill="currentColor" d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/></svg>
    </a>
  </div>
</div>

<style>
  .share {
    display: flex;
    flex-direction: column;
    gap: var(--space-inline);
    padding: var(--space-component) 0;
  }

  .share-label {
    font-size: var(--type-size-small);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }

  .share-links {
    display: flex;
    gap: var(--space-xs);
  }

  .share-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-touch-target-min);
    height: var(--size-touch-target-min);
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    transition:
      color var(--transition-fast),
      background var(--transition-fast);
  }

  .share-links a:hover {
    color: var(--brand-accent);
    background: var(--bg-surface);
  }

  .share-links a:focus-visible {
    outline: var(--focus-outline-width) var(--focus-outline-style) var(--focus-outline-color);
    outline-offset: var(--focus-outline-offset);
  }
</style>
``````

### `src/components/SocialLinks.astro`

``````astro
---
---

<a href="https://github.com/ecarlisle" target="_blank" rel="noopener">
  <span class="sr-only">Go to Eric Carlisle's GitHub profile (opens in new tab)</span>
  <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"
    ><path
      fill="currentColor"
      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12"
    ></path></svg
  >
</a>
<a href="https://www.linkedin.com/in/ericcarlisle/" target="_blank" rel="noopener">
  <span class="sr-only">Go to Eric Carlisle's LinkedIn profile (opens in new tab)</span>
  <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"
    ><path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564v11.452M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"
    ></path></svg
  >
</a>
<a href="https://bsky.app/profile/ericcarlisle.bsky.social" target="_blank" rel="noopener">
  <span class="sr-only">Go to Eric Carlisle's Bluesky profile (opens in new tab)</span>
   <svg viewBox="0 0 600 530" aria-hidden="true" width="24" height="24"
    ><path
      fill="currentColor"
      d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
    ></path></svg
  >
</a>
<a href="https://fosstodon.org/@ericcarlisle" target="_blank" rel="noopener">
  <span class="sr-only">Go to Eric Carlisle's Mastodon profile (opens in new tab)</span>
   <svg viewBox="0 0 216.4144 232.00976" aria-hidden="true" width="24" height="24"
    ><path
      fill="currentColor"
      fill-rule="evenodd"
      d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"
    ></path></svg
  >
</a>
``````

### `src/components/TagFilterBar.astro`

``````astro
---
import type { TagData } from '@lib/blog-utils';

interface Props {
  tagData?: TagData;
  tags?: string[];
}

const { tagData, tags } = Astro.props;

const hasTagData = tagData && tagData.allTags.length > 0;
const hasTags = tags && tags.length > 0;
---

{hasTagData && !hasTags && (
  <div
    class="filter-bar"
    role="group"
    aria-label="Filter posts by tag"
  >
    <a href="/blog">All</a>
    {tagData.allTags.map((tag) => (
      <a href={`/tags/${tag}`}>
        {tag}
        <sup>{tagData.tagCounts[tag]}</sup>
      </a>
    ))}
  </div>
)}

{hasTags && (
  <div class="filter-bar">
    {tags.map((tag) => (
      <a href={`/tags/${tag}`}>
        {tag}
        {tagData?.tagCounts[tag] != null && <sup>{tagData.tagCounts[tag]}</sup>}
      </a>
    ))}
  </div>
)}

<style>
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-component);
    align-items: center;
    justify-content: center;
  }

  .filter-bar a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    border: var(--size-border-pixel) solid var(--border-muted);
    border-radius: 999px;
    background: var(--bg-surface);
    color: var(--text-primary);
    font-size: var(--type-size-small);
    text-decoration: none;
    transition:
      border-color var(--transition-fast),
      background var(--transition-fast);
    white-space: nowrap;
  }

  .filter-bar a:hover,
  .filter-bar a:focus-visible {
    border-color: var(--color-link);
    background: var(--bg-surface-elevated);
  }

  .filter-bar a sup {
    font-size: 0.75em;
    opacity: 0.7;
  }
</style>
``````

### `src/components/ThemeToggle.astro`

``````astro
---
---

<button id="theme-toggle" class="theme-toggle" aria-label="Toggle light/dark theme" title="Toggle theme">
  <svg class="icon icon--sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5" fill="currentColor" />
    <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
  <svg class="icon icon--moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--size-touch-target-min);
    height: var(--size-touch-target-min);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-main);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }

  .theme-toggle:hover {
    color: var(--text-primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .theme-toggle {
      transition: none;
    }
  }

  /* Show sun in dark mode (clicking switches to light) */
  .icon--sun { display: block; }
  .icon--moon { display: none; }

  :global([data-theme='light']) .icon--sun { display: none; }
  :global([data-theme='light']) .icon--moon { display: block; }
</style>

<script>
  const toggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  const root = document.documentElement;

  function getTheme(): 'dark' | 'light' {
    return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
  }

  function applyTheme(theme: 'dark' | 'light'): void {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  toggle.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
</script>
``````

### `src/components/Webmentions.astro`

``````astro
---
import type { Webmention } from '@lib/webmentions';

interface Props {
  mentions: Webmention[];
}

const { mentions } = Astro.props;

function safeHttpUrl(value?: string): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function toPlainText(content?: Webmention['content']): string {
  if (content?.text) return content.text;

  return (
    content?.html
      ?.replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() ?? ''
  );
}

const replies = mentions.filter(
  (m) => m['wm-property'] === 'in-reply-to' || m['wm-property'] === 'mention-of',
);
const likes = mentions.filter((m) => m['wm-property'] === 'like-of');
const reposts = mentions.filter((m) => m['wm-property'] === 'repost-of');

if (mentions.length === 0) return;
---

<section class="webmentions">
  <h3 class="webmentions-heading">Webmentions</h3>

  {reposts.length > 0 && (
    <div class="wm-reactions">
      {reposts.map((m) => (
        <a
          href={safeHttpUrl(m.author?.url || m.url)}
          target="_blank"
          rel="noopener noreferrer"
          class="wm-avatar"
          title={m.author?.name ? `Reposted by ${m.author.name}` : 'Repost'}
        >
          {safeHttpUrl(m.author?.photo)
            ? <img src={safeHttpUrl(m.author?.photo)} alt="" width="28" height="28" loading="lazy" />
            : <span class="wm-avatar-fallback">R</span>}
        </a>
      ))}
      <span class="wm-reaction-label">{reposts.length} repost{reposts.length !== 1 ? 's' : ''}</span>
    </div>
  )}

  {likes.length > 0 && (
    <div class="wm-reactions">
      {likes.map((m) => (
        <a
          href={safeHttpUrl(m.author?.url || m.url)}
          target="_blank"
          rel="noopener noreferrer"
          class="wm-avatar"
          title={m.author?.name ? `Liked by ${m.author.name}` : 'Like'}
        >
          {safeHttpUrl(m.author?.photo)
            ? <img src={safeHttpUrl(m.author?.photo)} alt="" width="28" height="28" loading="lazy" />
            : <span class="wm-avatar-fallback">L</span>}
        </a>
      ))}
      <span class="wm-reaction-label">{likes.length} like{likes.length !== 1 ? 's' : ''}</span>
    </div>
  )}

  {replies.map((m) => {
    const authorName = m.author?.name || 'Anonymous';
    const authorPhoto = safeHttpUrl(m.author?.photo);
    const authorUrl = safeHttpUrl(m.author?.url || m.url);
    const contentText = toPlainText(m.content);

    return (
      <article class="wm-reply">
        <div class="wm-reply-header">
          {authorPhoto && (
            <img src={authorPhoto} alt="" width="28" height="28" class="wm-reply-avatar" loading="lazy" />
          )}
          <a href={authorUrl} target="_blank" rel="noopener noreferrer" class="wm-reply-author">
            {authorName}
          </a>
        </div>
        {contentText && <p class="wm-reply-content">{contentText}</p>}
      </article>
    );
  })}
</section>

<style>
  .webmentions {
    margin-top: var(--space-section);
    padding-top: var(--space-section);
    border-top: var(--size-border-pixel) solid var(--border-main);
  }

  .webmentions-heading {
    font-size: var(--type-size-small);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--space-component);
  }

  .wm-reactions {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin-bottom: var(--space-component);
    flex-wrap: wrap;
  }

  .wm-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--bg-surface);
    transition: transform var(--transition-fast);
  }

  .wm-avatar:hover {
    transform: scale(1.15);
  }

  .wm-avatar img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .wm-avatar-fallback {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .wm-reaction-label {
    font-size: var(--type-size-small);
    color: var(--text-secondary);
    margin-left: var(--space-xs);
  }

  .wm-reply {
    padding: var(--space-component);
    margin-bottom: var(--space-component);
    background: var(--bg-surface);
    border: var(--size-border-pixel) solid var(--border-muted);
    border-radius: var(--radius-md);
  }

  .wm-reply:last-child {
    margin-bottom: 0;
  }

  .wm-reply-header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
  }

  .wm-reply-avatar {
    border-radius: 50%;
    flex-shrink: 0;
  }

  .wm-reply-author {
    font-size: var(--type-size-small);
    font-weight: 600;
    color: var(--brand-primary);
    text-decoration: none;
  }

  .wm-reply-author:hover {
    text-decoration: underline;
  }

  .wm-reply-content {
    font-size: var(--type-size-base);
    line-height: var(--line-height-body);
    color: var(--text-primary);
  }

  .wm-reply-content {
    margin: 0;
  }
</style>
``````

### `src/pages/index.astro`

``````astro
---
import { Image } from 'astro:assets';
import BaseHead from '../components/BaseHead.astro';
import Card from '../components/Card.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import '@styles/feed.css';
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSortedPosts } from '../lib/blog-utils';

const posts = (await getSortedPosts()).slice(0, 6);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} pageType="homepage" />
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <Header />
    <main id="main-content" tabindex="-1">
      <header class="home-intro">
        <h1>Designing better systems for the web.</h1>
        <p>
          Writing on frontend architecture, design systems, accessibility, and performance by Eric Carlisle.
        </p>
      </header>
      <section class="feed" aria-labelledby="latest-writing">
        <header class="collection-header feed-heading">
          <h2 id="latest-writing">Latest writing</h2>
          <a href="/blog">Browse all articles <span aria-hidden="true">→</span></a>
        </header>
        <ul class="grid grid--cards">
          {posts.map((post) => (
            <Card
              as="li"
              title={post.data.title}
              href={`/blog/${post.id}/`}
              author={AUTHOR_NAME}
              pubDate={post.data.pubDate}
              headingLevel="h3"
            >
              {post.data.heroImage && (
                <Image
                  slot="image"
                  src={post.data.heroImage}
                  alt={post.data.coverAlt || post.data.title}
                  width={720}
                  height={360}
                />
              )}
              <p>{post.data.description}</p>
            </Card>
          ))}
        </ul>
      </section>
    </main>
    <Footer />
  </body>
</html>

<style>
  .home-intro {
    max-width: 54rem;
    margin-bottom: var(--space-section);
  }

  .home-intro h1 {
    max-width: 15ch;
  }

  .home-intro p {
    max-width: 62ch;
    margin-bottom: 0;
    color: var(--text-secondary);
    font-size: var(--type-size-large);
  }

  .feed-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: var(--space-component);
  }

  .feed-heading h2 {
    margin-bottom: 0;
    margin-top: 0;
  }

  .feed-heading a {
    flex: none;
  }

  @media (max-width: 600px) {
    .feed-heading {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
``````

### `src/pages/blog.astro`

``````astro
---
import BaseHead from '@components/BaseHead.astro';
import Footer from '@components/Footer.astro';
import Header from '@components/Header.astro';
import PaginationNav from '@components/PaginationNav.astro';
import PostGrid from '@components/PostGrid.astro';
import TagFilterBar from '@components/TagFilterBar.astro';
import '@styles/feed.css';
import { computeTagData, getSortedPosts, PAGE_SIZE } from '@lib/blog-utils';
import { AUTHOR_NAME, SITE_TITLE } from '../consts';

const allPosts = await getSortedPosts();
const posts = allPosts.slice(0, PAGE_SIZE);
const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);

const tagData = computeTagData(allPosts);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={`Blog — ${SITE_TITLE}`} description="All blog posts" pageType="collection" />
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <Header />
    <main id="main-content" tabindex="-1">
      <section class="feed">
        <header class="collection-header">
          <h1>Blog</h1>
          <p class="collection-description">All posts ({allPosts.length} total)</p>
        </header>

        <TagFilterBar tagData={tagData} />

        <PostGrid posts={posts} author={AUTHOR_NAME} />

        {totalPages > 1 && (
          <PaginationNav next={{ url: '/blog/page/2', label: 'Next page →' }} />
        )}
      </section>
    </main>
    <Footer />
    <pagefind-modal></pagefind-modal>
  </body>
</html>
``````

### `src/pages/blog/[...slug].astro`

``````astro
---
import { type CollectionEntry, render } from 'astro:content';
import { computeTagData, getSortedPosts } from '@lib/blog-utils';
import { fetchWebmentions } from '@lib/webmentions';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getSortedPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
type Props = CollectionEntry<'blog'>;

const post = Astro.props;
const { Content } = await render(post);

// Derive word count from raw markdown body — no frontmatter field needed.
// Strips frontmatter, HTML tags, and code blocks for a meaningful count.
const wordCount =
  post.body
    ?.replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]*>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length ?? 0;

// Find adjacent posts for end-of-post navigation
const allPosts = await getSortedPosts();

const currentIndex = allPosts.findIndex((p) => p.id === post.id);
const prevPost =
  currentIndex < allPosts.length - 1
    ? { title: allPosts[currentIndex + 1].data.title, slug: allPosts[currentIndex + 1].id }
    : undefined;
const nextPost =
  currentIndex > 0
    ? { title: allPosts[currentIndex - 1].data.title, slug: allPosts[currentIndex - 1].id }
    : undefined;

const tagData = computeTagData(allPosts);

// Fetch webmentions for this post at build time
const pageUrl = `${import.meta.env.SITE ?? 'https://ericcarlisle.com'}/blog/${post.id}/`;
const webmentions = await fetchWebmentions(pageUrl);
---

<BlogPost {...post.data} wordCount={wordCount} prevPost={prevPost} nextPost={nextPost} tagData={tagData} webmentions={webmentions}>
	<Content />
</BlogPost>
``````

### `src/pages/blog/page/[page].astro`

``````astro
---
import BaseHead from '@components/BaseHead.astro';
import Footer from '@components/Footer.astro';
import Header from '@components/Header.astro';
import PaginationNav from '@components/PaginationNav.astro';
import PostGrid from '@components/PostGrid.astro';
import TagFilterBar from '@components/TagFilterBar.astro';
import '@styles/feed.css';
import { computeTagData, getSortedPosts, PAGE_SIZE } from '@lib/blog-utils';
import { AUTHOR_NAME, SITE_TITLE } from '../../../consts';

export async function getStaticPaths({
  paginate,
}: {
  paginate: <T>(
    data: T[],
    opts?: { pageSize?: number },
  ) => Array<{ params: { page: string }; props: { page: import('astro').Page<T> } }>;
}) {
  const allPosts = await getSortedPosts();
  const pages = paginate(allPosts, { pageSize: PAGE_SIZE });
  return pages.filter((p) => p.params.page !== '1');
}

const { page } = Astro.props;
const posts = page.data;

const allPosts = await getSortedPosts();
const tagData = computeTagData(allPosts);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={`Blog — Page ${page.currentPage} — ${SITE_TITLE}`} description={`Blog posts page ${page.currentPage}`} pageType="collection" />
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <Header />
    <main id="main-content" tabindex="-1">
      <section class="feed">
        <header class="collection-header">
          <h1>Blog</h1>
          <p class="collection-description">Page {page.currentPage} of {page.lastPage} ({page.total} total)</p>
        </header>

        <TagFilterBar
          tagData={tagData}
        />

        <PostGrid posts={posts} author={AUTHOR_NAME} />

        <PaginationNav
          prev={page.url.prev ? { url: page.currentPage === 2 ? '/blog' : page.url.prev, label: '← Previous page' } : undefined}
          next={page.url.next ? { url: page.url.next, label: 'Next page →' } : undefined}
        />
      </section>
    </main>
    <Footer />
    <pagefind-modal></pagefind-modal>
  </body>
</html>
``````

### `src/content/blog/markdown-style-guide.mdx`

``````mdx
---
title: 'Markdown Style Guide'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: '2024-06-19T00:00:00-04:00'
tags: ['general', 'css']
heroImage: '@images/markdown-style-guide-hero.webp'
---

Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.

## Headings

The following HTML `<h1>`—`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Images

#### Syntax

```markdown
![Alt text](./full/or/relative/path/of/image)
```

#### Output

![blog placeholder](../../assets/images/blog-placeholder-about.jpg)

## Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

### Blockquote without attribution

#### Syntax

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Note** that you can use _Markdown syntax_ within a blockquote.
```

#### Output

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Note** that you can use _Markdown syntax_ within a blockquote.

### Blockquote with attribution

#### Syntax

```markdown
> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Output

> Don't communicate by sharing memory, share memory by communicating.<br />
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

## Tables

#### Syntax

```markdown
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
```

#### Output

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Code Blocks

#### Syntax

we can use 3 backticks ``` in new line and write snippet and close with 3 backticks on new line and to highlight language specific syntax, write one word of language name after first 3 backticks, for eg. html, javascript, css, markdown, typescript, txt, bash

````markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```
````

#### Output

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## List Types

### Ordered List

#### Syntax

```markdown
1. First item
2. Second item
3. Third item
```

#### Output

1. First item
2. Second item
3. Third item

### Unordered List

#### Syntax

```markdown
- List item
- Another item
- And another item
```

#### Output

- List item
- Another item
- And another item

### Nested list

#### Syntax

```markdown
- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese
```

#### Output

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements — abbr, sub, sup, kbd, mark

#### Syntax

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
```

#### Output

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
``````
