#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

//const DEFAULT_STYLE =
//  'Minimalist vector line art, crisp ink illustration style, high contrast, clean solid dark gray background, precise geometric line weights, modern tech editorial vignette';
const DEFAULT_STYLE =
  'Create an illustration with bold, sweeping lines and dynamic color gradients, evoking a modern, vibrant energy. Use a fluid, organic line style with no rigid grids, ensuring a full-bleed composition that harmonizes with a warm, dark palette of amber, coral, and chartreuse accents. Keep the mood playful yet sophisticated, with no borders and a smooth, immersive flow.';
function resolvePostPath(input) {
  const blogDir = resolve(repoRoot, 'src/content/blog');
  const candidates = [resolve(input)];
  if (!input.includes('/')) {
    candidates.push(resolve(blogDir, input));
    if (!input.endsWith('.mdx')) {
      candidates.push(resolve(blogDir, `${input}.mdx`));
    }
  }
  return candidates.find(existsSync);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { width: 1216, height: 640, steps: 9 };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--post':
      case '-p':
        opts.post = resolvePostPath(args[++i]);
        break;
      case '--prompt':
        opts.prompt = args[++i];
        break;
      case '--style':
        opts.style = args[++i];
        break;
      case '--width':
        opts.width = parseInt(args[++i], 10);
        break;
      case '--height':
        opts.height = parseInt(args[++i], 10);
        break;
      case '--steps':
        opts.steps = parseInt(args[++i], 10);
        break;
      case '--seed':
        opts.seed = parseInt(args[++i], 10);
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      default:
        if (!opts.post && !args[i].startsWith('--')) {
          opts.post = resolvePostPath(args[i]);
        }
    }
  }

  if (!opts.post) {
    console.error('Usage: node scripts/generate-hero-image.mjs [--post] <slug> [options]');
    console.error(
      '  --prompt <text>     Subject override (default: generic scene; avoid literal text)',
    );
    console.error('  --style <text>      Visual direction (default: New Yorker cartoon)');
    console.error('  --steps <n>         Inference steps (default: 9)');
    console.error('  --seed <n>          Random seed for reproducibility');
    console.error('  --dry-run           Preview only');
    console.error(
      '  Model: flux_2_klein_4b_q6p.ckpt (draw-things-cli), 1216x640 → cropped to 1200x630',
    );
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
    const val = line
      .slice(sep + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    fields[key] = val;
  }

  return { fields, raw, fullMatch: match[0], prefix: match[0].length };
}

function buildSubject(_fields, override) {
  if (override) return override;
  return 'A witty editorial illustration';
}

function getSlug(postPath) {
  const base = basename(postPath).replace(/\.mdx?$/, '');
  return base.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

function updateFrontmatter(content, slug) {
  const heroLine = `heroImage: '@images/${slug}-hero.webp'`;

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

  const subject = buildSubject(fields, opts.prompt);
  const style = opts.style ?? DEFAULT_STYLE;
  const prompt = style ? `${subject}. ${style}` : subject;

  const outputPath = resolve(repoRoot, 'src', 'assets', 'images', `${slug}-hero.webp`);
  const relOutput = `src/assets/images/${slug}-hero.webp`;

  console.log(`\n  Post:    ${opts.post}`);
  console.log(`  Slug:    ${slug}`);
  console.log(`  Image:   ${relOutput}`);
  console.log(`  Size:    ${opts.width}x${opts.height}, ${opts.steps} steps`);
  console.log(`  Subject: ${subject.slice(0, 100)}...`);
  console.log(`  Style:   ${style.slice(0, 100)}...`);
  console.log();

  if (opts.dryRun) {
    console.log('  [dry-run] No changes made.\n');
    return;
  }

  if (existsSync(outputPath)) {
    console.log(`  Overwriting existing image at ${relOutput}.\n`);
  }

  const scriptPath = resolve(__dirname, 'mflux-generate-image');
  const generateArgs = [
    '--prompt',
    prompt,
    '--negative-prompt',
    'text, letters, speech bubble, caption, title, multiple panels, comic strip, grid layout, frame border, cells, watermark, signature, overlay, label',
    '--output',
    outputPath,
    '--width',
    String(opts.width),
    '--height',
    String(opts.height),
    '--steps',
    String(opts.steps),
  ];
  if (opts.seed) {
    generateArgs.push('--seed', String(opts.seed));
  }

  console.log('  Generating image...');
  try {
    execSync(`${scriptPath} ${generateArgs.map((a) => `"${a.replace(/"/g, '\\"')}"`).join(' ')}`, {
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
