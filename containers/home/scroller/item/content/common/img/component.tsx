import {
  FC,
} from 'react';

import { useInView } from 'react-intersection-observer';

import {
  motion,
} from 'framer-motion';

interface ImgProps {
  image: {
    src: string;
    alt: string;
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

  return (
    <div ref={sectionRef} className="py-20">
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
    </div>
  );
};

export default Img;
