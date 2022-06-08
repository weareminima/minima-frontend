import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import cx from 'classnames';

import { setState } from 'store/home/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { Scroll } from 'scrollex';

import usePreloadImages from 'hooks/images';
import { useSizes } from 'hooks/size';
import useWindowSize from 'hooks/window';

import { CARDS, CARD_SIZE } from 'constants/cards';

import FakeItem from './fake-item';
import Item from './item';

interface ScrollerProps {
}

export const Scroller: FC<ScrollerProps> = () => {
  const [scrollReady, setScrollReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>();

  const {
    open, ready, step, steps, menu,
  } = useAppSelector((state) => state['/home']);

  const STEP = useMemo(() => {
    const S = steps.find((s) => s.id === step) || {} as any;
    const C = CARDS.find((c) => c.id === step) || {} as any;

    return {
      ...S,
      ...C,
    };
  }, [step, steps]);

  const { PADDING, HEADER } = useSizes();

  const {
    x, y, rotation,
  } = STEP;

  const { width, height } = useWindowSize();

  const dispatch = useAppDispatch();

  usePreloadImages();

  const variants = useMemo(() => {
    return {
      initial: {
        x: x - (CARD_SIZE.width / 2) - PADDING,
        y: y - (CARD_SIZE.height / 2) - HEADER,
        rotate: 0,
        scale: 1.1,
        width: CARD_SIZE.width + (PADDING * 2),
        height: CARD_SIZE.height + PADDING + HEADER,
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
        x: x - (CARD_SIZE.width / 2) - PADDING,
        y: y - (CARD_SIZE.height / 2) - HEADER,
        rotate: rotation,
        scale: 1,
        width: CARD_SIZE.width + (PADDING * 2),
        height: CARD_SIZE.height + PADDING + HEADER,
        opacity: 1,
      },
    };
  }, [x, y, rotation, width, height, HEADER, PADDING]);

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

      setTimeout(() => {
        dispatch(setState({
          scrollReady: true,
        }));
      }, 750);
    }

    if (a === 'exit') {
      dispatch(setState({
        open: false,
        ready: false,
        exit: false,
        scrollReady: false,
        step: null,
      }));

      setScrollReady(false);
    }
  }, [STEP.id, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      if (menu) {
        scrollRef.current.style.overflow = 'hidden hidden';
      } else {
        scrollRef.current.style.overflow = 'hidden auto';
      }
    }
  }, [menu]);

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
                    scrollRef={scrollRef}
                  />
                );
              })}
            </Scroll.Container>
          )}

          {!(ready && scrollReady) && (
            <FakeItem />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Scroller;
