import { useMemo } from 'react';

import useBreakpoint from 'use-breakpoint';

import { BREAKPOINTS } from 'constants/breakpoints';

// SIZES
export function useSizes() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const PADDING = useMemo(() => {
    switch (breakpoint) {
      case 'xxs':
        return 16;
      case 'xs':
        return 16;
      case 'sm':
        return 16;
      case 'md':
        return 24;
      default:
        return 32;
    }
  }, [breakpoint]);

  const HEADER = useMemo(() => {
    switch (breakpoint) {
      case 'xxs':
        return 48;
      case 'xs':
        return 48;
      case 'sm':
        return 48;
      case 'md':
        return 64;
      default:
        return 80;
    }
  }, [breakpoint]);

  return {
    PADDING,
    HEADER,
  };
}
