import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const reviewDir = path.join(root, 'design-review');

async function filesUnder(relativeDir, extensions) {
  const absoluteDir = path.join(root, relativeDir);
  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await filesUnder(relativePath, extensions)));
    } else if (extensions.some((extension) => entry.name.endsWith(extension))) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

async function source(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

function fenced(relativePath, contents) {
  const extension = path.extname(relativePath).slice(1);
  const language = extension === 'astro' ? 'astro' : extension === 'mdx' ? 'mdx' : extension;
  return `### \`${relativePath}\`\n\n\`\`\`\`\`\`${language}\n${contents.trimEnd()}\n\`\`\`\`\`\`\n`;
}

function declarations(contents, prefixes) {
  const matches = contents.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm);
  const selected = [];

  for (const match of matches) {
    if (prefixes.some((prefix) => match[1].startsWith(prefix))) {
      const line = `${match[1]}: ${match[2]};`;
      if (!selected.includes(line)) selected.push(line);
    }
  }

  return selected.join('\n');
}

function mediaQueries(relativePath, contents) {
  return [...contents.matchAll(/@media\s+([^{]+)\{/g)].map(
    (match) => `- \`${relativePath}\` — \`@media ${match[1].trim()}\``,
  );
}

function styleInventory(relativePath, contents) {
  const styleTags = [...contents.matchAll(/<style([^>]*)>/g)];
  if (styleTags.length === 0) return null;

  const classes = [
    ...new Set(
      [...contents.matchAll(/class(?::list)?=(?:\{[^}]*\}|["']([^"']+)["'])/g)]
        .flatMap((match) => (match[1] ?? '').split(/\s+/))
        .filter((name) => name && !name.includes('{')),
    ),
  ].slice(0, 10);

  const kinds = styleTags.map((match) => (match[1].includes('is:global') ? 'global' : 'scoped'));
  const markup =
    classes.length > 0 ? classes.map((name) => `.${name}`).join(', ') : 'semantic/root markup';
  return `| \`${relativePath}\` | ${kinds.join(' + ')} | ${markup} |`;
}

const styleFiles = await filesUnder('src/styles', ['.css']);
const layoutFiles = await filesUnder('src/layouts', ['.astro']);
const componentFiles = await filesUnder('src/components', ['.astro']);
const pageFiles = await filesUnder('src/pages', ['.astro', '.md', '.mdx', '.js', '.ts']);

const representativeFiles = [
  'src/pages/index.astro',
  'src/pages/blog.astro',
  'src/pages/blog/[...slug].astro',
  'src/pages/blog/page/[page].astro',
  'src/content/blog/markdown-style-guide.mdx',
];

const allStyleBearingFiles = [...styleFiles, ...layoutFiles, ...componentFiles, ...pageFiles];
const contentsByPath = new Map();
for (const relativePath of new Set([...allStyleBearingFiles, ...representativeFiles])) {
  contentsByPath.set(relativePath, await source(relativePath));
}

const globalCss = contentsByPath.get('src/styles/global.css');
const screenshotFiles = [
  'screenshots/home-desktop.png',
  'screenshots/home-tablet.png',
  'screenshots/home-mobile.png',
  'screenshots/blog-index-desktop.png',
  'screenshots/blog-index-tablet.png',
  'screenshots/blog-index-mobile.png',
  'screenshots/article-desktop.png',
  'screenshots/article-tablet.png',
  'screenshots/article-mobile.png',
  'screenshots/article-code-desktop.png',
  'screenshots/article-code-tablet.png',
  'screenshots/article-code-mobile.png',
  'screenshots/home-footer-desktop.png',
];

const mediaQueryLines = allStyleBearingFiles.flatMap((relativePath) =>
  mediaQueries(relativePath, contentsByPath.get(relativePath)),
);

const scopedStyleRows = [...layoutFiles, ...componentFiles, ...pageFiles]
  .map((relativePath) => styleInventory(relativePath, contentsByPath.get(relativePath)))
  .filter(Boolean);

const cssContents = styleFiles
  .map((relativePath) => fenced(relativePath, contentsByPath.get(relativePath)))
  .join('\n');

const report = `# AstroBlog design-review evidence bundle

Generated: 2026-07-04

This is an evidence-gathering bundle only. It contains no redesign, refactor, or styling recommendations.

## Project structure summary

- Framework: Astro 7 static site generation with MDX content.
- Styling: vanilla CSS with OKLCH custom properties and Astro-scoped component styles.
- Package manager: pnpm.
- Shared layout: \`src/layouts/BlogPost.astro\` renders articles and the about, contact, and portfolio content surfaces through its \`pageType\` prop.
- Global head/style entry: \`src/components/BaseHead.astro\` imports \`src/styles/global.css\`.
- Content: \`src/content/blog/*.mdx\`, rendered by the dynamic route \`src/pages/blog/[...slug].astro\`.
- Reusable UI: \`src/components/*.astro\`.
- Generated directories and dependencies are intentionally excluded.

### Main style files

| File | Loading/scope |
| --- | --- |
| \`src/styles/global.css\` | Imported by \`BaseHead.astro\` on every page; imports \`components.css\` and \`pagefind.css\`. |
| \`src/styles/components.css\` | Global shared primitives for cards, grids, collection headers, tags, buttons, pagination, TOC, and stats. |
| \`src/styles/feed.css\` | Imported by home and blog/feed routes; resets feed grid list structure and reserves Pagefind space. |
| \`src/styles/pagefind.css\` | Global Pagefind custom-property mapping and header search-trigger overrides. |

### Layouts and visual components

| Area | Source | Visual responsibility |
| --- | --- | --- |
| Shared content/article layout | \`src/layouts/BlogPost.astro\` | Header/footer shell, article header and hero, prose rail, optional two-column article/sidebar layout, TOC, share strip, post navigation, webmentions. |
| Global document head | \`src/components/BaseHead.astro\` | Loads global CSS and applies stored light-theme preference before first paint. |
| Header/navigation | \`src/components/Header.astro\`, \`HeaderLink.astro\`, \`ThemeToggle.astro\`, \`SocialLinks.astro\` | Fixed responsive header, desktop links, mobile menu, theme control, social links. |
| Footer | \`src/components/Footer.astro\`, \`SocialLinks.astro\` | Copyright and social links. |
| Blog cards/lists | \`src/components/Card.astro\`, \`PostGrid.astro\`, \`TagFilterBar.astro\`, \`PaginationNav.astro\` | Card markup, image/title/meta/tags, responsive grid, filtering, pagination. |
| Article affordances | \`src/components/ShareStrip.astro\`, \`Webmentions.astro\`, \`FormattedDate.astro\` | Sharing, reactions/replies, and dates. |

## Route inventory

| Route | Source | Notes |
| --- | --- | --- |
| \`/\` | \`src/pages/index.astro\` | Home introduction and latest-writing card grid. |
| \`/blog\` | \`src/pages/blog.astro\` | Main blog index with tag filter, cards, and pagination. |
| \`/blog/[slug]/\` | \`src/pages/blog/[...slug].astro\` | Static article routes sourced from \`src/content/blog/*.mdx\`. |
| \`/blog/page/[page]\` | \`src/pages/blog/page/[page].astro\` | Paginated blog index. |
| \`/about\` | \`src/pages/about.astro\` | Shared \`BlogPost\` layout, non-article mode. |
| \`/contact\` | \`src/pages/contact.astro\` | Shared layout plus scoped contact-form styles. |
| \`/portfolio\` | \`src/pages/portfolio.astro\` | Shared layout plus extensive scoped case-study styles. |
| \`/tags\` | \`src/pages/tags/index.astro\` | Tag index. |
| \`/tags/[tag]\` | \`src/pages/tags/[tag].astro\` | Static tag route; current project notes say filtering is client-side and these routes may be empty. |
| \`/404\` | \`src/pages/404.astro\` | Custom not-found page. |
| \`/rss.xml\` | \`src/pages/rss.xml.js\` | RSS endpoint; nonvisual. |

## Routes captured

- Home: \`http://localhost:4321/\`
- Blog index: \`http://localhost:4321/blog\`
- Representative article: \`http://localhost:4321/blog/markdown-style-guide/\`
- Article code detail: \`http://localhost:4321/blog/markdown-style-guide/#code-blocks\`
- Home footer/card detail: home page scrolled to the bottom.

The representative article was selected because it contains headings, paragraphs, an image, blockquotes, tables, lists, inline code, fenced code blocks, and the desktop article sidebar/TOC.

## Screenshot file list

All primary screenshots use the requested widths. Heights were 900px desktop, 1024px tablet, and 844px mobile. Screenshots are viewport captures; detail captures cover code blocks and the footer/card area.

${screenshotFiles.map((file) => `- [\`${file}\`](./${file})`).join('\n')}

