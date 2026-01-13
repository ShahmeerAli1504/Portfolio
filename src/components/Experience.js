import React from 'react';
import './Experience.css';

const timeline = [
  {
    title: 'JavaScript Developer – Xperion',
    time: 'Jan 2026 – Present',
    desc: 'Working as a JavaScript Developer on production-grade applications, contributing to feature development, bug fixes, and overall frontend functionality.'
  },
  {
    title: 'Full Stack Developer (MERN) – SRS Solusi Digital (Remote, Indonesia)',
    time: 'Nov 2025',
    desc: 'Integrated DOKU Payment API for secure transactions, implemented Biteship API for logistics automation, and developed core product features across frontend and backend using the MERN stack.'
  },
  {
    title: 'Fresh Blood Induction Program Intern – Huawei Technologies (Islamabad)',
    time: 'Sep 2025 – Dec 2025',
    desc: 'Gained hands-on exposure to telecom network architectures (2G, 3G, 4G), studied real-time Cloud Core call flows, and supported post-sales activities while learning Huawei’s internal operational processes.'
  },
  {
    title: 'Teacher’s Assistant & Lab Demonstrator – FAST NUCES (Islamabad)',
    time: '2024 – 2025',
    desc: 'Provided academic support and tutoring in Data Structures, Operating Systems, Computer Networks, and Game Development. Assisted with grading, assessments, and student progress tracking.'
  },
  {
    title: 'AGHAAZ Summer Intern – NADRA Headquarters (Islamabad)',
    time: 'May 2024 – Jun 2024',
    desc: 'Developed an asset management web application for efficient asset tracking and gained exposure to NADRA’s network infrastructure and data management systems.'
  },
  {
    title: 'Web Development Intern – Hexler Tech (Islamabad)',
    time: 'Jan 2024',
    desc: 'Built responsive web applications using React, HTML, CSS, and JavaScript, assisted in UI component development, and collaborated in a fast-paced development environment.'
  }
];

function Experience() {
  return (
    <section id="experience" className="experience">
      <h2>Experience</h2>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div
            key={i}
            className="timeline-item fade-in"
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
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
