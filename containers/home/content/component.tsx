import {
  FC, useMemo,
} from 'react';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import useWindowSize from 'hooks/window';

import { CARDS, CARD_SIZE } from 'constants/cards';

import Item from './item';

interface ContentProps {
}

export const Content: FC<ContentProps> = () => {
  const {
    step, steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useMemo(() => {
    return steps.find((s) => s.id === step) || {} as any;
  }, [step, steps]);

  const {
    x, y, rotation,
  } = STEP;

  const { width, height } = useWindowSize();

  const variants = useMemo(() => {
    return {
      initial: {
        x: x - (CARD_SIZE.width / 2),
        y: y - (CARD_SIZE.height / 2),
        rotate: 0,
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        opacity: 1,
      },
      animate: {
        x: 0,
        y: 0,
        z: 0,
        rotate: 0,
        width,
        height,
        opacity: 1,
      },
      exit: {
        x: x - (CARD_SIZE.width / 2),
        y: y - (CARD_SIZE.height / 2),
        rotate: rotation,
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        opacity: 1,
      },
    };
  }, [x, y, rotation, width, height]);

  return (
    <AnimatePresence
      exitBeforeEnter
    >
      {step && (
        <motion.div
          key="content"
          layout
          className={cx({
            'absolute z-20 overflow-hidden': true,
          })}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            bounce: 0,
          }}
        >
          {CARDS.map((card) => {
            return (
              <Item
                key={card.id}
                {...card}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Content;
