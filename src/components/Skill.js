import React from 'react';
import './Skill.css';

const skills = [
  'Python', 'C', 'C++', 'JavaScript', 'C#', 'SQL', 'Assembly Language',
  'React.js', 'Node.js', 'MERN Stack', 'GoLang',
  'MongoDB', 'MySQL', 'Docker', 'Git', 'Unity3D', 'Jenkins', 'MLFlow'
];

function Skills() {
  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div key={skill} className="skill-card fade-in" style={{ transitionDelay: `${i * 0.05}s` }}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
