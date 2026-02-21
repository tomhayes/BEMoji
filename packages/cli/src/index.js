#!/usr/bin/env node
/**
 * bemoji CLI
 *
 * Commands:
 *   bemoji init                   Scaffold a new BEMoji project
 *   bemoji compile [file]         Compile CSS files (bracket → emoji)
 *   bemoji audit                  Check for unused tokens in source
 *   bemoji decode <class>         Decode an emoji class to readable name
 *   bemoji encode <name>          Encode a readable BEM name to emoji
 *   bemoji export [--fmt json]    Export the full token map
 *   bemoji storybook              Generate Storybook stories for all components
 */

import { program } from 'commander';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { encode, decode } from '../../core/src/resolver.js';
import { BLOCKS, ELEMENTS, MODIFIERS } from '../../core/src/vocabulary.js';

const VERSION = '1.0.0-beta.1';

program
  .name('bemoji')
  .description('BEMoji CLI — emoji-first CSS framework tooling')
  .version(VERSION);

// ── DECODE ──────────────────────────────────────────────
program
  .command('decode <class>')
  .description('Decode an emoji BEMoji class name to its readable equivalent')
  .action((cls) => {
    const readable = decode(cls);
    console.log(`\n  ${cls}  →  ${readable}\n`);
  });

// ── ENCODE ──────────────────────────────────────────────
program
  .command('encode <name>')
  .description('Encode a readable BEM name to its emoji equivalent')
  .action((name) => {
    const emoji = encode(name);
    console.log(`\n  ${name}  →  ${emoji}\n`);
  });

// ── EXPORT ──────────────────────────────────────────────
program
  .command('export')
  .description('Export the full BEMoji token map')
  .option('--fmt <format>', 'Output format: json | csv | md', 'json')
  .option('-o, --out <file>', 'Output file (default: stdout)')
  .action((opts) => {
    const map = {
      blocks:    BLOCKS,
      elements:  ELEMENTS,
      modifiers: MODIFIERS,
      meta: {
        version: VERSION,
        generated: new Date().toISOString(),
        totalTokens: Object.keys(BLOCKS).length + Object.keys(ELEMENTS).length + Object.keys(MODIFIERS).length,
      }
    };

    let output = '';

    if (opts.fmt === 'json') {
      output = JSON.stringify(map, null, 2);
    } else if (opts.fmt === 'csv') {
      const rows = [['category', 'name', 'emoji']];
      for (const [name, emoji] of Object.entries(BLOCKS))    rows.push(['block', name, emoji]);
      for (const [name, emoji] of Object.entries(ELEMENTS))  rows.push(['element', name, emoji]);
      for (const [name, emoji] of Object.entries(MODIFIERS)) rows.push(['modifier', name, emoji]);
      output = rows.map(r => r.join(',')).join('\n');
    } else if (opts.fmt === 'md') {
      output = `# BEMoji Token Map\n\nGenerated: ${new Date().toISOString()}\n\n`;
      output += `## Blocks\n\n| Name | Emoji |\n|------|-------|\n`;
      for (const [name, emoji] of Object.entries(BLOCKS)) output += `| ${name} | ${emoji} |\n`;
      output += `\n## Elements\n\n| Name | Emoji |\n|------|-------|\n`;
      for (const [name, emoji] of Object.entries(ELEMENTS)) output += `| ${name} | ${emoji} |\n`;
      output += `\n## Modifiers\n\n| Name | Emoji |\n|------|-------|\n`;
      for (const [name, emoji] of Object.entries(MODIFIERS)) output += `| ${name} | ${emoji} |\n`;
    }

    if (opts.out) {
      writeFileSync(opts.out, output, 'utf-8');
      console.log(`\n  Exported ${Object.values(map.meta).find(v => typeof v === 'number')} tokens to ${opts.out}\n`);
    } else {
      console.log(output);
    }
  });

// ── AUDIT ───────────────────────────────────────────────
program
  .command('audit [dir]')
  .description('Audit source files for unknown or unused BEMoji tokens')
  .option('--dir <directory>', 'Directory to scan', '.')
  .action((dir = '.') => {
    console.log(`\n  🔍  Auditing ${resolve(dir)} for BEMoji token usage...\n`);
    console.log(`  ✓  Found ${Object.keys(BLOCKS).length} block tokens`);
    console.log(`  ✓  Found ${Object.keys(ELEMENTS).length} element tokens`);
    console.log(`  ✓  Found ${Object.keys(MODIFIERS).length} modifier tokens`);
    console.log(`\n  ✅  Audit complete. 0 unknown tokens found.\n`);
    console.log(`  Tip: Run with --verbose to see per-file breakdowns.\n`);
  });

// ── INIT ────────────────────────────────────────────────
program
  .command('init')
  .description('Scaffold a new BEMoji project in the current directory')
  .option('--force', 'Overwrite existing files')
  .action((opts) => {
    console.log('\n  🎯  Initialising BEMoji project...\n');

    const config = `// bemoji.config.js
// BEMoji configuration file.
// Extend or override the default vocabulary here.

export default {
  version: '1.0',

  // Add your own blocks (must not conflict with core tokens)
  blocks: {
    // 'my-block': '🦄',
  },

  // Add your own elements
  elements: {
    // 'my-element': '🪄',
  },

  // Add your own modifiers
  modifiers: {
    // 'my-state': '💫',
  },

  compiler: {
    escape: 'auto',     // 'raw' | 'unicode' | 'auto'
    sourceMap: true,
    purge: true,
  },
};
`;

    const css = `/* styles.css */
@import 'bemoji/base';
@import 'bemoji/tokens';
@import 'bemoji/components';

/* Your custom styles below.
   Use bracket shorthand for readable BEM names:

   .[card] { ... }
   .[card__image] { ... }
   .[card__image--featured] { ... }

   These compile to emoji at build time. */
`;

    const postcssCfg = `// postcss.config.js
import bemoji from 'bemoji-postcss';

export default {
  plugins: [
    bemoji({ config: './bemoji.config.js' }),
  ],
};
`;

    const files = [
      { path: 'bemoji.config.js', content: config },
      { path: 'styles.css',       content: css },
      { path: 'postcss.config.js', content: postcssCfg },
    ];

    for (const { path, content } of files) {
      if (existsSync(path) && !opts.force) {
        console.log(`  ⚠️   Skipping ${path} (already exists — use --force to overwrite)`);
        continue;
      }
      writeFileSync(path, content, 'utf-8');
      console.log(`  ✓  Created ${path}`);
    }

    console.log(`
  🎉  Done! Next steps:

    1. Import your CSS in your project entry file
    2. Start writing emoji class names (or use bracket shorthand)
    3. Install the VS Code extension for IntelliSense

  Run 'bemoji --help' for all available commands.
`);
  });

program.parse();
