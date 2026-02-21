/**
 * BEMoji Configuration File
 *
 * This file defines your emoji vocabulary.
 * The compiler uses this to transform your readable BEM names to emoji at build time.
 *
 * All tokens defined here are merged with the core vocabulary.
 * Custom tokens must NOT conflict with core reserved tokens.
 *
 * Run `npx bemoji export --fmt json` to see the full resolved token map.
 */

export default {
  version: '1.0',

  /**
   * Block tokens (component root elements).
   * Add custom blocks for your design system here.
   */
  blocks: {
    // Example custom blocks:
    // 'hero':        '🦸',
    // 'pricing':     '💰',
    // 'testimonial': '🗣️',
    // 'feature':     '✨',
  },

  /**
   * Element tokens (parts of blocks).
   */
  elements: {
    // Example custom elements:
    // 'eyebrow':  '👁️',
    // 'kicker':   '👟',
    // 'lede':     '📢',
  },

  /**
   * Modifier tokens (states, variants, sizes).
   */
  modifiers: {
    // Example custom modifiers:
    // 'inverted': '🔄',
    // 'compact':  '🗜️',
    // 'wide':     '↔️',
  },

  /**
   * Breakpoint configuration.
   * Override if you need custom breakpoints.
   */
  breakpoints: {
    sm: { prefix: '📟', minWidth: '640px'  },
    md: { prefix: '📲', minWidth: '768px'  },
    lg: { prefix: '💻', minWidth: '1024px' },
    xl: { prefix: '🖥️', minWidth: '1280px' },
  },

  /**
   * Delimiter configuration.
   * Changing these is not recommended — it breaks BEM convention.
   */
  separator: {
    element:  '__',
    modifier: '--',
  },

  /**
   * Compiler options.
   */
  compiler: {
    /**
     * CSS escape mode for emoji selectors.
     * - 'raw':     Output emoji directly (modern browsers, recommended)
     * - 'unicode': Output \XXXXXX escape sequences (maximum compatibility)
     * - 'auto':    Detect environment and choose appropriately
     */
    escape: 'auto',

    /** Generate source maps for compiled CSS */
    sourceMap: true,

    /**
     * Remove unused token classes from the output CSS.
     * Requires content path configuration (like Tailwind's purge).
     */
    purge: false,
    content: [
      './src/**/*.{html,js,jsx,ts,tsx,vue}',
    ],
  },
};
