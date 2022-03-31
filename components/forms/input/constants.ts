// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'w-full leading-tight text-white bg-gray-800 bg-opacity-0',
    status: {
      none: 'border-gray-500',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-500 opacity-50',
    },
    icon: 'text-white',
    mode: {
      normal: 'border rounded',
      dashed: 'border-dashed border-b',
    },
  },
  light: {
    base: 'w-full leading-tight text-gray-800 bg-white border rounded',
    status: {
      none: 'border-gray-800',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-800 opacity-50',
    },
    icon: 'text-gray-800 text-opacity-50',
    mode: {
      normal: 'border rounded',
      dashed: 'border-dashed border-b',
    },
  },
};
