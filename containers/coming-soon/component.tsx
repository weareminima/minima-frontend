import { FC, useEffect } from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';

import ComingSoonBall from 'containers/coming-soon/ball';

import hourGlassAnimation from 'svgs/hour-glass.json';

interface ComingSoonProps {}

export const ComingSoon: FC<ComingSoonProps> = () => {
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

  useEffect(() => {
    stop();
  }, [stop]);

  return (
    <div
      className="relative w-screen h-screen justify-center items-center flex flex-grow"
    >
      <ComingSoonBall />

      <section className="space-y-6">
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
          className="font-display font-light text-center text-5xl text-gray-900"
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
      </section>

      <motion.footer
        className="absolute bottom-0 text-center w-full p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <a
          className="interactive"
          href="mailto:hello@weareminima.com"
          target="_blank"
          rel="noreferrer"
        >
          hello@weareminima.com
        </a>
      </motion.footer>
    </div>
  );
};

export default ComingSoon;
