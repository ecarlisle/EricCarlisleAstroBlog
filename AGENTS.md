AGENTS.md

Agent Startup Rule

Before making changes, agents must read this file and follow its instructions.

At the start of each task, the agent should briefly identify:

* the relevant rules from this file
* any referenced docs it used
* any assumptions it is making

If instructions conflict, this file takes priority unless the user explicitly overrides it.

Do not overwrite or regenerate this file unless the user explicitly asks for AGENTS.md changes.

Project

AstroBlog is Eric Carlisle’s Astro 7 static site for technical blogging, portfolio content, and
professional web presence.

The project uses Astro content collections, MDX, RSS, sitemap generation, Pagefind search,
Partytown, local variable fonts, and a Cloudflare Worker contact form.

The codebase is close to feature-complete. Much of the current blog content is placeholder or test
content used to validate styling, pagination, tags, search, metadata, and layout behavior. Do not
treat every existing post as final editorial content, and do not delete placeholder posts unless
explicitly asked.

* Package manager: pnpm only. Do not use npm or yarn.
* Node: >=22.12.0

Work Loop

For most tasks, follow this sequence:

1. Read this file and any relevant docs.
2. Inspect the files related to the task.
3. Briefly state the plan before editing.
4. Make the smallest reasonable change.
5. Validate the change with the appropriate command.
6. Summarize what changed, what was validated, and any follow-up work.

Do not perform broad refactors, dependency changes, formatting sweeps, or generated-output updates
unless the user explicitly requests them.

Do not overwrite unrelated user changes. If existing changes are present outside the task scope,
leave them alone and mention them in the final summary if relevant.

Commands

pnpm dev              # dev server
pnpm build            # production build
pnpm preview          # preview build output
pnpm typecheck        # astro check
pnpm lint             # biome check .
pnpm format           # biome format . --write
pnpm lighthouse:all   # run Lighthouse across routes

Validation Guidance

Use the lightest validation that reasonably proves the change.

* After TypeScript, Astro, schema, component, or utility changes, run pnpm typecheck.
* After style, component, layout, or content-rendering changes, run pnpm lint.
* After route, config, integration, content collection, RSS, sitemap, Pagefind, Partytown, or build behavior changes, run pnpm build.
* After performance, SEO, accessibility, or routing changes, consider pnpm lighthouse:all if the task warrants it.
* Use pnpm format only when formatting was requested or when the edited files clearly need it.

If a command cannot be run, explain why.

Primary Source Areas

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

The authoritative blog frontmatter schema is src/content.config.ts. Check it before adding,
changing, or documenting content fields.

Do not invent frontmatter fields. If a new field is needed, update the schema, update relevant docs,
and ensure existing content remains valid.

Avoid Editing

dist/
node_modules/
lh-reports/
docs/context/

These are generated, dependency, report, or snapshot areas. Do not edit them unless the user
explicitly requests generated-output work.

Engineering Priorities

* Preserve fast static delivery and strong Core Web Vitals.
* Prefer Astro, semantic HTML, and CSS over client-side JavaScript.
* Keep client-side JavaScript minimal and avoid unnecessary hydration.
* Preserve accessibility, including keyboard navigation, focus-visible states, reduced motion,
    meaningful alt text, and minimum touch targets.
* Preserve SEO fundamentals, canonical metadata, structured data, RSS, sitemap output, and useful
    internal links.
* Use semantic HTML and a clear heading hierarchy.
* Maintain strong typography and the design tokens in src/styles/global.css.
* Keep Astro components and utilities focused, reusable, and maintainable.
* Write real editorial content with a clear, grounded, human voice.

Content Guidance

Most existing technical posts currently support layout, taxonomy, pagination, metadata, search, and
styling validation. Preserve enough placeholder material to keep those behaviors testable while
real articles replace it.

Before changing content conventions, read:

docs/content-status.md
docs/editorial-guidelines.md

Do not delete placeholder posts, rename routes, alter slugs, or rewrite editorial direction unless
the user explicitly asks.

Documentation Rule

When changing architecture, content conventions, scripts, deployment behavior, styling conventions,
or agent workflow, update the relevant file in docs/.

If documentation should be updated but the task scope does not allow it, mention that in the final
summary.

Final Response Rule

When finished, summarize:

* files changed
* validation commands run and results
* notable decisions or tradeoffs
* anything intentionally left unchanged
