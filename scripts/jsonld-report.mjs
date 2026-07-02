/**
 * JSON-LD Structured Data Report
 *
 * Scans the built site in `dist/`, extracts every
 * `<script type="application/ld+json">` block, parses it, and writes a
 * structured report to `data/structured-data/`.
 *
 * Usage:
 *   node scripts/jsonld-report.mjs
 *
 * Expected to be called after `astro build`.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
const REPORT_DIR = join(import.meta.dirname, '..', 'data', 'structured-data');
const REPORT_JSON = join(REPORT_DIR, 'jsonld-report.json');
const REPORT_MD = join(REPORT_DIR, 'jsonld-report.md');

/** Directories/files under dist/ that are not page content. */
const SKIP_PREFIXES = ['pagefind/', '_astro/', 'assets/'];

function shouldSkip(relativePath) {
  return SKIP_PREFIXES.some((prefix) => relativePath.startsWith(prefix));
}

/** Walk a directory recursively, yielding relative file paths. */
function* walk(dir, prefix = '') {
  for (const entry of readdirSync(join(dir, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      yield* walk(dir, path);
    } else if (entry.name.endsWith('.html') && !shouldSkip(path)) {
      yield path;
    }
  }
}

/**
 * Extract all JSON-LD blocks from an HTML string.
 * Returns an array of { raw, parsed } objects.
 */
function extractJsonLd(html) {
  const blocks = [];
  const regex = /<script[^>]*type=(["']?)application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi;
  let match = regex.exec(html);

  while (match !== null) {
    const raw = match[2].trim();
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        blocks.push({ raw, parsed });
      } catch {
        blocks.push({ raw, parsed: null, parseError: `Invalid JSON: ${raw.slice(0, 120)}` });
      }
    }

    match = regex.exec(html);
  }

  return blocks;
}

/** Collect all @type values from a parsed JSON-LD structure. */
function collectTypes(parsed) {
  const types = new Set();

  if (!parsed || typeof parsed !== 'object') return types;

  if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
    for (const item of parsed['@graph']) {
      if (item['@type']) {
        const t = item['@type'];
        if (Array.isArray(t)) for (const v of t) types.add(v);
        else types.add(t);
      }
    }
  } else if (parsed['@type']) {
    const t = parsed['@type'];
    if (Array.isArray(t)) for (const v of t) types.add(v);
    else types.add(t);
  }

  return types;
}

/**
 * Recursively collect nested/supporting @type values from a parsed JSON-LD
 * structure.  Walks all properties of @graph items (and the root object when
 * there is no @graph), but does NOT include the top-level entity @type values
 * themselves — avoiding double-count with collectTypes().
 *
 * For example, given a BlogPosting with an "image" property that points to
 * {"@type":"ImageObject",...}, this returns ImageObject.
 *
 * Returns a Set of type strings.
 */
function collectNestedTypes(parsed) {
  const types = new Set();
  if (!parsed || typeof parsed !== 'object') return types;

  function walk(val) {
    if (!val || typeof val !== 'object') return;
    if (Array.isArray(val)) {
      for (const item of val) walk(item);
      return;
    }

    if (val['@type']) {
      const t = val['@type'];
      if (Array.isArray(t)) for (const v of t) types.add(v);
      else types.add(t);
    }

    for (const key of Object.keys(val)) {
      if (key === '@context') continue;
      walk(val[key]);
    }
  }

  // Walk properties of each @graph item (but not the item itself).
  // When there is no @graph, walk properties of the root object.
  const items = parsed['@graph'] && Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];

  for (const item of items) {
    for (const key of Object.keys(item)) {
      if (key === '@type' || key === '@id' || key === '@context') continue;
      walk(item[key]);
    }
  }

  return types;
}

/** Collect all @id values from a parsed JSON-LD structure. */
function collectIds(parsed) {
  const ids = new Set();

  if (!parsed || typeof parsed !== 'object') return ids;

  const items = parsed['@graph'] && Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];

  for (const item of items) {
    if (item['@id']) ids.add(item['@id']);
  }

  return ids;
}

