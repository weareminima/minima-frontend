import {
  useState, useCallback, useEffect, useRef, useMemo, RefObject, createContext, useContext,
} from 'react';

import { useDebouncedCallback } from 'use-debounce';

import useTimeout from 'hooks/timeout';

import { ScrollContextProps, ScrollProps, ScrollProviderProps } from './types';

const ScrollContext = createContext<ScrollContextProps>({
  update: (scroll: ScrollProps) => { console.info(scroll); },
  scroll: {
    scrollX: 0,
    scrollY: 0,
  },
});

export function ScrollProvider({
  children,
}: ScrollProviderProps) {
  const [scroll, setScroll] = useState<ScrollProps>({
    scrollX: 0,
    scrollY: 0,
  });

  const update = useCallback((s: ScrollProps) => {
    setScroll(s);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        update,
        scroll,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

// SCROLL
export function useScroll() {
  const ctx = useContext(ScrollContext);

  if (!ctx) {
    throw Error(
      'The `useToasts` hook must be called from a descendent of the `ToastProvider`.',
    );
  }

  return {
    scroll: ctx.scroll,
    update: ctx.update,
  };
}

// SCROLL DIRECTION
const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

export function useScrollDirection({
  container = null,
  thresholdPixels = 64,
} = {}) {
  const [initialized, setInitialized] = useState(false);
  const [scrollDir, setScrollDir] = useState(null);

  useTimeout(() => {
    setInitialized(true);
  }, 500);

  useEffect(
    () => {
      const threshold = thresholdPixels || 0;
      let lastScrollY = container ? container.scrollTop : window.pageYOffset;
      let ticking = false;

      const updateScrollDir = () => {
        const scrollY = container ? container.scrollTop : window.pageYOffset;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          // We haven't exceeded the threshold
          ticking = false;
          return;
        }

        setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      };

      if (initialized) {
        if (container) {
          container.addEventListener('scroll', onScroll);
        } else {
          window.addEventListener('scroll', onScroll);
        }
      }

      return () => {
        if (container) {
          container.removeEventListener('scroll', onScroll);
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      };
    },
    [initialized, container, thresholdPixels],
  );

  return scrollDir;
}

// SCROLL DEBOUNCE BOTTOM
export function useTopBottomScrollListener<T extends HTMLDivElement>(
  enabled: boolean,
  onTop: () => void,
  onBottom: () => void,
  options?: {
    offset?: number;
    debounce?: number;
    debounceOptions?: Record<string, any>;
    triggerOnNoScroll?: boolean;
  },
): RefObject<T> {
  const {
    offset, triggerOnNoScroll, debounce, debounceOptions,
  } = useMemo(
    () => ({
      offset: options?.offset ?? 0,
      debounce: options?.debounce ?? 200,
      debounceOptions: options?.debounceOptions ?? { leading: true },
      triggerOnNoScroll: options?.triggerOnNoScroll ?? false,
    }),
    [options?.offset, options?.debounce, options?.debounceOptions, options?.triggerOnNoScroll],
  );

  const debouncedOnTop = useDebouncedCallback(onTop, debounce, debounceOptions);
  const debouncedOnBottom = useDebouncedCallback(onBottom, debounce, debounceOptions);
  const containerRef = useRef<T>(null);
  const handleOnScroll = useCallback(() => {
    if (containerRef.current != null) {
      const scrollNode: T = containerRef.current;
      const scrollContainerTopPosition = scrollNode.scrollTop;
      const topPosition = 0;
      // Bottom
      const scrollContainerBottomPosition = Math.round(
        scrollNode.scrollTop + scrollNode.clientHeight,
      );
      const bottomPosition = Math.round(scrollNode.scrollHeight - offset);

      if (topPosition === scrollContainerTopPosition && enabled) {
        debouncedOnTop();
      }

      if (bottomPosition <= scrollContainerBottomPosition && enabled) {
        debouncedOnBottom();
      }
    } else {
      const scrollNode: Element = document.scrollingElement || document.documentElement;
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight);
      const bottomPosition = Math.round(scrollNode.scrollHeight - offset);

      if (bottomPosition <= scrollContainerBottomPosition && enabled) {
        debouncedOnBottom();
      }
    }
    // ref dependency needed for the tests, doesn't matter for normal execution
  }, [offset, onBottom, containerRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect((): (() => void) => {
    const ref: T | null = containerRef.current;
    if (ref != null) {
      ref.addEventListener('scroll', handleOnScroll);
    } else {
      window.addEventListener('scroll', handleOnScroll);
    }

    if (triggerOnNoScroll) {
      handleOnScroll();
    }

    return () => {
      if (ref != null) {
        ref.removeEventListener('scroll', handleOnScroll);
      } else {
        window.removeEventListener('scroll', handleOnScroll);
      }
    };
  }, [handleOnScroll, debounce]); // eslint-disable-line react-hooks/exhaustive-deps

  return containerRef;
}
