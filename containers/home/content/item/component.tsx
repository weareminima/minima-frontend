import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import cx from 'classnames';

import {
  setStep, setStepBottom, setStepDirection, setStepTop,
} from 'store/home/slice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import {
  motion,
} from 'framer-motion';

import { useTopBottomScrollListener } from 'hooks/scroll';
import useWindowSize from 'hooks/window';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg?sprite';

import Scroller from './scroller';

interface ContentItemProps {
  index: number;
  id: string;
  title: string;
  className: string;
}

const MAGIC = {
  header: 80,
  margin: {
    top: 32,
    right: 32,
    bottom: 32,
    left: 32,
  },
};

const DURATION = 0.3;

export const ContentItem: FC<ContentItemProps> = ({
  index,
  id,
  title,
  className,
}) => {
  const prevAnimation = useRef('');
  const {
    step, stepTop, stepBottom, stepDirection, steps,
  } = useAppSelector((state) => state['/home']);
  const { width, height } = useWindowSize();

  const dispatch = useAppDispatch();

  const [STEP, setSTEP] = useState(step);

  const CURRENT_STEP_INDEX = useMemo(() => {
    return steps.findIndex((s) => s.id === step);
  }, [step, steps]);

  const animate = useMemo(() => {
    if (id === STEP && stepTop && !stepDirection) return 'currentTop';
    if (id === STEP && stepTop && stepDirection === 'up') return 'finalCurrentTop';
    if (id === STEP && stepTop && stepDirection === 'down') return 'initialCurrentTop';

    if (id === STEP && stepBottom && !stepDirection) return 'currentBottom';
    if (id === STEP && stepBottom && stepDirection === 'up') return 'initialCurrentBottom';
    if (id === STEP && stepBottom && stepDirection === 'down') return 'finalCurrentBottom';

    if (id === STEP) return 'animate';

    // top card
    if (id === stepTop && stepDirection === 'up') return 'animate';
    if (id === stepTop && stepDirection === 'down') return 'initialTop';
    if (id === stepTop && !stepDirection) return 'top';

    // bottom card
    if (id === stepBottom && stepDirection === 'up') return 'initialBottom';
    if (id === stepBottom && stepDirection === 'down') return 'animate';
    if (id === stepBottom && !stepDirection) return 'bottom';

    return 'invisible';
  }, [id, STEP, stepTop, stepBottom, stepDirection]);

  const scrollRef = useTopBottomScrollListener(
    step === id,
    () => {
      const i = (CURRENT_STEP_INDEX - 1 >= 0) ? CURRENT_STEP_INDEX - 1 : null;
      if (i !== null) {
        dispatch(setStepTop(steps[i]?.id));
      }
    },
    () => {
      const i = (CURRENT_STEP_INDEX + 1 < steps.length) ? CURRENT_STEP_INDEX + 1 : null;
      if (i !== null) {
        dispatch(setStepBottom(steps[i]?.id));
      }
    },
  );

  const contentVariants = useMemo(() => {
    return {
      invisible: {
        x: 0,
        y: 0,
        opacity: 0,
        visibility: 'hidden' as any,
        transition: {
          duration: 0,
        },
      },
      // Current content
      initial: {
        x: 0,
        y: 0,
        top: 0,
        opacity: 1,
        visibility: 'visible' as any,
      },
      animate: {
        x: 0,
        y: 0,
        top: 0,
        opacity: 1,
      },
      exit: {
        x: 0,
        y: 0,
        top: 0,
        opacity: 1,
      },

      // Current content top (up)
      initialCurrentTop: {
        x: 0,
        y: 0,
        top: 0,
        opacity: 1,
      },
      currentTop: {
        x: 0,
        y: MAGIC.header,
        top: 0,
        opacity: 1,
      },
      finalCurrentTop: {
        x: 0,
        y: height,
        top: 0,
        opacity: 1,
      },

      // Current content bottom (down)
      initialCurrentBottom: {
        x: 0,
        y: 0,
        top: 0,
        scale: 1,
        opacity: 1,
      },
      currentBottom: {
        x: 0,
        y: 0,
        top: 0,
        scale: 0.95,
        opacity: 1,
      },
      finalCurrentBottom: {
        x: 0,
        y: 0,
        top: 0,
        scale: 0.95,
        opacity: 0,
      },

      // New content
      top: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 0.95,
        visibility: 'visible' as any,
        transition: {
          duration: 0,
        },
      },

      initialBottom: {
        x: 0,
        y: height,
        opacity: 1,
        visibility: 'visible' as any,
      },
      bottom: {
        x: 0,
        y: [height, height - 100 - MAGIC.header],
        opacity: 1,
        visibility: 'visible' as any,
        transition: {
          times: [0, 1],
          duration: DURATION,
        },
      },
    };
  }, [height]);

  const handleAnimationComplete = useCallback((currentAnimation) => {
    if (typeof currentAnimation !== 'string') {
      return null;
    }

    if (currentAnimation === 'exit') {
      setTimeout(() => {
        setStep(null);
        dispatch(setStep(null));
        dispatch(setStepTop(null));
        dispatch(setStepBottom(null));
      }, 200);
    }

    if (
      currentAnimation === 'initialTop'
      || currentAnimation === 'initialBottom'
    ) {
      dispatch(setStepDirection(null));
      dispatch(setStepTop(null));
      dispatch(setStepBottom(null));
    }

    if (
      currentAnimation === 'animate'
      && (prevAnimation.current === 'bottom' || prevAnimation.current === 'top')
    ) {
      dispatch(setStep(id));
      dispatch(setStepDirection(null));
      dispatch(setStepTop(null));
      dispatch(setStepBottom(null));
    }

    if (
      currentAnimation !== 'invisible'
      && currentAnimation !== 'exit'
    ) {
      scrollRef.current.style.overflow = 'auto';
    } else {
      scrollRef.current.style.overflow = 'hidden';
    }

    if (typeof currentAnimation === 'string') {
      prevAnimation.current = currentAnimation;
    }

    return prevAnimation.current;
  }, [id, dispatch, scrollRef]);

  const handleScrollDirectionChange = useCallback((d) => {
    dispatch(setStepDirection(d));
  }, [dispatch]);

  useEffect(() => {
    if (step) {
      setSTEP(step);
    }
  }, [step]);

  return (
    <>
      {(stepTop || stepBottom) && (id === step) && (
        <Scroller
          onScrollDirectionChange={handleScrollDirectionChange}
        />
      )}

      <motion.div
        key={id}
        className="absolute w-full h-full"
        variants={contentVariants}
        initial="initial"
        animate={animate}
        exit="exit"
        style={{
          zIndex: index,
        }}
        transition={{
          duration: DURATION,
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* HEADER SPACE */}
        <motion.div
          initial={{
            height: 0,
          }}
          animate={{
            height: MAGIC.header,
          }}
          exit={{
            height: 0,
          }}
          className={cx({
            'bg-white absolute z-20 mx-auto': true,
          })}
          style={{
            width: width - MAGIC.margin.left - MAGIC.margin.right,
            display: step === id || stepTop === id ? 'block' : 'none',
            opacity: step === id && stepTop ? 0 : 1,
          }}
        />
        {/* BACKGROUND */}
        <div
          className={cx({
            'flex flex-col absolute interactive w-full h-full top-0 left-0 z-0': true,
          })}
        >
          <motion.div
            initial={{
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            animate={{
              marginTop: MAGIC.header,
              marginLeft: MAGIC.margin.left,
              marginRight: MAGIC.margin.right,
            }}
            exit={{
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            className={cx({
              'grow rounded-xl': true,
              [className]: !!className,
            })}
          />
        </div>

        {/* SCROLL */}
        <div
          ref={scrollRef}
          className={cx({
            'interactive w-full h-full rounded-xl': true,
          })}
        >
          <motion.div
            initial={{
              marginTop: 0,
              paddingTop: 0,
              paddingRight: 24,
              paddingBottom: 24,
              paddingLeft: 24,
            }}
            animate={{
              marginTop: MAGIC.header,
              paddingTop: 0,
              paddingRight: MAGIC.margin.right * 2,
              paddingBottom: MAGIC.margin.bottom,
              paddingLeft: MAGIC.margin.left * 2,

            }}
            exit={{
              marginTop: 0,
              paddingTop: 0,
              paddingRight: 24,
              paddingBottom: 24,
              paddingLeft: 24,
            }}
            layout
            className="relative z-10 p-6"
          >
            <motion.header
              initial={{
                top: 0,
              }}
              animate={{
                top: MAGIC.header,
              }}
              exit={{
                top: 0,
              }}
              className={cx({
                'sticky left-0 flex items-start justify-between py-6': true,
                [className]: !!className,
              })}
            >
              <div className="flex space-x-2">
                <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
                <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
              </div>

              <motion.button
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                  transition: {
                    duration: 0,
                  },
                }}
                type="button"
                onClick={() => {
                  dispatch(setStep(null));
                  dispatch(setStepTop(null));
                  dispatch(setStepBottom(null));
                  dispatch(setStepDirection(null));
                  scrollRef.current.scrollTop = 0;
                }}
              >
                <Icon
                  icon={CLOSE_SVG}
                  className="block w-4 h-4 stroke-current text-dark"
                />
              </motion.button>
            </motion.header>

            <motion.div
              initial={{
                opacity: 0,
                display: 'none',
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.75,
                },
                transitionEnd: {
                  display: 'block',
                },
              }}
              exit={{
                opacity: 0,
                display: 'none',
              }}
              className="space-y-20 overflow-hidden"
            >
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
              <div className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis quidem praesentium veritatis ipsam, autem ex
                consequuntur atque iste rem repellendus aliquam!
                Non magni ex dicta, minima quod error adipisci iusto.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ContentItem;
