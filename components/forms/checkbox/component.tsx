import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { CheckboxProps } from './types';

export const Checkbox = forwardRef((
  {
    disabled = false,
    className,
    ...props
  }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      disabled={disabled}
      className={cx({
        'form-checkbox': true,
        [THEME.base]: true,
        // [THEME.status[st]]: true,
        [className]: !!className,
      })}
    />
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
