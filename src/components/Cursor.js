import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, .skill-chip';

/* Custom cursor: a cyan dot that tracks the pointer 1:1 plus a trailing
   ring that lerps behind it. Over interactive elements the ring fills
   white at 40px with mix-blend-mode: difference. Only activates on fine
   pointers with motion allowed — touch devices keep the native cursor. */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.body.classList.add('has-cursor');

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let visible = false;

    // The dot is written directly in the mousemove handler (zero added
    // latency); only the trailing ring runs through this lerp loop, and
    // the loop parks itself once the ring has caught up.
    const loop = () => {
      rx += (x - rx) * 0.32;
      ry += (y - ry) * 0.32;
      if (Math.abs(x - rx) < 0.2 && Math.abs(y - ry) < 0.2) {
        rx = x;
        ry = y;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        raf = 0;
        return;
      }
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate(${x}px, ${y}px)`;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) ring.classList.add('is-hover');
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) ring.classList.remove('is-hover');
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </div>
  );
}

export default Cursor;
