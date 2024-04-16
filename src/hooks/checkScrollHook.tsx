import { useState, useEffect } from 'react';

export function useCheckScrollHook(scroll: number): boolean {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scroll) {
        setHasScroll(true);
      }
      if (window.scrollY < scroll) {
        setHasScroll(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return hasScroll;
}
