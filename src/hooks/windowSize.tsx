import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | null;
  height: number | null;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: null, height: null });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
