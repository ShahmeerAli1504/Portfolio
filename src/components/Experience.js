import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experience.css';
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Building2,
  ChevronRight,
  Check,
  ChevronDown,
  Filter
} from 'lucide-react';

const WORK_EXPERIENCES = [
  {
    id: 'agentic-dream',
    company: 'Agentic Dream (via Xperion AI)',
    role: 'JavaScript Developer',
    location: 'Remote',
    type: 'Remote',
    period: 'Jan 2026 – July 2026',
    category: 'Full Stack',
    highlights: [
      'Developed and maintained internal tooling powering core product workflows across 2 production applications from React to Express.js.',
      'Built 20+ reusable React components and dashboard views, eliminating duplicated UI code and reducing page load time from 3.4s to 1.6s.',
      'Designed and consumed REST integrations against third-party enterprise APIs with token authentication, pagination, and retry logic across 3 external systems.',
      'Diagnosed and resolved 60+ defects while delivering feature enhancements in a 5-person cross-functional team under 2-week Agile sprints.',
    ],
    skills: ['React.js', 'Express.js', 'REST APIs', 'OAuth', 'Performance Tuning', 'Agile/Scrum'],
    featured: true,
  },
  {
    id: 'dafinitiq',
    company: 'Dafinitiq AI',
    role: 'Full Stack Developer',
    location: 'Islamabad, Pakistan',
    type: 'On-site',
    period: 'Apr 2026 – Jun 2026',
    category: 'Full Stack',
    highlights: [
      'Delivered features across 3 client web applications using the MERN stack, owning both React interfaces and Express.js/MongoDB service layers.',
      'Reduced page render time by 35% by memoizing React components and optimizing MongoDB queries and indexes on high-traffic endpoints.',
      'Shipped 15+ production features across 5 two-week sprints under tight deadlines while maintaining code quality.',
    ],
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Query Optimization', 'Memoization'],
    featured: true,
  },
  {
    id: 'huawei-cloud',
    company: 'Huawei Technologies (via Hillcrest)',
    role: 'Network Design Architect – Cloud Core',
    location: 'Islamabad, Pakistan',
    type: 'On-site',
    period: 'Jan 2026 – Mar 2026',
    category: 'Cloud & Infrastructure',
    highlights: [
      'Supported operations and maintenance of cloud-native telecom core components carrying enterprise-grade traffic, assisting with fault analysis and service restoration.',
      'Assisted in designing and analyzing scalable core network architectures for high availability, analyzing performance data to drive service stability.',
    ],
    skills: ['Cloud Core', 'Telecom Core Networks', 'High Availability', 'Fault Analysis', 'Network Architecture'],
  },
  {
    id: 'srs-solusi',
    company: 'SRS Solusi Digital',
    role: 'Full Stack Developer (MERN)',
    location: 'Indonesia (Remote)',
    type: 'Remote',
    period: 'Nov 2025',
    category: 'Full Stack',
    highlights: [
      'Integrated DOKU Payment API end-to-end, enabling secure card and e-wallet checkout with webhook-based transaction verification.',
      'Implemented Biteship API to automate shipping-rate calculation across 5 courier services, removing manual quoting from order fulfillment.',
      'Delivered features across MongoDB, Express.js, React.js, and Node.js for an Indonesian e-commerce platform across time zones.',
    ],
    skills: ['DOKU Payments', 'Biteship API', 'Webhooks', 'MERN Stack', 'E-Commerce'],
  },
  {
    id: 'huawei-intern',
    company: 'Huawei Technologies',
    role: 'Cloud Core Intern (Fresh Blood Program)',
    location: 'Islamabad, Pakistan',
    type: 'On-site',
    period: 'Sep 2025 – Dec 2025',
    category: 'Internships',
    highlights: [
      'Completed structured technical training on 2G/3G/4G core architectures.',
      'Traced real-time call flows within Cloud Core domain and supported post-sales technical operations alongside senior engineers.',
    ],
    skills: ['Cloud Core Architectures', 'Telecom Call Flows', '2G/3G/4G Infrastructure', 'Operations'],
  },
  {
    id: 'nadra',
    company: 'NADRA Headquarters',
    role: 'AGHAAZ Summer Intern',
    location: 'Islamabad, Pakistan',
    type: 'On-site',
    period: 'May 2024 – Jun 2024',
    category: 'Internships',
    highlights: [
      'Built an asset-management web application to track and manage organizational resources across 6 asset categories.',
      'Implemented role-based access control (RBAC) and audit-ready data tracking.',
    ],
    skills: ['Web App', 'Asset Management', 'RBAC', 'SQL / Database'],
  },
  {
    id: 'hexler',
    company: 'Hexler Tech',
    role: 'Frontend Developer Intern',
    location: 'Islamabad, Pakistan',
    type: 'On-site',
    period: 'Jan 2024',
    category: 'Internships',
    highlights: [
      'Developed responsive web interfaces with React.js, HTML5, CSS3, and JavaScript, ensuring cross-browser and mobile compatibility.',
      'Built 15 modular UI components adopted across team projects, reducing duplicate markup and shortening feature delivery time.',
    ],
    skills: ['React.js', 'Component Libraries', 'HTML5/CSS3', 'Responsive UI'],
  },
];

