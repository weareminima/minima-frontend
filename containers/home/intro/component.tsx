import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';

import Cards from 'containers/home/intro/cards';

import hourGlassAnimation from 'svgs/hour-glass.json';

interface IntroProps {
}

export const Intro: FC<IntroProps> = () => {
  const containerRef = useRef<HTMLDivElement>();
  const options = {
    animationData: hourGlassAnimation,
    loop: true,
    autoplay: false,
  };

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.025,
      },
    },
  };

  const letter = {
    hidden: {
      opacity: 0,
      y: 5,
      rotate: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
    },
  };

  const { View, play, stop } = useLottie(options);

  const handleSize = useCallback(() => {
    const container = containerRef.current;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
  }, []);

  useEffect(() => {
    stop();
  }, [stop]);

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={containerRef}
      className="fixed top-0 left-0 flex items-center justify-center flex-grow w-full h-full"
    >
      <div className="space-y-6">
        <motion.div
          className="w-16 h-16 mx-auto"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 1,
            type: 'spring',
            // damping: 8,
            // mass: 1.5,
            // stiffness: 100,
            duration: 1,
            bounce: 0.5,
          }}
          onAnimationComplete={() => {
            play();
          }}
        >
          {View}
        </motion.div>

        <motion.h1
          key="h1"
          className="text-5xl font-light text-center text-gray-900 font-display"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          <span className="block">
            {'Good design'.split('').map((l, index) => (
              <motion.span
                key={`${l}-${index}`} // eslint-disable-line react/no-array-index-key
                className={cx({
                  'inline-block': l !== ' ',
                })}
                variants={letter}
              >
                {l}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {'for a '.split('').map((l, index) => (
              <motion.span
                key={`${l}-${index}`} // eslint-disable-line react/no-array-index-key
                className={cx({
                  'inline-block': l !== ' ',
                })}
                variants={letter}
              >
                {l}
              </motion.span>
            ))}
            <span className="italic">
              {'better'.split('').map((l, index) => (
                <motion.span
                  key={`${l}-${index}`} // eslint-disable-line react/no-array-index-key
                  className={cx({
                    'inline-block': l !== ' ',
                  })}
                  variants={letter}
                >
                  {l}
                </motion.span>
              ))}
            </span>
            {' life.'.split('').map((l, index) => (
              <motion.span
                key={`${l}-${index}`} // eslint-disable-line react/no-array-index-key
                className={cx({
                  'inline-block': l !== ' ',
                })}
                variants={letter}
              >
                {l}
              </motion.span>
            ))}
          </span>
        </motion.h1>
      </div>

      <Cards />
    </section>
  );
};

export default Intro;
