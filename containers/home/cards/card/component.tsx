import {
  FC, useCallback, useMemo, useState,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

interface CardProps {
  id: string;
  className?: string;
  index: number;
  title: string;
  options: Record<string, any>;
  onClick?: () => void;
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

export const Card: FC<CardProps> = ({
  id,
  className = '',
  index,
  title,
  options,
  onClick,
}: CardProps) => {
  const [animate, setAnimate] = useState('visible');
  const [prevAnimate, setPrevAnimate] = useState('hidden');

  const {
    x, y, x1, y1, rotation, container: { width, height, center },
  } = options;
  const { x: xCenter, y: yCenter } = center;

  const positionVariants = useMemo(() => {
    return {
      hidden: {
        x: x1,
        y: y1,
        opacity: 0,
      },
      visible: {
        x,
        y,
        opacity: 1,
        transition: {
          type: 'spring',
          ...prevAnimate !== 'single' && {
            delay: 2 + (index * 0.05),
          },
          ...prevAnimate === 'single' && {
            delay: 0.3,
          },
          bounce: 0,
          duration: 0.25,
        },
        transitionEnd: {
          zIndex: 0,
        },
      },
      single: {
        x: xCenter,
        y: yCenter + (MAGIC.header / 2),
        opacity: 1,
        zIndex: 1,
        transition: {
          type: 'spring',
          bounce: 0,
          duration: 0.25,
        },
      },
    };
  }, [x, y, x1, y1, xCenter, yCenter, index, prevAnimate]);

  const styleVariants = useMemo(() => {
    return {
      hidden: {
        x: '-50%',
        y: '-50%',
        scale: 1,
        rotate: rotation,
        width: 208,
        height: 208,
      },
      visible: {
        x: '-50%',
        y: '-50%',
        scale: 1,
        rotate: rotation,
        width: 208,
        height: 208,
        transition: {
          type: 'spring',
          duration: 0.25,
          bounce: 0,
        },
      },
      single: {
        x: '-50%',
        y: '-50%',
        scale: 1,
        rotate: 0,
        width: width - MAGIC.margin.left - MAGIC.margin.right,
        height: height - MAGIC.header,
        transition: {
          type: 'spring',
          duration: 0.5,
          delay: 0.3,
          bounce: 0,
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
  }, [width, height, rotation]);

  const handleClick = useCallback(() => {
    const a = animate === 'visible' ? 'single' : 'visible';
    setAnimate(a);
    if (onClick) onClick();
  }, [animate, onClick]);

  return (
    <motion.div
      key={id}
      className={cx({
        'absolute w-px h-px': true,
      })}
      variants={positionVariants}
      initial="hidden"
      animate={animate}
      onAnimationComplete={() => {
        if (prevAnimate !== animate) {
          setPrevAnimate(animate);
        }
      }}
    >
      <motion.div
        custom={{
          rotation,
        }}
        variants={styleVariants}
        animate={animate}
        whileHover={prevAnimate === 'visible' ? 'hover' : null}
        className={cx({
          'interactive cursor-pointer flex flex-col justify-between w-52 h-64 rounded-xl -translate-x-1/2 -translate-y-1/2 p-6': true,
          [className]: !!className,
        })}
        onClick={handleClick}
      >
        <header className="flex space-x-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
          <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
        </header>
      </motion.div>
    </motion.div>
  );
};

export default Card;
