import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { RadioProps } from './types';

export const Radio = forwardRef((
  {
    disabled = false,
    className,
    ...props
  }: RadioProps,
  ref: Ref<HTMLInputElement>,
) => {
  // const st = useStatus({ active: !!input.checked, meta, disabled });

  return (
    <input
      {...props}
      ref={ref}
      type="radio"
      disabled={disabled}
      className={cx({
        'form-radio': true,
        [THEME.base]: true,
        // [THEME.status[st]]: true,
        [className]: !!className,
      })}
    />
  );
});

Radio.displayName = 'Radio';

export default Radio;
