import {
  Children,
  FC, ReactNode,
} from 'react';

import { useInView } from 'react-intersection-observer';

import cx from 'classnames';

import {
  motion,
} from 'framer-motion';
import useBreakpoint from 'use-breakpoint';

import { BREAKPOINTS } from 'constants/breakpoints';

interface Txt3ColumnsProps {
  children: ReactNode[];
}

export const Txt3Columns: FC<Txt3ColumnsProps> = ({
  children,
}) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional options */
    threshold: (breakpoint === 'xxs' || breakpoint === 'xs' || breakpoint === 'sm') ? 0 : 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={sectionRef} className="py-10 lg:py-20">
      <div
        className={cx({
          'space-y-5 lg:space-y-0 lg:flex lg:space-x-10': true,
        })}
      >
        {Children.map(children, (child: any) => {
          return (
            <motion.div
              key={`section-${child?.props?.id}`}
              initial="initial"
              animate={sectionInView ? 'animate' : 'initial'}
              variants={{
                initial: {
                  y: 20,
                  opacity: 0,
                },
                animate: {
                  y: 0,
                  opacity: 1,
                },
              }}
              transition={{
                duration: 0.5,
              }}
              className="w-full"
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Txt3Columns;
