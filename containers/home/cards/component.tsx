import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import Card from './card';
import { CARDS as CARDS_METADATA } from './constants';

interface CardsProps {}

export const Cards: FC<CardsProps> = () => {
  const [container, setContainer] = useState({
    center: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement>();

  const CARDS = useMemo(() => {
    const {
      center: {
        x: xCenter, y: yCenter,
      },
    } = container;
    const radius = 300;

    return CARDS_METADATA.map((c, i) => {
      const radian = ((i / CARDS_METADATA.length) * 2 * Math.PI) - (Math.PI * 0.75);

      const x = xCenter + (radius * Math.cos(radian));
      const y = yCenter + (radius * Math.sin(radian));

      const x1 = xCenter + ((radius * 3) * Math.cos(radian));
      const y1 = yCenter + ((radius * 3) * Math.sin(radian));

      const rotation = (Math.random() * (30)) - 15;

      return {
        ...c,
        options: {
          x,
          y,
          x1,
          y1,
          rotation,
          container,
        },
      };
    });
  }, [container]);

  // Resize
  const handleResize = useCallback(() => {
    const { innerWidth: width, innerHeight: height } = window;

    setContainer({
      center: {
        x: width / 2,
        y: height / 2,
      },
      width,
      height,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      key={`cards-${JSON.stringify(container)}`}
      ref={containerRef}
      className="absolute z-10 w-full h-full overflow-hidden"
    >
      {CARDS.map((c) => {
        return (
          <Card
            {...c}
            key={c.id}
          />
        );
      })}
    </section>
  );
};

export default Cards;
