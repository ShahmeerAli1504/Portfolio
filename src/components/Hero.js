import React, { useEffect, useRef } from 'react';
import './Hero.css';
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  DownloadIcon,
  ChevronDownIcon,
  MapPinIcon,
} from './Icons';

const ROLES = [
  'Software Engineer',
  'JavaScript Developer',
  'Full Stack Developer',
  'MERN Stack Developer',
  'AR & Blockchain Enthusiast',
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*<>/';

/* Decode effect: characters randomize, then resolve left-to-right. */
function useScramble(ref, finalText, duration = 1200, delay = 250) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.textContent = finalText;
      return undefined;
    }

    let raf = 0;
    let start = 0;

    const randomize = (from) => {
      let out = finalText.slice(0, from);
      for (let i = from; i < finalText.length; i += 1) {
        out +=
          finalText[i] === ' '
            ? ' '
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      return out;
    };

    const timer = setTimeout(() => {
      el.textContent = randomize(0);
      const tick = (now) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        const resolved = Math.floor(finalText.length * p);
        el.textContent = randomize(resolved);
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = finalText;
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [ref, finalText, duration, delay]);
}

function useTypewriter(ref, words) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.textContent = words[0];
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = words[wordIndex % words.length];
      if (deleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }
      el.textContent = current.slice(0, charIndex);

      let delay = deleting ? 45 : 80;
      if (!deleting && charIndex === current.length) {
        delay = wordIndex === 0 ? 4000 : 2200;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      timer = setTimeout(tick, delay);
    };

    tick();
    return () => clearTimeout(timer);
  }, [ref, words]);
}

/* Mouse parallax: writes normalized pointer coords to CSS vars on the
   visual wrapper; the portrait and mesh read them in opposite signs. */
function useParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !fine || reduced) return undefined;

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty('--px', nx.toFixed(3));
        el.style.setProperty('--py', ny.toFixed(3));
        raf = 0;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

function Hero() {
  const roleRef = useRef(null);
  const nameRef = useRef(null);
  const visualRef = useRef(null);

  useTypewriter(roleRef, ROLES);
  useScramble(nameRef, 'Shahmeer Ali');
  useParallax(visualRef);

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <a href="#contact" className="hero-badge reveal">
            <span className="hero-badge-dot" />
            Open to opportunities
          </a>

          <h1 className="hero-title reveal" style={{ '--reveal-delay': '80ms' }}>
            Hi, I'm{' '}
            {/* The static name reserves layout space (visibility:hidden);
                the scramble animates in an absolute overlay so the
                randomized glyph widths never reflow the page. */}
            <span className="hero-name">
              <span className="sr-only">Shahmeer Ali</span>
              <span className="hero-name-size" aria-hidden="true">
                Shahmeer Ali
              </span>
              <span className="hero-name-anim" aria-hidden="true" ref={nameRef}>
                Shahmeer Ali
              </span>
            </span>
          </h1>

          <p className="hero-role reveal" style={{ '--reveal-delay': '160ms' }}>
            <span className="sr-only">Software Engineer</span>
            <span className="hero-role-text" aria-hidden="true" ref={roleRef}>
              Software Engineer
            </span>
            <span className="hero-caret" aria-hidden="true" />
          </p>

          <p className="hero-desc reveal" style={{ '--reveal-delay': '240ms' }}>
            Computer Science graduate from FAST NUCES building for the web,{' '}
            <span className="glow-word">cloud core networks</span>, and{' '}
            <span className="glow-word">distributed systems</span> with a soft
            spot for <span className="glow-word">AR</span> and{' '}
            <span className="glow-word">blockchain</span>.
          </p>

          <div className="hero-buttons reveal" style={{ '--reveal-delay': '320ms' }}>
            <a href="#projects" className="btn btn-primary">
              View my work
            </a>
            <a href="/Shahmeer_CV.pdf" download className="btn btn-ghost">
              <DownloadIcon width={18} height={18} />
              Download CV
            </a>
          </div>

          <div className="hero-meta reveal" style={{ '--reveal-delay': '400ms' }}>
            <span className="hero-location">
              <MapPinIcon width={16} height={16} />
              Islamabad, Pakistan
            </span>
            <span className="hero-meta-divider" />
            <div className="hero-socials">
              <a
                href="https://github.com/ShahmeerAli1504"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/shahmeer-ali1504/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon />
              </a>
              <a href="mailto:shahmeerali1504@gmail.com" aria-label="Send email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>

        <div
          className="hero-visual reveal reveal-scale"
          style={{ '--reveal-delay': '200ms' }}
          ref={visualRef}
        >
          <div className="hero-mesh" aria-hidden="true">
            <span className="hero-blob hero-blob-a" />
            <span className="hero-blob hero-blob-b" />
            <span className="hero-blob hero-blob-c" />
          </div>
          <div className="hero-portrait">
            <picture>
              <source srcSet="/Passportsize.webp" type="image/webp" />
              <img src="/Passportsize.png" alt="Shahmeer Ali" width="320" height="320" />
            </picture>
          </div>
          <div className="hero-orbit" aria-hidden="true" />
        </div>
      </div>

      <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About section">
        <ChevronDownIcon />
      </a>
    </section>
  );
}

export default Hero;
