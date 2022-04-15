/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('tailwindcss/colors');

const { TAILWIND_COLORS } = require('./constants/colors');

module.exports = {
  content: ['./components/**/*.tsx', './containers/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    fontFamily: {
      display: 'Garamond',
      body: 'Graphik',
    },
    colors: {
      current: 'currentColor',
      gray: colors.zinc,
      primary: '#F9F6F0',
      ...TAILWIND_COLORS,
    },
  },
  plugins: [forms, lineClamp],
};
