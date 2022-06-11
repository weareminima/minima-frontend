import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import Cards from 'containers/home/intro/cards';

interface IntroProps {
}

export const Intro: FC<IntroProps> = () => {
  const containerRef = useRef<HTMLDivElement>();

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.025,
      },
    },
    invisible: {
      opacity: 0,
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

  const handleSize = useCallback(() => {
    const container = containerRef.current;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
  }, []);

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
      className="absolute top-0 left-0 flex items-center justify-center flex-grow w-full h-full"
    >
      <div className="space-y-6">
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
              {'better life'.split('').map((l, index) => (
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
          </span>
        </motion.h1>
      </div>

      <Cards />
    </section>
  );
};

export default Intro;
