import React, { useEffect, useState } from 'react';
import './App.css';
// Vercel Analytics
import { inject } from '@vercel/analytics';
inject(); // Initialize Vercel Analytics
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skill';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set browser tab title
    document.title = 'Shahmeer Ali | Portfolio';
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Optional
          }
        });
      }, { threshold: 0.1 });

      const hiddenElements = document.querySelectorAll('.fade-in');
      hiddenElements.forEach((el) => observer.observe(el));

      return () => {
        hiddenElements.forEach((el) => observer.unobserve(el));
      };
    }
  }, [loading]);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
