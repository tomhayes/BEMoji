/**
 * vite-plugin-bemoji
 *
 * Vite plugin that transforms readable BEM class names to emoji throughout your
 * source files (HTML, JSX, TSX, Vue) at build time.
 *
 * Usage:
 *   // vite.config.ts
 *   import bemoji from 'vite-plugin-bemoji';
 *
 *   export default {
 *     plugins: [
 *       bemoji({
 *         config: './bemoji.config.js',
 *         include: ['**\/*.{tsx,jsx,vue,html}'],
 *       })
 *     ]
 *   }
 */

import { loadConfig, encode } from '../../core/src/resolver.js';
import { createFilter } from 'vite';

// Matches className="..." or class="..." attribute values
// Handles bracket shorthand: className="[card] [card__image--featured]"
const CLASS_ATTR_PATTERN  = /(?:class|className)=["']([^"']+)["']/g;
const BRACKET_CLASS_REGEX = /\[([^\]]+)\]/g;

function transformClassString(classStr, config) {
  return classStr.replace(BRACKET_CLASS_REGEX, (_, readable) => {
    return encode(readable, config);
  });
}

export default function bemojiPlugin(opts = {}) {
  const userConfig = opts.config ?? {};
  let config;

  const filter = createFilter(
    opts.include ?? ['**/*.{html,jsx,tsx,vue,svelte}'],
    opts.exclude ?? ['node_modules/**']
  );

  return {
    name: 'vite-plugin-bemoji',

    configResolved() {
      config = loadConfig(
        typeof userConfig === 'string'
          ? {}   // In production: loadConfig(require(userConfig))
          : userConfig
      );
    },

    /**
     * Transform HTML template class attributes.
     * This runs on raw HTML files.
     */
    transformIndexHtml(html) {
      return html.replace(CLASS_ATTR_PATTERN, (match, classStr) => {
        const transformed = transformClassString(classStr, config);
        return match.replace(classStr, transformed);
      });
    },

    /**
     * Transform JSX/TSX/Vue source files.
     * Finds className and class attribute values and transforms them.
     */
    transform(code, id) {
      if (!filter(id)) return null;

      let transformed = code;
      let hasChanges = false;

      transformed = transformed.replace(CLASS_ATTR_PATTERN, (match, classStr) => {
        const newClassStr = transformClassString(classStr, config);
        if (newClassStr !== classStr) {
          hasChanges = true;
          return match.replace(classStr, newClassStr);
        }
        return match;
      });

      if (!hasChanges) return null;

      return {
        code: transformed,
        map: null, // Source maps can be added here
      };
    },

    /**
     * Handle HMR — re-apply transforms when config changes.
     */
    handleHotUpdate({ file, server }) {
      if (file.endsWith('bemoji.config.js') || file.endsWith('bemoji.config.ts')) {
        config = loadConfig({});
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}
