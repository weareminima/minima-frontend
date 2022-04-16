import {
  FC, useMemo,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import { CARDS as CARDS_METADATA } from './constants';

interface CardsProps {}

export const Cards: FC<CardsProps> = () => {
  const cards = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 0.025,
      },
    },
  };

  const center = useMemo(() => {
    if (typeof window !== 'undefined') {
      const { innerWidth, innerHeight } = window;
      return {
        x: innerWidth / 2,
        y: innerHeight / 2,
      };
    }

    return {
      x: 0,
      y: 0,
    };
  }, []);

  const CARDS = useMemo(() => {
    const { x: xCenter, y: yCenter } = center;
    const radius = 300;

    return CARDS_METADATA.map((c, i) => {
      const radian = ((i / CARDS_METADATA.length) * 2 * Math.PI) - (Math.PI * 0.75);

      const x = xCenter + (radius * Math.cos(radian));
      const y = yCenter + (radius * Math.sin(radian));

      const x1 = xCenter + ((radius * 5) * Math.cos(radian));
      const y1 = yCenter + ((radius * 5) * Math.sin(radian));

      return {
        ...c,
        variants: {
          hidden: {
            x: x1,
            y: y1,
            scale: 1,
            opacity: 0,
            rotate: 0,
          },
          visible: {
            x,
            y,
            scale: 1,
            opacity: 1,
            rotate: (Math.random() * (30)) - 15,
          },
        },
      };
    });
  }, [center]);

  return (
    <motion.section
      className="absolute w-full h-full overflow-hidden"
      variants={cards}
      initial="hidden"
      animate="visible"
    >
      {CARDS.map((c) => (
        <motion.div
          key={c.id}
          className="absolute w-px h-px"
          variants={c.variants}
          transition={{
            type: 'spring',
            duration: 0.5,
            bounce: 0.25,
          }}
        >
          <div
            className={cx({
              'flex items-center justify-center w-52 h-64 rounded-xl -translate-x-1/2 -translate-y-1/2': true,
              [c.className]: !!c.className,
            })}
          >
            {c.title}
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Cards;
