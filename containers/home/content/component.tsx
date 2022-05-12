import {
  FC, useMemo,
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
    top: 0,
    right: 32,
    bottom: 0,
    left: 32,
  },
};

export const Content: FC<ContentProps> = () => {
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
        x: MAGIC.margin.left,
        y: MAGIC.header,
        z: 0,
        rotate: 0,
        width: width - MAGIC.margin.left - MAGIC.margin.right,
        height: height - MAGIC.header,
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
            'absolute z-10': true,
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
          <div
            className={cx({
              'interactive w-full h-full rounded-xl p-6 overflow-auto': true,
            })}
          >
            <div
              className={cx({
                'absolute interactive w-full h-full rounded-xl p-6 top-0 left-0 z-0': true,
                [CARD.className]: !!CARD.className,
              })}
            />
            <div className="relative z-10">
              <header className="flex items-start justify-between">
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
                  }}
                >
                  <Icon
                    icon={CLOSE_SVG}
                    className="block w-4 h-4 stroke-current text-dark"
                  />
                </motion.button>
              </header>
              <div className="h-96" />
              <div className="h-96" />
              <div className="h-96" />
              <div className="h-96" />
              <div className="h-96" />
              <div className="h-96" />
              <div className="h-96" />
              <div className="h-96" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Content;
