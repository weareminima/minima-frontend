import { FC } from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

interface ComingSoonProps {}

export const ComingSoon: FC<ComingSoonProps> = () => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.03,
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

  return (
    <div
      className="w-screen h-screen justify-center items-center flex flex-grow"
    >
      <section>
        <motion.h1
          key="h1"
          className="font-display font-light text-center text-5xl"
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
