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

/* Static display for name and role */
function useScramble(ref, finalText) {
  useEffect(() => {
    if (ref.current) ref.current.textContent = finalText;
  }, [ref, finalText]);
}

function useTypewriter(ref, words) {
  useEffect(() => {
    if (ref.current) ref.current.textContent = words[0];
  }, [ref, words]);
}

function useParallax() {
  // Disabled mouse parallax to prevent continuous rendering recalculations on mousemove
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
