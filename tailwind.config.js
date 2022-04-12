/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('tailwindcss/colors');

const COLORS = require('./constants/colors');

module.exports = {
  content: ['./components/**/*.ts', './containers/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    fontFamily: {
      display: 'Garamond',
      body: 'Graphik',
    },
    colors: {
      current: 'currentColor',
      gray: colors.zinc,
      primary: '#F9F6F0',
      ...COLORS,
    },
  },
  plugins: [forms, lineClamp],
};
