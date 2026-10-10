import { useEffect, useState } from 'react';

/**
 * Shared motion timings tuned for mobile (snappy, not sluggish).
 * Desktop can breathe a bit more; reduced-motion users get instant reveals.
 */
export function useMotionPrefs() {
  const [prefs, setPrefs] = useState({
    isMobile: false,
    reduceMotion: false,
    duration: 0.42,
    stagger: 0.07,
    y: 16,
  });

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      const isMobile = mobileMq.matches;
      const reduceMotion = reduceMq.matches;

      setPrefs({
        isMobile,
        reduceMotion,
        duration: reduceMotion ? 0 : isMobile ? 0.32 : 0.45,
        stagger: reduceMotion ? 0 : isMobile ? 0.045 : 0.07,
        y: reduceMotion ? 0 : isMobile ? 12 : 18,
      });
    };

    apply();
    mobileMq.addEventListener('change', apply);
    reduceMq.addEventListener('change', apply);
    return () => {
      mobileMq.removeEventListener('change', apply);
      reduceMq.removeEventListener('change', apply);
    };
  }, []);

  return prefs;
}
