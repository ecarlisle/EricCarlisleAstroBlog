# Spacing and rhythm refinement

Date: 2026-07-04

Branch: `design-refinement-pass`

## Outcome

The article-specific spacing work from the Blue Relay pass was already aligned with this request:

- `.prose h2` uses `margin-top: var(--space-xl)`.
- `.prose h3` uses `margin-top: var(--space-lg)`.
- Prose headings no longer share `var(--space-section)`.
- `BlogPost.astro` adds no `.prose` padding, avoiding a second inset inside `main`.
- Mobile therefore receives only the page padding supplied by `main`.
- Body line-height remains `1.65`.

This follow-up makes two small corrections in `src/styles/global.css`:

1. Uses the requested body clamp exactly:

   ```css
   --type-size-body: clamp(1rem, calc(0.3vw + 0.94rem), 1.125rem);
   ```

2. Restores the established global rhythm range instead of compressing every component and page surface:

   ```css
   --rhythm: clamp(1.65rem, calc(0.75vw + 1.5rem), 2.0625rem);
   ```

No component, layout, or content file required another change.

## Measured spacing

| Measurement | Desktop | Mobile at 390px |
| --- | ---: | ---: |
| Body size | 18px | 16.21px |
| Body line-height | 29.7px | 26.75px |
| Rhythm | 33px | 26.93px |
| Prose `h2` top margin | 66px | 53.85px |
| Prose `h3` top margin | 49.5px | 40.39px |
| Prose padding | 0 | 0 |
| Main inline padding | 33px | 26.93px |

For comparison, the original catch-all prose treatment placed both `h2` and `h3` at `var(--space-section)`, or 82.5px at the desktop rhythm maximum. The refined hierarchy is materially tighter while preserving a larger break before `h2` than `h3`.

## Visual assessment

### Article reading flow

Improved. `h2` and `h3` now have distinct spatial weight, so long articles read as nested sections rather than a sequence of equally large pauses. Removing stacked prose padding keeps the text rail aligned with the article header and hero.

### Mobile density

Improved relative to the original layout and effectively unchanged from the prior Blue Relay pass. The exact body clamp changes the 390px body size by roughly 0.1px. The important density improvement remains the absence of duplicate prose padding.

### Heading hierarchy

Improved. Desktop `h2` spacing is 66px and `h3` spacing is 49.5px instead of both using the 82.5px section gap. The difference remains clear on mobile at approximately 54px versus 40px.

### Card and index scanability

Preserved. Restoring the global rhythm prevents article tuning from unintentionally tightening card padding, grid gaps, collection headers, and portfolio sections. Desktop cards regain a small amount of breathing room; the mobile difference is negligible.

## Before/after screenshots

The comparison is dark-mode only because spacing tokens and layout measurements are identical in light mode. The prior `design-review-after` bundle still contains the complete dark/light matrix.

### Article top

| Before | After |
| --- | --- |
| ![Article top before, desktop](./screenshots/before-article-top-desktop.png) | ![Article top after, desktop](./screenshots/after-article-top-desktop.png) |
| ![Article top before, mobile](./screenshots/before-article-top-mobile.png) | ![Article top after, mobile](./screenshots/after-article-top-mobile.png) |

### Article flow and heading hierarchy

| Before | After |
| --- | --- |
| ![Article flow before, desktop](./screenshots/before-article-flow-desktop.png) | ![Article flow after, desktop](./screenshots/after-article-flow-desktop.png) |
| ![Article flow before, mobile](./screenshots/before-article-flow-mobile.png) | ![Article flow after, mobile](./screenshots/after-article-flow-mobile.png) |

### Blog index and cards

| Before | After |
| --- | --- |
| ![Blog index before, desktop](./screenshots/before-blog-index-desktop.png) | ![Blog index after, desktop](./screenshots/after-blog-index-desktop.png) |
| ![Blog index before, mobile](./screenshots/before-blog-index-mobile.png) | ![Blog index after, mobile](./screenshots/after-blog-index-mobile.png) |

## Validation

- `pnpm exec biome check src/styles/global.css` — passed.
- `pnpm build` — passed; 42 pages built and indexed by Pagefind.
- Browser checks — no horizontal overflow in the captured desktop or mobile states.
- Twelve comparison screenshots produced at 1440×900 and 390×844.

## Files changed

- `src/styles/global.css`
- `design-review-spacing/spacing-summary.md`
- `design-review-spacing/screenshots/*.png`
