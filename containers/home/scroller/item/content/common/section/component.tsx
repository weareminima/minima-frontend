import {
  FC, ReactChild,
} from 'react';

import { useInView } from 'react-intersection-observer';

import cx from 'classnames';

import {
  motion,
} from 'framer-motion';

interface SectionItemProps {
  image: {
    src: string;
    alt: string;
  };
  children: ReactChild;
  reverse?: boolean;
}

export const SectionItem: FC<SectionItemProps> = ({
  image,
  children,
  reverse,
}) => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={sectionRef} className="py-20 px-28">
      <div
        className={cx({
          'flex space-x-40': true,
          'flex-row-reverse space-x-reverse': reverse,
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
          className="w-full opacity-0"
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
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionItem;
