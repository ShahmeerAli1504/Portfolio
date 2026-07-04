import React from 'react';
import './About.css';
import { GraduationCapIcon, BriefcaseIcon, CodeIcon, SparklesIcon } from './Icons';

const highlights = [
  {
    icon: GraduationCapIcon,
    title: 'CS Graduate',
    text: 'FAST NUCES Islamabad — Dean\'s Honor List, VP of the IEEE CS Chapter, and TA for OS, Networks and Data Structures.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Industry Experience',
    text: 'Agentic Dream, Dafinitiq AI and Huawei Cloud Core, plus internships at NADRA and Hexler Tech.',
  },
  {
    icon: CodeIcon,
    title: 'Full-Stack Range',
    text: 'From React frontends to Go-based distributed systems, Raft consensus and blockchain ledgers.',
  },
  {
    icon: SparklesIcon,
    title: 'Curious Builder',
    text: 'Exploring AR with Unity3D, NLP experiments, and AI-driven solvers beyond the day job.',
  },
];

function About() {
  return (
    <section id="about" className="about section">
      <div className="section-head reveal">
        <span className="section-kicker">01 — About</span>
        <h2 className="section-title">Design-minded engineer,<br />systems-level thinker</h2>
      </div>

      <div className="about-grid">
        <div className="about-text reveal reveal-left">
          <p>
            I'm Shahmeer Ali, a Computer Science graduate from FAST NUCES
            Islamabad. I'm passionate about frontend development, game design,
            blockchain systems, and immersive tech like AR.
          </p>
          <p>
            I enjoy combining design with logic to build apps that are
            interactive and intelligent. Today I build production JavaScript
            at Agentic Dream, after stints spanning Huawei's telecom cloud
            core, MERN product teams, and national infrastructure at NADRA
            and I still make time to teach and mentor.
          </p>
          <a href="#experience" className="about-cta">
            See where I've worked ↓
          </a>
        </div>

        <div className="about-cards">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="about-card reveal"
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <div className="about-card-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
