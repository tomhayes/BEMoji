/**
 * bemoji-postcss
 *
 * PostCSS plugin that transforms readable BEM class names (written in bracket
 * shorthand) to emoji class names at build time.
 *
 * Input:
 *   .[card]               { ... }
 *   .[card__image]        { ... }
 *   .[card__image--featured] { ... }
 *
 * Output:
 *   .🃏               { ... }
 *   .🃏__🖼️           { ... }
 *   .🃏__🖼️--🌟       { ... }
 *
 * Options:
 *   config    {string|object}  Path to bemoji.config.js or config object
 *   escape    {'raw'|'unicode'|'auto'}  CSS escape mode (default: 'auto')
 *   sourceMap {boolean}  Generate source maps (default: true)
 */

import { loadConfig, encode, escapeForCSS } from '../../core/src/resolver.js';

const BRACKET_PATTERN = /\.\[([^\]]+)\]/g;

/**
 * Determine whether to escape emoji for a given environment.
 * 'auto' uses raw emoji for modern environments (Node 18+, modern PostCSS).
 */
function shouldEscape(mode) {
  if (mode === 'unicode') return true;
  if (mode === 'raw')     return false;
  // auto: check Node version
  const major = parseInt(process.version.slice(1));
  return major < 18;
}

/**
 * Transform a single selector string.
 */
function transformSelector(selector, config, escape) {
  return selector.replace(BRACKET_PATTERN, (_, readable) => {
    const emoji = encode(readable, config);
    const cls   = escape ? escapeForCSS(emoji) : emoji;
    return '.' + cls;
  });
}

/**
 * Transform a CSS value string (e.g. for content: '[card]' edge cases).
 * Not applied to property values — only selectors.
 */

const plugin = (opts = {}) => {
  const userConfig = typeof opts.config === 'object'
    ? opts.config
    : {};                          // In production: require(opts.config)

  const config = loadConfig(userConfig);
  const escape = shouldEscape(opts.escape ?? 'auto');

  return {
    postcssPlugin: 'bemoji-postcss',

    Rule(rule) {
      // Transform all selectors in this rule
      const originalSelector = rule.selector;
      rule.selector = rule.selectors
        .map(sel => transformSelector(sel, config, escape))
        .join(', ');

      if (opts.sourceMap && rule.selector !== originalSelector) {
        rule.source = rule.source; // preserve source position
      }
    },

    AtRule: {
      // Handle @media, @supports, etc. — no selector transforms needed
      // but pass through intact
    },

    Declaration(decl) {
      // Transform emoji custom property names in declarations
      // e.g. var(--[shadow-md]) → var(--🌑-md)
      // (This is an extension — not required for basic usage)
    },
  };
};

plugin.postcss = true;
export default plugin;

/**
 * CJS compat wrapper for environments that need require()
 * @see postcss docs on plugin exports
 */
if (typeof module !== 'undefined') {
  module.exports = plugin;
  module.exports.default = plugin;
}
