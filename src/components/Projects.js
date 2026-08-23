import React, { useState, useEffect, useCallback } from 'react';
import './Projects.css';
import useCountUp from '../hooks/useCountUp';
import {
  GitHubIcon,
  CloseIcon,
  ExternalLinkIcon,
  CodeIcon,
  ServerIcon,
  TerminalIcon,
  SparklesIcon,
} from './Icons';

const projects = [
  {
    title: 'Pure Haven Studio',
    desc: 'Sanctuary massage therapy studio client website in South Reno.',
    tech: 'Next.js, React, Tailwind CSS, Vercel',
    category: 'Web',
    cmd: 'npx next dev',
    featured: true,
    details:
      'Designed and built a full client website for Pure Haven Massage Therapy in South Reno, NV. Features custom therapeutic service showcases (Swedish, Deep Tissue, Hot Stone, Cupping), therapist bio, clean responsive studio gallery, Yelp client review integrations, clear studio policies, and direct MassageBook online appointment booking.',
    link: 'https://www.purehaven.studio/',
  },
  {
    title: 'Potluck Food Truck',
    desc: "Client Website — Reno's premier Asian Fusion food truck platform.",
    tech: 'Next.js, React, Tailwind CSS, Vercel',
    category: 'Web',
    cmd: 'npx next dev',
    featured: true,
    details:
      "Developed an interactive client web app for Potluck Food Truck in Reno, Nevada. Highlights signature street food creations (Cheeseburger Wonton Tacos, Elote Chicken Fries, Pan-Seared Potstickers), real-time searchable/filterable menu, weekly location schedules, event catering booking workflows, and responsive dark-mode branding.",
    link: 'https://potluck-food-truck.vercel.app/',
  },
  {
    title: 'ActraGen — AI Platform',
    desc: 'Multi-tenant AI platform for custom tools, workflows, and RAG-powered chat.',
    tech: 'Next.js, React, TypeScript, MongoDB, OpenAI',
    category: 'AR & AI',
    cmd: 'npx next dev',
    featured: true,
    details:
      'Built during my time at Dafinitiq AI. ActraGen lets organizations create custom AI tools with dynamic prompts, chain them into automated workflows, and run persona-based assistants (analyst, consultant, CMO and more) with bilingual English/Arabic RTL support. Includes a secure RAG subsystem: PDF ingestion with OCR, page-aware chunking, embeddings, MongoDB Atlas Vector Search, and hybrid retrieval over internal knowledge plus whitelisted external sources — all serving source-cited answers. Implemented role-based auth (OTP, email verification, JWT/NextAuth), multi-tenant isolation with subscriptions and usage tracking, admin dashboards with audit logging and analytics, and S3-backed storage, using OpenAI for tool generation and Gemini for embeddings.',
  },
  {
    title: 'RoDrive — Ride-Hailing Backend',
    desc: 'Mobility backend: dispatch, payments, subscriptions, and rentals.',
    tech: 'Node.js, Express, MySQL, CakePHP, AWS',
    category: 'Web',
    cmd: 'node server.js',
    featured: true,
    details:
      'Worked on this during my time at Dafinitiq AI. RoDrive is a large-scale ride-hailing and rental backend combining a CakePHP operations portal with a Node.js/Express API layer over MySQL (25 route modules, 64 services, 77 Sequelize models). Covered the trip lifecycle — booking, dispatch, driver assignment, fare estimation, cancellations — plus driver/rider onboarding, wallets and payouts, Plan A–D subscription lifecycles, JazzCash and Stripe payments, FCM/Twilio/email notifications, geofenced multi-city operations, and a rental marketplace with chauffeur assignment. Cron-driven automation handled trip timeouts, reminders, and subscription expiry; delivery ran through Docker, GitHub Actions, and AWS ECS/ECR.',
  },
  {
    title: 'LingoLearn',
    desc: 'An AR-based language learning app using Unity3D.',
    tech: 'Unity3D, C#, NLP',
    category: 'AR & AI',
    featured: true,
    details: 'LingoLearn helps users learn languages via AR scenarios, daily lessons, and quizzes. Users interact with an AI assistant and take immersive tests.',
    videos: ['/media/app.mp4'],
  },
  {
    title: 'Distributed Ledger with Sharding',
    desc: 'Modular blockchain with sharding and hybrid consensus.',
    tech: 'Go, Blockchain, PoW + BFT, Cryptography',
    category: 'Distributed Systems',
    featured: true,
    details: 'Blockchain system featuring sharding, hybrid PoW + BFT consensus with VRF leader election, Merkle forests, zero-knowledge proofs, MPC, homomorphic authentication, state pruning, Bloom filter verification — scalable, secure, and performant with benchmarks on latency and verification efficiency.',
    link: 'https://github.com/ShahmeerAli1504/distributed-ledger-with-sharding',
  },
  {
    title: 'Raft-Based Key-Value Store',
    desc: 'Distributed key-value store using Raft consensus.',
    tech: 'Go, Raft, Distributed Systems',
    category: 'Distributed Systems',
    featured: true,
    details: 'Implements a basic distributed KV store supporting put/append/get with Raft-based leader election, log replication, fault tolerance, REST API and CLI interface; concurrency managed via goroutines and mutexes.',
    link: 'https://github.com/ShahmeerAli1504/Raft-Based-Key-Value-Store',
  },
  {
    title: 'Text-to-Image Microservice',
    desc: 'gRPC-based image generator from text prompts.',
    tech: 'Python, gRPC, NLP',
    category: 'AR & AI',
    featured: true,
    details: 'Developed a microservice that converts text prompts into context-aware images using open-source models. Deployed with GitHub Actions and showcased through Streamlit and Postman.',
    link: 'https://github.com/dotyahya/text2image-ai-agent',
  },
  {
    title: 'Ecommerce Website',
    desc: "A shopping platform for women's clothing.",
    tech: 'MERN Stack',
    category: 'Web',
    featured: true,
    details: 'A full-stack shopping platform with product browsing, cart management, secure checkout, and admin inventory control.',
  },
  {
    title: 'Homeschooling Resources Platform',
    desc: 'A platform providing categorized homeschooling content.',
    tech: 'HTML, CSS',
    category: 'Web',
    featured: true,
    details: 'Developed a responsive web platform to provide homeschooling resources to parents, teachers, and students. Includes an Admin Dashboard for uploading YouTube videos, PDFs, and social media links, along with a public-facing landing page with filtering features.',
    images: [
      '/media/login.png',
      '/media/home.png',
      '/media/contact.png',
      '/media/about.png',
      '/media/admin1.png',
      '/media/admin2.png',
    ],
    link: 'https://github.com/ShahmeerAli1504/Homeschooling-Resources-Platform',
  },
  {
    title: 'Cafe Management System',
    desc: 'Secure admin system with inventory and sales tracking.',
    tech: 'ASP.NET, MySQL, HTML/CSS',
    category: 'Web',
    details: 'Allows cafe admins to manage menu items, orders, stock levels, and track daily sales through graphs and reports.',
  },
  {
    title: 'Portfolio Website for Abdullah',
    desc: 'A responsive personal portfolio with a modern UI/UX design.',
    tech: 'Next.js, React, Tailwind CSS, Vercel',
    category: 'Web',
    details: 'Developed a professional portfolio website for Abdullah using Next.js and Tailwind CSS. The site highlights his projects, skills, and experience with smooth navigation, responsive design, optimized performance and hosted on Vercel.',
    link: 'https://github.com/ShahmeerAli1504/Friendproject',
  },
  {
    title: 'Sudoku & Magic Square AI Solvers',
    desc: 'AI solvers for Sudoku and Magic Square puzzles.',
    tech: 'Python, Backtracking, Heuristics, Genetic Algorithm',
    category: 'AR & AI',
    details: 'Includes a 9×9 Sudoku solver (Backtracking + MRV, Degree, LCV, AC-3) and a 3×3 Magic Square solver using a Genetic Algorithm; modular, well-commented code with random puzzle generation and support for multiple solution scenarios.',
    link: 'https://github.com/ShahmeerAli1504/sudoku-magic-ai-solvers',
  },
  {
    title: 'Graph Ordering Search Algorithms',
    desc: 'Vertex ordering for Bayesian Network learning via search strategies.',
    tech: 'Python, BFS, DFS, Uniform-Cost Search',
    category: 'AR & AI',
    details: 'Solves vertex ordering problem by minimizing total cost based on parent-set costs; implements BFS, DFS, UCS to evaluate best ordering, reads dataset for vertices and costs, compares search performance, outputs best ordering and cost.',
    link: 'https://github.com/ShahmeerAli1504/graph-ordering-search-algorithms',
  },
  {
    title: 'Timetable Optimization',
    desc: 'Auto-generates conflict-free schedules.',
    tech: 'Python',
    category: 'AR & AI',
    details: 'Generates optimized timetables using a backtracking algorithm ensuring no instructor or room conflicts across slots.',
    link: 'https://github.com/ShahmeerAli1504/timetable-genetic-scheduler',
  },
  {
    title: 'N-Gram Language Modeling',
    desc: 'Roman Urdu n-gram models with perplexity evaluation.',
    tech: 'Python, NLTK, NLP',
    category: 'AR & AI',
    details: 'Two implementations: Approach 1 builds unigram, bigram, trigram, and backward bigram models; Approach 2 adds bidirectional bigram, generates text, and compares models via perplexity (unigram 44.10, bigram 1.74, trigram 1.08).',
    link: 'https://github.com/ShahmeerAli1504/ngram-diary-generator',
  },
  {
    title: 'RomanUrdu BPE Diary',
    desc: 'BPE tokenizer with sentence segmentation for Roman Urdu diaries.',
    tech: 'Jupyter Notebook, BPE, NLP',
    category: 'AR & AI',
    details: 'Implements sentence segmentation and Byte Pair Encoding tokenization on Roman Urdu diary data; includes preprocessing (lowercasing, punctuation removal, optional normalization), building BPE vocab (~1000 subwords), handling unknown tokens, and evaluation via vocabulary reduction and OOV analysis.',
    link: 'https://github.com/ShahmeerAli1504/RomanUrdu-BPEdiary',
  },
  {
    title: 'Server-Client System in Go',
    desc: 'Distributed RPC-based matrix computation system.',
    tech: 'Go, RPC, Distributed Systems',
    category: 'Distributed Systems',
    details: 'Client-Coordinator architecture performing matrix addition, transpose, and multiplication via RPC; supports FCFS scheduling, load balancing, fault tolerance with task reassignment, and efficient distributed computation.',
    link: 'https://github.com/ShahmeerAli1504/Sever-Client-system-in-GO',
  },
  {
    title: 'Robot Simulation',
    desc: 'Simulates 50 processes with IPC and shared memory.',
    tech: 'C++, Operating Systems',
    category: 'Systems',
    details: 'Implements a robot process system where multiple agents communicate using pipes and shared memory to simulate complex workflows.',
  },
  {
    title: 'C++ Concurrency & Process Management',
    desc: 'C++ tasks exploring threading, synchronization, and multiprocessing.',
    tech: 'C++17, POSIX Threads, Linux',
    category: 'Systems',
    details: 'Five tasks implemented: Round-Robin scheduler, concurrent banking transactions with synchronization, Dining Philosophers across multiple tables, multithreaded workplace simulation, multi-process threaded student data processing; designed for real-world system simulations.',
    link: 'https://github.com/ShahmeerAli1504/cpp-threading-multiprocessing-tasks',
  },
  {
    title: 'Linux C Process Programming',
    desc: 'C programs on process creation, IPC, file handling and system calls.',
    tech: 'C, Linux System Calls, fork/exec, IPC',
    category: 'Systems',
    details: 'Six tasks include: process hierarchy via fork(), file concatenation using child processes, nested fork with execvp(), env-var execve(), multi-process file encryption/decryption, and process-based merge sort — all demonstrating IPC and system-level programming.',
    link: 'https://github.com/ShahmeerAli1504/linux-c-process-tasks',
  },
  {
    title: 'Bash Automation',
    desc: 'Bash scripts for automation tasks and user interaction handling.',
    tech: 'Bash, Shell Scripting',
    category: 'Systems',
    details: 'Solutions for four Linux shell scripting tasks: prime number checks with file append and timestamp, batch file processing with directory and grep operations, menu-driven file operations using case, and a safe remove script that moves files to a trash folder before deletion.',
    link: 'https://github.com/ShahmeerAli1504/bash-automation',
  },
];

