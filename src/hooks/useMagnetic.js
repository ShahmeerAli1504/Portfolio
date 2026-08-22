import { useEffect } from 'react';

/**
 * Magnetic hover: elements matching `selector` are gently pulled toward
 * the pointer (capped at `max` px). Delegated on document so elements
 * mounted later (filters, show-more) work automatically. The pull rides
 * the existing CSS `transform` transition on the element. Disabled for
 * coarse pointers and reduced motion. Call once at the app root.
 */
export default function useMagnetic(selector = '.btn', strength = 0.25, max = 10) {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let el = null;
    let rect = null;
    let raf = 0;

    const reset = (target) => {
      if (target) target.style.transform = '';
    };

    const onMove = (e) => {
      const t = e.target.closest ? e.target.closest(selector) : null;
      if (t !== el) {
        reset(el);
        el = t;
        rect = el ? el.getBoundingClientRect() : null;
      }
      if (!el || !rect) return;

      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      const mx = Math.max(-max, Math.min(max, dx));
      const my = Math.max(-max, Math.min(max, dy));

      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (el) el.style.transform = `translate(${mx}px, ${my}px)`;
          raf = 0;
        });
      }
    };

    const onLeaveDoc = () => {
      reset(el);
      el = null;
      rect = null;
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveDoc);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      if (raf) cancelAnimationFrame(raf);
      reset(el);
    };
  }, [selector, strength, max]);
}
