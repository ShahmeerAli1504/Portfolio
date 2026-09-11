import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Download, Menu, X, Calendar } from 'lucide-react';

const PERSONAL_DATA = {
  name: 'Shahmeer Ali',
  role: 'Full-Stack & Cloud Core Systems',
  email: 'shahmeerali1504@gmail.com',
  cvPath: '/ShahmeerAli_FullStackEngineer_CV.pdf',
  avatarPath: '/21I-0466.jpg',
};

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'bento', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Edge case: Top of page
      if (scrollY < 100) {
        setActiveId('home');
        return;
      }

      // Edge case: Bottom of page
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollY >= docHeight - 60) {
        setActiveId('contact');
        return;
      }

      // Find section currently active around top-third (35%) of viewport
      const targetY = windowHeight * 0.35;
      let currentId = '';

      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom > 100) {
            currentId = id;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sp-navbar ${scrolled ? 'sp-navbar-scrolled' : ''}`}>
      <div className="sp-navbar-container">
        {/* Brand Area with User Picture */}
        <a href="#home" className="sp-brand" onClick={() => setMenuOpen(false)}>
          <div className="sp-avatar-wrapper">
            <img
              src={PERSONAL_DATA.avatarPath}
              alt={PERSONAL_DATA.name}
              className="sp-avatar-img"
            />
            <span className="sp-avatar-online-dot" />
          </div>
          <div className="sp-brand-text">
            <div className="sp-brand-header">
              <span className="sp-brand-name">{PERSONAL_DATA.name}</span>
              <span className="sp-sys-badge">
                <span className="sp-sys-dot-ping" />
                <span className="sp-sys-dot" />
                SYS_ONLINE
              </span>
            </div>
            <span className="sp-brand-role">{PERSONAL_DATA.role}</span>
          </div>
        </a>

        {/* Center Pill Navigation */}
        <nav className="sp-nav-desktop" aria-label="Primary">
          <ul className="sp-nav-pill">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`sp-nav-link ${activeId === id ? 'active' : ''}`}
                  onClick={() => setActiveId(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA Actions */}
        <div className="sp-actions-desktop">
          <a
            href={PERSONAL_DATA.cvPath}
            download="ShahmeerAli_FullStackEngineer_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sp-btn sp-btn-secondary"
          >
            <Download size={14} className="sp-icon-cyan" />
            <span>Resume PDF</span>
          </a>

          <a href="#contact" className="sp-btn sp-btn-primary">
            <Calendar size={14} />
            <span>Consultation</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="sp-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="sp-mobile-drawer">
          <ul className="sp-mobile-links">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="sp-mobile-actions">
            <a
              href={PERSONAL_DATA.cvPath}
              download="ShahmeerAli_FullStackEngineer_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="sp-btn sp-btn-secondary sp-btn-full"
            >
              <Download size={14} className="sp-icon-cyan" />
              <span>Download CV (PDF)</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="sp-btn sp-btn-primary sp-btn-full"
            >
              <Calendar size={14} />
              <span>Schedule Consultation</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
