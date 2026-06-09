# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro static blog using Markdown/MDX content collections, RSS, sitemap, and local font assets.

- Package manager: `pnpm`
- Required Node: `>=22.12.0`
- Main config: `astro.config.mjs`
- Content schema: `src/content.config.ts`
- Design/architecture specs: `docs/design_system_specification.md` and `docs/blog_architecture_specification.md`

## Common commands

Run from the repository root.

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm astro check
pnpm astro ...
pnpm exec vitest
pnpm exec vitest path/to/test-file.test.ts
```

There are no package scripts for lint, format, or tests yet. Use direct `pnpm exec` commands when needed, for example:

```sh
pnpm exec biome check .
pnpm exec biome format . --write
```

Lighthouse CI is configured in `lighthouserc.js`. It starts `npm run preview` and checks the homepage at `http://localhost:4321/`.

## Architecture

Astro pages live under `src/pages/` and generate routes from file paths. The main functional routes are:

- `src/pages/index.astro` — homepage; currently contains a placeholder feed section.
- `src/pages/blog/index.astro` — lists posts from the `blog` content collection, newest first.
- `src/pages/blog/[...slug].astro` — statically renders each Markdown/MDX post through `BlogPost.astro`.
- `src/pages/rss.xml.js` — RSS feed from `getCollection('blog')`.

`src/content.config.ts` defines the `blog` collection from `src/content/blog/**/*.{md,mdx}`. Current frontmatter fields are `title`, `description`, `pubDate`, optional `updatedDate`, optional `heroImage`, optional `tags`, optional social metadata, and optional `share` metadata. Prefer this file over the outdated schema snippet in the design docs.

`src/layouts/BlogPost.astro` wraps rendered post content with shared head metadata, header/footer, hero image handling, dates, and article styling. `src/components/BaseHead.astro` centralizes metadata, canonical URL, sitemap/RSS links, fonts, and Open Graph/Twitter tags.

`astro.config.mjs` enables MDX and sitemap integrations, sets `site: 'https://www.ericcarlisle.com'`, and configures a local Atkinson font provider. `vitest.config.ts` overrides the Astro site to `https://ericcarlisle.com` for tests.

## Styling and design rules

The design system is documented in `docs/design_system_specification.md` and duplicated in `docs/blog_architecture_specification.md`. Important implementation constraints from those specs:

- Use semantic design tokens for colors, spacing, typography, shadows, focus, motion, and layout where possible.
- Dark mode is the default; light mode is triggered with `html[data-theme="light"]`.
- Avoid hardcoded colors in new components; use semantic custom properties so theme toggling works.
- Avoid direct pixel/rem dimensions in Astro templates when token variables exist.
- Use `@media (prefers-reduced-motion: reduce)` to force `--duration-instant` for animations/transitions.
- Interactive controls should preserve visible `:focus-visible` styling and 44px touch targets.

The actual current token source is `src/styles/global.css`, with component helpers in `src/styles/components.css`. The docs describe a more formal token naming scheme than the current CSS uses, so when editing existing styles, match the live files unless intentionally migrating tokens.

## Formatting and editor setup

- Biome config: `biome.json`
- EditorConfig: `.editorconfig`
- Recommended VS Code extensions: Astro and MDX extensions from `.vscode/extensions.json`

The project uses LF line endings, two-space indentation, and single quotes for JavaScript/TypeScript. Biome VCS integration respects `.gitignore`.