/**
 * Normalize a build file path (e.g. "blog/accessible-forms/index.html") into
 * a readable route (e.g. "/blog/accessible-forms/").
 */
function pagePathToRoute(pagePath) {
  const route = pagePath.replace(/\/?index\.html$/, '');
  return route ? `/${route}/` : '/';
}

// ── Step 1: Verify build exists ──
if (!existsSync(DIST)) {
  console.error('❌ dist/ not found. Run `pnpm build` first.');
  process.exit(1);
}

// ── Step 2: Scan pages ──
const pages = [];
for (const file of walk(DIST)) {
  pages.push(file);
}
pages.sort();

console.log(`📄 Found ${pages.length} page(s) to scan.`);

// ── Step 3: Extract JSON-LD from each page ──
const pageResults = [];
let totalBlocks = 0;
let totalParseErrors = 0;
const typeCounts = new Map();
const nestedTypeCounts = new Map();

for (const pagePath of pages) {
  const fullPath = join(DIST, pagePath);
  const html = readFileSync(fullPath, 'utf-8');
  const blocks = extractJsonLd(html);

  const pageTypes = new Set();
  const pageNestedTypes = new Set();
  const pageIds = new Set();
  let hasParseError = false;

  for (const block of blocks) {
    totalBlocks++;

    if (block.parseError) {
      hasParseError = true;
      totalParseErrors++;
      continue;
    }

    const types = collectTypes(block.parsed);
    const nestedTypes = collectNestedTypes(block.parsed);
    const ids = collectIds(block.parsed);

    for (const t of types) {
      pageTypes.add(t);
      typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
    }
    for (const nt of nestedTypes) {
      pageNestedTypes.add(nt);
      nestedTypeCounts.set(nt, (nestedTypeCounts.get(nt) || 0) + 1);
    }
    for (const id of ids) pageIds.add(id);
  }

  pageResults.push({
    page: pagePath,
    route: pagePathToRoute(pagePath),
    blockCount: blocks.length,
    types: [...pageTypes].sort(),
    nestedTypes: [...pageNestedTypes].sort(),
    ids: [...pageIds].sort(),
    hasParseError,
    parseErrors: blocks.filter((b) => b.parseError).map((b) => b.parseError),
  });
}

// ── Step 4: Write reports ──
mkdirSync(REPORT_DIR, { recursive: true });

// JSON report
const jsonReport = {
  generatedAt: new Date().toISOString(),
  totalPages: pages.length,
  totalJsonLdBlocks: totalBlocks,
  totalParseErrors,
  /** Top-level JSON-LD entity types (the @type of each @graph item or root object). */
  typeCoverage: Object.fromEntries([...typeCounts.entries()].sort()),
  /**
   * Nested/supporting schema object types found recursively inside properties
   * of top-level entities (e.g. ImageObject referenced in a BlogPosting's
   * "image" property, or ListItem inside a BreadcrumbList's "itemListElement").
   * These are distinct from top-level entity types — no double-counting.
   */
  nestedTypeCoverage: Object.fromEntries([...nestedTypeCounts.entries()].sort()),
  pages: pageResults.map((p) => ({
    page: p.page,
    route: p.route,
    blockCount: p.blockCount,
    types: p.types,
    nestedTypes: p.nestedTypes,
    ids: p.ids,
    ...(p.hasParseError ? { parseErrors: p.parseErrors } : {}),
  })),
};

writeFileSync(REPORT_JSON, `${JSON.stringify(jsonReport, null, 2)}\n`);
console.log(`✅ JSON report → ${relative(join(import.meta.dirname, '..'), REPORT_JSON)}`);

// Markdown report
const noJsonLdPages = pageResults.filter((p) => p.blockCount === 0);
const errorPages = pageResults.filter((p) => p.hasParseError);

const sortedTypes = [...typeCounts.entries()].sort((a, b) => b[1] - a[1]);
const sortedNestedTypes = [...nestedTypeCounts.entries()].sort((a, b) => b[1] - a[1]);

