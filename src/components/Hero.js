import React, { useEffect, useState } from 'react';
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

function useTypewriter(words) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0]);
      return undefined;
    }

    const current = words[wordIndex % words.length];
    let delay = deleting ? 40 : 80;
    if (!deleting && text === current) delay = 2200;
    else if (deleting && text === '') delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, reducedMotion]);

  return text;
}

function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-badge reveal">
            <span className="hero-badge-dot" />
            Open to opportunities
          </span>

          <h1 className="hero-title reveal" style={{ '--reveal-delay': '80ms' }}>
            Hi, I'm <span className="hero-name">Shahmeer Ali</span>
          </h1>

          <p className="hero-role reveal" style={{ '--reveal-delay': '160ms' }} aria-label="Software Engineer">
            <span className="hero-role-text">{role}</span>
            <span className="hero-caret" aria-hidden="true" />
          </p>

          <p className="hero-desc reveal" style={{ '--reveal-delay': '240ms' }}>
            Computer Science graduate from FAST NUCES building for the web,
            cloud core networks, and distributed systems with a soft spot
            for AR and blockchain.
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

        <div className="hero-visual reveal reveal-scale" style={{ '--reveal-delay': '200ms' }}>
          <div className="hero-portrait">
            <img src="/Passportsize.png" alt="Shahmeer Ali" width="320" height="320" />
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
