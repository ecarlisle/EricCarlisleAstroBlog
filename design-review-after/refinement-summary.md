# Blue Relay refinement summary

Date: 2026-07-04

Branch: `design-refinement-pass`

This was a conservative styling refinement. It did not change article/content copy, routes, dependencies, JavaScript behavior, or the existing font system.

## Changed files

- `src/styles/global.css`
  - Replaced the amber-first palette with Blue Relay dark and light tokens.
  - Reassigned link, action, hover, focus, and success semantic roles.
  - Reduced the maximum body size and tightened the fluid rhythm ceiling.
  - Reduced prose heading top spacing and added fixed-header anchor offsets.
- `src/styles/components.css`
  - Made the featured-first grid treatment an explicit modifier.
  - Moved card summary truncation from `.prose` to `.card-body`.
  - Switched tag hover treatment to the accent hover role.
- `src/styles/pagefind.css`
  - Mapped focus and hover states to semantic Blue Relay tokens.
  - Kept the highlight hue limited to a mixed Pagefind match background.
- `src/layouts/BlogPost.astro`
  - Removed stacked `.prose` padding.
  - Applied `min-width: 0` to article content at every breakpoint so long code blocks cannot widen the page.
- `src/components/Card.astro`
  - Replaced the generic `.prose` card wrapper with `.card-body`.
- `src/components/ShareStrip.astro`
  - Mapped hover color to the semantic link-hover token.
- `src/components/Webmentions.astro`
  - Mapped author links to the semantic link token.
- `src/pages/index.astro`
  - Opted the home feed into the explicit featured-first grid treatment.
- `design-review-after/refinement-summary.md`
  - Records implementation and validation evidence.
- `design-review-after/screenshots/*.png`
  - Contains the 30 dark/light responsive review captures.

## Palette changes

| Role | Dark mode | Light mode |
| --- | --- | --- |
| Main background | `#0B1020` | `#F8FAFC` |
| Surface | `#111A2E` | `#FFFFFF` |
| Elevated surface | `#18243A` | `#E8EEF7` |
| Primary text | `#F8FAFC` | `#0F172A` |
| Secondary text | `#CBD5E1` | `#334155` |
| Muted text | `#94A3B8` | `#475569` |
| Primary blue | `#5EA8FF` | `#005FCC` |
| Accent green | `#38D9A9` | `#007A5A` |
| Rare highlight orange | `#FFB86B` | `#A14B00` |
| Main border | `#26344D` | `#CBD5E1` |
| Muted border | `#1A2638` | `#E2E8F0` |
| Control border | `#52627A` | `#64748B` |

Semantic use is now:

- Primary blue: normal links, active navigation, buttons, reading progress, and primary interactive emphasis.
- Accent green: hover, focus, selected/hovered tags, and success.
- Highlight orange: reserved for a tinted Pagefind match treatment rather than general link hover.

## Contrast checks and results

Ratios were calculated with the WCAG relative-luminance formula. All text combinations exceed the 4.5:1 WCAG 2 AA threshold for normal text; focus colors also exceed 3:1 against adjacent backgrounds.

| Check | Dark mode | Light mode | Result |
| --- | ---: | ---: | --- |
| Body text / main background | 18.10:1 | 17.06:1 | Pass |
| Secondary text / main background | 12.75:1 | 9.90:1 | Pass |
| Muted text / main background | 7.38:1 | 7.24:1 | Pass |
| Link / main background | 7.68:1 | 5.72:1 | Pass |
| Link / card surface | 7.04:1 | 5.98:1 | Pass |
| Button text / primary button | 7.04:1 | 5.98:1 | Pass |
| Button text / hover button | 9.63:1 | 5.34:1 | Pass |
| Tag text / default tag | 10.46:1 | 8.88:1 | Pass |
| Tag text / hover tag | 10.52:1 | 5.11:1 | Pass |
| Focus color / main background | 10.52:1 | 5.11:1 | Pass |
| Focus color / card surface | 9.63:1 | 5.34:1 | Pass |

Focused Lighthouse accessibility audits:

| Page | Accessibility | Color contrast | Notes |
| --- | ---: | --- | --- |
| Home | 100 | Pass | No failed binary accessibility audits. |
| Blog index | 100 | Pass | No failed binary accessibility audits. |
| Markdown Style Guide article | 99 | Pass | Existing heading-order exercise in the article content remains; content was intentionally unchanged. |

## Readability and spacing changes

