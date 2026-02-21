/**
 * BEMoji Resolver
 *
 * Resolves human-readable BEM strings to emoji class names,
 * and provides utilities for encoding/decoding.
 */

import { BLOCKS, ELEMENTS, MODIFIERS, BREAKPOINTS } from './vocabulary.js';

const SEP_ELEMENT  = '__';
const SEP_MODIFIER = '--';

/**
 * Load config, falling back to the default vocabulary.
 * In real usage this would load from bemoji.config.js.
 */
export function loadConfig(userConfig = {}) {
  return {
    blocks:      { ...BLOCKS,      ...userConfig.blocks },
    elements:    { ...ELEMENTS,    ...userConfig.elements },
    modifiers:   { ...MODIFIERS,   ...userConfig.modifiers },
    breakpoints: { ...BREAKPOINTS, ...userConfig.breakpoints },
    separator: {
      element:  SEP_ELEMENT,
      modifier: SEP_MODIFIER,
      ...userConfig.separator,
    },
    compiler: {
      escape: 'auto',
      sourceMap: true,
      purge: true,
      ...userConfig.compiler,
    },
  };
}

/**
 * Encode a readable BEM string to emoji.
 *
 * @param {string} readableName  e.g. 'card__image--featured'
 * @param {object} config        Loaded BEMoji config
 * @returns {string}             e.g. '🃏__🖼️--🌟'
 */
export function encode(readableName, config = loadConfig()) {
  const { blocks, elements, modifiers, separator } = config;
  const elSep  = separator.element;
  const modSep = separator.modifier;

  let result = readableName;

  // Split off modifiers first
  const modSepIdx = result.indexOf(modSep);
  let modifierPart = '';
  if (modSepIdx !== -1) {
    modifierPart = result.slice(modSepIdx + modSep.length);
    result       = result.slice(0, modSepIdx);
  }

  // Split block and element
  const elSepIdx = result.indexOf(elSep);
  let blockPart   = result;
  let elementPart = '';
  if (elSepIdx !== -1) {
    blockPart   = result.slice(0, elSepIdx);
    elementPart = result.slice(elSepIdx + elSep.length);
  }

  // Resolve each part
  const blockEmoji    = blocks[blockPart]    || blockPart;
  const elementEmoji  = elements[elementPart] || elementPart;
  const modifierEmoji = modifiers[modifierPart] || modifierPart;

  // Reassemble
  let encoded = blockEmoji;
  if (elementPart)   encoded += elSep  + elementEmoji;
  if (modifierPart)  encoded += modSep + modifierEmoji;

  return encoded;
}

/**
 * Decode an emoji BEM class name back to readable form.
 *
 * @param {string} emojiClass  e.g. '🃏__🖼️--🌟'
 * @param {object} config      Loaded BEMoji config
 * @returns {string}           e.g. 'card__image--featured'
 */
export function decode(emojiClass, config = loadConfig()) {
  const { blocks, elements, modifiers, separator } = config;
  const elSep  = separator.element;
  const modSep = separator.modifier;

  // Build reverse maps
  const rBlocks    = Object.fromEntries(Object.entries(blocks).map(([k,v]) => [v,k]));
  const rElements  = Object.fromEntries(Object.entries(elements).map(([k,v]) => [v,k]));
  const rModifiers = Object.fromEntries(Object.entries(modifiers).map(([k,v]) => [v,k]));

  let result = emojiClass;

  const modSepIdx = result.indexOf(modSep);
  let modifierPart = '';
  if (modSepIdx !== -1) {
    modifierPart = result.slice(modSepIdx + modSep.length);
    result       = result.slice(0, modSepIdx);
  }

  const elSepIdx = result.indexOf(elSep);
  let blockPart   = result;
  let elementPart = '';
  if (elSepIdx !== -1) {
    blockPart   = result.slice(0, elSepIdx);
    elementPart = result.slice(elSepIdx + elSep.length);
  }

  const blockName    = rBlocks[blockPart]     || blockPart;
  const elementName  = rElements[elementPart]  || elementPart;
  const modifierName = rModifiers[modifierPart] || modifierPart;

  let decoded = blockName;
  if (elementPart)  decoded += elSep  + elementName;
  if (modifierPart) decoded += modSep + modifierName;

  return decoded;
}

/**
 * Escape an emoji string to CSS unicode escape sequences.
 * Required for older browsers / certain CSS parsers.
 *
 * @param {string} emoji
 * @returns {string}   e.g. '\01F0CF'
 */
export function escapeForCSS(emoji) {
  return [...emoji]
    .map(char => {
      const cp = char.codePointAt(0);
      if (cp > 0x7E) {
        return '\\' + cp.toString(16).toUpperCase().padStart(6, '0');
      }
      return char;
    })
    .join('');
}

/**
 * Generate a full CSS selector from a readable BEM name.
 *
 * @param {string}  readableName
 * @param {object}  config
 * @param {boolean} escaped  Whether to output unicode escapes
 * @returns {string}  CSS selector string e.g. '.🃏__🖼️--🌟'
 */
export function toSelector(readableName, config = loadConfig(), escaped = false) {
  const emoji = encode(readableName, config);
  return escaped ? '.' + escapeForCSS(emoji) : '.' + emoji;
}

export default { encode, decode, escapeForCSS, toSelector, loadConfig };
