import { FC } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import useStatus from '../utils';

import { THEME } from './constants';
import type { InputProps } from './types';

export const Input: FC<InputProps> = ({
  theme = 'dark',
  mode = 'normal',
  disabled = false,
  type = 'text',
  input,
  meta = {},
  icon,
  className,
  ...props
}: InputProps) => {
  const st = useStatus({ meta, disabled });

  return (
    <div className="relative">
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
        {...input}
        {...props}
        type={type}
        disabled={disabled}
        className={cx({
          'form-input': true,
          [THEME[theme].base]: true,
          [THEME[theme].status[st]]: true,
          [THEME[theme].mode[mode]]: true,
          'pl-10': icon,
          [className]: !!className,
        })}
      />
    </div>
  );
};

export default Input;