const EDUCATION = {
  degree: 'Bachelor of Science in Computer Science',
  institution: 'National University of Computer and Emerging Sciences (FAST-NUCES)',
  location: 'Islamabad, Pakistan',
  period: 'September 2021 – June 2025',
  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Computer Networks',
    'Databases & Indexing',
    'Object-Oriented Programming',
    'Artificial Intelligence',
    'Natural Language Processing',
    'Web Engineering',
  ],
  honors: [
    "Dean's Honor List — FAST National University",
    'Vice President — IEEE Computer Science Chapter, FAST-NUCES (Led 12-member team across 4 technical events)',
    "Deputy Secretary Protocol — NASCON 2025 (One of Pakistan's largest student tech conferences)",
  ],
};

const CATEGORIES = ['All Track', 'Full Stack', 'Cloud & Infrastructure', 'Internships'];

function Experience() {
  const [activeCategory, setActiveCategory] = useState('All Track');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [expandedCards, setExpandedCards] = useState({
    'agentic-dream': true,
    'dafinitiq': true,
    'huawei-cloud': true,
    'srs-solusi': true,
  });

  const filteredExperiences = WORK_EXPERIENCES.filter((exp) => {
    if (activeCategory === 'All Track') return true;
    return exp.category === activeCategory;
  });

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="sp-exp-section">
      <div className="sp-exp-container">
        {/* Section Header */}
        <div className="sp-exp-header">
          <div className="sp-exp-badge">
            <Briefcase size={14} className="sp-icon-cyan" />
            <span>Career Experience &amp; Track Record</span>
          </div>
          <h2 className="sp-exp-title">
            1.5+ years shipping production code across{' '}
            <span className="sp-title-cyan">six engineering teams.</span>
          </h2>
          <p className="sp-exp-subtitle">
            Hands-on delivery of production web apps, MERN stack interfaces, enterprise API integrations, and collaborative Agile teamwork.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="sp-exp-filters">
            <span className="sp-filter-label">
              <Filter size={12} className="sp-icon-cyan" /> Filter Track:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`sp-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sp-exp-grid">
          {/* Main Work Experience Timeline (Left Column: 8 Columns) */}
          <div className="sp-timeline-wrapper">
            <div className="sp-timeline-beam" />

            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp, idx) => {
                const isExpanded = expandedCards[exp.id] ?? false;
                const isSkillMatched =
                  hoveredSkill && exp.skills.some((s) => s.toLowerCase() === hoveredSkill.toLowerCase());

                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className={`sp-timeline-item ${isSkillMatched ? 'sp-highlight-card' : ''}`}
                  >
                    {/* Animated Timeline Node */}
                    <div className="sp-timeline-node">
                      <div className={`sp-node-dot ${exp.featured ? 'featured' : ''}`} />
                      {exp.featured && <span className="sp-node-pulse" />}
                    </div>

                    {/* Experience Card */}
                    <div className="sp-exp-card">
                      <div className="sp-exp-card-header">
                        <div>
                          <div className="sp-role-row">
                            <h3 className="sp-role-title">{exp.role}</h3>
                            <span className="sp-type-badge">{exp.type}</span>
                          </div>

                          <div className="sp-company-row">
                            <Building2 size={14} className="sp-icon-cyan" />
                            <span className="sp-company-name">{exp.company}</span>
                          </div>
                        </div>

                        <div className="sp-meta-col">
                          <span className="sp-meta-item">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                          <span className="sp-meta-item">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Highlights List */}
                      <div className={`sp-highlights-box ${isExpanded ? 'expanded' : 'collapsed'}`}>
                        <ul className="sp-highlights-list">
                          {exp.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="sp-highlight-item">
                              <ChevronRight size={14} className="sp-icon-cyan sp-chevron-bullet" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expand / Collapse Button */}
                      {exp.highlights.length > 2 && (
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="sp-expand-toggle-btn"
                        >
                          <span>{isExpanded ? 'Show Less' : `View ${exp.highlights.length} Key Achievements`}</span>
                          <ChevronDown
                            size={14}
                            className={`sp-expand-icon ${isExpanded ? 'rotated' : ''}`}
                          />
                        </button>
                      )}

                      {/* Skills Chip Matrix */}
                      <div className="sp-skills-matrix">
                        {exp.skills.map((skill) => {
                          const isHovered = hoveredSkill?.toLowerCase() === skill.toLowerCase();
                          return (
                            <span
                              key={skill}
                              onMouseEnter={() => setHoveredSkill(skill)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className={`sp-skill-tag ${isHovered ? 'active-skill' : ''}`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Sidebar: Academic Foundation & Honors (Right Column: 4 Columns) */}
          <div className="sp-exp-sidebar">
            {/* Education Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sp-sidebar-card sp-edu-card"
            >
              <div className="sp-sidebar-header">
                <div className="sp-sidebar-icon-box sp-icon-cyan-bg">
                  <GraduationCap size={20} className="sp-icon-cyan" />
                </div>
                <div>
                  <h3 className="sp-sidebar-title">Academic Foundation</h3>
                  <span className="sp-sidebar-sub">{EDUCATION.period}</span>
                </div>
              </div>

              <div className="sp-edu-body">
                <h4 className="sp-degree-title">{EDUCATION.degree}</h4>
                <p className="sp-inst-name">{EDUCATION.institution}</p>
                <p className="sp-inst-loc">{EDUCATION.location}</p>
              </div>

              <div className="sp-coursework-section">
                <span className="sp-course-label">Relevant CS Coursework:</span>
                <div className="sp-course-chips">
                  {EDUCATION.coursework.map((course) => (
                    <span key={course} className="sp-course-chip">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Honors & Leadership Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sp-sidebar-card sp-honors-card"
            >
              <div className="sp-sidebar-header">
                <div className="sp-sidebar-icon-box sp-icon-emerald-bg">
                  <Award size={20} className="sp-icon-emerald" />
                </div>
                <div>
                  <h3 className="sp-sidebar-title">Honors &amp; Leadership</h3>
                  <span className="sp-sidebar-sub">Recognitions &amp; Impact</span>
                </div>
              </div>

              <ul className="sp-honors-list">
                {EDUCATION.honors.map((honor, hIdx) => (
                  <li key={hIdx} className="sp-honor-item">
                    <Check size={14} className="sp-icon-emerald sp-honor-check" />
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
