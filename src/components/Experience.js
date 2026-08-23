import React from 'react';
import './Experience.css';

const timeline = [
  {
    role: 'JavaScript Developer',
    company: 'Agentic Dream · Remote',
    time: 'Jan 2026 – August 2026',
    desc: 'Developing and maintaining internal tools that power core product workflows, building dynamic, responsive user interfaces in JavaScript and improving system stability through debugging and feature enhancements.',
    tech: ['JavaScript', 'React', 'Node.js', 'REST APIs'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Dafinitiq AI · Islamabad',
    time: 'Apr 2026 – Jun 2026',
    desc: 'Developed scalable full-stack web applications across multiple projects — including ActraGen, a multi-tenant AI platform with a RAG document-intelligence pipeline, and RoDrive, a large-scale ride-hailing backend — optimizing component rendering and backend query handling while delivering features on tight deadlines in an agile team.',
    tech: ['Next.js', 'MongoDB', 'Express', 'React', 'Node.js', 'MySQL'],
  },
  {
    role: 'Network Design Architect – Cloud Core',
    company: 'Huawei Technologies (via Hillcrest)',
    time: 'Jan 2026 – Mar 2026',
    desc: 'Worked on cloud-native telecom core systems, supporting operations of enterprise-grade network components, assisting in the design and analysis of scalable, highly available core architectures, and contributing to performance optimization.',
    tech: ['Cloud Core', 'Network Design', 'High Availability'],
  },
  {
    role: 'Full Stack Developer (MERN)',
    company: 'SRS Solusi Digital · Remote, Indonesia',
    time: 'Nov 2025',
    desc: 'Integrated DOKU Payment API for secure transactions, implemented Biteship API for logistics automation, and developed core product features across frontend and backend using the MERN stack.',
    tech: ['MERN Stack', 'DOKU Payments', 'Biteship API'],
  },
  {
    role: 'Fresh Blood Induction Program Intern',
    company: 'Huawei Technologies · Islamabad',
    time: 'Sep 2025 – Dec 2025',
    desc: "Gained hands-on exposure to telecom network architectures (2G, 3G, 4G), studied real-time Cloud Core call flows, and supported post-sales activities while learning Huawei's internal operational processes.",
    tech: ['2G/3G/4G', 'Cloud Core', 'Call Flows'],
  },
  {
    role: "Teacher's Assistant & Lab Demonstrator",
    company: 'FAST NUCES · Islamabad',
    time: '2024 – 2025',
    desc: 'Provided academic support and tutoring in Data Structures, Operating Systems, Computer Networks, and Game Development. Assisted with grading, assessments, and student progress tracking.',
    tech: ['Data Structures', 'OS', 'Networks', 'Game Dev'],
  },
  {
    role: 'AGHAAZ Summer Intern',
    company: 'NADRA Headquarters · Islamabad',
    time: 'May 2024 – Jun 2024',
    desc: "Developed an asset management web application for efficient asset tracking and gained exposure to NADRA's network infrastructure and data management systems.",
    tech: ['Web App', 'Asset Tracking', 'Infrastructure'],
  },
  {
    role: 'Web Development Intern',
    company: 'Hexler Tech · Islamabad',
    time: 'Jan 2024',
    desc: 'Built responsive web applications using React, HTML, CSS, and JavaScript, assisted in UI component development, and collaborated in a fast-paced development environment.',
    tech: ['React', 'HTML/CSS', 'JavaScript'],
  },
];

function Experience() {
  return (
    <section id="experience" className="experience section" data-num="02">
      <div className="section-head reveal">
        <span className="section-kicker">02 — Experience</span>
        <h2 className="section-title">Where I've worked</h2>
        <p className="section-sub">
          From national infrastructure to telecom cloud cores and remote
          product teams — the path so far.
        </p>
      </div>

      <div className="timeline">
        {timeline.map((item, i) => {
          const side = i % 2 === 0 ? 'is-left' : 'is-right';
          return (
            <article
              key={`${item.role}-${item.time}`}
              className={`timeline-item ${side} reveal ${
                i % 2 === 0 ? 'reveal-left' : 'reveal-right'
              }`}
              style={{ '--reveal-delay': `${Math.min(i, 3) * 80}ms` }}
            >
              <div className="timeline-marker" aria-hidden="true">
                <span className={`timeline-dot ${item.current ? 'is-current' : ''}`} />
              </div>
              <div className="timeline-card">
                <div className="timeline-card-head">
                  <h3>{item.role}</h3>
                  {item.current && <span className="timeline-now">Now</span>}
                </div>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-time">{item.time}</p>
                <p className="timeline-desc">{item.desc}</p>
                <div className="timeline-tech">
                  {item.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;
