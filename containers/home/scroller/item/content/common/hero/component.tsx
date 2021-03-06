import {
  FC,
} from 'react';

import { useInView } from 'react-intersection-observer';

import cx from 'classnames';

import { motion } from 'framer-motion';
import useBreakpoint from 'use-breakpoint';

import { useSizes } from 'hooks/size';
import useWindowSize from 'hooks/window';

import { BREAKPOINTS } from 'constants/breakpoints';

interface HeroItemProps {
  subtitle: string;
  description: string;
}

export const HeroItem: FC<HeroItemProps> = ({
  subtitle,
  description,
}: HeroItemProps) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { ref: heroRef, inView: heroInView } = useInView({
    /* Optional options */
    threshold: (breakpoint === 'xxs' || breakpoint === 'xs' || breakpoint === 'sm') ? 0 : 1,
    triggerOnce: true,
  });

  const { HEADER, PADDING } = useSizes();

  const { height = 1000 } = useWindowSize();

  return (
    <div
      ref={heroRef}
      className="flex flex-col justify-between w-full mb-4 space-y-16 lg:mb-8 md:mb-6"
      style={{
        minHeight: height - HEADER - (PADDING * 2) - (24 + PADDING * 2),
      }}
    >
      <motion.div
        initial="initial"
        animate={heroInView ? 'animate' : 'exit'}
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
          exit: {
            opacity: 0,
          },
        }}
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        className={cx({
          'max-w-[145px] origin-top-left': true,
        })}
      >
        {subtitle}
      </motion.div>

      <motion.div
        initial="initial"
        animate={heroInView ? 'animate' : 'exit'}
        exit="exit"
        variants={{
          initial: {
            y: 20,
            opacity: 0,
          },
          animate: {
            y: 0,
            opacity: 1,
          },
          exit: {
            y: 20,
            opacity: 0,
          },
        }}
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        className={cx({
          'font-display text-5bxl md:text-8xl max-w-3xl': true,
        })}
      >
        {description}
      </motion.div>
    </div>
  );
};

export default HeroItem;
