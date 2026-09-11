import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  Server,
  TrendingUp,
  AlertTriangle,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Layers
} from 'lucide-react';

const GithubIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PROJECTS_DATA = [
  {
    id: 'actragen',
    name: 'ActraGen — Multi-Tenant AI Platform',
    category: 'AR & AI',
    tagline: 'Orchestration platform running 6 specialized AI agents & RAG document search.',
    problem:
      'Organizations required tailored AI assistant workflows and secure internal document intelligence without exposing proprietary files or context switching.',
    architecture: ['Next.js', 'React', 'TypeScript', 'MongoDB Atlas', 'OpenAI', 'Gemini Embeddings', 'RAG Engine'],
    impact: [
      'Built multi-tenant AI workspace with persona assistants (analyst, consultant, CMO) and English/Arabic RTL support.',
      'Engineered RAG pipeline: PDF ingestion, OCR, chunking, embeddings, and vector search over internal data.',
      'Cut manual report turnaround time from ~4 hours to under 10 minutes (95.8% acceleration).',
    ],
    metrics: [
      { label: 'Turnaround Time', value: '4h ➔ <10m' },
      { label: 'Autonomous Agents', value: '6 Persona AI' },
      { label: 'Retrieval Engine', value: 'Vector Search' },
    ],
    role: 'Full-Stack & AI Systems Lead',
    teamSize: 'Dafinitiq AI Team',
    featured: true,
    details:
      'Built during my time at Dafinitiq AI. ActraGen lets organizations create custom AI tools with dynamic prompts, chain them into automated workflows, and run persona-based assistants with bilingual English/Arabic RTL support. Includes a secure RAG subsystem: PDF ingestion with OCR, page-aware chunking, embeddings, MongoDB Atlas Vector Search, and hybrid retrieval over internal knowledge serving source-cited answers.',
  },
  {
    id: 'rodrive',
    name: 'RoDrive — Mobility & Ride-Hailing Backend',
    category: 'Web',
    tagline: 'High-concurrency backend powering dispatch, subscriptions, rentals & payments.',
    problem:
      'Managing high-concurrency trip dispatch, multi-city geofencing, multi-tier subscriptions, and driver payouts across fragmented legacy systems.',
    architecture: ['Node.js', 'Express.js', 'MySQL', 'CakePHP', 'Docker', 'AWS ECS/ECR', 'GitHub Actions'],
    impact: [
      'Architected 25 route modules, 64 services, and 77 database models covering full trip lifecycle and driver dispatch.',
      'Integrated JazzCash and Stripe payment gateways alongside automated wallet payouts and trip timeouts.',
      'Automated deployment via Docker, GitHub Actions CI/CD, and AWS cloud infrastructure.',
    ],
    metrics: [
      { label: 'Route Modules', value: '25 API Modules' },
      { label: 'Database Models', value: '77 Models' },
      { label: 'Deployment', value: 'AWS ECS + Docker' },
    ],
    role: 'Backend Architect',
    teamSize: 'Dafinitiq AI Engineering',
    featured: true,
    details:
      'Worked on this during my time at Dafinitiq AI. RoDrive is a large-scale ride-hailing and rental backend combining a CakePHP operations portal with a Node.js/Express API layer over MySQL (25 route modules, 64 services, 77 Sequelize models). Covered trip lifecycle dispatch, fare estimation, driver onboarding, wallets, Plan A–D subscriptions, JazzCash & Stripe checkout, and automated crons.',
  },
  {
    id: 'pure-haven',
    name: 'Pure Haven Studio Platform',
    category: 'Web',
    tagline: 'Sanctuary massage therapy studio client web app in South Reno.',
    problem:
      'Therapy studio needed an elegant responsive web presence with direct online booking and review integrations.',
    architecture: ['Next.js App Router', 'React', 'Tailwind CSS', 'Vercel Edge', 'MassageBook API'],
    impact: [
      'Designed and deployed full custom platform for Pure Haven Massage Therapy in South Reno, NV.',
      'Integrated MassageBook online appointment booking and Yelp client review streams.',
      'Achieved 100/100 Lighthouse performance and accessibility scores.',
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Booking System', value: 'Direct API' },
      { label: 'Deployment', value: 'Vercel Edge' },
    ],
    liveUrl: 'https://www.purehaven.studio/',
    role: 'Lead Frontend Engineer',
    teamSize: 'Client Project',
    featured: true,
    details:
      'Designed and built a full client website for Pure Haven Massage Therapy in South Reno, NV. Features custom therapeutic service showcases (Swedish, Deep Tissue, Hot Stone, Cupping), therapist bio, clean responsive studio gallery, Yelp client review integrations, clear studio policies, and direct MassageBook online appointment booking.',
  },
  {
    id: 'potluck',
    name: 'Potluck Asian Fusion Platform',
    category: 'Web',
    tagline: "Reno's premier food truck web app with searchable menu & catering bookings.",
    problem:
      'Food truck business required real-time menu search, location tracking, and catering event workflows for mobile users.',
    architecture: ['Next.js', 'React', 'Tailwind CSS', 'Vercel Deployment'],
    impact: [
      'Built interactive web application showcasing signature menu items and weekly location schedules.',
      'Implemented real-time searchable/filterable menu and dark-mode mobile UI.',
      'Streamlined catering booking requests directly through automated contact workflows.',
    ],
    metrics: [
      { label: 'Menu Search', value: 'Real-time' },
      { label: 'Mobile Score', value: 'Fast UX' },
      { label: 'UI Theme', value: 'Dark Engineering' },
    ],
    liveUrl: 'https://potluck-food-truck.vercel.app/',
    role: 'Full-Stack Developer',
    teamSize: 'Client Project',
    featured: true,
    details:
      "Developed an interactive client web app for Potluck Food Truck in Reno, Nevada. Highlights signature street food creations (Cheeseburger Wonton Tacos, Elote Chicken Fries, Pan-Seared Potstickers), real-time searchable/filterable menu, weekly location schedules, event catering booking workflows, and responsive dark-mode branding.",
  },
  {
    id: 'distributed-ledger',
    name: 'Distributed Ledger with Sharding',
    category: 'Distributed Systems',
    tagline: 'Modular blockchain architecture featuring state sharding & hybrid consensus.',
    problem:
      'Traditional monolithic blockchains suffer from throughput bottlenecks and unscalable verification overhead during high transaction volume.',
    architecture: ['Go (Golang)', 'Sharding', 'PoW + BFT Consensus', 'VRF Leader Election', 'Merkle Forests', 'Zero-Knowledge Proofs'],
    impact: [
      'Engineered state sharding with hybrid PoW + BFT consensus and VRF leader selection.',
      'Implemented Merkle forests, zero-knowledge verification, state pruning, and Bloom filters.',
      'Benchmarked high transaction throughput and sub-second verification latency.',
    ],
    metrics: [
      { label: 'Consensus', value: 'PoW + BFT' },
      { label: 'Privacy', value: 'ZK Proofs' },
      { label: 'Architecture', value: 'Sharded Go' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/distributed-ledger-with-sharding',
    role: 'Distributed Systems Engineer',
    teamSize: 'Personal Architecture',
    featured: true,
    details:
      'Blockchain system featuring sharding, hybrid PoW + BFT consensus with VRF leader election, Merkle forests, zero-knowledge proofs, MPC, homomorphic authentication, state pruning, Bloom filter verification — scalable, secure, and performant with benchmarks on latency and verification efficiency.',
  },
  {
    id: 'lingolearn',
    name: 'LingoLearn — AR & NLP Language Platform',
    category: 'AR & AI',
    tagline: 'Augmented-reality language learning app with real-time NLP speech assessment.',
    problem:
      'Static language learning tools lack spatial immersion and dynamic real-time pronunciation evaluation for learners.',
    architecture: ['Unity Engine', 'C# Interactive Layer', 'AR Foundation', 'REST Speech APIs', 'NLP Feedback Engine'],
    impact: [
      'Developed Unity/C# application layer building 5 immersive interactive learning modules.',
      'Integrated NLP and speech processing APIs into Unity client for real-time pronunciation assessment.',
      'Validated educational effectiveness through user testing with 20 live participants.',
    ],
    metrics: [
      { label: 'AR Modules', value: '5 Immersive' },
      { label: 'User Testing', value: '20 Participants' },
      { label: 'Evaluation', value: 'Real-time NLP' },
    ],
    role: 'Lead Application Developer',
    teamSize: 'Capstone Project',
    featured: true,
    videos: ['/media/app.mp4'],
    details:
      'LingoLearn helps users learn languages via AR scenarios, daily lessons, and quizzes. Users interact with an AI assistant and take immersive tests with real-time NLP feedback.',
  },
  {
    id: 'raft-kv',
    name: 'Raft-Based Key-Value Store',
    category: 'Distributed Systems',
    tagline: 'Distributed key-value store using Raft consensus for fault tolerance.',
    problem:
      'Maintaining strong data consistency across distributed server nodes subject to unexpected network partition failures.',
    architecture: ['Go (Golang)', 'Raft Consensus', 'Distributed Concurrency', 'REST & CLI Interface'],
    impact: [
      'Implemented Raft consensus algorithm with leader election, log replication, and heartbeat mechanisms.',
      'Built thread-safe KV storage supporting atomic Put, Append, and Get operations.',
      'Provided both REST API and interactive CLI tools for distributed node management.',
    ],
    metrics: [
      { label: 'Consensus', value: 'Raft Protocol' },
      { label: 'Fault Tolerance', value: 'Leader Election' },
      { label: 'Runtime', value: 'Go Goroutines' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/Raft-Based-Key-Value-Store',
    role: 'Systems Developer',
    teamSize: 'Distributed Systems Project',
    featured: true,
    details:
      'Implements a basic distributed KV store supporting put/append/get with Raft-based leader election, log replication, fault tolerance, REST API and CLI interface; concurrency managed via goroutines and mutexes.',
  },
  {
    id: 'text2image',
    name: 'High-Throughput Text-to-Image Microservice',
    category: 'AR & AI',
    tagline: 'Containerized gRPC service generating context-aware images from generative AI models.',
    problem:
      'Traditional HTTP-based image generation pipelines experienced high payload serialization overhead and unreliable deployment pipelines.',
    architecture: ['Python 3.11', 'gRPC Transport', 'Docker Containers', 'GitHub Actions CI/CD', 'Streamlit UI'],
    impact: [
      'Designed low-latency gRPC service architecture for inter-service communication and binary payload transport.',
      'Containerized microservice with Docker and automated build/deployment via GitHub Actions CI/CD.',
      'Sustained median end-to-end image generation response time of ~8 seconds.',
    ],
    metrics: [
      { label: 'Median Gen Time', value: '~8s' },
      { label: 'IPC Protocol', value: 'gRPC Binary' },
      { label: 'Deployment', value: 'Docker + CI/CD' },
    ],
    githubUrl: 'https://github.com/dotyahya/text2image-ai-agent',
    role: 'Systems & DevOps Developer',
    teamSize: 'Open Source Architecture',
    featured: true,
    details:
      'Developed a microservice that converts text prompts into context-aware images using open-source models. Deployed with GitHub Actions and showcased through Streamlit and Postman.',
  },
  {
    id: 'homeschooling',
    name: 'Homeschooling Resources Platform',
    category: 'Web',
    tagline: 'Categorized educational platform with Admin Dashboard & resource filtering.',
    problem:
      'Educators and parents lacked a structured, centralized portal for curating and searching multimedia learning materials.',
    architecture: ['HTML5', 'CSS3', 'JavaScript ES6', 'Admin Portal', 'Resource Filter Engine'],
    impact: [
      'Built responsive web platform providing homeschooling resources to parents, teachers, and students.',
      'Implemented Admin Dashboard for curating YouTube videos, PDFs, and social media learning links.',
      'Created instant category filtering for age-specific educational materials.',
    ],
    metrics: [
      { label: 'Admin Portal', value: 'Resource Uploads' },
      { label: 'Media Types', value: 'Video + PDF' },
      { label: 'UI Compatibility', value: 'Cross-Browser' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/Homeschooling-Resources-Platform',
    role: 'Frontend Developer',
    teamSize: 'Web Engineering Project',
    featured: true,
    images: [
      '/media/login.png',
      '/media/home.png',
      '/media/contact.png',
      '/media/about.png',
      '/media/admin1.png',
      '/media/admin2.png',
    ],
    details:
      'Developed a responsive web platform to provide homeschooling resources to parents, teachers, and students. Includes an Admin Dashboard for uploading YouTube videos, PDFs, and social media links, along with a public-facing landing page with filtering features.',
  },
  {
    id: 'abdullah-portfolio',
    name: 'Portfolio Platform for Abdullah',
    category: 'Web',
    tagline: 'Modern responsive developer portfolio hosted on Vercel.',
    problem:
      'Developer client needed a fast, elegant portfolio showcase for project case studies and technical experience.',
    architecture: ['Next.js', 'React', 'Tailwind CSS', 'Vercel Deployment'],
    impact: [
      'Delivered custom portfolio highlighting client projects, skill matrix, and interactive case studies.',
      'Optimized performance with Next.js server components and Vercel hosting.',
    ],
    metrics: [
      { label: 'Page Speed', value: 'Fast Render' },
      { label: 'Stack', value: 'Next.js + Tailwind' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/Friendproject',
    role: 'Frontend Developer',
    teamSize: 'Client Project',
    details:
      'Developed a professional portfolio website for Abdullah using Next.js and Tailwind CSS. The site highlights his projects, skills, and experience with smooth navigation, responsive design, optimized performance and hosted on Vercel.',
  },
  {
    id: 'mern-ecommerce',
    name: 'Full-Stack MERN E-Commerce Platform',
    category: 'Web',
    tagline: 'Shopping platform with product management, secure cart & admin inventory control.',
    problem:
      'E-commerce merchants required a unified MERN application for catalog management and checkout.',
    architecture: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth'],
    impact: [
      'Built full-stack shopping platform with catalog browsing, cart state management, and secure checkout.',
      'Developed admin dashboard for inventory management, product uploading, and order tracking.',
    ],
    metrics: [
      { label: 'Stack', value: 'MERN' },
      { label: 'Authentication', value: 'JWT' },
    ],
    role: 'Full Stack Developer',
    teamSize: 'MERN Project',
    details:
      'A full-stack shopping platform with product browsing, cart management, secure checkout, and admin inventory control.',
  },
  {
    id: 'sudoku-magic-ai',
    name: 'Sudoku & Magic Square AI Solvers',
    category: 'AR & AI',
    tagline: 'Intelligent AI solvers using Backtracking, Heuristics, & Genetic Algorithms.',
    problem:
      'Solving complex 9x9 Sudoku and 3x3 Magic Square constraint satisfaction problems efficiently under time limits.',
    architecture: ['Python 3', 'Backtracking', 'MRV & Degree Heuristics', 'AC-3 Constraint Propagation', 'Genetic Algorithms'],
    impact: [
      'Engineered 9x9 Sudoku solver utilizing Backtracking, MRV, LCV, and AC-3 constraint propagation.',
      'Implemented Genetic Algorithm solver for 3x3 Magic Square generation.',
    ],
    metrics: [
      { label: 'Sudoku Heuristic', value: 'MRV + AC-3' },
      { label: 'Magic Square', value: 'Genetic Algo' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/sudoku-magic-ai-solvers',
    role: 'AI Engineer',
    teamSize: 'AI Systems Project',
    details:
      'Includes a 9×9 Sudoku solver (Backtracking + MRV, Degree, LCV, AC-3) and a 3×3 Magic Square solver using a Genetic Algorithm; modular, well-commented code with random puzzle generation and support for multiple solution scenarios.',
  },
  {
    id: 'graph-ordering',
    name: 'Graph Ordering Search Algorithms',
    category: 'AR & AI',
    tagline: 'Vertex ordering optimization for Bayesian Network learning via search strategies.',
    problem:
      'Finding minimal-cost vertex ordering in Bayesian Networks across large search spaces.',
    architecture: ['Python', 'BFS', 'DFS', 'Uniform-Cost Search (UCS)', 'Graph Theory'],
    impact: [
      'Implemented BFS, DFS, and UCS algorithms to evaluate optimal vertex ordering costs.',
      'Minimized total parent-set cost through heuristic graph traversal comparison.',
    ],
    metrics: [
      { label: 'Search Algos', value: 'BFS, DFS, UCS' },
      { label: 'Domain', value: 'Bayesian Nets' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/graph-ordering-search-algorithms',
    role: 'Algorithms Engineer',
    teamSize: 'AI & Data Science Project',
    details:
      'Solves vertex ordering problem by minimizing total cost based on parent-set costs; implements BFS, DFS, UCS to evaluate best ordering, reads dataset for vertices and costs, compares search performance, outputs best ordering and cost.',
  },
  {
    id: 'timetable-opt',
    name: 'Automated Timetable Optimization',
    category: 'AR & AI',
    tagline: 'Constraint-based scheduler generating conflict-free academic timetables.',
    problem:
      'Manual academic scheduling causes recurring instructor, room, and timeslot allocation conflicts.',
    architecture: ['Python', 'Backtracking CSP', 'Genetic Scheduling', 'Constraint Checking'],
    impact: [
      'Developed automated scheduler ensuring zero room or instructor double-bookings across slots.',
    ],
    metrics: [
      { label: 'Conflicts', value: '0 Hard Conflicts' },
      { label: 'Algorithm', value: 'Genetic CSP' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/timetable-genetic-scheduler',
    role: 'Algorithms Developer',
    teamSize: 'Academic Project',
    details:
      'Generates optimized timetables using a backtracking algorithm ensuring no instructor or room conflicts across slots.',
  },
  {
    id: 'ngram-nlp',
    name: 'Roman Urdu N-Gram Language Modeling',
    category: 'AR & AI',
    tagline: 'N-gram language models with perplexity evaluation on Roman Urdu text.',
    problem:
      'Evaluating language modeling accuracy and subword perplexity in low-resource Roman Urdu text corpora.',
    architecture: ['Python', 'NLTK', 'Unigram/Bigram/Trigram', 'Perplexity Evaluation'],
    impact: [
      'Built unigram, bigram, trigram, and backward bigram models with perplexity tracking.',
      'Achieved perplexity reduction from 44.10 (unigram) down to 1.08 (trigram).',
    ],
    metrics: [
      { label: 'Trigram Perplexity', value: '1.08' },
      { label: 'Corpus', value: 'Roman Urdu' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/ngram-diary-generator',
    role: 'NLP Developer',
    teamSize: 'NLP Project',
    details:
      'Two implementations: Approach 1 builds unigram, bigram, trigram, and backward bigram models; Approach 2 adds bidirectional bigram, generates text, and compares models via perplexity (unigram 44.10, bigram 1.74, trigram 1.08).',
  },
  {
    id: 'bpe-tokenizer',
    name: 'Roman Urdu BPE Tokenizer Diary',
    category: 'AR & AI',
    tagline: 'Byte Pair Encoding tokenizer with sentence segmentation for diary corpora.',
    problem:
      'High out-of-vocabulary (OOV) rates when tokenizing non-standardized Roman Urdu diary entries.',
    architecture: ['Jupyter Notebook', 'Python', 'Byte Pair Encoding (BPE)', 'NLP Segmentation'],
    impact: [
      'Implemented sentence segmentation and Byte Pair Encoding to construct a ~1000 subword vocabulary.',
      'Significantly reduced OOV rates across informal diary text corpora.',
    ],
    metrics: [
      { label: 'Vocab Size', value: '~1000 Subwords' },
      { label: 'Algorithm', value: 'Byte Pair Encoding' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/RomanUrdu-BPEdiary',
    role: 'NLP Engineer',
    teamSize: 'NLP Research',
    details:
      'Implements sentence segmentation and Byte Pair Encoding tokenization on Roman Urdu diary data; includes preprocessing, building BPE vocab (~1000 subwords), handling unknown tokens, and evaluation via vocabulary reduction and OOV analysis.',
  },
  {
    id: 'go-rpc-matrix',
    name: 'Distributed RPC Matrix Computation in Go',
    category: 'Distributed Systems',
    tagline: 'Distributed RPC system for concurrent matrix multiplication & transposition.',
    problem:
      'High computation latency when executing large matrix operations on a single thread.',
    architecture: ['Go (Golang)', 'RPC Protocol', 'FCFS Scheduler', 'Load Balancing', 'Fault Tolerance'],
    impact: [
      'Architected client-coordinator RPC cluster distributing matrix transpose, addition, and multiplication.',
      'Implemented FCFS scheduling, task reassignment on worker node failure, and dynamic load balancing.',
    ],
    metrics: [
      { label: 'IPC', value: 'Go Net/RPC' },
      { label: 'Fault Tolerance', value: 'Worker Reassignment' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/Sever-Client-system-in-GO',
    role: 'Distributed Systems Developer',
    teamSize: 'Systems Project',
    details:
      'Client-Coordinator architecture performing matrix addition, transpose, and multiplication via RPC; supports FCFS scheduling, load balancing, fault tolerance with task reassignment, and efficient distributed computation.',
  },
  {
    id: 'cpp-concurrency',
    name: 'C++ Concurrency & Multiprocessing Engine',
    category: 'Systems & Infrastructure',
    tagline: 'Systems suite implementing Round-Robin, Dining Philosophers & thread pools.',
    problem:
      'Managing thread synchronization, race conditions, and process scheduling deadlocks under heavy concurrency.',
    architecture: ['C++17', 'POSIX Threads (pthread)', 'Linux IPC', 'Multiprocessing', 'Synchronization Mutexes'],
    impact: [
      'Built Round-Robin CPU scheduler, multithreaded bank transaction engine, and Dining Philosophers simulator.',
      'Prevented race conditions and deadlocks using POSIX mutexes and condition variables.',
    ],
    metrics: [
      { label: 'Standard', value: 'C++17' },
      { label: 'Concurrency', value: 'POSIX Threads' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/cpp-threading-multiprocessing-tasks',
    role: 'Systems Programmer',
    teamSize: 'OS Systems Project',
    details:
      'Five tasks implemented: Round-Robin scheduler, concurrent banking transactions with synchronization, Dining Philosophers across multiple tables, multithreaded workplace simulation, multi-process threaded student data processing.',
  },
  {
    id: 'linux-c-process',
    name: 'Linux C System Programming & IPC Suite',
    category: 'Systems & Infrastructure',
    tagline: 'C programs demonstrating fork/exec, pipe IPC, process hierarchies & merge sort.',
    problem:
      'Understanding low-level Linux process creation, inter-process communication, and system call overhead.',
    architecture: ['C Language', 'Linux System Calls', 'fork() / execvp()', 'Pipes & IPC', 'File Systems'],
    impact: [
      'Developed 6 low-level systems tasks: process hierarchies, nested fork exec, multi-process encryption, and parallel merge sort.',
    ],
    metrics: [
      { label: 'Kernel APIs', value: 'Linux Syscalls' },
      { label: 'IPC Mechanism', value: 'Pipes & Signals' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/linux-c-process-tasks',
    role: 'Systems Programmer',
    teamSize: 'Linux Systems Project',
    details:
      'Six tasks include: process hierarchy via fork(), file concatenation using child processes, nested fork with execvp(), env-var execve(), multi-process file encryption/decryption, and process-based merge sort.',
  },
  {
    id: 'bash-automation',
    name: 'Bash Scripting & Automation Suite',
    category: 'Systems & Infrastructure',
    tagline: 'Automated Linux shell scripts for batch processing, directory maintenance & safety trash.',
    problem:
      'Manual file operations and system administrative tasks consuming valuable developer time.',
    architecture: ['Bash', 'Shell Scripting', 'Grep / Awk', 'Linux CLI Utilities'],
    impact: [
      'Created automated batch processing, menu-driven file managers, and a safe trash-removal script preventing accidental data loss.',
    ],
    metrics: [
      { label: 'Environment', value: 'Linux Bash' },
      { label: 'Automation', value: 'Batch Scripts' },
    ],
    githubUrl: 'https://github.com/ShahmeerAli1504/bash-automation',
    role: 'DevOps & Systems Developer',
    teamSize: 'Automation Project',
    details:
      'Solutions for four Linux shell scripting tasks: prime number checks with file append and timestamp, batch file processing with directory and grep operations, menu-driven file operations using case, and a safe remove script that moves files to a trash folder before deletion.',
  },
  {
    id: 'cafe-management',
    name: 'Cafe Management System',
    category: 'Web',
    tagline: 'Secure admin inventory, order processing & sales reporting system.',
    problem:
      'Cafe operators needed administrative oversight for menu items, order queues, and inventory stock analytics.',
    architecture: ['ASP.NET', 'C#', 'MySQL', 'HTML/CSS'],
    impact: [
      'Built admin portal for menu creation, inventory tracking, daily order processing, and graphical sales reports.',
    ],
    metrics: [
      { label: 'Backend', value: 'ASP.NET' },
      { label: 'Database', value: 'MySQL' },
    ],
    role: 'Backend Developer',
    teamSize: 'Web Systems Project',
    details:
      'Allows cafe admins to manage menu items, orders, stock levels, and track daily sales through graphs and reports.',
  },
  {
    id: 'robot-simulation',
    name: 'IPC Robot Simulation in C++',
    category: 'Systems & Infrastructure',
    tagline: 'Simulating 50 concurrent robot processes using pipes & shared memory.',
    problem:
      'Coordinating 50 concurrent agent processes without memory corruption or synchronization bottlenecks.',
    architecture: ['C++', 'Shared Memory', 'Pipes', 'POSIX Mutexes'],
    impact: [
      'Simulated 50 concurrent robot agent processes communicating via Linux shared memory and pipes.',
    ],
    metrics: [
      { label: 'Processes', value: '50 Concurrent' },
      { label: 'IPC', value: 'Shared Memory' },
    ],
    role: 'Systems Developer',
    teamSize: 'OS Systems Project',
    details:
      'Implements a robot process system where multiple agents communicate using pipes and shared memory to simulate complex workflows.',
  },
];

const CATEGORIES = ['All Case Studies', 'Web', 'Distributed Systems', 'Systems & Infrastructure', 'AR & AI'];
const ITEMS_PER_PAGE = 6;

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All Case Studies');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Filter Projects
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'All Case Studies') return true;
    return p.category === selectedCategory;
  });

  // Calculate Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when category changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleCloseModal = () => setSelectedModalProject(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (!selectedModalProject) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedModalProject]);

  return (
    <section id="projects" className="sp-projects-section">
      <div className="sp-projects-container">
        {/* Section Header */}
        <div className="sp-projects-header">
          <div className="sp-projects-badge">
            <FolderGit2 size={14} className="sp-icon-cyan" />
            <span>Engineering Case Studies &amp; Architectural Whitepapers</span>
          </div>
          <h2 className="sp-projects-title">
            Production systems designed for{' '}
            <span className="sp-title-cyan">efficiency, concurrency, &amp; cost-reduction.</span>
          </h2>
          <p className="sp-projects-subtitle">
            In-depth case studies of production platforms shipped across full-stack MERN development, distributed systems, microservices, and NLP domain layers.
          </p>

          {/* Category Filters */}
          <div className="sp-projects-filters">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All Case Studies'
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`sp-pfilter-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="sp-pfilter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Pagination Status Bar */}
        <div className="sp-pagination-bar">
          <span className="sp-page-info">
            Showing <strong>{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)}</strong> of <strong>{filteredProjects.length}</strong> Projects
          </span>

          {totalPages > 1 && (
            <div className="sp-page-controls">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="sp-page-btn"
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`sp-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="sp-page-btn"
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Projects Whitepaper Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="sp-projects-grid"
          >
            {paginatedProjects.map((project, index) => {
              const globalIdx = startIndex + index + 1;
              return (
                <article key={project.id} className="sp-whitepaper-card">
                  {/* Card Header Strip */}
                  <div className="sp-wp-top-strip">
                    <div className="sp-wp-case-tag">
                      <span className="sp-wp-dot" />
                      <span>CASE STUDY {globalIdx < 10 ? `0${globalIdx}` : globalIdx} • {project.category}</span>
                    </div>

                    <div className="sp-wp-meta">
                      {project.teamSize && (
                        <span className="sp-wp-meta-item">
                          <Users size={12} />
                          {project.teamSize}
                        </span>
                      )}
                      {project.role && <span className="sp-wp-role">{project.role}</span>}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="sp-wp-headline-box">
                    <h3 className="sp-wp-title">{project.name}</h3>
                    <p className="sp-wp-tagline">{project.tagline}</p>
                  </div>

                  {/* Action Links (Live System & GitHub Source) */}
                  <div className="sp-wp-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sp-wp-btn sp-wp-btn-cyan"
                      >
                        <span>Live System</span>
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sp-wp-btn sp-wp-btn-zinc"
                      >
                        <GithubIcon size={13} />
                        <span>Source</span>
                      </a>
                    )}

                    {project.details && (
                      <button
                        onClick={() => setSelectedModalProject(project)}
                        className="sp-wp-btn sp-wp-btn-outline"
                      >
                        <Layers size={13} />
                        <span>Full Case Study</span>
                      </button>
                    )}
                  </div>

                  {/* Problem Statement Box */}
                  {project.problem && (
                    <div className="sp-wp-problem-box">
                      <div className="sp-problem-header">
                        <AlertTriangle size={13} className="sp-icon-amber" />
                        <span>Core Bottleneck &amp; Technical Friction</span>
                      </div>
                      <p className="sp-problem-desc">{project.problem}</p>
                    </div>
                  )}

                  {/* Architecture & Tech Stack */}
                  <div className="sp-wp-arch-box">
                    <div className="sp-arch-header">
                      <Server size={13} className="sp-icon-cyan" />
                      <span>Architecture &amp; Stack</span>
                    </div>
                    <div className="sp-arch-chips">
                      {project.architecture.map((tech) => (
                        <span key={tech} className="sp-arch-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Measurable Production Impact */}
                  {project.impact && project.impact.length > 0 && (
                    <div className="sp-wp-impact-box">
                      <div className="sp-impact-header">
                        <TrendingUp size={13} className="sp-icon-emerald" />
                        <span>Measurable Production Impact</span>
                      </div>
                      <ul className="sp-impact-list">
                        {project.impact.map((point, pIdx) => (
                          <li key={pIdx} className="sp-impact-item">
                            <CheckCircle2 size={14} className="sp-icon-emerald sp-impact-check" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Metric Strip Footnote */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="sp-wp-metrics-strip">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="sp-metric-cell">
                          <div className="sp-metric-val">{m.value}</div>
                          <div className="sp-metric-lbl">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pagination Controls */}
        {totalPages > 1 && (
          <div className="sp-bottom-pagination">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(p - 1, 1));
                window.scrollTo({ top: document.getElementById('projects')?.offsetTop - 80, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="sp-page-btn"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="sp-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: document.getElementById('projects')?.offsetTop - 80, behavior: 'smooth' });
                  }}
                  className={`sp-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(p + 1, totalPages));
                window.scrollTo({ top: document.getElementById('projects')?.offsetTop - 80, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="sp-page-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Detailed Modal Popup for Selected Project */}
        {selectedModalProject && (
          <div className="sp-modal-overlay" onClick={handleCloseModal}>
            <div className="sp-modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="sp-modal-close-btn" onClick={handleCloseModal}>
                <X size={18} />
              </button>

              <div className="sp-modal-header">
                <span className="sp-modal-category">{selectedModalProject.category}</span>
                <h2 className="sp-modal-title">{selectedModalProject.name}</h2>
                <p className="sp-modal-tagline">{selectedModalProject.tagline}</p>
              </div>

              <div className="sp-modal-body">
                <div className="sp-modal-section">
                  <h4>Full Architecture &amp; System Overview</h4>
                  <p>{selectedModalProject.details}</p>
                </div>

                {selectedModalProject.images && selectedModalProject.images.length > 0 && (
                  <div className="sp-modal-gallery">
                    <h4>Application Screenshots</h4>
                    <div className="sp-gallery-grid">
                      {selectedModalProject.images.map((img, idx) => (
                        <img
                          key={img}
                          src={img}
                          alt={`${selectedModalProject.name} preview ${idx + 1}`}
                          className="sp-gallery-img"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedModalProject.videos && selectedModalProject.videos.length > 0 && (
                  <div className="sp-modal-videos">
                    <h4>Interactive Video Demo</h4>
                    {selectedModalProject.videos.map((vid) => (
                      <video key={vid} controls className="sp-demo-video">
                        <source src={vid} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ))}
                  </div>
                )}
              </div>

              <div className="sp-modal-footer">
                {selectedModalProject.liveUrl && (
                  <a
                    href={selectedModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sp-wp-btn sp-wp-btn-cyan"
                  >
                    <span>Visit Live System</span>
                    <ExternalLink size={14} />
                  </a>
                )}

                {selectedModalProject.githubUrl && (
                  <a
                    href={selectedModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sp-wp-btn sp-wp-btn-zinc"
                  >
                    <GithubIcon size={14} />
                    <span>View GitHub Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
