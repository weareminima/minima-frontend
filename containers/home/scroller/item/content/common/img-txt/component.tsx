import {
  FC, ReactChild, ReactNode,
} from 'react';

import { useInView } from 'react-intersection-observer';

import cx from 'classnames';

import {
  motion,
} from 'framer-motion';
import useBreakpoint from 'use-breakpoint';

import { BREAKPOINTS } from 'constants/breakpoints';

interface ImgTxtProps {
  image: {
    src: string;
    alt: string;
    caption?: ReactNode;
  };
  children: ReactChild;
  options?: {
    fullScreen?: boolean;
    reverse?: boolean;
    align?: 'start' | 'center' | 'end';
    imageClassName?: string;
    contentClassName?: string;
  }
}

export const ImgTxt: FC<ImgTxtProps> = ({
  image,
  children,
  options,
}) => {
  const {
    reverse,
    fullScreen,
    align = 'start',
    imageClassName = '',
    contentClassName = '',
  } = options || {};

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional options */
    threshold: (breakpoint === 'xs' || breakpoint === 'sm') ? 0 : 0.5,
    triggerOnce: true,
  });

  return (
    <div
      ref={sectionRef}
      className={cx({
        'py-10 lg:py-20': true,
        'xl:px-28': !fullScreen,
      })}
    >
      <div
        className={cx({
          'lg:flex lg:space-x-40': true,
          'space-y-20 lg:space-y-0': true,
          'lg:flex-row-reverse lg:space-x-reverse': !reverse,
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
        })}
      >
        <motion.div
          key="section"
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
          className={cx({
            'opacity-0': true,
            'w-full': !contentClassName,
            [contentClassName]: !!contentClassName,
          })}
        >
          {children}
        </motion.div>

        <motion.div
          key="image"
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
          className={cx({
            'opacity-0 mx-auto': true,
            'w-full': !imageClassName,
            [imageClassName]: !!imageClassName,
          })}
        >
          <img
            className="max-w-full mx-auto"
            src={image.src}
            alt={image.alt}
          />

          {image.caption && (
            <div className="mt-4 text-center">
              {image.caption}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ImgTxt;
