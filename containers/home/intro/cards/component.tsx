import {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import { setSteps } from 'store/home/slice';
import { useAppDispatch } from 'store/hooks';

import { useDebouncedCallback } from 'use-debounce';

import { CARDS as CARDS_METADATA } from 'constants/cards';

import Card from './card';

interface CardsProps {}

export const Cards: FC<CardsProps> = () => {
  const dispatch = useAppDispatch();

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
      const radian = ((i / CARDS_METADATA.length) * 2 * Math.PI) - (Math.PI * 0.5);

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
  const handleResize = useDebouncedCallback(() => {
    const { width, height } = containerRef.current.getBoundingClientRect();

    setContainer({
      center: {
        x: width / 2,
        y: height / 2,
      },
      width,
      height,
    });
  }, 100);

  useEffect(() => {
    dispatch(setSteps(CARDS.map((s) => ({
      id: s.id,
      x: s.options.x,
      y: s.options.y,
      rotation: s.options.rotation,
    }))));
  }, [CARDS, dispatch]);

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
