import { FC } from 'react';

import cx from 'classnames';

import useStatus from '../utils';

import { THEME } from './constants';
import type { CheckboxProps } from './types';

export const Checkbox: FC<CheckboxProps> = ({
  theme = 'dark',
  input,
  meta = {},
  disabled = false,
  className,
  ...props
}: CheckboxProps) => {
  const st = useStatus({ meta, disabled });

  return (
    <input
      {...input}
      {...props}
      type="checkbox"
      disabled={disabled}
      className={cx({
        'form-checkbox': true,
        [THEME[theme].base]: true,
        [THEME[theme].status[st]]: true,
        [className]: !!className,
      })}
    />
  );
};

export default Checkbox;
