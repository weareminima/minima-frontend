import {
  FC, useCallback, useEffect, useRef,
} from 'react';

import { motion } from 'framer-motion';

import { COLORS } from 'constants/colors';

interface ComingSoonBallProps {}

export const ComingSoonBall: FC<ComingSoonBallProps> = () => {
  const containerRef = useRef<HTMLDivElement>();
  const ballRef = useRef<HTMLDivElement>();
  const ballContentRef = useRef<HTMLDivElement>();
  const animation = useRef<number>();

  const positionRef = useRef({ x: 0, y: 0 });
  const directionRef = useRef({ dx: 3, dy: 3 });
  const colorRef = useRef(0);

  const rotationRef = useRef(0);

  const draw = useCallback(() => {
    const container = containerRef.current;
    const ball = ballRef.current;
    const ballContent = ballContentRef.current;

    const position = positionRef.current;
    const direction = directionRef.current;

    if (ball && container) {
      const { width, height } = container.getBoundingClientRect();
      const ballRadius = ball.getBoundingClientRect().width / 2;

      const x = position.x + direction.dx;
      const y = position.y + direction.dy;

      const r = rotationRef.current + 1;

      const c = colorRef.current;

      positionRef.current = {
        x,
        y,
      };
      rotationRef.current = r;

      // X walls
      if (direction.dx > 0 && x + ((ballRadius * 2) + 1) > width) {
        directionRef.current = {
          dx: -direction.dx,
          dy: direction.dy,
        };
        colorRef.current = (c + 1) === COLORS.length ? 0 : c + 1;
      }

      if (direction.dx < 0 && x <= 0) {
        directionRef.current = {
          dx: -direction.dx,
          dy: direction.dy,
        };
        colorRef.current = (c + 1) === COLORS.length ? 0 : c + 1;
      }

      // Y walls
      if (direction.dy > 0 && y + ((ballRadius * 2) + 1) > height) {
        directionRef.current = {
          dx: direction.dx,
          dy: -direction.dy,
        };
        colorRef.current = (c + 1) === COLORS.length ? 0 : c + 1;
      }

      if (direction.dy < 0 && y <= 0) {
        directionRef.current = {
          dx: direction.dx,
          dy: -direction.dy,
        };
        colorRef.current = (c + 1) === COLORS.length ? 0 : c + 1;
      }

      if (r === 360) {
        rotationRef.current = 0;
      }

      ball.style.transform = `translate(${x}px, ${y}px)`;
      ballContent.style.transform = `rotate(${r}deg)`;
      ballContent.style.backgroundColor = COLORS[c];
    }

    animation.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const ball = ballRef.current;
    const ballContent = ballContentRef.current;

    const ballRadius = ball.getBoundingClientRect().width / 2;

    const { width } = container.getBoundingClientRect();

    const x = Math.random() * ((width - (ballRadius * 2)) - 0) + 0;
    const y = Math.random() * -(ballRadius * 2) - ballRadius * 2;

    positionRef.current = {
      x,
      y,
    };

    ball.style.transform = `translate(${x}px, ${y}px)`;
    ballContent.style.backgroundColor = COLORS[colorRef.current];

    return () => {
      if (animation.current) {
        cancelAnimationFrame(animation.current);
      }
    };
  }, []); // eslint-disable-line

  return (
    <div
      ref={containerRef}
      className="absolute z-40 w-full h-full overflow-hidden pointer-events-none"
    >
      <div ref={ballRef} className="absolute w-40 h-40">
        <motion.div
          ref={ballContentRef}
          className="absolute flex items-center justify-center w-full h-full rounded-full font-display"
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 2,
            type: 'spring',
            bounce: 0.5,
          }}
          onAnimationComplete={draw}
        >
          <div className="relative text-3xl leading-none text-center top-1.5">
            <span className="block">Coming</span>
            <span className="relative block italic -top-1">soon</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonBall;