- Body type still starts at 16px but now tops out at 18px instead of 20px.
- Body line-height remains `1.65`; only size was reduced, as requested.
- The fluid rhythm ceiling changed from 33px to 30px to stay aligned with the smaller body line box.
- Prose `h2` top spacing changed from `2.5 × rhythm` to `2 × rhythm`.
- Prose `h3` top spacing changed from `2.5 × rhythm` to `1.5 × rhythm`.
- The extra component padding on `BlogPost.astro`’s `.prose` wrapper was removed because `main` already supplies page padding.
- Article `h2` and `h3` targets now reserve the fixed-header offset when navigated by the TOC.
- `.post-content` now has `min-width: 0` at all widths. This prevents code-block intrinsic width from causing tablet/mobile horizontal page overflow.

Browser measurements after the fix:

- Desktop body text: 18px / 29.7px line-height.
- Article prose padding: 0px.
- Tablet article document width: 768px at a 768px viewport.
- No horizontal overflow in dark or light article/code captures at 1440px, 768px, or 390px.

## Card hierarchy changes

- `.grid--cards` no longer makes its first item span the grid by default.
- A new `.grid--featured-first` modifier owns the spanning and larger-title behavior.
- The home “Latest writing” grid opts into that modifier because it intentionally presents a lead story.
- Blog index, paginated blog, and tag grids now use equal card hierarchy.
- Card summaries no longer depend on the article-oriented `.prose` class. `Card.astro` uses `.card-body`, and the summary clamp targets that explicit structure.

## Decisions intentionally deferred

- No font, heading scale, radius, image, navigation, or card-geometry redesign.
- No changes to article copy or the Markdown Style Guide’s intentional heading examples.
- No new dependency, component abstraction, or JavaScript.
- Expressive Code’s syntax palette remains unchanged; the surrounding article system carries the Blue Relay identity while code keeps its existing readable neutral theme.
- The rare highlight hue is not used for global hover states.
- The full `pnpm lighthouse:all` sweep was not completed because its static server requires port 4321, which was already occupied by the pre-existing local dev server. The command rebuilt successfully, then stopped at server startup. Focused Lighthouse accessibility audits were run successfully against the existing server instead.

## Commands run

```text
git switch -c design-refinement-pass
pnpm exec biome format --write <8 changed source files>
pnpm lint
pnpm exec biome check <8 changed source files>
pnpm typecheck
pnpm build
pnpm lighthouse:all
pnpm exec lighthouse http://localhost:4321/ --only-categories=accessibility ...
pnpm exec lighthouse http://localhost:4321/blog --only-categories=accessibility ...
pnpm exec lighthouse http://localhost:4321/blog/markdown-style-guide/ --only-categories=accessibility ...
```

Validation notes:

- Targeted Biome check: pass.
- Typecheck: pass, 0 errors/warnings/hints.
- Production build: pass, 42 pages built and indexed by Pagefind.
- Full-repo `pnpm lint`: blocked by pre-existing Biome diagnostics under `.agents/skills/impeccable`; none were introduced or modified by this pass.
- Full Lighthouse sweep: build passed, static server startup blocked by the existing process on port 4321.
- Focused Lighthouse accessibility: home 100, blog 100, representative article 99; contrast passed on all three.

## Screenshots produced

All screenshots are viewport captures. Desktop is 1440×900, tablet is 768×1024, and mobile is 390×844.

### Dark mode

- `screenshots/dark-home-desktop.png`
- `screenshots/dark-home-tablet.png`
- `screenshots/dark-home-mobile.png`
- `screenshots/dark-blog-index-desktop.png`
- `screenshots/dark-blog-index-tablet.png`
- `screenshots/dark-blog-index-mobile.png`
- `screenshots/dark-article-desktop.png`
- `screenshots/dark-article-tablet.png`
- `screenshots/dark-article-mobile.png`
- `screenshots/dark-article-code-desktop.png`
- `screenshots/dark-article-code-tablet.png`
- `screenshots/dark-article-code-mobile.png`
- `screenshots/dark-footer-cards-desktop.png`
- `screenshots/dark-footer-cards-tablet.png`
- `screenshots/dark-footer-cards-mobile.png`

### Light mode

- `screenshots/light-home-desktop.png`
- `screenshots/light-home-tablet.png`
- `screenshots/light-home-mobile.png`
- `screenshots/light-blog-index-desktop.png`
- `screenshots/light-blog-index-tablet.png`
- `screenshots/light-blog-index-mobile.png`
- `screenshots/light-article-desktop.png`
- `screenshots/light-article-tablet.png`
- `screenshots/light-article-mobile.png`
- `screenshots/light-article-code-desktop.png`
- `screenshots/light-article-code-tablet.png`
- `screenshots/light-article-code-mobile.png`
- `screenshots/light-footer-cards-desktop.png`
- `screenshots/light-footer-cards-tablet.png`
- `screenshots/light-footer-cards-mobile.png`

No requested page, viewport, or theme state was omitted.
