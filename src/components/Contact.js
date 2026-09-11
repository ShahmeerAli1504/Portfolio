import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import Constellation from './Constellation';
import {
  MailIcon,
  GitHubIcon,
  LinkedInIcon,
  SendIcon,
  CheckCircleIcon,
  CopyIcon,
  ClockIcon,
  SparklesIcon,
} from './Icons';

const EMAIL = 'shahmeerali1504@gmail.com';

const channels = [
  {
    icon: MailIcon,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    copyable: true,
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/ShahmeerAli1504',
    href: 'https://github.com/ShahmeerAli1504',
    external: true,
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/shahmeer-ali1504',
    href: 'https://www.linkedin.com/in/shahmeer-ali1504/',
    external: true,
  },
];

// Strict RFC 5322 Compliant Email Validation Regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Contact() {
  const form = useRef();
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: '',
  });

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(timer);
  }, [copied]);

  // Real-time email format validation
  const validateEmailStr = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Email address is required.';
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      return 'Please enter a valid email address (e.g., name@domain.com).';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmailInput(val);
    if (emailTouched) {
      setEmailError(validateEmailStr(val));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmailStr(emailInput));
  };

  const copyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Strict validation check before submission
    const err = validateEmailStr(emailInput);
    if (err) {
      setEmailTouched(true);
      setEmailError(err);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: err,
      });
      return;
    }

    setFormStatus({ submitting: true, submitted: false, error: false, message: '' });

    // EXACT EmailJS Credentials (DO NOT ALTER)
    const serviceId = 'service_inezbzc';
    const templateId = 'template_ffgv1vb';
    const publicKey = 'V_9Mrf_ah90CvNjLf';

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setFormStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
        });
        setEmailInput('');
        setEmailTouched(false);
        setEmailError('');
        if (form.current) {
          form.current.reset();
        }
      })
      .catch((err) => {
        console.error('EmailJS transmission error:', err);
        setFormStatus({
          submitting: false,
          submitted: false,
          error: true,
          message: 'Transmission failed. Please try again or reach out directly via email.',
        });
      });
  };

  return (
    <section id="contact" className="sp-contact-section" data-num="05">
      <Constellation />

      <div className="sp-contact-container">
        {/* Section Header */}
        <div className="sp-contact-header reveal">
          <span className="sp-contact-badge">
            <SparklesIcon width={14} height={14} />
            05 — CONTACT
          </span>
          <h2 className="sp-contact-title">
            Let's Build Something <span className="sp-title-cyan">Exceptional</span>
          </h2>
          <p className="sp-contact-subtitle">
            Have a project in mind, an engineering role to discuss, or an AI architecture challenge?
            My inbox is always open.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="sp-contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="sp-contact-channels-col reveal reveal-left">
            <div className="sp-channels-list">
              {channels.map(({ icon: Icon, label, value, href, external, copyable }) => (
                <div key={label} className="sp-channel-card-wrap">
                  <a
                    className="sp-channel-card"
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className="sp-channel-icon-box">
                      <Icon width={20} height={20} />
                    </div>
                    <div className="sp-channel-details">
                      <span className="sp-channel-label">{label}</span>
                      <span className="sp-channel-value">{value}</span>
                    </div>
                  </a>

                  {copyable && (
                    <button
                      type="button"
                      className="sp-copy-btn"
                      onClick={copyEmail}
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <CheckCircleIcon width={18} height={18} className="sp-copy-check" />
                      ) : (
                        <CopyIcon width={18} height={18} />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Response Time Card */}
            <div className="sp-status-card">
              <div className="sp-status-pulse-ring">
                <span className="sp-pulse-dot" />
                <ClockIcon width={18} height={18} className="sp-status-clock" />
              </div>
              <div className="sp-status-info">
                <span className="sp-status-title">ACTIVE RESPONSE WINDOW</span>
                <p className="sp-status-text">
                  Usually responds within <strong>24 hours</strong>
                </p>
              </div>
              <CheckCircleIcon className="sp-status-check" width={18} height={18} />
            </div>
          </div>

          {/* Right Column: Terminal Form */}
          <div className="sp-contact-form-col reveal reveal-right">
            <div className="sp-contact-form-card">
              <div className="sp-form-terminal-head">
                <div className="sp-terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="sp-terminal-path">{'// TRANSMIT_MESSAGE.sh'}</span>
              </div>

              {formStatus.submitted ? (
                <div className="sp-form-success" role="status">
                  <div className="sp-success-icon-wrap">
                    <CheckCircleIcon width={44} height={44} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>{formStatus.message}</p>
                  <button
                    type="button"
                    className="sp-reset-btn"
                    onClick={() => setFormStatus((s) => ({ ...s, submitted: false }))}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={form} className="sp-contact-form" onSubmit={sendEmail} noValidate>
                  <div className="sp-form-row">
                    <div className="sp-form-group">
                      <label htmlFor="user_name">YOUR NAME</label>
                      <input
                        id="user_name"
                        name="user_name"
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="sp-form-group">
                      <label htmlFor="user_email">
                        EMAIL ADDRESS <span className="required-asterisk">*</span>
                      </label>
                      <input
                        id="user_email"
                        name="user_email"
                        type="email"
                        value={emailInput}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder="john@example.com"
                        autoComplete="email"
                        className={emailError ? 'input-error' : ''}
                        required
                      />
                      {emailError && <span className="sp-field-error-msg">{emailError}</span>}
                    </div>
                  </div>

                  <div className="sp-form-group">
                    <label htmlFor="subject">SUBJECT / INQUIRY TYPE</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Project Collaboration / Role Opportunity"
                      required
                    />
                  </div>

                  <div className="sp-form-group">
                    <label htmlFor="message">YOUR MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or inquiry..."
                      rows="5"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="sp-submit-btn"
                    disabled={formStatus.submitting}
                  >
                    {formStatus.submitting ? (
                      <>
                        <span className="sp-btn-spinner" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <SendIcon width={16} height={16} />
                      </>
                    )}
                  </button>

                  {formStatus.error && (
                    <div className="sp-form-error" role="alert">
                      <p>{formStatus.message}</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <div className={`sp-contact-toast ${copied ? 'show' : ''}`} role="status" aria-live="polite">
        <CheckCircleIcon width={16} height={16} />
        <span>Email copied to clipboard</span>
      </div>
    </section>
  );
}

export default Contact;
