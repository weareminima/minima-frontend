import {
  FC, useCallback, useMemo,
} from 'react';

import cx from 'classnames';

import { setState } from 'store/home/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

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
    open, step, steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useMemo(() => {
    return steps.find((s) => s.id === step) || {} as any;
  }, [step, steps]);

  const {
    x, y, rotation,
  } = STEP;

  const { width, height } = useWindowSize();

  const dispatch = useAppDispatch();

  const variants = useMemo(() => {
    return {
      initial: {
        x: x - (CARD_SIZE.width / 2) - 24,
        y: y - (CARD_SIZE.height / 2) - 80,
        rotate: 0,
        scale: 1.1,
        width: CARD_SIZE.width + 48,
        height: CARD_SIZE.height + 24 + 80,
        opacity: 1,
      },
      animate: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        width,
        height,
        opacity: 1,
      },
      exit: {
        x: x - (CARD_SIZE.width / 2) - 24,
        y: y - (CARD_SIZE.height / 2) - 80,
        rotate: rotation,
        scale: 1,
        width: CARD_SIZE.width + 48,
        height: CARD_SIZE.height + 24 + 80,
        opacity: 1,
      },
    };
  }, [x, y, rotation, width, height]);

  const handleAnimationComplete = useCallback((a: string) => {
    if (a === 'exit') {
      dispatch(setState({
        open: false,
        step: null,
        stepDirection: null,
        stepTop: null,
        stepBottom: null,
      }));
    }
  }, [dispatch]);

  return (
    <AnimatePresence
      exitBeforeEnter
    >
      {open && (
        <motion.div
          key="content"
          layout
          className={cx({
            'absolute z-20 overflow-auto': true,
          })}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            bounce: 0,
          }}
          onAnimationComplete={handleAnimationComplete}
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
