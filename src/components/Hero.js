import React from 'react';
import './Hero.css';
import { ArrowRight, Calendar, Layers, ShieldCheck, Terminal, Globe, Activity, Download } from 'lucide-react';

const PERSONAL_DATA = {
  name: 'Shahmeer Ali',
  role: 'Full-Stack & Systems Engineer',
  status: 'Available for Q4 High-Impact Contracts & Technical Leadership',
  headline: 'Full-Stack & Systems Engineer ',
  gradientText: 'crafting high-performance web applications & distributed architectures.',
  subheadline:
    'Full-stack engineer with 1.5+ years shipping production web applications across six engineering teams. Strongest in the MERN stack (React, Node, Express, MongoDB), enterprise integrations (NetSuite, Jira, KnowBe4, DOKU), and multi-agent AI platforms released via zero-downtime CI/CD.',
  cvPath: '/ShahmeerAli_FullStackEngineer_CV.pdf',
};

const HERO_METRICS = [
  {
    value: '6+',
    label: 'Engineering Teams Delivered Across',
    detail: 'Production MERN & Full-Stack deployments',
  },
  {
    value: '35%',
    label: 'Render & Latency Speedup',
    detail: 'React memoization & query optimization',
  },
  {
    value: '< 10m',
    label: 'Multi-Agent Workflow Time',
    detail: 'Cut down from 4-hour manual processes',
  },
  {
    value: '99.99%',
    label: 'High Availability Focus',
    detail: 'Enterprise-grade stability & uptime',
  },
];

function StatusBadge() {
  return (
    <div className="sp-hero-status-pill">
      <span className="sp-status-ping-wrapper">
        <span className="sp-status-ping" />
        <span className="sp-status-solid" />
      </span>
      <Activity size={14} className="sp-status-icon" />
      <span className="sp-status-text">{PERSONAL_DATA.status}</span>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="sp-stats-wrapper">
      <div className="sp-stats-grid">
        {HERO_METRICS.map((metric) => (
          <div key={metric.label} className="sp-stat-card">
            <div className="sp-stat-value">{metric.value}</div>
            <div className="sp-stat-label">{metric.label}</div>
            <div className="sp-stat-detail">{metric.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="sp-hero-section">
      {/* Ambient Radial Background Glows */}
      <div className="sp-hero-glow sp-hero-glow-cyan" />
      <div className="sp-hero-glow sp-hero-glow-emerald" />

      <div className="sp-hero-container">
        <div className="sp-hero-content">
          {/* Status Pill */}
          <div className="sp-hero-status-center">
            <StatusBadge />
          </div>

          {/* Positioning Headline */}
          <h1 className="sp-hero-title">
            {PERSONAL_DATA.headline}
            <span className="sp-hero-title-gradient">
              {PERSONAL_DATA.gradientText}
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="sp-hero-description">
            {PERSONAL_DATA.subheadline}
          </p>

          {/* Quick Technical Tag Chips */}
          <div className="sp-hero-chips">
            <span className="sp-chip sp-chip-cyan">
              <Globe size={14} /> Full-Stack MERN &amp; Next.js
            </span>
            <span className="sp-chip sp-chip-emerald">
              <Terminal size={14} /> Autonomous Agent Tooling
            </span>
            <span className="sp-chip sp-chip-teal">
              <Layers size={14} /> Enterprise NetSuite/Jira APIs
            </span>
            <span className="sp-chip sp-chip-zinc">
              <ShieldCheck size={14} /> FAST-NUCES CS Graduate
            </span>
          </div>

          {/* Action CTAs */}
          <div className="sp-hero-actions">
            <a href="#contact" className="sp-hero-btn sp-hero-btn-primary">
              <Calendar size={16} />
              <span>Schedule Technical Consultation</span>
              <ArrowRight size={16} className="sp-hero-arrow" />
            </a>

            <a href="#projects" className="sp-hero-btn sp-hero-btn-ghost">
              <span>Explore Case Studies</span>
            </a>

            <a
              href={PERSONAL_DATA.cvPath}
              download="ShahmeerAli_FullStackEngineer_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="sp-hero-btn sp-hero-btn-ghost"
            >
              <Download size={16} className="sp-icon-cyan" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Metric Strip */}
          <StatsBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
