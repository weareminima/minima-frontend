/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/custom-forms');
const lineClamp = require('@tailwindcss/line-clamp');

const { TAILWIND_BREAKPOINTS } = require('./constants/breakpoints');
const { TAILWIND_COLORS } = require('./constants/colors');

module.exports = {
  content: [
    './components/**/*.@(tsx|ts)',
    './containers/**/*.@(tsx|ts)',
    './constants/**/*.@(tsx|ts)',
    './pages/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      display: 'Garamond',
      body: 'Graphik',
    },
    colors: {
      current: 'currentColor',
      ...TAILWIND_COLORS,
    },
    screens: TAILWIND_BREAKPOINTS,
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.25rem' }],
      sm: ['0.9375rem', { lineHeight: '1.375rem' }],
      base: ['1.0625rem', { lineHeight: '1.5rem' }],
      lg: ['1.1875rem', { lineHeight: '1.75rem' }],
      xl: ['1.375rem', { lineHeight: '1.5rem' }],
      '2xl': ['1.5rem', { lineHeight: '1.75rem' }],
      '3xl': ['1.75rem', { lineHeight: '2rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['2.5rem', { lineHeight: '2.75rem' }],
      '6xl': ['3.5rem', { lineHeight: '3.75rem' }],
      '7xl': ['4rem', { lineHeight: '1', letterSpacing: '-1%' }],
      '8xl': ['5rem', { lineHeight: '1' }],
      '9xl': ['7.5rem', { lineHeight: '1', letterSpacing: '-1%' }],
    },
    customForms: (theme) => ({
      default: {
        checkbox: {
          icon: (iconColor) => `<svg width="16" height="16" viewBox="0 0 8 8" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.35359 2.3571L3.35359 6.3571C3.15833 6.55236 2.84175 6.55236 2.64648 6.3571L0.646484 4.3571L1.35359 3.64999L3.00004 5.29644L6.64648 1.64999L7.35359 2.3571Z" /></svg>`,
          iconColor: theme('colors.white'),
          '&:checked': {
            backgroundSize: '60% 60%',
            backgroundPosition: 'center',
          },
        },
        radio: {
          icon: (iconColor) => `<svg width="16" height="16" viewBox="0 0 8 8" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.35359 2.3571L3.35359 6.3571C3.15833 6.55236 2.84175 6.55236 2.64648 6.3571L0.646484 4.3571L1.35359 3.64999L3.00004 5.29644L6.64648 1.64999L7.35359 2.3571Z" /></svg>`,
          iconColor: theme('colors.white'),
          '&:checked': {
            backgroundSize: '60% 60%',
            backgroundPosition: 'center',
          },
        },
      },
    }),
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [forms, lineClamp],
};
