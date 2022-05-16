import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import cx from 'classnames';

import { setStep, setStepBottom, setStepTop } from 'store/home/slice';
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

export const ContentItem: FC<ContentItemProps> = ({
  index,
  id,
  title,
  className,
}) => {
  const {
    step, stepTop, stepBottom, steps,
  } = useAppSelector((state) => state['/home']);
  const { width, height } = useWindowSize();

  const dispatch = useAppDispatch();

  const [STEP, setSTEP] = useState(step);

  const CURRENT_STEP_INDEX = useMemo(() => {
    return steps.findIndex((s) => s.id === step);
  }, [step, steps]);

  const animate = useMemo(() => {
    if (id === STEP && stepTop) return 'currentTop';
    if (id === STEP && stepBottom) return 'currentBottom';
    if (id === STEP) return 'animate';
    if (id === stepTop) return 'top';
    if (id === stepBottom) return 'bottom';

    return 'invisible';
  }, [id, STEP, stepTop, stepBottom]);

  const scrollRef = useTopBottomScrollListener(
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
      currentTop: {
        x: 0,
        y: 100,
        top: 0,
        opacity: 1,
      },
      currentBottom: {
        x: 0,
        y: 0,
        top: 0,
        scale: 0.95,
        opacity: 1,
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
      bottom: {
        x: 0,
        y: [height, height - 100 - MAGIC.header],
        opacity: 1,
        visibility: 'visible' as any,
        transition: {
          times: [0, 1],
          duration: 0.3,
        },
      },
    };
  }, [height]);

  const handleAnimationComplete = useCallback((props) => {
    if (props === 'exit') {
      dispatch(setStep(null));
      dispatch(setStepTop(null));
      dispatch(setStepBottom(null));
    }
  }, [dispatch]);

  useEffect(() => {
    setSTEP(step);
  }, [step]);

  return (
    <>
      {(stepTop || stepBottom) && (id === step) && (
        <Scroller
          onScrollDirectionChange={(direction) => {
            if (stepTop && direction === 'up') {
              dispatch(setStep(stepTop));
              dispatch(setStepTop(null));
              dispatch(setStepBottom(null));
            }

            if (stepBottom && direction === 'down') {
              dispatch(setStep(stepBottom));
              dispatch(setStepTop(null));
              dispatch(setStepBottom(null));
            }

            if (
              (stepTop && direction === 'down')
              || (stepBottom && direction === 'up')
            ) {
              dispatch(setStepTop(null));
              dispatch(setStepBottom(null));
            }
          }}
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
            display: step === id ? 'block' : 'none',
            opacity: stepTop ? 0 : 1,
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
        <motion.div
          ref={scrollRef}
          initial={{
            overflow: 'hidden',
          }}
          animate={{
            overflow: 'auto',
          }}
          exit={{
            overflow: 'hidden',
          }}
          className={cx({
            'interactive w-full h-full rounded-xl': true,
          })}
        >
          <motion.div
            initial={{
              marginTop: 0,
              paddingTop: 24,
              paddingRight: 24,
              paddingBottom: 24,
              paddingLeft: 24,
            }}
            animate={{
              marginTop: MAGIC.header,
              paddingTop: MAGIC.margin.top,
              paddingRight: MAGIC.margin.right * 2,
              paddingBottom: MAGIC.margin.bottom,
              paddingLeft: MAGIC.margin.left * 2,

            }}
            exit={{
              marginTop: 0,
              paddingTop: 24,
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
                top: MAGIC.header + MAGIC.margin.top,
              }}
              exit={{
                top: 0,
              }}
              className="sticky left-0 flex items-start justify-between"
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
                  duration: 0.5,
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
        </motion.div>
      </motion.div>
    </>
  );
};

export default ContentItem;
