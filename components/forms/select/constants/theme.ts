export default {
  dark: {
    container: 'text-white bg-transparent ring-1 ring-gray-400 rounded-3xl',
    open: 'ring-2 ring-blue-400 bg-gray-700 text-white rounded-2xl',
    closed: 'border-gray-400 text-gray-400',
    prefix: {
      base: 'text-white',
    },
    icon: {
      closed: 'text-white',
      open: 'text-blue-500 transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-sm text-gray-300',
      highlighted: 'text-sm bg-gray-700 text-white',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  light: {
    container: 'text-gray-600 bg-transparent ring-1 ring-gray-400 rounded-3xl',
    open: 'ring-2 ring-blue-400 bg-white text-gray-600 rounded-2xl',
    closed: 'text-gray-400',
    prefix: {
      base: 'text-gray-800',
    },
    icon: {
      closed: 'text-gray-600',
      open: 'text-blue-500 transform rotate-180',
      disabled: 'text-gray-400',
    },
    item: {
      base: 'text-sm text-gray-400',
      highlighted: 'text-sm bg-gray-100 text-gray-800',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  states: {
    none: '',
    error: 'ring-red-500',
    valid: 'ring-green-500',
  },
  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
  },
};
