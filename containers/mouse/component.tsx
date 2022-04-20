import {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { setCache } from 'store/application/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { motion } from 'framer-motion';

import Icon from 'components/icon';

import CURSOR_SVG from 'svgs/cursor.svg?sprite';
import EMAIL_SVG from 'svgs/email.svg?sprite';

import type { MouseProps } from './types';

const INTERVAL_POSITION = 5;
const INTERVAL_ROTATION = 100;

export const Mouse: FC<MouseProps> = () => {
  const [interactive, setInteractive] = useState(false);
  const interactiveRef = useRef(false);
  const [interactiveType, setInteractiveType] = useState(null);
  const { cache } = useAppSelector((state) => state['/application']);
  const dispatch = useAppDispatch();

  const { pathname } = useRouter();
  const positionInterval = useRef<NodeJS.Timer>();
  const rotationInterval = useRef<NodeJS.Timer>();

  const mouseRef = useRef<HTMLDivElement>(null);
  const mouseElementRef = useRef<HTMLDivElement>(null);

  const position = useRef({ x: -999, y: -999 });
  const prevPosition = useRef({ x: -999, y: -999 });
  const angle = useRef(0);
  const prevAngle = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const {
      clientX, clientY,
    } = e;

    position.current = {
      x: clientX,
      y: clientY,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    position.current = {
      x: -9999,
      y: -9999,
    };
  }, []);

  const handleMouseStyle = () => {
    const {
      x, y,
    } = position.current;
    // Apply translation (set to actual cursor position)
    mouseRef.current.style.transform = `translate(${x}px, ${y}px)`;
    // Ensure correct rotation transition direction

    while (Math.abs(prevAngle.current - angle.current) > 180) {
      if (angle.current > prevAngle.current) {
        angle.current -= 360;
      } else if (angle.current < prevAngle.current) {
        angle.current += 360;
      }
    }

    // Apply rotation
    if (interactiveRef.current) {
      angle.current = 90;
    }
    mouseElementRef.current.style.transform = `rotate(${angle.current - 90}deg)`;
  };

  const handleMouseAngle = () => {
    const { x, y } = position.current;
    const { x: prevX, y: prevY } = prevPosition.current;

    const delt = {
      x: prevX - x,
      y: prevY - y,
    };

    if (Math.abs(delt.x) < 3 && Math.abs(delt.y) < 3) return;
    angle.current = (Math.atan2(delt.y, delt.x) * (180 / Math.PI));

    handleMouseStyle();

    prevPosition.current = position.current;
    prevAngle.current = angle.current;
  };

  const handleInteractiveMouseEnter = useCallback((e) => {
    setInteractive(true);
    setInteractiveType(e?.target?.dataset?.cursor);
    interactiveRef.current = true;
  }, []);

  const handleInteractiveMouseLeave = useCallback(() => {
    setInteractive(false);
    setInteractiveType(null);
    interactiveRef.current = false;
  }, []);

  // Check movements
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    positionInterval.current = setInterval(handleMouseStyle, INTERVAL_POSITION);
    rotationInterval.current = setInterval(handleMouseAngle, INTERVAL_ROTATION);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);

      if (positionInterval.current) clearInterval(positionInterval.current);
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    const interactives = document.querySelectorAll('.interactive');
    interactives.forEach((int) => {
      int.addEventListener('mouseenter', handleInteractiveMouseEnter);
      int.addEventListener('mouseleave', handleInteractiveMouseLeave);
    });
  }, [cache, handleInteractiveMouseEnter, handleInteractiveMouseLeave]);
  // Prevent mouse to be hidden
  useEffect(() => {
    setInteractive(false);
    dispatch(setCache(new Date().getTime()));
  }, [dispatch, pathname]);

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const iconVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
    transition: {
      duration: 0.05,
    },
  };
  return (
    <motion.div
      ref={mouseRef}
      key="mouse"
      {...variants}
      className={cx({
        'fixed pointer-events-none z-50': true,
      })}
    >
      <div className="w-6 h-6 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={mouseElementRef}
          className={cx({
            'transition-transform': true,
            'opacity-0': interactive && !interactiveType,
          })}
        >
          {!interactiveType && (
            <div
              key="cursor"
              {...iconVariants}
            >
              <Icon icon={CURSOR_SVG} className="w-6 h-6" />
            </div>
          )}

          {interactiveType === 'mail' && (
            <div
              key="mail"
              {...iconVariants}
            >
              <Icon icon={EMAIL_SVG} className="w-8 h-8" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Mouse;
