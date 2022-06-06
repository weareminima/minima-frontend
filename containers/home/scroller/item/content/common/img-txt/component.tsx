import {
  FC, ReactChild,
} from 'react';

import { useInView } from 'react-intersection-observer';

import cx from 'classnames';

import {
  motion,
} from 'framer-motion';

interface ImgTxtProps {
  image: {
    src: string;
    alt: string;
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

  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div
      ref={sectionRef}
      className={cx({
        'py-20': true,
        'px-28': !fullScreen,
      })}
    >
      <div
        className={cx({
          'flex space-x-40': true,
          'flex-row-reverse space-x-reverse': reverse,
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
        })}
      >
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
            'opacity-0': true,
            'w-full': !imageClassName,
            [imageClassName]: !!imageClassName,
          })}
        >
          <img
            className="w-full"
            src={image.src}
            alt={image.alt}
          />
        </motion.div>

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
      </div>
    </div>
  );
};

export default ImgTxt;
