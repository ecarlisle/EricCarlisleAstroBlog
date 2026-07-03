# Design Direction

AstroBlog should feel thoughtful, technical, calm, and personal.

The design should prioritize:
- readability
- speed
- accessibility
- semantic structure
- restraint
- strong typography
- clear hierarchy
- useful whitespace

Avoid:
- decorative complexity
- heavy animation
- generic SaaS-card styling
- excessive gradients
- unnecessary JavaScript
- visual changes that require new dependencies

Use existing design tokens from `src/styles/global.css`.
Do not invent new colors, type scales, spacing systems, or layout primitives unless explicitly asked.

## Layout

Content should usually align to an intentional reading rail.
Wide layouts are acceptable for grids, cards, and index pages, but section dividers, headings, and text should not appear accidentally misaligned.

Prefer simple responsive layouts:
- single-column for prose
- two-column only when it improves scanning
- card grids only when content benefits from comparison

## Typography

Typography should carry the design.
Use hierarchy, spacing, and contrast before adding ornament.

Headings should be direct and readable.
Body copy should feel editorial, not marketing-heavy.

## Portfolio Pages

Portfolio content should foreground:
- problem context
- constraints
- architectural decisions
- product judgment
- outcomes
- collaboration

Avoid making NDA/source-code caveats the dominant message.

Case studies should feel credible, specific, and scannable without looking like sales collateral.

## Agent Rules

When making visual changes:
1. Preserve existing tokens and conventions.
2. Make the smallest useful improvement.
3. Do not redesign unrelated areas.
4. Check desktop and mobile implications.
5. Explain the visual intent in the final response.
