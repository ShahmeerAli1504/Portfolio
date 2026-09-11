import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skill.css';
import {
  Code2,
  Cpu,
  Database,
  Server,
  Bot,
  Terminal,
  Check,
  Search,
  Zap,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: 'fullstack',
    title: 'Full-Stack & Web Systems',
    description: 'Modern reactive UIs, SSR frameworks, REST/gRPC backend services, and API contracts.',
    icon: Code2,
    colorClass: 'sp-cat-cyan',
    skills: [
      { name: 'React.js', level: 'Production Expert', type: 'Frontend' },
      { name: 'Next.js (App Router)', level: 'Production Expert', type: 'Full-Stack' },
      { name: 'Node.js & Express.js', level: 'Production Expert', type: 'Backend' },
      { name: 'TypeScript', level: 'Advanced', type: 'Language' },
      { name: 'JavaScript (ES6+)', level: 'Mastery', type: 'Language' },
      { name: 'Tailwind CSS', level: 'Advanced', type: 'Styling' },
      { name: 'RESTful APIs', level: 'Expert', type: 'Architecture' },
      { name: 'gRPC & Protobuf', level: 'Advanced', type: 'IPC' },
      { name: 'CakePHP & PHP', level: 'Production', type: 'Backend' },
    ],
  },
  {
    id: 'ai-nlp',
    title: 'AI, Agentic Systems & NLP',
    icon: Bot,
    description: 'Multi-agent orchestration, RAG pipelines, vector search, embeddings, and AR experiences.',
    colorClass: 'sp-cat-purple',
    skills: [
      { name: 'RAG Architecture', level: 'Production', type: 'AI Subsystem' },
      { name: 'OpenAI & Gemini APIs', level: 'Production', type: 'LLMs' },
      { name: 'Vector Search & Embeddings', level: 'Advanced', type: 'Retrieval' },
      { name: 'Prompt Engineering', level: 'Expert', type: 'AI Logic' },
      { name: 'NLP & NLTK', level: 'Advanced', type: 'Text Processing' },
      { name: 'BPE Subword Tokenization', level: 'Advanced', type: 'Segmentation' },
      { name: 'Unity3D & AR Foundation', level: 'Advanced', type: 'Spatial AI' },
      { name: 'C# Interactive Systems', level: 'Advanced', type: 'Client Engine' },
    ],
  },
  {
    id: 'systems',
    title: 'Languages & Core Systems',
    icon: Cpu,
    description: 'Low-level POSIX concurrency, IPC, memory management, and distributed algorithms.',
    colorClass: 'sp-cat-emerald',
    skills: [
      { name: 'C++ (C++17)', level: 'Systems Level', type: 'Performance' },
      { name: 'C Language', level: 'Systems Level', type: 'Kernel / IPC' },
      { name: 'Go (Golang)', level: 'Advanced', type: 'Distributed' },
      { name: 'Python 3.11', level: 'Expert', type: 'Core Scripting' },
      { name: 'C# (.NET)', level: 'Advanced', type: 'Application' },
      { name: 'Linux Syscalls & IPC', level: 'Advanced', type: 'OS Kernel' },
      { name: 'POSIX Threads & Mutexes', level: 'Advanced', type: 'Concurrency' },
      { name: 'Assembly x86', level: 'Academic', type: 'Low-Level' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Data Storage',
    icon: Database,
    description: 'Relational schemas, NoSQL document stores, vector databases, and state sharding.',
    colorClass: 'sp-cat-amber',
    skills: [
      { name: 'MongoDB Atlas', level: 'Production', type: 'NoSQL' },
      { name: 'MySQL Database', level: 'Production', type: 'Relational' },
      { name: 'PostgreSQL', level: 'Advanced', type: 'Relational' },
      { name: 'Sequelize ORM', level: 'Production', type: 'Data Models' },
      { name: 'Shared Memory & Pipes', level: 'Advanced', type: 'OS Storage' },
      { name: 'Redis / In-Memory Cache', level: 'Intermediate', type: 'Caching' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps, Cloud & Infrastructure',
    icon: Server,
    description: 'Automated CI/CD pipelines, container dispatch, cloud deployment, and bash scripting.',
    colorClass: 'sp-cat-blue',
    skills: [
      { name: 'Docker Containers', level: 'Production', type: 'DevOps' },
      { name: 'AWS (ECS, ECR, EC2)', level: 'Production', type: 'Cloud' },
      { name: 'Git & GitHub Actions', level: 'Expert', type: 'CI/CD' },
      { name: 'Vercel Edge Platform', level: 'Production', type: 'Deployment' },
      { name: 'Linux System Admin', level: 'Advanced', type: 'OS' },
      { name: 'Bash Shell Scripting', level: 'Advanced', type: 'Automation' },
    ],
  },
];

const AUTO_ROTATE_MS = 10000; // 10 seconds

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillBadge, setActiveSkillBadge] = useState(null);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Total skills count
  const totalSkillsCount = useMemo(() => {
    return SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % SKILL_CATEGORIES.length);
    setProgressKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + SKILL_CATEGORIES.length) % SKILL_CATEGORIES.length);
    setProgressKey((k) => k + 1);
  }, []);

  // Self Auto-Rotation Timer (10 Seconds)
  useEffect(() => {
    if (isPaused || activeCategory !== 'all' || searchQuery.trim() !== '') return undefined;
    const interval = setInterval(() => {
      nextSlide();
    }, AUTO_ROTATE_MS);
    return () => clearInterval(interval);
  }, [isPaused, activeCategory, searchQuery, nextSlide]);

  // Compute 3 visible categories for carousel mode
  const visibleCarouselCategories = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery.trim() !== '') return null;
    return [0, 1, 2].map(
      (offset) => SKILL_CATEGORIES[(carouselIndex + offset) % SKILL_CATEGORIES.length]
    );
  }, [carouselIndex, activeCategory, searchQuery]);

  // Filter Categories & Skills when user searches or clicks filter tabs
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'all' && !searchQuery.trim()) {
      return visibleCarouselCategories;
    }
    return SKILL_CATEGORIES.map((cat) => {
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }
      if (!searchQuery.trim()) {
        return cat;
      }
      const matchingSkills = cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.level.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingSkills.length === 0) return null;
      return { ...cat, skills: matchingSkills };
    }).filter(Boolean);
  }, [activeCategory, searchQuery, visibleCarouselCategories]);

  const isCarouselActive = activeCategory === 'all' && !searchQuery.trim();

  return (
    <section id="skills" className="sp-skills-section">
      <div className="sp-skills-container">
        {/* Section Header */}
        <div className="sp-skills-header">
          <div className="sp-skills-badge">
            <Cpu size={14} className="sp-icon-cyan" />
            <span>04 — TECHNICAL MATRIX &amp; TOOLING</span>
          </div>
          <h2 className="sp-skills-title">
            Core Capabilities &amp;{' '}
            <span className="sp-title-cyan">Production Tech Stack</span>
          </h2>
          <p className="sp-skills-subtitle">
            Comprehensive index of programming languages, full-stack frameworks, cloud infrastructure, AI models, and database engines battle-tested across production systems.
          </p>
        </div>

        {/* Terminal Quick Stats & Carousel Timer Banner */}
        <div className="sp-skills-terminal-banner">
          <div className="sp-sterm-head">
            <div className="sp-sterm-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="sp-sterm-path">
              shahmeer@sys:~$ ./query-stack --carousel --rotate=10s
            </span>
          </div>

          <div className="sp-sterm-body">
            <div className="sp-sterm-line">
              <Terminal size={14} className="sp-sterm-icon" />
              <span>
                <strong className="sp-text-cyan">{totalSkillsCount}</strong> Verified Production Technologies across <strong>5 Domains</strong>.
              </span>
            </div>

            {isCarouselActive && (
              <div className="sp-sterm-timer-status">
                <span className="sp-timer-badge">
                  {isPaused ? <Pause size={12} className="sp-icon-amber" /> : <Play size={12} className="sp-icon-cyan" />}
                  <span>{isPaused ? 'Auto-Rotation Paused (Hovering)' : 'Rotating 3 of 5 domains (10s)'}</span>
                </span>
              </div>
            )}

            <div className="sp-sterm-status">
              <Check size={13} className="sp-icon-emerald" />
              <span>SYS_READY // Zero Vulnerabilities</span>
            </div>
          </div>

          {/* 10-Second Progress Line Animation */}
          {isCarouselActive && !isPaused && (
            <div className="sp-carousel-progress-bar">
              <div key={progressKey} className="sp-carousel-progress-fill" />
            </div>
          )}
        </div>

        {/* Controls: Search Bar + Category Tabs */}
        <div className="sp-skills-controls">
          {/* Search Box */}
          <div className="sp-skills-search-box">
            <Search size={16} className="sp-search-icon" />
            <input
              type="text"
              placeholder="Search skill, framework, or runtime (e.g. React, Docker, RAG, Go)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sp-skills-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="sp-search-clear-btn"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="sp-skills-tabs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`sp-stab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            >
              <span>Carousel (3 at a time)</span>
              <span className="sp-stab-count">{totalSkillsCount}</span>
            </button>

            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`sp-stab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.title.split('&')[0]}</span>
                <span className="sp-stab-count">{cat.skills.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Header Bar */}
        {isCarouselActive && (
          <div className="sp-carousel-nav-bar">
            <div className="sp-cnav-left">
              <span className="sp-cnav-label">Domains Showing:</span>
              <span className="sp-cnav-range">
                Category {carouselIndex + 1}, {(carouselIndex + 1) % 5 + 1}, and {(carouselIndex + 2) % 5 + 1} of 5
              </span>
            </div>

            {/* Pagination Indicator Dots */}
            <div className="sp-carousel-dots">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCarouselIndex(idx);
                    setProgressKey((k) => k + 1);
                  }}
                  className={`sp-cdot ${carouselIndex === idx ? 'active' : ''}`}
                  title={`Jump to ${cat.title}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="sp-carousel-arrow-buttons">
              <button
                onClick={prevSlide}
                className="sp-carrow-btn"
                title="Previous Domain"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="sp-carrow-btn"
                title="Next Domain"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Skills Cards Grid / Carousel View */}
        <div
          className="sp-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            {!filteredCategories || filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="sp-skills-empty"
              >
                <Zap size={24} className="sp-icon-amber" />
                <p>No tools matched &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="sp-reset-search-btn"
                >
                  Reset Matrix Filter
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={isCarouselActive ? carouselIndex : `${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, x: isCarouselActive ? 20 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isCarouselActive ? -20 : 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="sp-skills-grid sp-skills-carousel-grid"
              >
                {filteredCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id} className={`sp-skill-card ${cat.colorClass}`}>
                      {/* Card Header */}
                      <div className="sp-scard-header">
                        <div className="sp-scard-title-group">
                          <div className="sp-scard-icon-box">
                            <Icon size={18} />
                          </div>
                          <div>
                            <h3 className="sp-scard-title">{cat.title}</h3>
                            <p className="sp-scard-desc">{cat.description}</p>
                          </div>
                        </div>
                        <span className="sp-scard-count">{cat.skills.length} Tools</span>
                      </div>

                      {/* Skill Chips List */}
                      <div className="sp-scard-chips">
                        {cat.skills.map((skill) => {
                          const isHighlighted = activeSkillBadge === skill.name;
                          return (
                            <div
                              key={skill.name}
                              onClick={() =>
                                setActiveSkillBadge(isHighlighted ? null : skill.name)
                              }
                              className={`sp-schip ${isHighlighted ? 'highlighted' : ''}`}
                            >
                              <span className="sp-schip-name">{skill.name}</span>
                              <span className="sp-schip-level">{skill.type}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Skills;
