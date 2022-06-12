import {
  FC, useMemo,
} from 'react';

import { useInView } from 'react-intersection-observer';

import {
  motion,
} from 'framer-motion';
import useBreakpoint from 'use-breakpoint';

import { BREAKPOINTS } from 'constants/breakpoints';

interface ImgProps {
  image: {
    src: {
      xs: string;
      sm: string;
    };
    alt: string;
    width: number;
    height: number;
  };
}

export const Img: FC<ImgProps> = ({
  image,
}) => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const IMAGE = useMemo(() => {
    switch (breakpoint) {
      case 'xxs':
      case 'xs': {
        return {
          url: image.src.xs,
          paddingBotttom: '100%',
        };
      }
      default: {
        return {
          url: image.src.sm,
          paddingBotttom: '40.24%',
        };
      }
    }
  }, [image, breakpoint]);

  return (
    <div ref={sectionRef}>
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
        <div
          className="w-full bg-no-repeat bg-contain"
          style={{
            paddingBottom: IMAGE.paddingBotttom,
            backgroundImage: `url(${IMAGE.url})`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Img;
