import React, { useEffect, useRef } from 'react';
import './Background.css';

/* Site-wide ambient background: aurora ribbon, dot matrix, meteor
   streaks, film grain, and a cursor-following spotlight. Everything is
   fixed, pointer-events: none, and animated via transform/opacity only. */
function Background() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return undefined;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
        el.style.opacity = '1';
        raf = 0;
      });
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-horizon" />
      <div className="bg-aurora bg-aurora-a" />
      <div className="bg-aurora bg-aurora-b" />
      <div className="bg-dots" />
      <div className="bg-meteors">
        <span className="bg-meteor" />
        <span className="bg-meteor" />
        <span className="bg-meteor" />
      </div>
      <div className="bg-spotlight" ref={glowRef} />
      <div className="bg-grain" />
    </div>
  );
}

export default Background;
