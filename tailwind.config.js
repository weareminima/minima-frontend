/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./components/**/*.ts', './containers/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    fontFamily: {
      display: 'Gascogne',
      body: 'Matter',
    },
    colors: {
      current: 'currentColor',
      gray: colors.zinc,
      primary: '#F9F6F0',
    },
  },
  plugins: [forms, lineClamp],
};
