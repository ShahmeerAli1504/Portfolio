import React, { useEffect, useRef } from 'react';

/* Low-opacity particle network for the Contact section background.
   Particles drift slowly, link with thin lines when close, and shy away
   from the pointer. The rAF loop only runs while the canvas is on
   screen; disabled entirely under reduced motion. */
function Constellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || reduced) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    const LINK_DIST = 100;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const mouse = { x: -1e4, y: -1e4 };
    let particles = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;

    const color = (alpha) =>
      document.body.classList.contains('light')
        ? `rgba(14, 116, 144, ${alpha})`
        : `rgba(0, 212, 255, ${alpha})`;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(38, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Gentle repulsion from the pointer
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const mdSq = dx * dx + dy * dy;
        if (mdSq < 14400 && mdSq > 0.01) {
          const md = Math.sqrt(mdSq);
          p.x += (dx / md) * 0.5;
          p.y += (dy / md) * 0.5;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = color(0.5);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < LINK_DIST_SQ) {
            const d = Math.sqrt(dSq);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = color((1 - d / LINK_DIST) * 0.2);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (visible) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        raf = requestAnimationFrame(step);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}

export default Constellation;
