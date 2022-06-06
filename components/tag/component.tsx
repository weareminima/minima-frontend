import { FC } from 'react';

import type { TagProps } from './types';

export const Tag: FC<TagProps> = ({
  children,
}: TagProps) => {
  return (
    <h2 className="inline-flex items-center h-6 px-2 text-sm leading-none border border-gray-900 rounded-xl">
      {children}
    </h2>
  );
};

export default Tag;
