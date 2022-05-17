import {
  FC, useEffect, useRef,
} from 'react';

import { useScrollDirection } from 'hooks/scroll';
import useWindowSize from 'hooks/window';

interface ContentScrollerProps {
  onScrollDirectionChange?: (direction: 'up' | 'down') => void;
}

export const ContentScroller: FC<ContentScrollerProps> = ({
  onScrollDirectionChange,
}: ContentScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { height } = useWindowSize();

  const SCROLL_DIRECTION = useScrollDirection({
    container: scrollRef.current,
  });

  useEffect(() => {
    setTimeout(() => {
      const scroller = scrollRef.current;
      const content = contentRef.current;

      if (scroller && content) {
        content.style.height = `${height * 2}px`;
        scroller.scrollTop = height / 2;
      }
    }, 50);
  }, [height]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onScrollDirectionChange(SCROLL_DIRECTION);
  }, [onScrollDirectionChange, SCROLL_DIRECTION]);

  return (
    <div
      ref={scrollRef}
      className="absolute w-[200vw] z-50 overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        height,
      }}
    >
      <div
        ref={contentRef}
        className="h-[100vh]"
      />
    </div>
  );
};

export default ContentScroller;
