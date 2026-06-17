# AstroBlog — Agent Instructions

**DO NOT modify this file.** It is a read-only runtime configuration.

## Stack & Tooling

- **Astro 6** Static Site Generation, TypeScript 6, vanilla CSS with OKLCH custom properties, HTML5 semantics
- **pnpm** — run `pnpm astro check` (typecheck) then `pnpm exec biome check .` (lint) before commits
- **Path aliases**: `@styles/*`, `@components/*`, `@images/*` (configured in `astro.config.mjs` and `tsconfig.json`)
- **No Tailwind** — pure CSS with design tokens in `src/styles/global.css`
- **No test files exist** — vitest is installed but unused
- **No CI workflows** — no `.github/workflows/` directory

## Content Schema (`src/content.config.ts`)

- `description`: max 165 chars
- `pubDate`: `z.coerce.date()` accepts fuzzy locale dates
- **Always format front-matter dates as ISO 8601 US Eastern timezone** (e.g. `2026-06-17T00:00:00-04:00`)
- Blog posts are `.mdx` in `src/content/blog/`

## Architecture Notes

- **Single layout** (`src/layouts/BlogPost.astro`) is shared by articles, about, and style-guide pages. Gate article-only elements (reading progress bar, TOC, dates, pagination, tags) behind `{pageType === 'article' && ...}`.
- **JSON-LD** lives in `src/components/SchemaOrg.astro` — one `<script type="application/ld+json">` block injected before `</head>`. Article schemas use `BlogPosting`.
- **Pagefind** for full-text search, **Partytown** for GA4, **Expressive Code** for syntax highlighting
- **Client-side tag filtering** via inline `<script is:inline>` on index + blog pages (not a separate `/tags/[tag]` route — that directory exists but is empty)
- **Reading time** is computed server-side from body word count: `Math.ceil(wordCount / 200)`

## Style Conventions

- Biome config: single quotes, trailing commas (all), semicolons (always), LF line endings, 2-space indent
- **Preserve double-trailing spaces in `.md` and `.mdx`** — formatters must not strip them (they create hard line breaks)
- Never hard-code `px`/`rem` for metrics — use design tokens from `@styles/global.css`
- Never target global HTML elements outside `<article>` blocks to avoid layout bleed
- Image imports use `@images/` alias pointing to `src/assets/images/`
- Author biography source of truth: `docs/author_profile.md`

## Accessibility

- No `--text-muted` on `--bg-surface-elevated` (WCAG AA contrast failure)
- Minimum 44px touch targets (`--size-touch-target-min`)
- `:focus-visible` with dashed outline tokens
- Wrap custom animations in `@media (prefers-reduced-motion: reduce)`

## Verified CLI Commands

```sh
pnpm dev              # Dev server on localhost:4321
pnpm build            # Build to ./dist/
pnpm typecheck        # pnpm astro check
pnpm lint             # pnpm exec biome check .
pnpm format           # pnpm exec biome format . --write
pnpm fallow:dead-code # npx fallow dead-code --unused-files --unused-deps
pnpm fallow:audit     # npx fallow audit --changed-since main
```

## Stale Files

`.opencode/project-memory.md` references Tailwind CSS and Astro v5 — both incorrect. If used as project memory, replace with AGENTS.md content or delete.
