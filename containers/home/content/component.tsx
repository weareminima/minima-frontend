import {
  FC, useCallback, useMemo, useRef, useState,
} from 'react';

import cx from 'classnames';

import { setState } from 'store/home/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { Scroll } from 'scrollex';

import useWindowSize from 'hooks/window';

import { CARDS, CARD_SIZE } from 'constants/cards';

import Item from './item';

interface ContentProps {
}

export const Content: FC<ContentProps> = () => {
  const [scrollReady, setScrollReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>();
  const {
    open, ready, step, steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useMemo(() => {
    const S = steps.find((s) => s.id === step) || {} as any;
    const C = CARDS.find((c) => c.id === step) || {} as any;

    return {
      ...S,
      ...C,
    };
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
    if (a === 'animate') {
      dispatch(setState({
        ready: true,
      }));

      setTimeout(() => {
        scrollRef.current.style.scrollBehavior = 'auto';
        const { top } = document.getElementById(STEP.id)?.getBoundingClientRect();
        scrollRef.current.scrollTo(0, top);
        scrollRef.current.style.scrollBehavior = 'smooth';
      }, 0);

      setTimeout(() => {
        setScrollReady(true);
      }, 1);
    }

    if (a === 'exit') {
      dispatch(setState({
        open: false,
        ready: false,
        step: null,
      }));
      setScrollReady(false);
    }
  }, [STEP.id, dispatch]);

  console.log(!(ready && scrollReady));

  return (
    <AnimatePresence
      exitBeforeEnter
    >
      {open && (
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
          onAnimationComplete={handleAnimationComplete}
        >
          {ready && (
            <Scroll.Container
              ref={scrollRef}
              key="scroll"
              scrollAxis="y"
              className="z-0 w-full h-full bg-white"
              throttleAmount={0}
            >
              {CARDS.map((card) => {
                return (
                  <Item
                    key={card.id}
                    {...card}
                  />
                );
              })}
            </Scroll.Container>
          )}

          {!(ready && scrollReady) && (
            <div
              className={cx({
                'absolute top-0 left-0 w-full h-full pt-20 p-6 z-10': true,
              })}
            >
              <div
                className={cx({
                  'w-full h-full rounded-3xl overflow-hidden p-6': true,
                  [STEP.className]: true,
                })}
              >
                <header className="flex space-x-2">
                  <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{STEP.index}</div>
                  <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{STEP.title}</h2>
                </header>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Content;
