// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'bg-black border rounded-sm text-blue-500 focus:border-blue-500',
    status: {
      none: 'border-gray-500',
      valid: 'border-gray-500',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-gray-500 opacity-50',
    },
  },
  light: {
    base: 'bg-white border rounded-sm text-blue-500 focus:border-blue-500',
    status: {
      none: 'border-gray-800',
      valid: 'border-gray-800',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-gray-800 opacity-50',
    },
  },
};
