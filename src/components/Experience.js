import React from 'react';
import './Experience.css';

const timeline = [
  {
    title: 'Intern – NADRA Headquarters',
    time: 'May 2024',
    desc: 'Built an asset management system and gained exposure to NADRA’s infrastructure and data processes.'
  },
  {
    title: 'Intern – Hexler Tech',
    time: 'Jan 2024',
    desc: 'Developed responsive React apps and assisted with UI component design and implementation.'
  },
  {
    title: 'TA & Lab Demonstrator – FAST NUCES',
    time: '2024–2025',
    desc: 'Tutored students in OS, Data Structures, and Networks. Also graded and gave academic support.'
  }
];

function Experience() {
  return (
    <section id="experience" className="experience">
      <h2>Experience</h2>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-item fade-in" style={{ transitionDelay: `${i * 0.2}s` }}>
            <h3>{item.title}</h3>
            <span>{item.time}</span>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
