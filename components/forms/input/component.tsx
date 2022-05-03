import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { InputProps } from './types';

export const Input = forwardRef((
  {
    theme = 'dark',
    mode = 'normal',
    disabled = false,
    type = 'text',
    state,
    className,
    onChange,
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <input
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      className={cx({
        'form-input': true,
        [THEME[theme].base]: true,
        // [THEME[theme].status[st]]: true,
        [THEME[theme].mode[mode]]: true,
        [className]: !!className,
      })}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
});

Input.displayName = 'Input';

export default Input;