const CATEGORIES = ['All', 'Web', 'Distributed Systems', 'Systems', 'AR & AI'];
const INITIAL_COUNT = 6;

/* Preview strip styling per category: hue + icon + prompt line */
const CATEGORY_META = {
  Web: { hue: 197, icon: CodeIcon, cmd: 'npm run dev' },
  'Distributed Systems': { hue: 262, icon: ServerIcon, cmd: 'go run ./cluster' },
  Systems: { hue: 152, icon: TerminalIcon, cmd: 'make && ./bin/run' },
  'AR & AI': { hue: 316, icon: SparklesIcon, cmd: 'python train.py' },
};

/* Colored tech pills — known techs get their own hue, rest stay cyan */
const TECH_HUES = {
  react: 193,
  'react.js': 193,
  javascript: 48,
  typescript: 211,
  'node.js': 120,
  aws: 35,
  python: 207,
  go: 185,
  golang: 185,
  c: 220,
  'c++': 220,
  'c++17': 220,
  'c#': 268,
  'asp.net': 268,
  unity3d: 145,
  'mern stack': 122,
  mongodb: 122,
  mysql: 200,
  blockchain: 32,
  nlp: 316,
  grpc: 174,
  raft: 262,
  bash: 100,
  'tailwind css': 190,
  'next.js': 200,
  vercel: 280,
};

