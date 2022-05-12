import {
  FC, useCallback, useMemo, useState,
} from 'react';

import cx from 'classnames';

import { setStep } from 'store/home/slice';
import { useAppDispatch } from 'store/hooks';

import {
  motion,
} from 'framer-motion';

interface CardProps {
  id: string;
  className?: string;
  index: number;
  title: string;
  options: Record<string, any>;
}

export const Card: FC<CardProps> = ({
  id,
  className = '',
  index,
  title,
  options,
}: CardProps) => {
  const [prevAnimation, setPrevAnimation] = useState('hidden');
  const dispatch = useAppDispatch();

  const {
    x, y, rotation,
  } = options;

  const styleVariants = useMemo(() => {
    return {
      hidden: {
        x: '-50%',
        y: '-50%',
        z: 500,
        rotate: rotation,
        width: 208,
        height: 208,
        opacity: 0,
      },
      visible: {
        x: '-50%',
        y: '-50%',
        z: 0,
        rotate: rotation,
        width: 208,
        height: 208,
        opacity: 1,
        transition: {
          type: 'spring',
          bounce: 0.5,
          duration: 0.75,
          ...prevAnimation === 'hidden' && {
            delay: 2 + (index * 0.05),
          },
          ...prevAnimation === 'visible' && {
            delay: 0,
          },
        },
      },
      hover: ({ rotation: hoverRotation }) => {
        const sign = hoverRotation / hoverRotation;
        return {
          x: '-50%',
          y: '-50%',
          scale: 1.1,
          rotate: [hoverRotation, -sign * 4, sign * 3, -sign * 2, 0],
          transition: {
            type: 'spring',
            rotate: {
              times: [0.8, 0.9, 1],
              duration: 0.3,
            },
            duration: 0.3,
          },
        };
      },
    };
  }, [rotation, index, prevAnimation]);

  const handleClick = useCallback(() => {
    dispatch(setStep({
      id,
      x,
      y,
      rotation,
    }));
  }, [dispatch, id, x, y, rotation]);

  const handleAnimationComplete = useCallback((a) => {
    if (typeof a === 'string') {
      setPrevAnimation(a);
    }
  }, []);

  return (
    <div
      key={id}
      className={cx({
        'absolute w-px h-px': true,
      })}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        perspective: 600,
        transformStyle: 'preserve-3d',
        zIndex: 1000 - index,
      }}
    >
      <motion.div
        custom={{
          rotation,
        }}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={styleVariants}
        className={cx({
          'interactive cursor-pointer flex flex-col justify-between w-52 h-64 rounded-xl -translate-x-1/2 -translate-y-1/2 p-6': true,
          [className]: !!className,
        })}
        onClick={handleClick}
        onAnimationComplete={handleAnimationComplete}
      >
        <header className="flex space-x-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
          <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
        </header>
      </motion.div>
    </div>
  );
};

export default Card;
