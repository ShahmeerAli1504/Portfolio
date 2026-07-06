import { useEffect } from 'react';

/**
 * Scroll-velocity skew: containers marked with `data-skew` tilt up to
 * ~1deg with scroll speed and ease back to rest via lerp. The rAF loop
 * only runs while scrolling; transforms are cleared at rest so they
 * can't interfere with anything else. Disabled for coarse pointers and
 * reduced motion. Call once at the app root.
 */
export default function useScrollSkew(maxDeg = 1) {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let lastY = window.scrollY;
    let skew = 0;
    let raf = 0;
    let els = [];

    const loop = () => {
      const y = window.scrollY;
      const vel = y - lastY;
      lastY = y;

      const target = Math.max(-maxDeg, Math.min(maxDeg, vel * 0.045));
      skew += (target - skew) * 0.1;

      if (Math.abs(skew) < 0.02 && vel === 0) {
        els.forEach((el) => {
          el.style.transform = '';
        });
        skew = 0;
        raf = 0;
        return;
      }

      els.forEach((el) => {
        el.style.transform = `skewY(${skew.toFixed(3)}deg)`;
      });
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (!raf) {
        els = Array.from(document.querySelectorAll('[data-skew]'));
        lastY = window.scrollY;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.style.transform = '';
      });
    };
  }, [maxDeg]);
}
