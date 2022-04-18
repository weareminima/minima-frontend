import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import { CARDS as CARDS_METADATA } from './constants';

interface CardsProps {}

export const Cards: FC<CardsProps> = () => {
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>();
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

  const CARDS = useMemo(() => {
    const { x: xCenter, y: yCenter } = center;
    const radius = 300;

    return CARDS_METADATA.map((c, i) => {
      const radian = ((i / CARDS_METADATA.length) * 2 * Math.PI) - (Math.PI * 0.75);

      const x = xCenter + (radius * Math.cos(radian));
      const y = yCenter + (radius * Math.sin(radian));

      const x1 = xCenter + ((radius * 3) * Math.cos(radian));
      const y1 = yCenter + ((radius * 3) * Math.sin(radian));

      return {
        ...c,
        variants: {
          hidden: {
            x: x1,
            y: y1,
            opacity: 0,
          },
          visible: {
            x,
            y,
            opacity: 1,
          },
        },
      };
    });
  }, [center]);

  const handleResize = useCallback(() => {
    const { innerWidth: width, innerHeight: height } = window;

    setCenter({ x: width / 2, y: height / 2 });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.section
      key={`cards-${JSON.stringify(center)}`}
      ref={containerRef}
      className="absolute w-full h-full overflow-hidden"
      variants={cards}
      initial="hidden"
      animate="visible"
    >
      {CARDS.map((c) => {
        const rotation = (Math.random() * (30)) - 15;

        return (
          <motion.div
            key={c.id}
            drag
            dragConstraints={containerRef}
            className="absolute w-px h-px"
            variants={c.variants}
            transition={{
              type: 'spring',
              duration: 0.5,
              bounce: 0.3,
            }}
          >
            <motion.div
              custom={{
                rotation,
              }}
              variants={{
                initial: {
                  x: '-50%',
                  y: '-50%',
                  scale: 1,
                  rotate: rotation,
                },
                visible: {
                  x: '-50%',
                  y: '-50%',
                  scale: 1,
                  rotate: rotation,
                },
                hover: ({ rotation: hoverRotation }) => {
                  const sign = hoverRotation / hoverRotation;

                  return {
                    x: '-50%',
                    y: '-50%',
                    scale: 1.1,
                    rotate: [hoverRotation, -sign * 4, sign * 3, -sign * 2, 0],
                    transition: {
                      rotate: {
                        times: [0.8, 0.9, 1],
                        duration: 0.3,
                      },
                      duration: 0.3,
                    },
                  };
                },
              }}
              animate="visible"
              whileHover="hover"
              className={cx({
                'interactive cursor-pointer flex flex-col justify-between w-52 h-64 rounded-xl -translate-x-1/2 -translate-y-1/2 p-6': true,
                [c.className]: !!c.className,
              })}
            >
              <header className="flex space-x-2">
                <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{c.index}</div>
                <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{c.title}</h2>
              </header>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default Cards;
