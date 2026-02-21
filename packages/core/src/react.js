/**
 * BEMoji React Helper
 *
 * Provides the `bem()` utility function for resolving readable BEM names
 * to emoji class names within React/JSX components.
 *
 * Usage:
 *   import { bem } from 'bemoji/react';
 *
 *   <div className={bem('card')}>                        // → '🃏'
 *   <div className={bem('card__image')}>                 // → '🃏__🖼️'
 *   <div className={bem('card', { primary: true })}>     // → '🃏 🃏--🌟'
 *   <div className={bem('card__image', { featured })}>   // → '🃏__🖼️ 🃏__🖼️--🌟'
 */

import { encode, loadConfig } from './resolver.js';

let _config = loadConfig();

/**
 * Configure the React helper with a custom BEMoji config.
 * Call this once at your app's entry point.
 *
 * @param {object} userConfig
 */
export function configure(userConfig) {
  _config = loadConfig(userConfig);
}

/**
 * Resolve a readable BEM name (with optional modifiers) to an emoji class string.
 *
 * @param {string}  name       Readable BEM name e.g. 'card', 'card__image', 'card__image--featured'
 * @param {object}  modifiers  Object of modifier keys → boolean
 * @param {string}  extra      Additional raw class names to append
 * @returns {string}           Space-separated emoji class string
 */
export function bem(name, modifiers = {}, extra = '') {
  const base = encode(name, _config);
  const classes = [base];

  for (const [key, active] of Object.entries(modifiers)) {
    if (active) {
      // Build the full modifier class: base + -- + modifier
      const modClass = encode(`${name}--${key}`, _config);
      classes.push(modClass);
    }
  }

  if (extra) classes.push(extra);

  return classes.filter(Boolean).join(' ');
}

/**
 * Create a scoped `bem` function bound to a specific block.
 * Useful for component files to avoid repeating the block name.
 *
 * @param {string} blockName  e.g. 'card'
 * @returns {Function}        bem function scoped to that block
 *
 * @example
 *   const b = useBem('card');
 *   b()                     // → '🃏'
 *   b('image')              // → '🃏__🖼️'
 *   b('image', { featured}) // → '🃏__🖼️ 🃏__🖼️--🌟'
 */
export function useBem(blockName) {
  return function(element, modifiers = {}, extra = '') {
    const name = element ? `${blockName}__${element}` : blockName;
    return bem(name, modifiers, extra);
  };
}

export default bem;
