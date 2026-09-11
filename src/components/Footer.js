import React from 'react';
import './Footer.css';
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowUpIcon } from './Icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sp-footer">
      <div className="sp-footer-container">
        {/* Left: Compact Brand & Copyright */}
        <div className="sp-footer-left">
          <span className="sp-footer-badge">SA</span>
          <span className="sp-footer-name">Shahmeer Ali</span>
          <span className="sp-footer-dot">•</span>
          <span className="sp-footer-copy">© {currentYear} All rights reserved</span>
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="sp-footer-right">
          <div className="sp-footer-socials">
            <a
              href="https://github.com/ShahmeerAli1504"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <GitHubIcon width={18} height={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/shahmeer-ali1504/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <LinkedInIcon width={18} height={18} />
            </a>
            <a
              href="mailto:shahmeerali1504@gmail.com"
              aria-label="Send email"
              title="Email"
            >
              <MailIcon width={18} height={18} />
            </a>
          </div>

          <a href="#home" className="sp-footer-top-btn" aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUpIcon width={14} height={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
