import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import {
  MailIcon,
  GitHubIcon,
  LinkedInIcon,
  SendIcon,
  CheckCircleIcon,
} from './Icons';

const channels = [
  {
    icon: MailIcon,
    label: 'Email',
    value: 'shahmeerali1504@gmail.com',
    href: 'mailto:shahmeerali1504@gmail.com',
    external: false,
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
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: '',
  });

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
    <section id="contact" className="contact section">
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
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
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
          ))}
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
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="user_name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="user_email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project…"
                  rows="5"
                  required
                />
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
    </section>
  );
}

export default Contact;
