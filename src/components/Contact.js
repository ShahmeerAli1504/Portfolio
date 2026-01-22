import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const form = useRef();
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });

    const serviceId = 'service_inezbzc';
    const templateId = 'template_ffgv1vb';
    const publicKey = 'V_9Mrf_ah90CvNjLf';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setFormStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: 'Thanks for your message! I\'ll get back to you soon.'
        });
        form.current.reset();
      })
      .catch((error) => {
        console.error('Email sending failed:', error.text);
        setFormStatus({
          submitting: false,
          submitted: false,
          error: true,
          message: 'Something went wrong. Please try again later.'
        });
      });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2>Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item fade-in show">
              <div className="contact-icon">
                <i className="far fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <a href="mailto:shahmeerali1504@gmail.com">shahmeerali1504@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-item fade-in show">
              <div className="contact-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="contact-text">
                <h3>GitHub</h3>
                <a href="https://github.com/ShahmeerAli1504" target="_blank" rel="noopener noreferrer">ShahmeerAli1504</a>
              </div>
            </div>
            
            <div className="contact-item fade-in show">
              <div className="contact-icon">
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="contact-text">
                <h3>LinkedIn</h3>
                <a href="https://www.linkedin.com/in/shahmeer-ali1504/" target="_blank" rel="noopener noreferrer">shahmeer-ali1504</a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className="form-success-message fade-in show">
                <i className="fas fa-check-circle"></i>
                <p>{formStatus.message}</p>
              </div>
            ) : (
              <form ref={form} className="contact-form fade-in show" onSubmit={sendEmail}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    id="name"
                    name="user_name" 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email"
                    name="user_email" 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    placeholder="Your Message" 
                    rows="5" 
                    required 
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn" disabled={formStatus.submitting}>
                  {formStatus.submitting ? 'Sending...' : (
                    <>
                      <span>Send Message</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>
                
                {formStatus.error && (
                  <div className="form-error-message">
                    <p>{formStatus.message}</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
