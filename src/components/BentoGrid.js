import React, { useState, useRef, useEffect } from 'react';
import './BentoGrid.css';
import { Cpu, Globe, Bot, Terminal as TerminalIcon, Layers, Zap, Check, Play, Sparkles, CheckCircle2 } from 'lucide-react';

const PERSONAL_DATA = {
  name: 'Shahmeer Ali',
  role: 'Full-Stack & Systems Engineer',
  location: 'Islamabad, Pakistan',
  email: 'shahmeerali1504@gmail.com',
  phone: '+92-331-9325227',
  github: 'https://github.com/ShahmeerAli1504',
  linkedin: 'https://linkedin.com/in/shahmeer-ali1504',
  status: 'Available for Q4 High-Impact Contracts & Technical Leadership',
  subheadline:
    'Full-stack engineer with 1.5+ years shipping production web applications across six engineering teams. Strongest in the MERN stack, enterprise API integrations (NetSuite, Jira, KnowBe4, DOKU), and multi-agent AI tooling released through automated CI/CD.',
};

const HERO_METRICS = [
  { value: '6+', label: 'Engineering Teams Delivered Across', detail: 'Production MERN & Full-Stack deployments' },
  { value: '35%', label: 'Render & Latency Speedup', detail: 'React memoization & query optimization' },
  { value: '< 10m', label: 'Multi-Agent Workflow Time', detail: 'Cut down from 4-hour manual processes' },
  { value: '99.99%', label: 'Telecom Core Focus', detail: 'Enterprise-grade high availability' },
];

const PROJECTS_SUMMARY = [
  { name: 'DreamIt Integrations', category: 'Enterprise Integrations', tagline: 'Unified NetSuite, KnowBe4, Jira behind React & Node API layer.' },
  { name: 'Actragen AI Platform', category: 'Agentic AI', tagline: 'Multi-agent orchestration platform running 6 specialized AI agents.' },
  { name: 'Text-to-Image Microservice', category: 'Microservices & Cloud', tagline: 'Containerized gRPC service for generative AI models.' },
  { name: 'LingoLearn AR & NLP', category: 'AR & Speech NLP', tagline: 'Augmented reality language app with real-time NLP speech scoring.' },
];

const TECH_STACK_SUMMARY = [
  { category: 'Frontend', items: 'React.js, Next.js, TypeScript, Tailwind CSS, Redux' },
  { category: 'Backend & APIs', items: 'Node.js, Express.js, REST APIs, OAuth 2.0, gRPC, Webhooks' },
  { category: 'Databases & AI', items: 'MongoDB, Mongoose, MySQL, Multi-Agent LLMs, Speech NLP' },
  { category: 'DevOps & Infrastructure', items: 'Docker, GitHub Actions CI/CD, Linux, Huawei Cloud Core' },
];

