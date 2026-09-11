import React, { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';

import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import useReveal from './hooks/useReveal';
import useMagnetic from './hooks/useMagnetic';
import useScrollSkew from './hooks/useScrollSkew';

// Code-split heavy sections using React.lazy to reduce initial JS bundle size
const BentoGrid = lazy(() => import('./components/BentoGrid'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skill'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    document.title = 'Shahmeer Ali | Full-Stack & AI Systems Engineer';
    const saved = localStorage.getItem('theme');
    document.body.classList.toggle('light', saved === 'light');
    document.body.classList.toggle('dark', saved !== 'light');

    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useReveal([]);
  useMagnetic('.sp-btn, .btn');
  useScrollSkew(1);

  // Check if current route is valid (only '/' or empty path)
  const isNotFound = pathname !== '/' && pathname !== '';

  if (isNotFound) {
    return (
      <div className="App">
        <Background />
        <Suspense fallback={<div className="sp-suspense-fallback"><div className="sp-suspense-spinner" /></div>}>
          <NotFound />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="App">
      <Background />
      <Navbar />

      <main>
        {/* Above-the-fold Hero loads eagerly */}
        <Hero />

        {/* Heavy below-the-fold sections load lazily */}
        <Suspense fallback={<div className="sp-suspense-fallback"><div className="sp-suspense-spinner" /></div>}>
          <BentoGrid />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
