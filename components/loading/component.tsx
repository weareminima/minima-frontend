import { FC } from 'react';

import cx from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/icon';

import LOADING_SVG from 'svgs/ui/loading.svg?sprite';

import type { LoadingProps } from './types';

export const Loading: FC<LoadingProps> = ({
  visible = false,
  className = 'absolute',
  iconClassName = 'w-5 h-5',
  transition = {},
}: LoadingProps) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          {...variants}
          transition={transition}
          className={cx({
            [className]: !!className,
          })}
        >
          <Icon icon={LOADING_SVG} className={iconClassName} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
