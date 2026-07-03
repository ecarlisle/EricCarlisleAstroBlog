# AstroBlog — Eric Carlisle's personal site

Astro 7 static site (SSG) for technical blogging, portfolio, and professional presence.  
Stack: **Astro 7 · TypeScript · Vanilla CSS (OKLCH tokens) · MDX · pnpm · Biome 2.5**

---

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm typecheck` | `astro check` (TypeScript + Astro diagnostics) |
| `pnpm lint` | `biome check .` |
| `pnpm format` | `biome format . --write` |
| `pnpm lighthouse:all` | Lighthouse audit across key routes |

Use the **lightest** validation that proves a change — see Validation Guidance below.

---

## Conventions

- **Package manager**: pnpm only. Never npm or yarn. Node >=22.12.0.
- **CSS**: Vanilla only — no Tailwind, no CSS-in-JS. Design tokens in `src/styles/global.css` as OKLCH custom properties. Component-scoped `<style>` blocks for local styles. Shared styles in `src/styles/components.css`.
- **Components**: PascalCase filenames (`Header.astro`), typed `Props` interface, `Astro.props` destructuring. Path aliases: `@components/`, `@styles/`, `@lib/`, `@images/`.
- **Pages**: kebab-case filenames, bracket notation for dynamic routes (`[slug].astro`).
- **Content**: MDX in `src/content/blog/`. Frontmatter schema lives in `src/content.config.ts` — the **single source of truth** for all fields. Never invent fields without updating it.
- **Single layout**: `src/layouts/BlogPost.astro` is used by every page. Article-only features gated behind `{pageType === 'article'}`.
- **Accessibility**: Skip-link, `aria-label`, `aria-current`, `sr-only`, `:focus-visible`, `prefers-reduced-motion`, 44px touch targets — all used throughout.
- **SEO**: Sitemap, RSS (`src/pages/rss.xml.js`), JSON-LD (`SchemaOrg.astro`), OG/Twitter metadata (`BaseHead.astro`).
- **Client JS**: Minimal. Pagefind search, Partytown (GA4), theme toggle, tag filter bar — all intentionally scoped.

## Sections to avoid editing

`dist/` · `node_modules/` · `.astro/` · `lh-reports/` · `docs/context/` · `.playwright-mcp/`

These are generated, dependency, or snapshot artifacts. Only touch them when explicitly asked.

---

## Content rules

- Most existing posts are **placeholder/test content** — don't treat as final editorial material, but **don't delete** them either (they validate layouts, tags, pagination, search).
- Before changing content conventions, read `docs/content-status.md` and `docs/editorial-guidelines.md`.
- Don't rename routes, alter slugs, or rewrite editorial direction unless asked.

## Key gotchas

- `WEBMENTION_IO_TOKEN` env var required for live webmentions at build time. Without it, mock data is used.
- `.env.production` / `.env.development` are gitignored — create them locally.
- Vitest is installed but **not used** — no test runner is active.
- Tag pages exist as static routes but filtering is primarily client-side.
- Biome `noUnusedVariables` and `noUnusedImports` are **off** — dead imports not flagged.
- Contact form posts to a separate Cloudflare Worker (`contact-worker/`), not an Astro endpoint.

---

## Validation Guidance

| Change type | Validate with |
|---|---|
| TypeScript, Astro, schema, components, utilities | `pnpm typecheck` |
| Styles, components, layouts, content rendering | `pnpm lint` |
| Routes, config, integrations, content collections, RSS, sitemap, Pagefind, Partytown, build behavior | `pnpm build` |
| Performance, SEO, accessibility, routing | `pnpm lighthouse:all` (when warranted) |
| Formatting | `pnpm format` (only when requested or clearly needed) |

If a command can't be run, explain why.

---

## Documentation

When changing architecture, content conventions, scripts, deployment, styling, or agent workflow, update the relevant file in `docs/`. If out of scope, mention it in the summary.

## Work loop

1. Read this file and relevant docs.
2. Inspect the files related to the task.
3. State the plan before editing.
4. Make the smallest reasonable change.
5. Validate with the appropriate command.
6. Summarize: files changed, validation results, notable decisions, anything left unchanged.

No broad refactors, dependency changes, formatting sweeps, or generated-output updates without explicit request.
