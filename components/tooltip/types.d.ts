import { ReactElement } from 'react';

import { TippyProps } from '@tippyjs/react/headless';

export interface TooltipProps extends TippyProps {
  children: ReactElement;
}
