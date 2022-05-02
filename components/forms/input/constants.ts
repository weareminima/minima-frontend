// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  light: {
    base: 'w-full text-sm leading-tight text-gray-800 bg-white border rounded',
    status: {
      none: 'border-gray-800',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-800 opacity-50',
    },
    icon: 'text-gray-800 text-opacity-50',
    mode: {
      normal: 'border rounded',
    },
  },
  dark: {
    base: 'w-full text-sm leading-tight text-white bg-gray-800 bg-opacity-0',
    status: {
      none: 'border-gray-500',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-500 opacity-50',
    },
    icon: 'text-white',
    mode: {
      normal: 'border rounded',
    },
  },
  minimal: {
    base: 'w-full text-sm leading-tight text-dark px-0 py-2 bg-white focus:outline-none focus:border-dark/0 focus:ring-2 focus:ring-dark focus:ring-opacity-0',
    status: {
      none: 'border-dark/10',
      valid: 'border-dark/10',
      error: 'border-dark/10',
      disabled: 'border-dark/10 opacity-50',
    },
    icon: 'text-white',
    mode: {
      normal: 'border-0',
    },
  },
};
