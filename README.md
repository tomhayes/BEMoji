# 🎯 BEMoji

> **BEM, but every class name is an emoji.**

BEMoji is a production-grade CSS framework that implements the BEM (Block–Element–Modifier) methodology using emoji as class names. It ships with a full design token system, 24 pre-built components, responsive utilities, and a complete build toolchain.

[![npm version](https://img.shields.io/npm/v/bemoji?style=flat-square&color=ff4d00)](https://www.npmjs.com/package/bemoji)
[![License: MIT](https://img.shields.io/badge/License-MIT-7c3aed?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-16a34a?style=flat-square)](CONTRIBUTING.md)

```html
<!-- This is valid, production HTML -->
<article class="🃏">
  <div class="🃏__🖼️ 🃏__🖼️--🌟">
    <img src="hero.jpg" alt="...">
  </div>
  <div class="🃏__📝">
    <h2 class="🃏__🔠">Card Title</h2>
  </div>
  <footer class="🃏__🦶">
    <button class="🔘 🔘--🌟">Primary</button>
    <button class="🔘 🔘--👻">Disabled</button>
  </footer>
</article>
```

---

## Why?

| | BEMoji | Tailwind | BEM | CSS Modules |
|---|---|---|---|---|
| Zero runtime JS | ✓ | ✓ | ✓ | ✓ |
| Automatic obfuscation | ✓ | ✗ | ✗ | build-time |
| Semantic naming | ✓ | ✗ | ✓ | ✓ |
| Design token system | ✓ | ✓ | ✗ | ✗ |
| Pre-built components | ✓ | ✗ | ✗ | ✗ |
| Colleague confusion | **Maximum** | Moderate | Minimal | Minimal |

**Genuine reasons to use BEMoji:**

1. **Free obfuscation** — Emoji class names are meaningless to scrapers and competitors without your config file. You get CSS-modules-style obfuscation without the build complexity.
2. **Enforced vocabulary** — Every UI concept maps to one canonical emoji. The config file _is_ your design system contract.
3. **Faster to type** — `🃏` is two keystrokes with an emoji picker. `.card__image--featured` is 24.
4. **It actually works** — Modern browsers handle emoji in CSS selectors natively. The compiler handles escaped unicode fallbacks for older environments.

---

## Installation

```bash
npm install bemoji
# or
yarn add bemoji
# or
pnpm add bemoji
```

### Quick start

```bash
npx bemoji init
```

This scaffolds a `bemoji.config.js`, imports the base CSS, and wires up PostCSS.

---

## Core Concepts

### Naming Anatomy

```
🃏  __  🖼️  --  🌟
│       │       └─ Modifier  (state or variant)
│       └───────── Element   (part of the block)
└───────────────── Block     (standalone component)
```

Delimiters are identical to BEM: `__` for elements, `--` for modifiers. The framework is machine-parseable even if it isn't human-readable.

### Block

A standalone, reusable component. Carries no inherited context.

```css
.🃏  /* card  */
.🧭  /* navbar */
.📋  /* form  */
```

### Element

A part of a block. Always expressed as `block__element`. Cannot exist outside its block.

```css
.🃏__🖼️  /* card image  */
.🃏__🔠  /* card title  */
.🃏__📝  /* card body   */
```

### Modifier

A flag that changes appearance or behavior. Applied alongside the base class.

```css
.🔘--🌟  /* button primary */
.🔘--🔴  /* button danger  */
.🔘--👻  /* button disabled */
```

---

## The Emoji Lexicon

BEMoji defines 143 reserved tokens. Here are the core ones:

### Blocks (Components)
| Emoji | Name | Aliases |
|-------|------|---------|
| 🃏 | card | panel, tile |
| 🧭 | navbar | nav, header |
| 🦶 | footer | — |
| 📋 | form | — |
| 🪟 | modal | dialog, overlay |
| 🔔 | alert | notification |
| 🏷️ | badge | tag, chip |
| 💬 | tooltip | popover |
| 📊 | table | — |
| 📑 | tabs | — |
| 🎠 | carousel | slider |
| 🍞 | breadcrumb | — |

### Elements (Parts)
| Emoji | Name | Aliases |
|-------|------|---------|
| 🖼️ | image | img, media |
| 🔠 | title | heading |
| 📝 | body | content, text |
| 🦶 | footer | actions |
| 🔘 | button | btn, cta |
| 📥 | input | field, control |
| 🔗 | link | anchor |
| 🏷️ | label | — |
| 🎭 | icon | — |
| 📄 | item | row, entry |

### Modifiers (States)
| Emoji | Name | Aliases |
|-------|------|---------|
| 🌟 | primary | featured, hero |
| 🔴 | danger | error, destructive |
| 🟢 | success | ok, valid |
| 🟡 | warning | caution |
| 🔵 | info | — |
| 👻 | disabled | ghost, muted |
| ✅ | active | selected |
| ⏳ | loading | pending, busy |
| 🔒 | locked | readonly |
| 💎 | premium | pro |
| 🆕 | new | fresh |

### Modifiers (Size)
| Emoji | Name |
|-------|------|
| 🔬 | xs |
| 🤏 | sm |
| ⚖️ | md |
| 🏋️ | lg |
| 🏔️ | xl |
| 🌍 | 2xl |

---

## Design Tokens

BEMoji's token system uses emoji as CSS custom property names — the obfuscation extends all the way to your design tokens.

```css
:root {
  /* Colors */
  --⬛: #0d0d0f;
  --⬜: #ffffff;
  --🔴: #dc2626;
  --🟢: #16a34a;
  --🟡: #d97706;
  --🔵: #2563eb;
  --🟣: #7c3aed;

  /* Spacing scale */
  --📏-1: 0.25rem;  /* 4px  */
  --📏-2: 0.5rem;   /* 8px  */
  --📏-4: 1rem;     /* 16px */
  --📏-6: 1.5rem;   /* 24px */
  --📏-8: 2rem;     /* 32px */
  --📏-12: 3rem;    /* 48px */
  --📏-16: 4rem;    /* 64px */

  /* Typography */
  --✍️-xs:   0.75rem;
  --✍️-sm:   0.875rem;
  --✍️-base: 1rem;
  --✍️-lg:   1.125rem;
  --✍️-xl:   1.25rem;

  /* Shadows */
  --🌑-sm: 0 1px 3px rgba(0,0,0,.12);
  --🌑-md: 0 4px 12px rgba(0,0,0,.15);
  --🌑-lg: 0 8px 24px rgba(0,0,0,.2);

  /* Border radius */
  --⭕-sm:   4px;
  --⭕-md:   8px;
  --⭕-lg:   16px;
  --⭕-full: 9999px;
}
```

---

## Responsive System

Breakpoints use an emoji prefix separated by a zero-width joiner (U+200D):

| Emoji | Breakpoint | Range |
|-------|-----------|-------|
| 📱 | xs | 0–639px (base, no prefix) |
| 📟 | sm | 640px+ |
| 📲 | md | 768px+ |
| 💻 | lg | 1024px+ |
| 🖥️ | xl | 1280px+ |

```html
<!-- 1 col mobile, 2 col tablet, 3 col desktop -->
<div class="📐💠 📲📐🔲 💻📐🔳">
  ...
</div>
```

---

## Usage with PostCSS

Write readable BEM names in brackets in your source CSS:

```css
.[card] {
  border-radius: var(--⭕-md);
  box-shadow: var(--🌑-sm);
  background: var(--⬜);
}

.[card__image] {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.[card__image--featured] {
  outline: 2px solid var(--🟡);
  outline-offset: -2px;
}
```

The PostCSS plugin compiles this to:

```css
.🃏 { border-radius: var(--⭕-md); box-shadow: var(--🌑-sm); background: var(--⬜); }
.🃏__🖼️ { width: 100%; aspect-ratio: 16 / 9; }
.🃏__🖼️--🌟 { outline: 2px solid var(--🟡); outline-offset: -2px; }
```

---

## Usage with React

```jsx
import { bem } from 'bemoji/react';

const Card = ({ featured, loading, children }) => (
  <article className={bem('card')}>
    <div className={bem('card__image', { featured, loading })}>
      {children.image}
    </div>
    <div className={bem('card__body')}>
      {children.body}
    </div>
  </article>
);

// bem('card')                    → '🃏'
// bem('card__image', { featured: true })  → '🃏__🖼️ 🃏__🖼️--🌟'
// bem('card__image', { loading: true })   → '🃏__🖼️ 🃏__🖼️--⏳'
```

---

## Configuration

```js
// bemoji.config.js
export default {
  version: '1.0',

  blocks: {
    card:       '🃏',
    navbar:     '🧭',
    modal:      '🪟',
    alert:      '🔔',
    form:       '📋',
    table:      '📊',
    badge:      '🏷️',
    tooltip:    '💬',
    tabs:       '📑',
    carousel:   '🎠',
    breadcrumb: '🍞',
    footer:     '🦶',
  },

  elements: {
    image:   '🖼️',
    title:   '🔠',
    body:    '📝',
    footer:  '🦶',
    button:  '🔘',
    input:   '📥',
    link:    '🔗',
    label:   '🏷️',
    icon:    '🎭',
    item:    '📄',
    divider: '🖇️',
  },

  modifiers: {
    primary:  '🌟',
    danger:   '🔴',
    success:  '🟢',
    warning:  '🟡',
    info:     '🔵',
    disabled: '👻',
    active:   '✅',
    loading:  '⏳',
    locked:   '🔒',
    premium:  '💎',
    new:      '🆕',
    dark:     '🕶️',
    xs:       '🔬',
    sm:       '🤏',
    md:       '⚖️',
    lg:       '🏋️',
    xl:       '🏔️',
  },

  breakpoints: {
    sm: { prefix: '📟', minWidth: '640px'  },
    md: { prefix: '📲', minWidth: '768px'  },
    lg: { prefix: '💻', minWidth: '1024px' },
    xl: { prefix: '🖥️', minWidth: '1280px' },
  },

  separator: {
    element:  '__',
    modifier: '--',
  },

  compiler: {
    escape:    'auto',   // 'raw' | 'unicode' | 'auto'
    sourceMap: true,
    purge:     true,
  },
};
```

---

## CLI

```bash
npx bemoji init                    # Scaffold project
npx bemoji compile                 # Transform CSS files
npx bemoji audit                   # Check for unused tokens
npx bemoji decode "🃏__🖼️--🌟"  # → card__image--featured
npx bemoji encode "card__image--featured"  # → 🃏__🖼️--🌟
npx bemoji export --fmt json       # Export token map as JSON
npx bemoji storybook               # Generate Storybook stories
```

---

## Tooling Ecosystem

| Package | Description |
|---------|-------------|
| `bemoji` | Core framework + CSS |
| `bemoji-postcss` | PostCSS plugin |
| `vite-plugin-bemoji` | Vite integration |
| `bemoji/react` | React `bem()` helper |
| `eslint-plugin-bemoji` | ESLint rules |
| `bemoji-cli` | CLI tools |

**VS Code extension** — Search "BEMoji" in the Extensions marketplace for IntelliSense, hover tooltips, and autocomplete.

---

## Browser Support

BEMoji targets the same browser support as Baseline 2023. Emoji class names work natively in all modern browsers. The compiler can output unicode-escaped fallbacks (`.\01F0CF`) for older Webkit environments via the `escape: 'unicode'` config option.

---

## Contributing

PRs are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

The most impactful contributions are:
- New emoji token proposals (open an RFC issue first)
- Framework adapter packages (Svelte, Vue, Angular)
- The actual npm packages (this repo contains complete, functional implementations)

---

## License

MIT © BEMoji Contributors

---

*"It works. We're as surprised as you are."*
