import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import Card from './card';
import { CARDS as CARDS_METADATA } from './constants';

interface FakeCardsProps {}

export const FakeCards: FC<FakeCardsProps> = () => {
  const [container, setContainer] = useState({
    center: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0,
  });

  const CARDS = useMemo(() => {
    return CARDS_METADATA.map((c) => {
      return {
        ...c,
        options: {
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

export default FakeCards;
