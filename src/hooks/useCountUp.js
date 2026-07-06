import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 to `target` (ease-out cubic) the first time the element
 * holding the returned ref scrolls into view. Renders the final value
 * immediately under reduced motion or without IntersectionObserver.
 */
export default function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduced || !('IntersectionObserver' in window)) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return [ref, value];
}
