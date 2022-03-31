import { FC } from 'react';

import cx from 'classnames';

import type { AvatarProps } from './types';

export const Avatar: FC<AvatarProps> = ({ children, className, bgImage }: AvatarProps) => (
  <div
    className={cx({
      'relative z-0 hover:z-10 flex items-center justify-center bg-transparent bg-cover bg-no-repeat bg-center border-2 border-gray-700 w-10 h-10 rounded-full':
        true,
      [className]: !!className,
    })}
    style={{
      ...(bgImage && { backgroundImage: `url(${bgImage})` }),
    }}
  >
    {children}
  </div>
);

export default Avatar;