function executeTerminalCommand(inputCommand) {
  const cleanCmd = inputCommand.trim().toLowerCase();

  switch (cleanCmd) {
    case 'help':
      return {
        type: 'list',
        content: [
          'AVAILABLE CLI COMMANDS:',
          '  whoami       - Executive full-stack background summary',
          '  cv           - Export full JSON resume payload',
          '  stack        - Technical stack breakdown by layer',
          '  projects     - List production case studies & integrations',
          '  metrics      - Display core performance & system metrics',
          '  contact      - Direct email, phone, & calendar booking links',
          '  clear        - Clear terminal console history',
          '  sudo hire    - Execute contract / leadership engagement hook',
        ],
      };

    case 'whoami':
      return {
        type: 'text',
        content: `${PERSONAL_DATA.name} | ${PERSONAL_DATA.role}\nLocation: ${PERSONAL_DATA.location}\nStatus: ${PERSONAL_DATA.status}\n\nSummary:\n${PERSONAL_DATA.subheadline}`,
      };

    case 'cv':
      return {
        type: 'json',
        content: {
          developer: PERSONAL_DATA.name,
          title: PERSONAL_DATA.role,
          email: PERSONAL_DATA.email,
          phone: PERSONAL_DATA.phone,
          github: PERSONAL_DATA.github,
          linkedin: PERSONAL_DATA.linkedin,
          experience_years: '1.5+ Years Production Delivery',
          teams_count: 6,
          core_stack: ['MERN', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Next.js', 'AI Agents'],
          education: 'BS Computer Science (FAST-NUCES)',
        },
      };

    case 'stack':
    case 'skills':
      return {
        type: 'list',
        content: TECH_STACK_SUMMARY.map(
          (group) => `[${group.category}]\n  ${group.items}`
        ),
      };

    case 'projects':
    case 'work':
      return {
        type: 'list',
        content: PROJECTS_SUMMARY.map(
          (p) => `▸ ${p.name} [${p.category}]\n  - ${p.tagline}`
        ),
      };

    case 'metrics':
    case 'stats':
      return {
        type: 'list',
        content: HERO_METRICS.map(
          (m) => `[METRIC] ${m.value} — ${m.label} (${m.detail})`
        ),
      };

    case 'contact':
      return {
        type: 'text',
        content: `Direct Email: ${PERSONAL_DATA.email}\nPhone: ${PERSONAL_DATA.phone}\nLinkedIn: ${PERSONAL_DATA.linkedin}\nGitHub: ${PERSONAL_DATA.github}\nSchedule Consultation: Click 'Consultation' in top bar or hero.`,
      };

    case 'sudo hire':
    case 'hire':
      return {
        type: 'success',
        content: `[EXEC SUCCESS 0x00]: Consultation request authorized.\nShahmeer Ali Akhtar is available for Q4 Contracts, Full-Stack Lead roles, & Systems Consulting.\n\nInitiating direct contact... Email: ${PERSONAL_DATA.email}`,
      };

    case 'clear':
      return {
        type: 'text',
        content: 'CLEAR_SIGNAL',
      };

    default:
      if (cleanCmd === '') {
        return { type: 'text', content: '' };
      }
      return {
        type: 'error',
        content: `zsh: command not found: '${inputCommand}'. Type 'help' to view available system commands.`,
      };
  }
}

function TerminalPlayground() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { command: 'whoami', output: executeTerminalCommand('whoami') },
    { command: 'metrics', output: executeTerminalCommand('metrics') },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const screenRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleRunCommand = (cmdToRun) => {
    const commandText = cmdToRun !== undefined ? cmdToRun : input;
    if (!commandText.trim()) return;

    const result = executeTerminalCommand(commandText);

    if (result.type === 'text' && result.content === 'CLEAR_SIGNAL') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: commandText, output: result }]);
    }

    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commandsOnly = history.map((h) => h.command);
      if (commandsOnly.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandsOnly.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandsOnly[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commandsOnly = history.map((h) => h.command);
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandsOnly.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIdx);
        setInput(commandsOnly[nextIdx] || '');
      }
    }
  };

  const shortcutButtons = [
    { label: 'help', cmd: 'help' },
    { label: 'cv.json', cmd: 'cv' },
    { label: 'stack', cmd: 'stack' },
    { label: 'projects', cmd: 'projects' },
    { label: 'sudo hire', cmd: 'sudo hire' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <div className="sp-terminal">
      {/* Titlebar */}
      <div className="sp-term-titlebar">
        <div className="sp-term-dots">
          <span className="sp-dot sp-dot-red" />
          <span className="sp-dot sp-dot-yellow" />
          <span className="sp-dot sp-dot-green" />
          <span className="sp-term-title">
            <TerminalIcon size={14} className="sp-icon-cyan" />
            <span>shahmeer@sys-core:~$ (zsh)</span>
          </span>
        </div>

        <div className="sp-term-live-tag">
          <span className="sp-sys-dot-ping" />
          <span>LIVE_INTERACTIVE_CLI</span>
        </div>
      </div>

      {/* Toolbar Shortcuts */}
      <div className="sp-term-toolbar">
        <span className="sp-term-toolbar-label">
          <Sparkles size={12} className="sp-icon-cyan" /> Quick Commands:
        </span>
        {shortcutButtons.map((btn) => (
          <button
            key={btn.cmd}
            onClick={() => handleRunCommand(btn.cmd)}
            className="sp-term-chip-btn"
          >
            ${btn.label}
          </button>
        ))}
      </div>

      {/* Screen Output */}
      <div className="sp-term-screen" ref={screenRef} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        <div className="sp-term-welcome">
          <p className="sp-term-welcome-title">
            <CheckCircle2 size={14} className="sp-icon-cyan" />
            <span>Shahmeer Ali Akhtar CLI Micro-Terminal v2.4.0</span>
          </p>
          <p>Type <span className="sp-text-green">'help'</span> or click the buttons above to inspect telemetry, CV data, and system stack.</p>
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="sp-term-entry">
            <div className="sp-term-cmd-line">
              <span className="sp-text-green">shahmeer@sys-core:~$</span>
              <span className="sp-text-cyan">{item.command}</span>
            </div>

            <div className="sp-term-output">
              {item.output.type === 'json' ? (
                <pre className="sp-term-json">
                  {JSON.stringify(item.output.content, null, 2)}
                </pre>
              ) : item.output.type === 'list' && Array.isArray(item.output.content) ? (
                <ul className="sp-term-list">
                  {item.output.content.map((line, lIdx) => (
                    <li key={lIdx}>{line}</li>
                  ))}
                </ul>
              ) : item.output.type === 'success' ? (
                <div className="sp-term-success">
                  {item.output.content}
                </div>
              ) : item.output.type === 'error' ? (
                <div className="sp-term-error">{item.output.content}</div>
              ) : (
                <div className="sp-term-text">{item.output.content}</div>
              )}
            </div>
          </div>
        ))}

        {/* Input prompt */}
        <div className="sp-term-prompt-line">
          <span className="sp-text-green">shahmeer@sys-core:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'cv'..."
            className="sp-term-input"
          />
          <button
            onClick={() => handleRunCommand()}
            className="sp-term-exec-btn"
            title="Execute"
          >
            <Play size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BentoGrid() {
  return (
    <section id="bento" className="sp-bento-section">
      <div className="sp-bento-container">
        {/* Section Header */}
        <div className="sp-bento-header">
          <div className="sp-bento-badge">
            <Layers size={14} />
            <span>Core Competencies &amp; Architectural Pillars</span>
          </div>
          <h2 className="sp-bento-title">
            High-leverage engineering across{' '}
            <span className="sp-title-cyan">full stack, enterprise APIs, &amp; agentic AI.</span>
          </h2>
          <p className="sp-bento-subtitle">
            Building robust web applications and distributed architectures that eliminate operational bottlenecks, optimize frontend performance, and scale reliably across engineering teams.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="sp-bento-grid">
          {/* Card 1: Full-Stack & Enterprise API Architecture (Col-span 7) */}
          <div className="sp-bento-card sp-bento-card-7">
            <div className="sp-card-top">
              <div className="sp-card-header">
                <div className="sp-card-icon-box sp-icon-emerald-bg">
                  <Globe size={24} className="sp-icon-emerald" />
                </div>
                <span className="sp-card-tag sp-tag-emerald">
                  35% Render Speedup &amp; MERN
                </span>
              </div>

              <h3 className="sp-card-title sp-hover-emerald">
                Full-Stack &amp; Enterprise Integration Architecture
              </h3>
              <p className="sp-card-desc">
                Production web applications built with React, Next.js, Node.js, Express, and MongoDB. Proven track record unifying NetSuite, Jira, KnowBe4, and DOKU Payments behind token-authenticated OAuth REST layers.
              </p>
            </div>

            <div className="sp-card-footer-grid">
              <div className="sp-footer-item">
                <Check size={14} className="sp-icon-emerald" />
                <span>MERN Stack Production Delivery</span>
              </div>
              <div className="sp-footer-item">
                <Check size={14} className="sp-icon-emerald" />
                <span>Next.js &amp; React Component Libraries</span>
              </div>
              <div className="sp-footer-item">
                <Check size={14} className="sp-icon-emerald" />
                <span>NetSuite / Jira / DOKU REST APIs</span>
              </div>
              <div className="sp-footer-item">
                <Check size={14} className="sp-icon-emerald" />
                <span>MongoDB Query &amp; Render Optimization</span>
              </div>
            </div>
          </div>

          {/* Card 2: Agentic Workflows & Applied AI (Col-span 5) */}
          <div className="sp-bento-card sp-bento-card-5">
            <div className="sp-card-top">
              <div className="sp-card-header">
                <div className="sp-card-icon-box sp-icon-teal-bg">
                  <Bot size={24} className="sp-icon-teal" />
                </div>
                <span className="sp-card-tag sp-tag-teal">
                  Actragen AI Engine
                </span>
              </div>

              <h3 className="sp-card-title sp-hover-teal">
                Agentic Workflows &amp; Applied AI
              </h3>
              <p className="sp-card-desc">
                Architecting autonomous agent workflows, LLM orchestration layers, SSE streaming interfaces, and speech NLP pipelines. Built platforms where 6 specialized AI agents cut manual report turnaround from 4 hours to under 10 minutes.
              </p>
            </div>

            <div className="sp-ai-callout">
              <Zap size={16} className="sp-icon-teal" />
              <span>Multi-agent workflow automation: 95.8% turnaround time reduction.</span>
            </div>
          </div>

          {/* Card 3: Microservices & Infrastructure (Col-span 5) */}
          <div className="sp-bento-card sp-bento-card-5">
            <div className="sp-card-top">
              <div className="sp-card-header">
                <div className="sp-card-icon-box sp-icon-cyan-bg">
                  <Cpu size={24} className="sp-icon-cyan" />
                </div>
                <span className="sp-card-tag sp-tag-cyan">
                  Microservices &amp; DevOps
                </span>
              </div>

              <h3 className="sp-card-title sp-hover-cyan">
                Microservices &amp; Infrastructure
              </h3>
              <p className="sp-card-desc">
                Experience in gRPC microservices, Docker containerization, GitHub Actions CI/CD pipelines, and cloud core networking at Huawei Technologies to support high availability and fault analysis.
              </p>
            </div>

            <div className="sp-card-stats-stack">
              <div className="sp-stat-row">
                <span>gRPC Binary Latency</span>
                <span className="sp-text-cyan font-bold">Low Overhead</span>
              </div>
              <div className="sp-stat-row">
                <span>Docker &amp; GitHub Actions</span>
                <span className="sp-text-cyan font-bold">Automated CI/CD</span>
              </div>
            </div>
          </div>

          {/* Card 4: Interactive Micro-Terminal (Col-span 7) */}
          <div className="sp-bento-card-7">
            <TerminalPlayground />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
