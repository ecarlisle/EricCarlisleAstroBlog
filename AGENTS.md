# AGENTS.md

> Claude Code users: see [CLAUDE.md](./CLAUDE.md) for additional guidance.

## Project

AstroBlog is Eric Carlisle's Astro 7 static site for technical blogging, portfolio content, and
professional web presence.

The project uses Astro content collections, MDX, RSS, sitemap generation, Pagefind search,
Partytown, local variable fonts, and a Cloudflare Worker contact form.

The codebase is close to feature-complete. Much of the current blog content is placeholder or test
content used to validate styling, pagination, tags, search, metadata, and layout behavior. Do not
treat every existing post as final editorial content, and do not delete placeholder posts unless
explicitly asked.

- Package manager: **pnpm only**. Do not use npm or yarn.
- Node: `>=22.12.0`

## Commands

```sh
pnpm dev              # dev server
pnpm build            # production build
pnpm preview          # preview build output
pnpm typecheck        # astro check
pnpm lint             # biome check .
pnpm format           # biome format . --write
pnpm lighthouse:all   # run Lighthouse across routes
```

## Primary Source Areas

```txt
src/content.config.ts
src/pages/
src/content/blog/
src/layouts/
src/components/
src/styles/
src/lib/
astro.config.mjs
package.json
docs/
contact-worker/
```

The authoritative blog frontmatter schema is `src/content.config.ts`. Check it before adding or
documenting content fields.

## Avoid Editing

```txt
dist/
node_modules/
lh-reports/
docs/context/
```

These are generated, dependency, report, or snapshot areas. Do not edit them unless the user
explicitly requests generated-output work.

## Engineering Priorities

- Preserve fast static delivery and strong Core Web Vitals.
- Prefer Astro, semantic HTML, and CSS over client-side JavaScript.
- Keep client-side JavaScript minimal and avoid unnecessary hydration.
- Preserve accessibility, including keyboard navigation, focus-visible states, reduced motion,
  meaningful alt text, and minimum touch targets.
- Preserve SEO fundamentals, canonical metadata, structured data, RSS, sitemap output, and useful
  internal links.
- Use semantic HTML and a clear heading hierarchy.
- Maintain strong typography and the design tokens in `src/styles/global.css`.
- Keep Astro components and utilities focused, reusable, and maintainable.
- Write real editorial content with a clear, grounded, human voice.

## Content Guidance

Most existing technical posts currently support layout, taxonomy, pagination, metadata, search, and
styling validation. Preserve enough placeholder material to keep those behaviors testable while
real articles replace it. See `docs/content-status.md` and `docs/editorial-guidelines.md`.

## Documentation Rule

> When changing architecture, content conventions, scripts, deployment behavior, styling
> conventions, or agent workflow, update the relevant file in `docs/`.
