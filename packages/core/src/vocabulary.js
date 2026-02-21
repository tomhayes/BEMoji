/**
 * BEMoji Canonical Vocabulary
 * The official 143-token emoji lexicon.
 *
 * This file is the single source of truth for all reserved emoji tokens.
 * Custom tokens are defined in bemoji.config.js and must not collide with these.
 */

export const BLOCKS = {
  card:         '🃏',
  navbar:       '🧭',
  footer:       '🦶',
  form:         '📋',
  modal:        '🪟',
  alert:        '🔔',
  badge:        '🏷️',
  tooltip:      '💬',
  table:        '📊',
  tabs:         '📑',
  carousel:     '🎠',
  breadcrumb:   '🍞',
  drawer:       '🗂️',
  accordion:    '📂',
  avatar:       '👤',
  progress:     '📶',
  skeleton:     '💀',
  pagination:   '📖',
  dropdown:     '📥',
  stepper:      '🪜',
  timeline:     '📅',
  sidebar:      '📌',
};

export const ELEMENTS = {
  image:        '🖼️',
  title:        '🔠',
  body:         '📝',
  footer:       '🦶',
  header:       '🪖',
  button:       '🔘',
  input:        '📥',
  link:         '🔗',
  label:        '🏷️',
  icon:         '🎭',
  item:         '📄',
  divider:      '🖇️',
  prefix:       '🔭',
  suffix:       '🔬',
  overlay:      '🌫️',
  close:        '✖️',
  badge:        '🔢',
  avatar:       '🧑',
  count:        '🔢',
  description:  '📖',
  actions:      '⚡',
  empty:        '🕳️',
  error:        '🚨',
  hint:         '💡',
};

export const MODIFIERS = {
  // Semantic states
  primary:      '🌟',
  secondary:    '🥈',
  danger:       '🔴',
  success:      '🟢',
  warning:      '🟡',
  info:         '🔵',
  neutral:      '⬜',

  // Interactive states
  disabled:     '👻',
  active:       '✅',
  loading:      '⏳',
  locked:       '🔒',
  hidden:       '🙈',
  visible:      '👁️',
  selected:     '☑️',
  focused:      '🔍',
  hovered:      '👆',
  pressed:      '👇',
  error:        '🚨',
  valid:        '✔️',
  invalid:      '❌',

  // Visual variants
  dark:         '🕶️',
  light:        '☀️',
  ghost:        '👁️',
  outline:      '⬜',
  filled:       '■',
  flat:         '▬',
  elevated:     '☁️',
  rounded:      '⭕',
  pill:         '💊',
  square:       '🟥',

  // Content flags
  premium:      '💎',
  new:          '🆕',
  hot:          '🔥',
  beta:         '🧪',
  deprecated:   '⚠️',
  required:     '❗',
  optional:     '❓',

  // Size modifiers
  xs:           '🔬',
  sm:           '🤏',
  md:           '⚖️',
  lg:           '🏋️',
  xl:           '🏔️',
  '2xl':        '🌍',
  full:         '🟦',
};

export const BREAKPOINTS = {
  sm: { prefix: '📟', minWidth: '640px'  },
  md: { prefix: '📲', minWidth: '768px'  },
  lg: { prefix: '💻', minWidth: '1024px' },
  xl: { prefix: '🖥️', minWidth: '1280px' },
};

export const UTILITIES = {
  // Display
  block:        '📦',
  inline:       '▶️',
  flex:         '🔀',
  grid:         '📐',
  hidden:       '🙈',
  contents:     '📃',

  // Flex/Grid children
  'col-1':      '💠',
  'col-2':      '🔲',
  'col-3':      '🔳',
  'col-4':      '⬛',
  'col-auto':   '🔄',
  'col-span-2': '🗂️',
  'col-span-3': '🗓️',
  'col-span-full': '🌐',

  // Spacing (pattern: emoji + scale)
  // p-{n}: 📏 prefix, m-{n}: 📐 prefix
  // Gap
  'gap-1':      '↔️1',
  'gap-2':      '↔️2',
  'gap-4':      '↔️4',
  'gap-8':      '↔️8',

  // Text align
  'text-left':   '⬅️',
  'text-center': '↔️',
  'text-right':  '➡️',

  // Font weight
  'font-light':  '🪶',
  'font-normal': '✏️',
  'font-bold':   '🖊️',
  'font-black':  '🖋️',

  // Overflow
  'overflow-hidden':  '✂️',
  'overflow-auto':    '↕️',
  'overflow-scroll':  '📜',

  // Position
  relative:     '🔁',
  absolute:     '📍',
  fixed:        '📌',
  sticky:       '🩹',

  // Width / Height
  'w-full':     '🌊',
  'h-full':     '🏗️',
  'w-screen':   '🖥️',
  'h-screen':   '📺',

  // Visibility
  invisible:    '👻',
  'sr-only':    '🔇',
};

// Build reverse lookup maps (emoji → name)
export const REVERSE_BLOCKS     = Object.fromEntries(Object.entries(BLOCKS).map(([k,v]) => [v,k]));
export const REVERSE_ELEMENTS   = Object.fromEntries(Object.entries(ELEMENTS).map(([k,v]) => [v,k]));
export const REVERSE_MODIFIERS  = Object.fromEntries(Object.entries(MODIFIERS).map(([k,v]) => [v,k]));

export default { BLOCKS, ELEMENTS, MODIFIERS, BREAKPOINTS, UTILITIES };
