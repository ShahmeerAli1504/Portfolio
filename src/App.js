import React, { useEffect, useState } from 'react';
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
import Loader from './components/Loader';
import useReveal from './hooks/useReveal';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Shahmeer Ali | Software Engineer';
    // Apply the saved theme before the Navbar mounts so the loader matches
    const saved = localStorage.getItem('theme');
    document.body.className = saved === 'light' ? 'light' : 'dark';
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useReveal([loading]);

  if (loading) {
    return <Loader />;
  }

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
