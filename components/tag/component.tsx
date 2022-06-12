import { FC } from 'react';

import cx from 'classnames';

import type { TagProps } from './types';

export const Tag: FC<TagProps> = ({
  children,
  className,
}: TagProps) => {
  return (
    <h2
      className={cx({
        'inline-flex items-center h-6 px-2 text-sm leading-none border border-gray-900 rounded-xl': true,
        [className]: className,
      })}
    >
      {children}
    </h2>
  );
};

export default Tag;
