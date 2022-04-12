import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import type { MouseProps } from './types';

const INTERVAL_POSITION = 5;
const INTERVAL_ROTATION = 100;

export const Mouse: FC<MouseProps> = () => {
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

  const handleMouseStyle = useCallback(() => {
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
    mouseElementRef.current.style.transform = `rotate(${angle.current - 90}deg)`;
  }, []);

  const handleMouseAngle = useCallback(() => {
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
  }, [handleMouseStyle]);

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

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
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
      <div ref={mouseElementRef} className="relative h-5 w-1 bg-gray-900 -translate-x-1/2 -translate-y-1/2 transition-transform">
        <div className="absolute top-0 left-1/2 h-2 w-2 bg-projects rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </motion.div>
  );
};

export default Mouse;
