import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Navbar.css';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './Icons';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true;
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Scroll state: glass background + reading progress (direct DOM transform for 60fps scroll)
  useEffect(() => {
    let ticking = false;
    let isScrolled = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const nextScrolled = y > 12;
        if (nextScrolled !== isScrolled) {
          isScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(y / max, 1) : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section in view
  useEffect(() => {
    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-mark">SA</span>
          <span className="logo-name">Shahmeer Ali</span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'active' : ''}
                  aria-current={activeId === id ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className={`toggle-icons ${darkMode ? 'is-dark' : 'is-light'}`}>
              <SunIcon className="toggle-sun" />
              <MoonIcon className="toggle-moon" />
            </span>
          </button>

          <button
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="scroll-progress" ref={progressRef} />

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {LINKS.map(({ id, label }, i) => (
            <li key={id} style={{ '--i': i }}>
              <a
                href={`#${id}`}
                className={activeId === id ? 'active' : ''}
                onClick={closeMenu}
              >
                <span className="mobile-menu-index">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
