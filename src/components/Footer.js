import React from 'react';
import './Footer.css';
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowUpIcon } from './Icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-name">Shahmeer Ali</span>
          <span className="footer-note">
            © {new Date().getFullYear()} · Built with React
          </span>
        </div>

        <div className="footer-socials">
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

        <a href="#home" className="footer-top" aria-label="Back to top">
          <ArrowUpIcon width={16} height={16} />
          Back to top
        </a>
      </div>
    </footer>
  );
}

export default Footer;
