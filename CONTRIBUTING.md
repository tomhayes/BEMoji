# Contributing to BEMoji

First: thank you. Contributions to a framework that uses emojis as CSS class names are never taken for granted.

## Ground rules

- All new emoji tokens must be proposed via a [Token RFC issue](../../issues/new?template=token-rfc.md) before a PR is opened
- Token proposals must explain the semantic mapping and confirm no collision with existing tokens
- The `BLOCKS`, `ELEMENTS`, and `MODIFIERS` objects in `vocabulary.js` are the canonical source of truth
- PRs that add tokens without an approved RFC will not be merged

## Development setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/bemoji.git
cd bemoji

# Install dependencies
npm install

# Run tests
npm test

# Run the vanilla example
npx serve examples/vanilla
```

## Repo structure

```
bemoji/
├── packages/
│   ├── core/              Core resolver, vocabulary, CSS
│   ├── postcss-plugin/    PostCSS transform plugin
│   ├── vite-plugin/       Vite integration
│   ├── eslint-plugin/     ESLint rules
│   └── cli/               CLI tooling
├── docs/                  Documentation site (GitHub Pages)
├── examples/
│   ├── vanilla/           Plain HTML/CSS example
│   └── react/             React + Vite example
└── .github/
    └── workflows/         CI + Pages deployment
```

## Token proposal guidelines

A good token proposal answers:

1. **What concept does this emoji represent?** Be precise.
2. **Why is this emoji the right choice?** Is the association widely understood?
3. **Does it conflict with any existing tokens?** Run `npx bemoji export --fmt json` and check.
4. **What category does it belong to?** Block / element / modifier.

## Code style

- ES modules throughout
- No build step for library code (it's consumed directly)
- Tests live alongside source: `src/foo.js` → `src/foo.test.js`
- No TypeScript (yet) — JSDoc comments for type hints

## Reporting bugs

Please include:
- Your BEMoji version (`npx bemoji --version`)
- Node.js version
- Browser (for rendering issues)
- A minimal reproduction

## Questions

Open a Discussion rather than an Issue for general questions.
