import { forwardRef } from 'react';

import cx from 'classnames';

import { THEME } from './constants';
import type { LabelProps } from './types';

const LabelComponent = ({
  htmlFor, theme = 'dark', children, className,
}: LabelProps, ref) => (
  <label
    className={cx({
      [THEME[theme]]: true,
      [className]: !!className,
    })}
    htmlFor={htmlFor}
    ref={ref}
  >
    {children}
  </label>
);

export const Label = forwardRef<HTMLLabelElement, LabelProps>(LabelComponent);

export default Label;