### Screenshot previews

${screenshotFiles.map((file) => `![${path.basename(file, '.png')}](./${file})`).join('\n\n')}

## Typography tokens

\`\`\`css
${declarations(globalCss, ['--font-', '--type-', '--line-height-'])}
\`\`\`

Font files are self-hosted through Fontsource imports in \`global.css\`: Inter Variable for body copy, Plus Jakarta Sans Variable for headings, and Fira Code Variable for monospaced content.

## Color tokens

\`\`\`css
${declarations(globalCss, [
  '--bg-',
  '--text-',
  '--brand-',
  '--neutral-',
  '--accent-',
  '--border-',
  '--color-',
])}
\`\`\`

The unqualified \`:root\` values form the default dark theme. \`[data-theme="light"]\` overrides the palette. Theme choice is persisted in \`localStorage\`; only a stored \`light\` value adds the light-theme attribute. The captured browser state was the default dark theme.

## Spacing and layout tokens

\`\`\`css
${declarations(globalCss, [
  '--rhythm',
  '--space-',
  '--radius-',
  '--layout-',
  '--size-',
  '--focus-',
  '--transition-',
  '--bp-',
])}
\`\`\`

## Media queries

${mediaQueryLines.join('\n')}

The CSS custom property \`--bp-mobile: 720px\` is documentary; native CSS custom properties cannot be substituted into media-query conditions, so source rules use literal breakpoint values.

## Layout wrappers and visual rails

- \`body\`: flex column, minimum viewport height, default dark background, body font and fluid body size. A global style in \`Header.astro\` adds top padding equal to the measured fixed-header height.
- \`.site-frame\`: shared component padding used by the header and footer.
- \`main\`: centered, \`--layout-max-width-wide\` (75rem) maximum width with fluid-token padding; reduced to component padding at 720px.
- \`.prose\`: centered content wrapper. Paragraphs and list items are limited to \`--layout-max-width\` (68ch); article/page content adds component padding in the layout.
- \`article\` and \`.page-header\`: the shared layout centers standard headers at the reading width and article headers/heroes at 1020px.
- \`.post-layout\`: single column by default; at 1024px article pages become content plus a 220px sidebar. Non-article pages remain one column.
- \`.post-sidebar-inner\` and \`.toc\`: sticky desktop article controls/TOC.
- \`.grid.grid--cards\`: auto-fit card grid with a 280px minimum; the first card spans the full grid and uses a larger title until the 720px single-column breakpoint.
- \`.collection-header\`: consistent index-page heading/description spacing.
- \`.feed\`: semantic wrapper on home/blog/tag collection pages; feed list reset lives in \`feed.css\`.
- \`header.site-header\`: fixed responsive navigation, with social links hidden by 1024px and the menu control enabled by 840px.
- \`footer.site-frame\`: centered copyright and social links.

## Astro scoped-style inventory and relevant markup

Astro scopes ordinary \`<style>\` blocks to the component that declares them. The exception below is the explicit \`<style is:global>\` block in \`Header.astro\`.

| File | Style block type | Representative classes/markup |
| --- | --- | --- |
${scopedStyleRows.join('\n')}

Complete markup and scoped style blocks for every layout and component are preserved verbatim in \`source-style-export.md\`. The key structure is:

- \`Header.astro\`: \`<header class="site-header site-frame">\` containing the main \`<nav>\`, internal links, responsive menu button, theme toggle, and social controls.
- \`Footer.astro\`: \`<footer class="site-frame">\` containing copyright text and social links.
- \`Card.astro\`: configurable \`div\`, \`article\`, or \`li\` root with \`.card\`, optional image slot, \`.prose\`, title link, metadata, tags, and optional footer slot.
- \`PostGrid.astro\`: \`<ul class="grid grid--cards">\` of \`Card\` components.
- \`BlogPost.astro\`: shared shell with \`<main>\`, \`<article>\`, \`.page-header\`, optional hero, \`.post-layout\`, \`.post-content > .prose\`, and optional \`<aside class="post-sidebar">\`.

## Notes that affect visual evaluation

- The default theme is dark; a light theme exists and is activated only by the user toggle/stored preference. This bundle captures dark mode only.
- The fixed header measures itself with \`ResizeObserver\` and writes \`--header-height\`; it also hides/reveals based on scroll direction.
- Responsive navigation changes at 840px; desktop social links are hidden at 1024px; the smallest header title adjustment is at 420px.
- Article layout changes to two columns at 1024px, so the 768px capture intentionally has no desktop sidebar column.
- The main reading rail is 68ch; the overall page rail is 75rem; article headers and heroes cap at 1020px.
- Heading and body sizes use \`clamp()\`; spacing is derived from a fluid baseline-rhythm token.
- Cards use view-timeline entry animation when supported and reduced motion is not requested. Reduced-motion rules collapse animation and transition duration.
- Expressive Code provides syntax-highlighted code rendering; \`global.css\` also contains fallback \`code\` and \`pre\` styles.
- Most Astro component styles are scoped. Global component primitives are in \`components.css\`; Pagefind overrides use deliberately high specificity.
- Home and blog index routes import \`feed.css\` directly in addition to the global stylesheet chain.
- Hero/card images use Astro image processing and responsive source generation.
- Captures were taken from the already-running local Astro dev server at \`localhost:4321\`. No dependency installation or build was needed.

## Global CSS file contents

${cssContents}
`;

const sourceExportFiles = [
  ...styleFiles,
  ...layoutFiles,
  ...componentFiles,
  ...representativeFiles,
];

const exportSections = sourceExportFiles.map((relativePath) =>
  fenced(relativePath, contentsByPath.get(relativePath)),
);

const sourceExport = `# AstroBlog compact source/style export

Generated: 2026-07-04

This export contains only the visual source needed to understand the site shell, styling system, shared components, primary routes, and one representative MDX article. Generated output, dependencies, lockfiles, build artifacts, and unrelated content are excluded.

## Included files

${sourceExportFiles.map((relativePath) => `- \`${relativePath}\``).join('\n')}

${exportSections.join('\n')}
`;

await writeFile(path.join(reviewDir, 'design-review-report.md'), `${report.trimEnd()}\n`);
await writeFile(path.join(reviewDir, 'source-style-export.md'), `${sourceExport.trimEnd()}\n`);

console.log(
  `Wrote design-review-report.md and source-style-export.md from ${sourceExportFiles.length} source files.`,
);
