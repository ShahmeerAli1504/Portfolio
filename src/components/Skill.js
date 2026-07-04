import React from 'react';
import './Skill.css';
import { CodeIcon, SparklesIcon, BriefcaseIcon, GraduationCapIcon } from './Icons';

const skillGroups = [
  {
    icon: CodeIcon,
    title: 'Languages',
    skills: ['JavaScript', 'Python', 'C', 'C++', 'C#', 'GoLang', 'SQL', 'Assembly'],
  },
  {
    icon: SparklesIcon,
    title: 'Frontend & Backend',
    skills: ['React.js', 'Node.js', 'MERN Stack', 'HTML/CSS', 'REST APIs', 'gRPC'],
  },
  {
    icon: BriefcaseIcon,
    title: 'Databases & DevOps',
    skills: ['MongoDB', 'MySQL', 'Docker', 'Git', 'Jenkins', 'MLFlow'],
  },
  {
    icon: GraduationCapIcon,
    title: 'Specialties',
    skills: ['Unity3D & AR', 'Distributed Systems', 'Blockchain', 'NLP', 'Cloud Core Networks'],
  },
];

function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="section-head reveal">
        <span className="section-kicker">04 — Skills</span>
        <h2 className="section-title">Tools I work with</h2>
      </div>

      <div className="skills-grid">
        {skillGroups.map(({ icon: Icon, title, skills }, i) => (
          <div
            key={title}
            className="skill-group reveal"
            style={{ '--reveal-delay': `${i * 90}ms` }}
          >
            <div className="skill-group-head">
              <div className="skill-group-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
            </div>
            <div className="skill-chips">
              {skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
