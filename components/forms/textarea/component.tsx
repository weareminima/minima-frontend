import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import type { TextareaProps } from './types';

const THEME = {
  dark: {
    base: 'leading-tight text-white bg-transparent border rounded',
    status: {
      none: 'border-gray-500',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-700 opacity-50',
    },
  },
  light: {
    base: 'leading-tight text-gray-800 bg-white border rounded',
    status: {
      none: 'border-gray-500',
      valid: 'border-green-500',
      error: 'border-red-500',
      disabled: 'border-gray-700 opacity-50',
    },
  },
  minimal: {
    base: 'w-full text-sm leading-tight text-dark bg-white focus:outline-none focus:border-dark/0 focus:ring-2 focus:ring-dark focus:ring-opacity-0',
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

export const Textarea = forwardRef((
  {
    theme = 'light',
    disabled = false,
    className,
    ...props
  }: TextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) => {
  // const st = useStatus({ meta, disabled });

  return (
    <textarea
      {...props}
      ref={ref}
      disabled={disabled}
      className={cx({
        'form-textarea w-full': true,
        [THEME[theme].base]: true,
        // [THEME[theme].status[st]]: true,
        [className]: !!className,
      })}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
