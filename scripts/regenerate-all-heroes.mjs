#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const prompts = {
  'accessible-forms':
    'A person in a wheelchair navigating a maddening infinite maze of identical gray corridors, each ending at a tiny unreachable button, a faint hopeful glow far in the distance',
  'astro-view-transitions':
    'A stage magician mid-act where the rabbit is caught halfway through the hat and halfway through the table, the assistant half-visible, everything in a state of partial dissolve',
  'building-component-library':
    'An architect slumped at a desk strewn with mismatched broken toy blocks, a single elegant tower standing amid the wreckage, a coffee mug with a crack',
  'choosing-a-color-palette':
    'A figure standing in a dim room where one wall glows cold sterile blue and the opposite wall glows warm amber, a bare bulb on a string flickering between them',
  'core-web-vitals':
    'A patient strapped to a chair with three monitors showing wildly jagged vital signs, a doctor in a white coat holding a tiny band-aid, looking hopeless',
  'css-container-queries':
    'A tiny cactus in a modest pot standing upright and smug while a giant overwatered fern in an oversized pot droops and wilts dramatically beside it, rulers on the wall behind',
  'css-grid-layouts':
    'A figure desperately cramming oversized mismatched furniture into a room where a perfect grid of perfectly-sized alcoves sits empty and unused against the far wall',
  'design-token-workflows':
    'Factory workers on a pristine assembly line handing identical small metal gears from one to the next, each holding their gear with a slightly different grip, a lone broken gear on the floor',
  'design-tokens':
    'A relaxed figure seated on a throne of small neat boxes while absolute chaos of scattered loose parts surrounds them just beyond the box perimeter',
  'error-monitoring':
    'A person sitting calmly at a desk reading paperwork while the entire room around them burns, a single comically small fire extinguisher on the corner of the desk',
  'first-post':
    'A proud figure standing beside a clumsily hammered-together wooden structure with one slightly protruding plank, the rest of the frame crooked but standing',
  'image-optimization':
    'A traveler at an airport struggling to jam an enormous bulging suitcase into a tiny overhead compartment while holding an identical folded miniature version of the same bag in the other hand',
  'markdown-style-guide':
    'A librarian surrounded by towering stacks of books, every single book completely blank, a tiny index card pinched between fingers, a look of dawning horror',
  'modern-css-reset':
    'A figure frantically mashing a giant red reset button while cables and plugs fly out of various devices around the room, a cat sitting unaffected in the corner',
  'personal-knowledge-management':
    'A figure submerged up to the chin in a sea of crumpled sticky notes and paper scraps, holding a single pristine blank page above the surface like a lifeline',
  'react-server-components':
    'A chef in a pristine dining room sending plates of food through a service window, the kitchen entirely invisible behind a heavy curtain, diners looking confused',
  'schema-org-microdata':
    'A librarian carefully attaching tiny handwritten tags to books while above them an enormous complex spiderweb spans the ceiling with spiders working at each junction',
  'second-post':
    'A figure placing one potted plant inside a slightly larger potted plant, which goes inside yet another pot, an infinite regression of nested containers trailing off into the distance',
  'static-site-search':
    'A person with a weak flashlight standing at the entrance of an enormous dark library with towering shelves vanishing into darkness, no card catalog or librarian in sight',
  'style-guide':
    'A person standing in a walk-in closet where every single item is an identical gray garment on a hanger, holding one item with a slightly different shade, squinting',
  'third-post':
    'A painter at an easel with only three squeezed-out tubes of paint staring at a vast perfect multicolored color wheel on the wall, one brush suspended in hesitation',
  'typescript-react-patterns':
    'A figure in a workshop welding two completely different metal pipes together while holding a blueprint that has caught fire at one edge, unfazed',
  'web-accessibility-auditing':
    'A person peering through an enormous magnifying glass at a wheelchair ramp that leads directly to a door that is comically half the normal width',
  'web-performance-budgets':
    'A shopper at a grocery checkout where the conveyor belt overflows with items, holding a tiny coin purse with one visible coin, the cashier waiting expectantly',
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
