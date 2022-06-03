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
}

export const SectionItem: FC<SectionItemProps> = ({
  image,
  children,
}) => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional options */
    threshold: 1,
    triggerOnce: true,
  });

  return (
    <div ref={sectionRef} className="py-20 px-28">
      <div
        className={cx({
          'flex space-x-10': true,
        })}
      >
        <motion.div
          key="image"
          initial="initial"
          animate={sectionInView ? 'animate' : 'exit'}
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
          }}
          className="w-full opacity-0"
        >
          <img
            src={image.src}
            alt={image.alt}
          />
        </motion.div>

        <motion.div
          initial="initial"
          animate={sectionInView ? 'animate' : 'exit'}
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
