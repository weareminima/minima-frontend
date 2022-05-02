import { useEffect, useRef } from 'react';

function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return null;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

export default useTimeout;
