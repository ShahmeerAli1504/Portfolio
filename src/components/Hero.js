import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="profile-picture">
          <img src="/Passportsize.png" alt="Shahmeer Ali" />
        </div>
        <h1>Hi, I'm Shahmeer Ali</h1>
        <p>Frontend Developer | MERN Stack | AR & Blockchain Enthusiast</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn">View Projects</a>
          <a href="/Shahmeer_CV.pdf" download className="btn-outline">Download CV</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
