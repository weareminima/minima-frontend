import {
  FC, useMemo, useRef,
} from 'react';

import cx from 'classnames';

import { setStep } from 'store/home/slice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import useWindowSize from 'hooks/window';

import Icon from 'components/icon';
import { CARDS } from 'constants/cards';

import CLOSE_SVG from 'svgs/close.svg?sprite';

interface ContentProps {
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

export const Content: FC<ContentProps> = () => {
  const scrollRef = useRef<HTMLDivElement>();

  const { step } = useAppSelector((state) => state['/home']);
  const dispatch = useAppDispatch();

  const {
    id, x, y, rotation,
  } = step || {};

  const CARD = useMemo(() => {
    return CARDS.find((c) => c.id === id);
  }, [id]);

  const { width, height } = useWindowSize();

  const variants = useMemo(() => {
    return {
      initial: {
        x: x - 104,
        y: y - 104,
        rotate: 0,
        width: 208,
        height: 208,
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
        x: x - 104,
        y: y - 104,
        rotate: rotation,
        width: 208,
        height: 208,
        opacity: 1,
      },
    };
  }, [x, y, rotation, width, height]);

  return (
    <AnimatePresence
      exitBeforeEnter
    >
      {step?.id && (
        <motion.div
          key={id}
          className={cx({
            'absolute z-20 overflow-hidden': true,
          })}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'spring',
            duration: 0.5,
            bounce: 0,
          }}
        >
          {/* HEADER SPACE */}
          <motion.div
            initial={{
              display: 'none',
              height: 0,
            }}
            animate={{
              height: MAGIC.header,
              transitionEnd: {
                display: 'block',
              },
            }}
            exit={{
              display: 'none',
              height: 0,
            }}
            className={cx({
              'bg-white absolute z-20 mx-auto': true,
            })}
            style={{
              width: width - MAGIC.margin.left - MAGIC.margin.right,
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
                [CARD.className]: !!CARD.className,
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
                  <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{CARD?.index}</div>
                  <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{CARD?.title}</h2>
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
      )}
    </AnimatePresence>
  );
};

export default Content;
