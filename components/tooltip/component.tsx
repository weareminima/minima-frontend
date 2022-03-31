import { FC, useCallback } from 'react';

import Tippy from '@tippyjs/react/headless';
import { useSpring, motion } from 'framer-motion';
import { SpringOptions } from 'popmotion';

import Arrow from './arrow';
import type { TooltipProps } from './types';

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  arrow,
  maxWidth,
  ...props
}: TooltipProps) => {
  const springConfig: SpringOptions = { damping: 15, stiffness: 300 };
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(0.95, springConfig);

  const onMount = useCallback(() => {
    scale.set(1);
    opacity.set(1);
  }, []); // eslint-disable-line

  const onHide = useCallback(({ unmount }) => {
    const cleanup = scale.onChange((value) => {
      if (value <= 0.95) {
        cleanup();
        unmount();
      }
    });

    scale.set(0.95);
    opacity.set(0);
  }, []); // eslint-disable-line

  return (
    <Tippy
      {...props}
      render={(attrs) => (
        <motion.div style={{ scale, opacity, maxWidth: maxWidth || 'none' }} {...attrs}>
          <div className="relative">
            {content}

            {arrow && <Arrow data-popper-arrow="" {...attrs} />}
          </div>
        </motion.div>
      )}
      animation
      onMount={onMount}
      onHide={onHide}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