const techHue = (t) => TECH_HUES[t.trim().toLowerCase()];

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const visible = filtered.slice(0, visibleCount);
  const [countRef, projectCount] = useCountUp(projects.length);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  const handleFilter = (cat) => {
    setFilter(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  // Close on Escape + lock scroll while the modal is open
  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedProject, handleClose]);

  return (
    <section id="projects" className="projects section" data-num="03">
      <div className="section-head reveal">
        <span className="section-kicker">03 — Projects</span>
        <h2 className="section-title">What I've built</h2>
        <p className="section-sub" ref={countRef}>
          <span className="stat-number">{projectCount}</span> projects across
          web apps, distributed systems, low-level programming, AI and AR.
          Click any card for details.
        </p>
      </div>

      <div className="project-filters reveal" role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => handleFilter(cat)}
            aria-pressed={filter === cat}
          >
            {cat}
            <span className="filter-count">
              {cat === 'All'
                ? projects.length
                : projects.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <div className="project-grid" data-skew>
        {visible.map((p, i) => {
          const meta = CATEGORY_META[p.category] || CATEGORY_META.Web;
          const PreviewIcon = meta.icon;
          return (
            <button
              key={p.title}
              type="button"
              className="project-card reveal"
              style={{ '--reveal-delay': `${(i % 3) * 90}ms`, '--cat-h': meta.hue }}
              onClick={() => setSelectedProject(p)}
            >
              <div className="project-preview" aria-hidden="true">
                <PreviewIcon className="project-preview-icon" />
                <span className="project-preview-cmd">
                  <span className="project-preview-prompt">$</span> {p.cmd || meta.cmd}
                </span>
              </div>
              <div className="project-card-body">
                <div className="project-card-top">
                  <span className="project-category">{p.category}</span>
                  {p.featured && <span className="project-featured">★ Featured</span>}
                </div>
                <h3>{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tech.split(',').slice(0, 4).map((t) => {
                    const hue = techHue(t);
                    return (
                      <span
                        key={t}
                        className={`tag ${hue !== undefined ? 'tag-colored' : ''}`}
                        style={hue !== undefined ? { '--tag-h': hue } : undefined}
                      >
                        {t.trim()}
                      </span>
                    );
                  })}
                </div>
                <span className="project-more">View details →</span>
              </div>
            </button>
          );
        })}
      </div>

      {visibleCount < filtered.length && (
        <div className="projects-actions">
          <button
            className="btn btn-ghost"
            onClick={() => setVisibleCount((c) => c + 6)}
          >
            Show more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleClose} aria-label="Close project details">
              <CloseIcon />
            </button>

            <span className="project-category">{selectedProject.category}</span>
            <h2 className="modal-title">{selectedProject.title}</h2>

            <div className="project-tags modal-tags">
              {selectedProject.tech.split(',').map((t) => (
                <span key={t} className="tag">
                  {t.trim()}
                </span>
              ))}
            </div>

            <p className="modal-details">{selectedProject.details}</p>

            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary modal-link"
              >
                {selectedProject.link.includes('github.com') ? (
                  <>
                    <GitHubIcon width={18} height={18} />
                    View on GitHub
                  </>
                ) : (
                  <>
                    <ExternalLinkIcon width={18} height={18} />
                    View Live Site
                  </>
                )}
                <ExternalLinkIcon width={16} height={16} />
              </a>
            )}

            {selectedProject.images && (
              <div className="modal-images">
                {selectedProject.images.map((img, idx) => (
                  <img key={img} src={img} alt={`${selectedProject.title} screenshot ${idx + 1}`} loading="lazy" />
                ))}
              </div>
            )}

            {selectedProject.videos && (
              <div className="modal-videos">
                {selectedProject.videos.map((vid) => (
                  <video key={vid} controls preload="none">
                    <source src={vid} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
