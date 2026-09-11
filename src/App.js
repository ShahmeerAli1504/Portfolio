import React, { useEffect } from 'react';
import './App.css';

import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
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
    document.title = 'Shahmeer Ali | Full-Stack & Systems Engineer';
    const saved = localStorage.getItem('theme');
    document.body.classList.toggle('light', saved === 'light');
    document.body.classList.toggle('dark', saved !== 'light');
  }, []);

  useReveal([]);
  useMagnetic('.sp-btn, .btn');
  useScrollSkew(1);

  return (
    <div className="App">
      <Background />

      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
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
