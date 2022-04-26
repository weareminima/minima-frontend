const colors = require('tailwindcss/colors');

module.exports = {
  COLORS: ['#FDF4A8', '#FFDBD4', '#EEE3FF', '#D0E4F8', '#DAF1E8'],
  TAILWIND_COLORS: {
    dark: '#101012',
    black: '#000',
    white: '#fff',
    gray: colors.zinc,

    yellow: {
      500: '#FDF4A8',
    },
    coral: {
      500: '#FFDBD4',
    },
    purple: {
      500: '#EEE3FF',
    },
    blue: {
      500: '#D0E4F8',
    },
    green: {
      500: '#DAF1E8',
    },
  },
};
