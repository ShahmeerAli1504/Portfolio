import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

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

  // Particles initialization
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

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
      <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble", // you can change to "grab" or "bubble"
        },
        onClick: {
          enable: true,
          mode: "bubble", // you can change to "remove", "repulse", or "bubble"
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        grab: {
          distance: 200,
          links: {
            opacity: 0.5,
          },
        },
        bubble: {
          distance: 200,
          size: 10,
          duration: 2,
          opacity: 0.8,
        },
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }}
/>

      
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
