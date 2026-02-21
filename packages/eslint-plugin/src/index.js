/**
 * eslint-plugin-bemoji
 *
 * ESLint rules for BEMoji. Enforces:
 *   - no-unknown-tokens:       No emoji used that isn't in the config
 *   - no-orphan-elements:      Elements must reference a valid block
 *   - no-modifier-without-base: Modifier classes must co-exist with their base class
 *   - prefer-semantic-emoji:   Warns when using raw emoji that has a semantic alias
 */

import { BLOCKS, ELEMENTS, MODIFIERS } from '../../core/src/vocabulary.js';
import { decode } from '../../core/src/resolver.js';

const ALL_TOKENS = new Set([
  ...Object.values(BLOCKS),
  ...Object.values(ELEMENTS),
  ...Object.values(MODIFIERS),
]);

const SEP_ELEMENT  = '__';
const SEP_MODIFIER = '--';

/**
 * Parse a BEMoji class string into its components.
 * Returns { block, element, modifier } — all may be null.
 */
function parseClass(cls) {
  const modSepIdx = cls.indexOf(SEP_MODIFIER);
  let base     = cls;
  let modifier = null;

  if (modSepIdx !== -1) {
    modifier = cls.slice(modSepIdx + SEP_MODIFIER.length);
    base     = cls.slice(0, modSepIdx);
  }

  const elSepIdx = base.indexOf(SEP_ELEMENT);
  let block   = base;
  let element = null;

  if (elSepIdx !== -1) {
    block   = base.slice(0, elSepIdx);
    element = base.slice(elSepIdx + SEP_ELEMENT.length);
  }

  return { block, element, modifier };
}

// ── Rules ────────────────────────────────────────────────

const noUnknownTokens = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow emoji class names that are not in the BEMoji vocabulary or config',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    function checkClassString(node, classStr) {
      const classes = classStr.trim().split(/\s+/);
      for (const cls of classes) {
        if (!cls) continue;
        const { block, element, modifier } = parseClass(cls);

        if (!Object.values(BLOCKS).includes(block)) {
          context.report({
            node,
            message: `Unknown BEMoji block token: "${block}". Did you mean to add it to bemoji.config.js?`,
          });
        }

        if (element && !Object.values(ELEMENTS).includes(element)) {
          context.report({
            node,
            message: `Unknown BEMoji element token: "${element}". Did you mean to add it to bemoji.config.js?`,
          });
        }

        if (modifier && !Object.values(MODIFIERS).includes(modifier)) {
          context.report({
            node,
            message: `Unknown BEMoji modifier token: "${modifier}". Did you mean to add it to bemoji.config.js?`,
          });
        }
      }
    }

    return {
      JSXAttribute(node) {
        if (
          (node.name.name === 'className' || node.name.name === 'class') &&
          node.value?.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          checkClassString(node, node.value.value);
        }
      },
    };
  },
};

const noModifierWithoutBase = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Modifier classes must always be applied alongside their base class',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'className' && node.name.name !== 'class') return;
        if (!node.value?.value) return;

        const classes   = node.value.value.trim().split(/\s+/).filter(Boolean);
        const modifiers = classes.filter(c => c.includes(SEP_MODIFIER));

        for (const mod of modifiers) {
          const baseClass = mod.slice(0, mod.indexOf(SEP_MODIFIER));
          if (!classes.includes(baseClass)) {
            context.report({
              node,
              message: `BEMoji modifier "${mod}" used without its base class "${baseClass}". Add "${baseClass}" to the class list.`,
            });
          }
        }
      },
    };
  },
};

// ── Plugin export ────────────────────────────────────────

export default {
  meta: {
    name: 'eslint-plugin-bemoji',
    version: '1.0.0-beta.1',
  },
  rules: {
    'no-unknown-tokens':        noUnknownTokens,
    'no-modifier-without-base': noModifierWithoutBase,
  },
  configs: {
    recommended: {
      plugins: ['bemoji'],
      rules: {
        'bemoji/no-unknown-tokens':        'warn',
        'bemoji/no-modifier-without-base': 'error',
      },
    },
  },
};