const mdLines = [];
mdLines.push('# JSON-LD Structured Data Report');
mdLines.push('');
mdLines.push(`Generated: ${new Date().toISOString()}`);
mdLines.push('');
mdLines.push('## Summary');
mdLines.push('');
mdLines.push(`| Metric | Value |`);
mdLines.push(`|---|---|`);
mdLines.push(`| Pages scanned | ${pages.length} |`);
mdLines.push(`| Total JSON-LD blocks | ${totalBlocks} |`);
mdLines.push(`| Top-level entity types | ${sortedTypes.length} |`);
mdLines.push(`| Nested/supporting types | ${sortedNestedTypes.length} |`);
mdLines.push(`| Pages with JSON-LD | ${pages.length - noJsonLdPages.length} |`);
mdLines.push(`| Pages without JSON-LD | ${noJsonLdPages.length} |`);
mdLines.push(`| Parse errors | ${totalParseErrors} |`);
mdLines.push('');
mdLines.push('## Top-Level Entity Type Coverage');
mdLines.push('');
mdLines.push('These are the primary schema types declared at the top level of each');
mdLines.push('JSON-LD graph (the `@type` of each `@graph` entry or root object).');
mdLines.push('');
mdLines.push('| Type | Pages |');
mdLines.push('|---|---|');

for (const [type, count] of sortedTypes) {
  mdLines.push(`| ${type} | ${count} |`);
}

mdLines.push('');
mdLines.push('## Nested/Supporting Schema Object Types');
mdLines.push('');
mdLines.push('These are `@type` values found recursively inside properties of');
mdLines.push('top-level entities — for example, an `ImageObject` inside a');
mdLines.push('`BlogPosting`\'s "image" property, or a `ListItem` inside a');
mdLines.push('`BreadcrumbList`\'s "itemListElement".');
mdLines.push('');
mdLines.push('| Type | Pages |');
mdLines.push('|---|---|');

if (sortedNestedTypes.length > 0) {
  for (const [type, count] of sortedNestedTypes) {
    mdLines.push(`| ${type} | ${count} |`);
  }
} else {
  mdLines.push('| _(none)_ | — |');
}

mdLines.push('');
mdLines.push('## Per-Page Breakdown');
mdLines.push('');
mdLines.push('| Route | Blocks | Types | Nested Types |');
mdLines.push('|---|---|---|---|');

for (const p of pageResults) {
  const types = p.types.length > 0 ? p.types.join(', ') : '—';
  const nestedTypes = p.nestedTypes.length > 0 ? p.nestedTypes.join(', ') : '—';
  const marker = p.hasParseError ? ' ⚠️' : '';
  mdLines.push(`| \`${p.route}\`${marker} | ${p.blockCount} | ${types} | ${nestedTypes} |`);
}

if (errorPages.length > 0) {
  mdLines.push('');
  mdLines.push('## Parse Errors');
  mdLines.push('');

  for (const p of errorPages) {
    mdLines.push(`### ${p.route}`);
    mdLines.push('');
    for (const err of p.parseErrors) {
      mdLines.push(`- \`${err}\``);
    }
    mdLines.push('');
  }
}

if (noJsonLdPages.length > 0) {
  mdLines.push('');
  mdLines.push('## Pages with No JSON-LD');
  mdLines.push('');

  for (const p of noJsonLdPages) {
    mdLines.push(`- \`${p.route}\``);
  }
  mdLines.push('');
}

writeFileSync(REPORT_MD, mdLines.join('\n'));
console.log(`✅ MD report  → ${relative(join(import.meta.dirname, '..'), REPORT_MD)}`);

console.log(
  `\n📊 ${pages.length} pages, ${totalBlocks} blocks, ${totalParseErrors} parse error(s)`,
);

// Exit non-zero only on parse errors
if (totalParseErrors > 0) {
  console.error(`❌ ${totalParseErrors} JSON-LD parse error(s) found.`);
  process.exit(1);
}
