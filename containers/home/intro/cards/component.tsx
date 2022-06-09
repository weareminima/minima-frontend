import {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import { setSteps } from 'store/home/slice';
import { useAppDispatch } from 'store/hooks';

import useBreakpoint from 'use-breakpoint';
import { useDebouncedCallback } from 'use-debounce';

import { BREAKPOINTS } from 'constants/breakpoints';
import { CARDS as CARDS_METADATA, CARD_TRANSFORMS } from 'constants/cards';

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

  const { breakpoint } = useBreakpoint(BREAKPOINTS, 'xs');

  // ELLIPSE
  const CARDS = useMemo(() => {
    const {
      width,
      center: {
        x: xCenter, y: yCenter,
      },
    } = container;

    const getRx = () => {
      switch (breakpoint) {
        case 'xs': {
          return width / 2;
        }
        default: {
          return 300;
        }
      }
    };

    const getRy = () => {
      switch (breakpoint) {
        case 'xs': {
          return 200;
        }
        default: {
          return 220;
        }
      }
    };

    const getAngle = (id: string, i: number) => {
      if (breakpoint === 'xs') {
        return ((CARD_TRANSFORMS[id].angle)) * ((Math.PI / 180) / 2) - (Math.PI * 0.25);
      }

      return ((i / CARDS_METADATA.length)) * 360 * ((Math.PI / 180) / 2) - (Math.PI * 0.25);
    };

    const getRotation = (id: string) => {
      if (breakpoint === 'xs') {
        return CARD_TRANSFORMS[id].rotation;
      }

      return (Math.random() * (30)) - 15;
    };

    return CARDS_METADATA.map((c, i) => {
      const { id } = c;
      const rx = getRx();
      const ry = getRy();
      const angle = getAngle(id, i);
      const t = Math.tan((angle));
      const x = xCenter + (rx * ((1 - t ** 2) / (1 + t ** 2)));
      const y = yCenter + (ry * ((2 * t) / (1 + t ** 2)));

      const rotation = getRotation(id);

      return {
        ...c,
        options: {
          x,
          y,
          rotation,
          container,
        },
      };
    });
  }, [container, breakpoint]);

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
      key="cards"
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
