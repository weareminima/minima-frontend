/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('tailwindcss/colors');

const { TAILWIND_COLORS } = require('./constants/colors');

module.exports = {
  content: ['./components/**/*.@(tsx|ts)', './containers/**/*.@(tsx|ts)', './pages/**/*.tsx'],
  theme: {
    fontFamily: {
      display: 'Garamond',
      body: 'Graphik',
    },
    colors: {
      current: 'currentColor',
      gray: colors.zinc,
      dark: '#101012',
      black: '#000',
      white: '#fff',
      ...TAILWIND_COLORS,
    },
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.25rem' }],
      sm: ['0.9375rem', { lineHeight: '1.375rem' }],
      base: ['1.0625rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4rem', { lineHeight: '1', letterSpacing: '-1%' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['7.5rem', { lineHeight: '1', letterSpacing: '-1%' }],
    },
  },
  plugins: [forms, lineClamp],
};
