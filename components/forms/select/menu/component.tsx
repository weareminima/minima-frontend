import { FC } from 'react';

import cx from 'classnames';

import THEME from 'components/forms/select/constants/theme';
import { SelectMenuProps } from 'components/forms/select/types';

export const SelectMenu: FC<SelectMenuProps> = ({
  theme,
  opened,
  attributes,
  children,
}: SelectMenuProps) => (
  <div
    className={cx({
      'overflow-hidden': true,
      'invisible pointer-events-none': attributes?.popper?.['data-popper-reference-hidden'],
      [THEME[theme].open]: opened,
    })}
  >
    {children}
  </div>
);

export default SelectMenu;
