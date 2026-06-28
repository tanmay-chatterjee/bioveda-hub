'use client';

import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handler = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;

      if (Math.abs(delta) > threshold) {
        setDirection(delta > 0 ? 'down' : 'up');
        lastScrollY = scrollY;
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return direction;
}
