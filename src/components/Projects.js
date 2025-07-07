import React, { useState } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'LingoLearn',
    desc: 'An AR-based language learning app using Unity3D.',
    tech: 'Unity3D, C#, NLP',
    details: 'LingoLearn helps users learn languages via AR scenarios, daily lessons, and quizzes. Users interact with an AI assistant and take immersive tests.',
    videos: ['/media/app.mp4']
  },
  {
    title: 'Ecommerce Website',
    desc: 'A shopping platform for women’s clothing.',
    tech: 'MERN Stack',
    details: 'A full-stack shopping platform with product browsing, cart management, secure checkout, and admin inventory control.',
    images: ['/media/dummy3.png'],
    videos: ['/media/dummy2.mp4']
  },
  {
    title: 'Cafe Management System',
    desc: 'Secure admin system with inventory and sales tracking.',
    tech: 'ASP.NET, MySQL, HTML/CSS',
    details: 'Allows cafe admins to manage menu items, orders, stock levels, and track daily sales through graphs and reports.',
    images: ['/media/dummy4.png'],
    videos: ['/media/dummy3.mp4']
  },
  {
    title: 'Robot Simulation',
    desc: 'Simulates 50 processes with IPC and shared memory.',
    tech: 'C++, Operating Systems',
    details: 'Implements a robot process system where multiple agents communicate using pipes and shared memory to simulate complex workflows.',
    images: ['/media/dummy5.png'],
    videos: ['/media/dummy4.mp4']
  },
  {
    title: 'Brick Breaker Game',
    desc: 'Retro arcade game using 8086 Assembly.',
    tech: 'Assembly, DOSBox',
    details: 'Classic paddle-and-ball game built in low-level assembly with pixel-level collision detection and score tracking.',
    images: ['/media/dummy6.png'],
    videos: ['/media/dummy5.mp4']
  },
  {
    title: 'Timetable Optimization',
    desc: 'Auto-generates conflict-free schedules.',
    tech: 'Python',
    details: 'Generates optimized timetables using a backtracking algorithm ensuring no instructor or room conflicts across slots.',
    images: ['/media/dummy7.png'],
    videos: ['/media/dummy6.mp4']
  }
];

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const handleClose = () => setSelectedProject(null);

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="project-card fade-in"
            style={{ transitionDelay: `${i * 0.1}s` }}
            onClick={() => setSelectedProject(p)}
          >
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <small><b>Tech:</b> {p.tech}</small>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>×</button>
            <h2>{selectedProject.title}</h2>
            <p><b>Description:</b> {selectedProject.details}</p>
            <p><b>Tech Stack:</b> {selectedProject.tech}</p>

            <div className="modal-images">
              {selectedProject.images && selectedProject.images.map((img, idx) => (
                <img key={idx} src={img} alt={`screenshot ${idx + 1}`} />
              ))}
            </div>

            <div className="modal-videos">
              {selectedProject.videos && selectedProject.videos.map((vid, idx) => (
                <video key={idx} controls>
                  <source src={vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
