import React, { useEffect } from 'react';
import './App.css';

import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skill';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useReveal from './hooks/useReveal';
import useMagnetic from './hooks/useMagnetic';
import useScrollSkew from './hooks/useScrollSkew';

function App() {
  useEffect(() => {
    document.title = 'Shahmeer Ali | Software Engineer';
    // Apply the saved theme before the Navbar mounts.
    // classList (not className=) so other body classes survive.
    const saved = localStorage.getItem('theme');
    document.body.classList.toggle('light', saved === 'light');
    document.body.classList.toggle('dark', saved !== 'light');
  }, []);

  // No blocking loader — the page paints immediately and the staggered
  // navbar/hero entrance provides the load choreography (better LCP).
  useReveal([]);
  useMagnetic('.btn');
  useScrollSkew(1);

  return (
    <div className="App">
      <Background />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
