#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const prompts = {
  'accessible-forms':
    'A person carefully testing a door handle from a seated position, checking that it opens with a closed fist, while another person glides past through an open doorway they had not noticed before, natural daylight filling the hall',
  'astro-view-transitions':
    'A person flipping through a well-worn flipbook where the drawings between pages have begun reaching out to gently adjust the next frame before it lands, the sequence flowing smoother than paper should allow',
  'building-component-library':
    'Someone standing in front of a pegboard where every tool hangs on its own labeled hook in graduated sizes, except one drawer marked "miscellaneous" that refuses to close fully, a single screw on the floor nearby',
  'choosing-a-color-palette':
    'A person in a paint aisle holding two warm beige swatches that are objectively the same color, while all the blue paint cans in their shopping cart lean against each other looking increasingly embarrassed',
  'core-web-vitals':
    'Someone tuning a vintage radio by lamplight, carefully adjusting three dials, static crackling between stations, a faint warm glow emerging as the signal comes into focus',
  'css-container-queries':
    'A gardener repotting plants into individual containers, each with its own small handwritten watering schedule taped to the side, an old garden hose labeled "viewport width" coiled in the corner gathering dust',
  'css-grid-layouts':
    'A chessboard where pieces stand in perfect alignment, each square precisely sized, while off to the side a single knight sits on an open meadow looking back at the grid with mild regret',
  'design-token-workflows':
    'A kitchen pantry where every jar wears the same clean label in the same typeface, arranged alphabetically from allspice to zaatar, while the cook has given up measuring and works from a single unlabeled jar held to the light',
  'design-tokens':
    'A reference library where every book spine bears its exact classification in neat hand-lettering, and a reading desk sits at the center of a perfect spiral of shelves, morning light falling across open pages',
  'error-monitoring':
    'Someone at a desk facing a single blinking amber light, watching it with calm attention, while behind them an enormous pile of identical unplugged blinking lights rises to the ceiling, dust settling on the stack',
  'first-post':
    'A person placing the first few books onto a very tall empty bookshelf, the upper shelves disappearing into soft fog, a sturdy stepladder labeled "drafts" still folded nearby',
  'image-optimization':
    'A person sitting cross-legged on the floor, having just compressed a giant fluffy comforter into a tiny vacuum-sealed bag, holding it up with quiet pride while an identical uncompressed comforter takes up the entire couch behind them',
  'markdown-style-guide':
    'A typewriter whose keys are labeled with markup symbols, a sheet of paper curling from the roller showing cleanly formatted text that looks almost too perfectly arranged to be real',
  'modern-css-reset':
    'A person clearing out a cluttered garage workshop, placing old spray cans labeled "float left" and "clearfix" into a recycling bin, arranging a handful of streamlined essential tools neatly across a clean pegboard in morning light',
  'personal-knowledge-management':
    'A person standing at the center of a room lined with filing cabinets, holding one index card that reads "see cabinet 7, drawer B, folder 3", their expression quietly certain, knowing exactly where everything lives',
  'react-server-components':
    'A kitchen pass-through window where a beautifully plated dish sits on the counter, but when someone reaches for it they find only a handwritten recipe card and a note reading "prepared when ordered"',
  'schema-org-microdata':
    'Someone placing small museum labels next to everyday objects around their home — a coffee mug tagged "container: beverage", a window tagged "aperture: light" — fine invisible threads connecting each label upward into a soft glow',
  'second-post':
    'A person standing at an easel holding a second drawing, noticeably more confident than the first one pinned on the wall behind them, a set of measuring calipers and color test swatches spread across the table nearby',
  'static-site-search':
    'Someone at a reading desk with three books open, each using a different system — sticky tabs, margin annotations, a hand-written index tucked into the back cover — comparing approaches with a thoughtful expression',
  'style-guide':
    'A room where every surface is the same quiet warm gray — walls, floor, furniture, objects — except for a single small bright coral note card placed on a desk, the only spot of color in the entire space',
  'third-post':
    'A painter holding up three color test swatches in sequence: first a flat muddy gray, then a slightly warmer brown, then a soft radiant amber that catches the light, a quiet look of discovery on their face',
  'typescript-react-patterns':
    'Someone assembling flat-pack furniture where every piece fits together exactly one way, no extra screws left over, the instructions so clear they barely need to look at them, just the quiet satisfaction of things lining up',
  'web-accessibility-auditing':
    'A person walking slowly through a building, running a hand along each wall, checking every doorway width, testing the weight of every door handle — not because something is broken, but because they want everyone to be able to pass through',
  'web-performance-budgets':
    'Someone at a grocery checkout carefully placing items from their cart back onto the conveyor belt, a small calculator in hand, the running total just under the line, each item they keep exactly what they need, nothing wasted',
};

const slugs = Object.keys(prompts);
let seed = 456;

for (const slug of slugs) {
  console.log(`\n--- ${slug} ---`);
  const scriptPath = resolve(__dirname, 'generate-hero-image.mjs');
  const cmd = [
    `node`,
    `"${scriptPath}"`,
    `"${slug}"`,
    `--prompt`,
    `"${prompts[slug].replace(/"/g, '\\"')}"`,
    `--seed`,
    (seed++).toString(),
  ].join(' ');

  try {
    execSync(cmd, { stdio: 'inherit', timeout: 600000 });
  } catch (e) {
    console.error(`  FAILED: ${slug}`);
    process.exit(1);
  }
}

console.log('\nAll images regenerated.\n');
