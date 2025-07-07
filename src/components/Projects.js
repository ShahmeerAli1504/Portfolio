import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'LingoLearn',
    desc: 'An AR-based language learning app using Unity3D. Integrates NLP for interactive lessons and immersive assessments.',
    tech: 'Unity3D, C#, NLP'
  },
  {
    title: 'Ecommerce Website',
    desc: 'A shopping platform for women’s clothing. Includes cart, product filtering, and secure checkout.',
    tech: 'MERN Stack'
  },
  {
    title: 'Cafe Management System',
    desc: 'Secure admin system with inventory, order management, and sales tracking.',
    tech: 'ASP.NET, MySQL, HTML/CSS'
  },
  {
    title: 'Robot Simulation',
    desc: 'Simulates 50 processes using threads, shared memory, and inter-process communication.',
    tech: 'C++, Operating Systems'
  },
  {
    title: 'Brick Breaker Game',
    desc: 'Retro arcade game built using 8086 Assembly and DOSBox with paddle movement and collision detection.',
    tech: 'Assembly, DOSBox'
  },
  {
    title: 'Timetable Optimization',
    desc: 'Auto-generates conflict-free university schedules using an optimization algorithm.',
    tech: 'Python'
  }
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((p, i) => (
          <div key={p.title} className="project-card fade-in" style={{ transitionDelay: `${i * 0.1}s` }}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <small><b>Tech:</b> {p.tech}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
