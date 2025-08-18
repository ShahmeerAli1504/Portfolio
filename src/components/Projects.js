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
    title: 'Text-to-Image Microservice',
    desc: 'gRPC-based Image Generator',
    tech: 'Python, gRPC, NLP',
    details: 'Developed a microservice that converts text prompts into context-aware images using open-source models. Deployed with GitHub Actions and showcased through Streamlit and Postman.',
    link: 'https://github.com/dotyahya/text2image-ai-agent'
  },
  {
    title: 'Timetable Optimization',
    desc: 'Auto-generates conflict-free schedules.',
    tech: 'Python',
    details: 'Generates optimized timetables using a backtracking algorithm ensuring no instructor or room conflicts across slots.',
    images: ['/media/dummy7.png'],
    videos: ['/media/dummy6.mp4']
  },
  {
  title: 'Homeschooling Resources Platform',
  desc: 'A platform providing categorized homeschooling content.',
  tech: 'HTML, CSS',
  details: 'Developed a responsive web platform to provide homeschooling resources to parents, teachers, and students. Includes an Admin Dashboard for uploading YouTube videos, PDFs, and social media links, along with a public-facing landing page with filtering features.',
  images: [
    '/media/login.png',
    '/media/home.png',
    '/media/contact.png',
    '/media/about.png',
    '/media/admin1.png',
    '/media/admin2.png'
  ],
  link: 'https://github.com/ShahmeerAli1504/Homeschooling-Resources-Platform'
}


];

const ITEMS_PER_PAGE = 6;

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState(0);

  const handleClose = () => setSelectedProject(null);

  const paginatedProjects = projects.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const hasNextPage = (page + 1) * ITEMS_PER_PAGE < projects.length;
  const hasPrevPage = page > 0;

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>

      <div className="project-grid">
        {paginatedProjects.map((p, i) => (
          <div
            key={p.title}
            className="project-card fade-in show"
            style={{ transitionDelay: `${i * 0.1}s` }}
            onClick={() => setSelectedProject(p)}
          >
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <small><b>Tech:</b> {p.tech}</small>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        {hasPrevPage && (
          <button onClick={() => setPage(page - 1)} className="pagination-btn">← Previous</button>
        )}
        {hasNextPage && (
          <button onClick={() => setPage(page + 1)} className="pagination-btn">Next →</button>
        )}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>×</button>
            <h2>{selectedProject.title}</h2>
            <p><b>Description:</b> {selectedProject.details}</p>
            <p><b>Tech Stack:</b> {selectedProject.tech}</p>

            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="github-btn">View on GitHub</button>
              </a>
            )}

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
