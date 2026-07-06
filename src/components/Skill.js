import React, { useEffect, useRef, useState } from 'react';
import './Skill.css';

const skillGroups = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'Python', 'C', 'C++', 'C#', 'GoLang', 'SQL', 'Assembly'],
  },
  {
    title: 'Frontend & Backend',
    skills: ['React.js', 'Node.js', 'MERN Stack', 'HTML/CSS', 'REST APIs', 'gRPC'],
  },
  {
    title: 'Databases & DevOps',
    skills: ['MongoDB', 'MySQL', 'Docker', 'Git', 'Jenkins', 'MLFlow'],
  },
  {
    title: 'Specialties',
    skills: ['Unity3D & AR', 'Distributed Systems', 'Blockchain', 'NLP', 'Cloud Core Networks'],
  },
];

const CMD = 'cat skills.txt';
const TOTAL = skillGroups.reduce((n, g) => n + g.skills.length, 0);

/* Types CMD once the terminal scrolls into view; renders it instantly
   under reduced motion or without IntersectionObserver. */
function useTerminalTyping(ref) {
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const done = typed === CMD;

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduced || !('IntersectionObserver' in window)) {
      setTyped(CMD);
      setStarted(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!started || done) return undefined;
    const t = setTimeout(() => setTyped(CMD.slice(0, typed.length + 1)), 55);
    return () => clearTimeout(t);
  }, [started, typed, done]);

  return { typed, done };
}

function Skills() {
  const termRef = useRef(null);
  const { typed, done } = useTerminalTyping(termRef);

  return (
    <section id="skills" className="skills section" data-num="04">
      <div className="section-head reveal">
        <span className="section-kicker">04 — Skills</span>
        <h2 className="section-title">Tools I work with</h2>
      </div>

      <div className="terminal reveal" ref={termRef}>
        <div className="terminal-bar">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-amber" />
          <span className="terminal-dot dot-green" />
          <span className="terminal-title">shahmeer@portfolio: ~</span>
        </div>

        <div className="terminal-body">
          <p className="terminal-line">
            <span className="terminal-prompt" aria-hidden="true">
              ➜ ~
            </span>{' '}
            <span className="terminal-cmd">{typed}</span>
            {!done && <span className="terminal-caret" aria-hidden="true" />}
          </p>

          <div className={`terminal-output ${done ? 'is-done' : ''}`}>
            {skillGroups.map(({ title, skills }, i) => (
              <div key={title} className="skill-group" style={{ '--gi': i }}>
                <h3 className="skill-group-title">
                  <span className="terminal-comment">##</span> {title}
                </h3>
                <div className="skill-chips">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <p className="terminal-status">
              <span className="terminal-check" aria-hidden="true">
                ✓
              </span>{' '}
              {TOTAL} skills loaded — always learning more
              <span className="terminal-caret terminal-caret-idle" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
