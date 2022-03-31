import { FC } from 'react';

import cx from 'classnames';

import type { TagProps } from './types';

export const Tag: FC<TagProps> = ({ children, className }: TagProps) => (
  <div
    className={cx({
      'relative inline-flex rounded': true,
      [`${className}`]: !!className,
      'text-black bg-gray-200': !className,
    })}
  >
    <div
      className={cx({
        'flex-col leading-none text-sm px-2 py-1': true,
      })}
    >
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

export default Tag;
