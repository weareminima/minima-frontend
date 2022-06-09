import {
  FC, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';

import cx from 'classnames';

import { setOpen, setStep } from 'store/home/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  motion,
} from 'framer-motion';
import useBreakpoint from 'use-breakpoint';

import { useSizes } from 'hooks/size';

import Tag from 'components/tag';
import { BREAKPOINTS } from 'constants/breakpoints';
import { CARD_SIZE } from 'constants/cards';
import { GAEvent } from 'lib/analytics/ga';

interface CardProps {
  id: string;
  className?: string;
  index: number;
  title: string;
  subtitle: ReactNode;
  options: Record<string, any>;
}

export const Card: FC<CardProps> = ({
  id,
  className = '',
  index,
  title,
  subtitle,
  options,
}: CardProps) => {
  const [animation, setAnimation] = useState('visible');
  const [prevAnimation, setPrevAnimation] = useState('hidden');

  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state['/home']);

  const { HEADER } = useSizes();

  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'xs');

  const {
    x, y, rotation,
  } = options;

  const styleVariants = useMemo(() => {
    return {
      hidden: {
        x: '-50%',
        y: -(CARD_SIZE.height / 2) - HEADER - 20,
        z: 500,
        rotate: rotation,
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        opacity: 0,
      },
      visible: {
        x: '-50%',
        y: -(CARD_SIZE.height / 2) - HEADER,
        z: 0,
        rotate: rotation,
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        opacity: 1,
        transition: {
          type: 'spring',
          bounce: 0.25,
          duration: 1,
          ...prevAnimation === 'hidden' && {
            delay: 2 + (index * 0.05),
          },
          ...prevAnimation !== 'hidden' && {
            delay: 0,
          },
        },
      },
      invisible: {
        x: '-50%',
        y: -(CARD_SIZE.height / 2) - HEADER,
        z: 0,
        rotate: rotation,
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        opacity: 0,
        transition: {
          duration: 0.25,
        },
      },
      hover: ({ rotation: hoverRotation }) => {
        const sign = hoverRotation / hoverRotation;

        return {
          x: '-50%',
          y: -(CARD_SIZE.height / 2) - HEADER,
          scale: 1.1,
          rotate: [hoverRotation, -sign * 4, sign * 3, -sign * 2, 0],
          transition: {
            type: 'spring',
            rotate: {
              times: [0.8, 0.9, 1],
              duration: 0.5,
            },
            duration: 0.5,
          },
        };
      },
    };
  }, [rotation, index, prevAnimation, HEADER]);

  const handleClick = useCallback(() => {
    GAEvent({
      action: 'click-card',
      params: {
        card: id,
      },
    });
    dispatch(setStep(id));
    dispatch(setOpen(true));
  }, [dispatch, id]);

  const handleAnimationComplete = useCallback((a) => {
    if (typeof a === 'string') {
      setPrevAnimation(a);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setAnimation('visible');
    } else {
      setAnimation('invisible');
    }
  }, [open]);

  return (
    <div
      key={id}
      className={cx({
        'absolute w-px h-px': true,
      })}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        zIndex: 1000 - index,
        ...breakpoint !== 'xs' && {
          perspective: 600,
          transformStyle: 'preserve-3d',
        },
      }}
    >
      <motion.div
        custom={{
          rotation,
        }}
        initial="hidden"
        animate={animation}
        whileHover="hover"
        variants={styleVariants}
        className={cx({
          'interactive cursor-pointer flex flex-col rounded-3xl -translate-x-1/2 -translate-y-1/2 box-content': true,
          'pointer-events-none': prevAnimation === 'hidden' || prevAnimation === 'invisible',
          'lg:pt-20 md:pt-16 pt-12 ': true,
          'lg:p-8 md:p-6 p-4': true,
        })}
        onClick={handleClick}
        onAnimationComplete={handleAnimationComplete}
      >
        <div
          className={cx({
            'flex flex-col p-4 grow rounded-3xl justify-between': true,
            [className]: !!className,
          })}
        >
          <header className="flex space-x-2">
            <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
            <Tag>
              {title}
            </Tag>

          </header>
          <div>
            {subtitle}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
