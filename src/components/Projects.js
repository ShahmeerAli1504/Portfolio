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
    details: 'A full-stack shopping platform with product browsing, cart management, secure checkout, and admin inventory control.'  },
  {
    title: 'Cafe Management System',
    desc: 'Secure admin system with inventory and sales tracking.',
    tech: 'ASP.NET, MySQL, HTML/CSS',
    details: 'Allows cafe admins to manage menu items, orders, stock levels, and track daily sales through graphs and reports.'
  },
  {
    title: 'Robot Simulation',
    desc: 'Simulates 50 processes with IPC and shared memory.',
    tech: 'C++, Operating Systems',
    details: 'Implements a robot process system where multiple agents communicate using pipes and shared memory to simulate complex workflows.'
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
    link:'https://github.com/ShahmeerAli1504/timetable-genetic-scheduler'
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
},
{
    title: 'Sudoku-Magic-AI-Solvers',
    desc: 'AI solvers for Sudoku and Magic Square puzzles',
    tech: 'Python, Backtracking, Heuristics, Genetic Algorithm',
    details: 'Includes a 9×9 Sudoku solver (Backtracking + MRV, Degree, LCV, AC-3) and a 3×3 Magic Square solver using a Genetic Algorithm; modular, well-commented code with random puzzle generation and support for multiple solution scenarios.',
    link: 'https://github.com/ShahmeerAli1504/sudoku-magic-ai-solvers'
},
{
    title: 'Graph-Ordering-Search-Algorithms',
    desc: 'Vertex ordering for Bayesian Network learning via search strategies',
    tech: 'Python, BFS, DFS, Uniform-Cost Search',
    details: 'Solves vertex ordering problem by minimizing total cost based on parent-set costs; implements BFS, DFS, UCS to evaluate best ordering, reads dataset for vertices and costs, compares search performance, outputs best ordering and cost.',
    link: 'https://github.com/ShahmeerAli1504/graph-ordering-search-algorithms'
},
{
    title: 'C++ Concurrency and Process Management Tasks',
    desc: 'C++ tasks exploring threading, synchronization, and multiprocessing',
    tech: 'C++17, POSIX Threads, Linux',
    details: 'Five tasks implemented: Round-Robin scheduler, concurrent banking transactions with synchronization, Dining Philosophers across multiple tables, multithreaded workplace simulation, multi-process threaded student data processing; designed for real-world system simulations.',
    link: 'https://github.com/ShahmeerAli1504/cpp-threading-multiprocessing-tasks'
},
{
    title: 'Linux C Process Programming Tasks',
    desc: 'C programs on process creation, IPC, file handling and system calls',
    tech: 'C, Linux system calls, fork/exec, IPC',
    details: 'Six tasks include: process hierarchy via fork(), file concatenation using child processes, nested fork with execvp(), env-var execve(), multi-process file encryption/decryption, and process-based merge sort—all demonstrating IPC and system-level programming.',
    link: 'https://github.com/ShahmeerAli1504/linux-c-process-tasks'
},
{
    title: 'bash-automation',
    desc: 'Bash scripts for automation tasks and user interaction handling',
    tech: 'Bash, Shell scripting',
    details: 'Solutions for four Linux shell scripting tasks: prime number checks with file append and timestamp, batch file processing with directory and grep operations, menu-driven file operations using case, and a safe remove script that moves files to a trash folder before deletion.',
    link: 'https://github.com/ShahmeerAli1504/bash-automation'
},
{
    title: 'N-Gram Language Modeling Approaches',
    desc: 'Roman Urdu n-gram models with perplexity evaluation',
    tech: 'Python, NLTK, NLP, n-gram modeling',
    details: 'Two implementations: Approach 1 builds unigram, bigram, trigram, and backward bigram models; Approach 2 adds bidirectional bigram, generates text, and compares models via perplexity (unigram 44.10, bigram 1.74, trigram 1.08).',
    link: 'https://github.com/ShahmeerAli1504/ngram-diary-generator'
},
{
    title: 'RomanUrdu-BPEdiary',
    desc: 'BPE tokenizer with sentence segmentation for Roman Urdu diaries',
    tech: 'Jupyter Notebook, BPE, NLP',
    details: 'Implements sentence segmentation and Byte Pair Encoding tokenization on Roman Urdu diary data; includes preprocessing (lowercasing, punctuation removal, optional normalization), building BPE vocab (~1000 subwords), handling unknown tokens, and evaluation via vocabulary reduction and OOV analysis.',
    link: 'https://github.com/ShahmeerAli1504/RomanUrdu-BPEdiary'
},
{
    title: 'Sever-Client-system-in-GO',
    desc: 'Distributed RPC-based matrix computation system in Go',
    tech: 'Go, RPC, distributed systems',
    details: 'Client-Coordinator architecture performing matrix addition, transpose, and multiplication via RPC; supports FCFS scheduling, load balancing, fault tolerance with task reassignment, and efficient distributed computation.',
    link: 'https://github.com/ShahmeerAli1504/Sever-Client-system-in-GO'
},{
    title: 'Raft-Based Key-Value Store',
    desc: 'Distributed key-value store using Raft consensus',
    tech: 'Go, Raft, distributed systems',
    details: 'Implements a basic distributed KV store supporting put/append/get with Raft-based leader election, log replication, fault tolerance, REST API and CLI interface; concurrency managed via goroutines and mutexes.',
    link: 'https://github.com/ShahmeerAli1504/Raft-Based-Key-Value-Store'
},
{
    title: 'Distributed-Ledger-With-Sharding',
    desc: 'Modular blockchain with sharding and hybrid consensus',
    tech: 'Go, Blockchain, PoW + BFT, cryptography',
    details: 'Blockchain system featuring sharding, hybrid PoW + BFT consensus with VRF leader election, Merkle forests, zero-knowledge proofs, MPC, homomorphic authentication, state pruning, Bloom filter verification—scalable, secure, and performant with benchmarks on latency and verification efficiency.',
    link: 'https://github.com/ShahmeerAli1504/distributed-ledger-with-sharding'
},
{
  title: "Portfolio Website for Abdullah",
  desc: "A sleek and responsive personal portfolio built for Abdullah, showcasing his work, skills, and achievements with a modern UI/UX design.",
  tech: "Next.js, React, Tailwind CSS, Vercel",
  details: "Developed a professional portfolio website for Abdullah using Next.js and Tailwind CSS. The site highlights his projects, skills, and experience with smooth navigation, responsive design, optimized performance and hosted on Vercel.",
  link: "https://github.com/ShahmeerAli1504/Friendproject"
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
