#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { width: 1200, height: 675 };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--post': case '-p':
        opts.post = resolve(args[++i]);
        break;
      case '--prompt':
        opts.prompt = args[++i];
        break;
      case '--width':
        opts.width = parseInt(args[++i], 10);
        break;
      case '--height':
        opts.height = parseInt(args[++i], 10);
        break;
      case '--seed':
        opts.seed = parseInt(args[++i], 10);
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      default:
        if (!opts.post && !args[i].startsWith('--')) {
          opts.post = resolve(args[i]);
        }
    }
  }

  if (!opts.post) {
    console.error('Usage: node scripts/generate-hero-image.mjs --post <mdx-file> [--prompt "..."] [--width] [--height] [--seed] [--dry-run]');
    process.exit(1);
  }

  return opts;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) {
    console.error('No valid frontmatter found');
    process.exit(1);
  }

  const raw = match[1];
  const fields = {};

  for (const line of raw.split('\n')) {
    const sep = line.search(/:\s*/);
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const val = line.slice(sep + 1).trim().replace(/^['"]|['"]$/g, '');
    fields[key] = val;
  }

  return { fields, raw, fullMatch: match[0], prefix: match[0].length };
}

function buildPrompt(fields, override) {
  if (override) return override;

  const title = fields.title || 'Blog post';
  const description = fields.description || '';

  let prompt = `Blog article about ${title}`;
  if (description) {
    const desc = description.length > 120 ? description.slice(0, 120) + '...' : description;
    prompt += `. ${desc}`;
  }
  prompt += '. Editorial photography style, high contrast, minimalist composition, warm amber and charcoal tones, cinematic lighting, professional blog cover image, sharp focus, rich textures, sophisticated atmosphere';

  return prompt;
}

function getSlug(postPath) {
  const base = basename(postPath).replace(/\.mdx?$/, '');
  return base.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

function updateFrontmatter(content, slug) {
  const heroLine = `heroImage: '@images/${slug}-hero.jpg'`;

  if (/^heroImage:/m.test(content)) {
    return content.replace(/^heroImage:.*$/m, heroLine);
  }

  return content.replace(/^---\s*\n/m, `---\n${heroLine}\n`);
}

async function main() {
  const opts = parseArgs();

  if (!existsSync(opts.post)) {
    console.error(`File not found: ${opts.post}`);
    process.exit(1);
  }

  const content = readFileSync(opts.post, 'utf-8');
  const { fields } = parseFrontmatter(content);
  const slug = getSlug(opts.post);
  const prompt = buildPrompt(fields, opts.prompt);
  const outputPath = resolve(repoRoot, 'src', 'assets', 'images', `${slug}-hero.jpg`);
  const relOutput = `src/assets/images/${slug}-hero.jpg`;

  console.log(`\n  Post:    ${opts.post}`);
  console.log(`  Slug:    ${slug}`);
  console.log(`  Image:   ${relOutput}`);
  console.log(`  Size:    ${opts.width}x${opts.height}`);
  console.log(`  Prompt:  ${prompt.slice(0, 100)}...`);
  console.log();

  if (opts.dryRun) {
    console.log('  [dry-run] No changes made.\n');
    return;
  }

  if (existsSync(outputPath)) {
    console.log(`  Image already exists at ${relOutput}. Delete it first to regenerate.\n`);
    process.exit(0);
  }

  const scriptPath = resolve(__dirname, 'mflux-generate-image');
  const mfluxArgs = [
    '--prompt', prompt,
    '--output', outputPath,
    '--width', String(opts.width),
    '--height', String(opts.height),
  ];
  if (opts.seed) {
    mfluxArgs.push('--seed', String(opts.seed));
  }

  console.log('  Generating image...');
  try {
    execSync(`${scriptPath} ${mfluxArgs.map(a => `"${a}"`).join(' ')}`, {
      stdio: 'inherit',
      timeout: 600000,
    });
  } catch {
    console.error('\n  Image generation failed.\n');
    process.exit(1);
  }

  const updated = updateFrontmatter(content, slug);
  writeFileSync(opts.post, updated);

  console.log(`\n  Done. ${basename(opts.post)} updated with ${relOutput}\n`);
}

main();
