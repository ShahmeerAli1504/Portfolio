import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Download, Copy, Check, Menu, X, Calendar } from 'lucide-react';

const PERSONAL_DATA = {
  name: 'Shahmeer Ali',
  role: 'Full-Stack & Cloud Core Systems',
  email: 'shahmeerali1504@gmail.com',
  cvPath: '/ShahmeerAli_FullStackEngineer_CV.pdf',
  avatarPath: '/21I-0466.jpg',
};

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

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
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA Actions */}
        <div className="sp-actions-desktop">
          <button
            onClick={handleCopyEmail}
            className="sp-btn sp-btn-secondary"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="sp-icon-success" />
                <span className="sp-text-success">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Email</span>
              </>
            )}
          </button>

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
            <button
              onClick={() => {
                handleCopyEmail();
                setMenuOpen(false);
              }}
              className="sp-btn sp-btn-secondary sp-btn-full"
            >
              {copied ? (
                <span className="sp-text-success flex items-center gap-1">
                  <Check size={14} /> Copied!
                </span>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Email</span>
                </>
              )}
            </button>

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
