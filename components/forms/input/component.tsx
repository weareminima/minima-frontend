import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import { THEME } from './constants';
import type { InputProps } from './types';

export const Input = forwardRef((
  {
    theme = 'dark',
    mode = 'normal',
    disabled = false,
    type = 'text',
    state,
    icon,
    className,
    ...rest
  }: InputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <div className="relative w-full">
      {icon && (
        <Icon
          icon={icon}
          className={cx({
            'absolute w-4 h-4 transform -translate-y-1/2 top-1/2 left-3': true,
            [THEME[theme].icon]: true,
          })}
        />
      )}

      <input
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        className={cx({
          'form-input': true,
          [THEME[theme].base]: true,
          // [THEME[theme].status[st]]: true,
          [THEME[theme].mode[mode]]: true,
          'pl-10': icon,
          [className]: !!className,
        })}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
