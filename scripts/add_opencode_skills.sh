#!/usr/bin/env bash

set -euo pipefail

SKILLS_DIR=".skills"

mkdir -p "$SKILLS_DIR"

cat > "$SKILLS_DIR/astro-static-implementation.md" <<'EOF'
# Astro Static Implementation Skill

Use this skill when editing Astro pages, layouts, and components.

## Priorities

- Prefer static Astro output.
- Avoid client-side JavaScript unless the feature truly requires it.
- Use semantic HTML first.
- Keep components simple and readable.
- Preserve existing layouts, tokens, and naming conventions.
- Do not introduce React/Vue/Svelte islands unless specifically requested.
- Do not add new dependencies without a clear reason.

## Workflow

1. Inspect the existing component/page structure before editing.
2. Identify the smallest files that need changes.
3. Preserve existing patterns unless there is a clear defect.
4. Prefer Astro components and HTML/CSS over client-side code.
5. Run the project’s available checks after changes.

## Verification

- Run the build.
- Confirm no unnecessary client JavaScript was introduced.
- Confirm changed pages still render correctly.
EOF

cat > "$SKILLS_DIR/accessibility-review.md" <<'EOF'
# Accessibility Review Skill

Use this skill when adding or changing UI.

## Requirements

- Use semantic elements before ARIA.
- Links navigate. Buttons perform actions.
- Every icon-only control must have an accessible name.
- Keyboard focus must be visible.
- Interactive elements must be reachable and usable by keyboard.
- Preserve heading order.
- Use one clear h1 per page.
- Avoid hiding meaningful content from assistive tech.
- Respect reduced-motion preferences for animation.

## Checks

- Confirm icon links have aria-label or visually hidden text.
- Confirm theme toggles, search links, nav links, and social links have accessible names.
- Confirm color contrast remains usable in light and dark modes.
- Confirm repeated layout chrome can be excluded from search indexing when appropriate.
EOF

cat > "$SKILLS_DIR/performance-budget.md" <<'EOF'
# Performance Budget Skill

Use this skill when adding dependencies, scripts, images, embeds, search, analytics, or interactive UI.

## Priorities

- Minimal JavaScript.
- Static rendering by default.
- Load feature-specific scripts only where needed.
- Avoid global bundles for page-specific features.
- Avoid heavyweight third-party embeds.
- Prefer native browser features and simple CSS.
- Preserve Lighthouse-friendly output.

## Rules

- Do not add a dependency without explaining why existing tools are insufficient.
- Do not load search, comments, analytics, or embeds globally unless required.
- Defer or isolate optional scripts.
- Prefer optimized image formats already used by the project.
- Keep CSS token-based and avoid large utility sprawl.

## Verification

- Run the production build.
- Check generated output for unexpected client assets.
- For major UI changes, run or recommend Lighthouse.
EOF

cat > "$SKILLS_DIR/seo-content-metadata.md" <<'EOF'
# SEO Content Metadata Skill

Use this skill when creating or editing pages, posts, portfolio entries, or metadata.

## Requirements

- Each page should have a clear title.
- Each important page should have a useful meta description.
- Use canonical, Open Graph, and social metadata if the project supports them.
- Preserve semantic heading hierarchy.
- Use descriptive link text.
- Avoid duplicate titles and descriptions.
- Do not stuff keywords.
- Prefer human-readable URLs.

## Content Checks

- Confirm the page has one h1.
- Confirm titles and descriptions match the actual content.
- Confirm portfolio and article pages have meaningful summaries.
- Confirm images have useful alt text when they convey content.
- Decorative images should use empty alt text where appropriate.
EOF

cat > "$SKILLS_DIR/design-system-css.md" <<'EOF'
# Design System CSS Skill

Use this skill when editing styles, spacing, typography, layout, or component appearance.

## Priorities

- Use existing CSS custom properties and design tokens.
- Prefer semantic class names.
- Avoid one-off hard-coded values unless the project already uses that pattern.
- Keep layout rules simple.
- Preserve responsive behavior.
- Avoid adding broad global styles unless necessary.
- Do not rewrite unrelated styles.

## Workflow

1. Inspect existing tokens and component styles.
2. Reuse spacing, typography, color, and layout variables where possible.
3. Make the smallest targeted style change.
4. Check light and dark modes.
5. Check mobile and desktop behavior.

## Verification

- Confirm styles do not break adjacent components.
- Confirm focus, hover, and active states remain visible.
- Confirm spacing changes are intentional and token-based.
EOF

cat > "$SKILLS_DIR/agent-safe-change.md" <<'EOF'
# Agent Safe Change Skill

Use this skill for every implementation task.

## Boundaries

- Make the smallest change that satisfies the request.
- Do not rewrite unrelated files.
- Do not rename routes, components, tokens, or scripts unless required.
- Do not remove existing behavior unless explicitly requested.
- Do not add dependencies without clear justification.
- Do not invent missing requirements.
- Ask for clarification only when implementation would otherwise be unsafe or ambiguous.

## Workflow

1. Inspect relevant files before editing.
2. Summarize the intended change.
3. Edit only files required for the task.
4. Run available checks.
5. Report changed files, verification steps, and any tradeoffs.

## Stop Conditions

Stop and report instead of guessing when:

- A requested file or component does not exist.
- The build system behaves differently than expected.
- A dependency conflicts with the project.
- The task would require deleting or replacing unrelated work.
EOF

cat > "$SKILLS_DIR/pagefind-search.md" <<'EOF'
# Pagefind Search Skill

Use this skill when implementing or modifying site search.

## Requirements

- Use Pagefind for static site search.
- Search should live at /search.
- Load Pagefind CSS and JavaScript only on the search page.
- Do not load search JavaScript globally.
- Use a simple header icon link to /search.
- The header search icon must be an anchor, not a button.
- The icon must have an accessible name.
- Exclude repeated layout UI from the search index.
- Index meaningful page, article, and portfolio content.

## Indexing Guidance

Index:

- Article bodies
- Portfolio case studies
- Main page content
- Titles and meaningful summaries

Do not index:

- Header
- Footer
- Navigation
- Social links
- Theme toggle
- Utility links
- Repeated share UI

## Verification

- Run the production build.
- Confirm Pagefind generates files in dist/pagefind.
- Confirm /search works in preview.
- Confirm the header search icon links to /search.
- Confirm Pagefind does not load on unrelated pages.
EOF

echo "Created OpenCode skill files in $SKILLS_DIR:"
find "$SKILLS_DIR" -maxdepth 1 -type f -name '*.md' | sort

