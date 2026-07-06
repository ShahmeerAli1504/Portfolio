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
    value: 'ShahmeerAli1504',
    href: 'https://github.com/ShahmeerAli1504',
    external: true,
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'shahmeer-ali1504',
    href: 'https://www.linkedin.com/in/shahmeer-ali1504/',
    external: true,
  },
];

function Contact() {
  const form = useRef();
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: '',
  });

  // Auto-dismiss the "copied" toast
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard API unavailable (http / old browser) — select-less fallback
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
    setFormStatus((s) => ({ ...s, submitting: true, error: false }));

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
          message: "Thanks for your message! I'll get back to you soon.",
        });
        form.current.reset();
      })
      .catch(() => {
        setFormStatus({
          submitting: false,
          submitted: false,
          error: true,
          message: 'Something went wrong. Please try again later.',
        });
      });
  };

  return (
    <section id="contact" className="contact section" data-num="05">
      <Constellation />

      <div className="section-head reveal">
        <span className="section-kicker">05 — Contact</span>
        <h2 className="section-title">Let's build something together</h2>
        <p className="section-sub">
          Have a project in mind, a role to fill, or just want to say hi?
          My inbox is always open.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info reveal reveal-left">
          {channels.map(({ icon: Icon, label, value, href, external, copyable }) => (
            <div key={label} className="contact-item-wrap">
              <a
                className="contact-item"
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <div className="contact-icon">
                  <Icon />
                </div>
                <div className="contact-text">
                  <span className="contact-label">{label}</span>
                  <span className="contact-value">{value}</span>
                </div>
              </a>
              {copyable && (
                <button
                  type="button"
                  className="copy-btn"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? <CheckCircleIcon width={18} height={18} /> : <CopyIcon width={18} height={18} />}
                </button>
              )}
            </div>
          ))}

          <div className="contact-availability">
            <ClockIcon width={18} height={18} />
            <span>
              Usually responds within <strong>24 hours</strong>
            </span>
            <CheckCircleIcon className="availability-check" width={16} height={16} />
          </div>
        </div>

        <div className="contact-form-container reveal reveal-right">
          {formStatus.submitted ? (
            <div className="form-success" role="status">
              <CheckCircleIcon width={44} height={44} />
              <p>{formStatus.message}</p>
            </div>
          ) : (
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <div className="form-row">
                <div className="form-group form-float">
                  <input
                    id="name"
                    name="user_name"
                    type="text"
                    placeholder=" "
                    autoComplete="name"
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-group form-float">
                  <input
                    id="email"
                    name="user_email"
                    type="email"
                    placeholder=" "
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="form-group form-float">
                <input id="subject" name="subject" type="text" placeholder=" " required />
                <label htmlFor="subject">Subject</label>
              </div>

              <div className="form-group form-float">
                <textarea id="message" name="message" placeholder=" " rows="5" required />
                <label htmlFor="message">Message</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <SendIcon width={18} height={18} />
                  </>
                )}
              </button>

              {formStatus.error && (
                <p className="form-error" role="alert">
                  {formStatus.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className={`toast ${copied ? 'toast-visible' : ''}`} role="status" aria-live="polite">
        {copied ? 'Email copied to clipboard ✓' : ''}
      </div>
    </section>
  );
}

export default Contact;
