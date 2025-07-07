import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <nav className="navbar">
      <h1 className="logo">Shahmeer Ali</h1>
      <ul className="nav-links">
        {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
          <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
        ))}
      </ul>
      <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;
