import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, error: false });
    setTimeout(() => setFormStatus({ submitted: false, error: false }), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <div className="section-underline"></div>
          <p className="contact-intro">Have a question or want to work together? Feel free to reach out!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="far fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <a href="mailto:shahmeerali1504@gmail.com">shahmeerali1504@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="contact-text">
                <h3>GitHub</h3>
                <a href="https://github.com/ShahmeerAli1504" target="_blank" rel="noopener noreferrer">ShahmeerAli1504</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="contact-text">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/shahmeer-ali1504" target="_blank" rel="noopener noreferrer">shahmeer-ali1504</a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className="form-success-message">
                <i className="fas fa-check-circle"></i>
                <p>Thanks for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    onChange={handleChange} 
                    value={formData.name}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    onChange={handleChange} 
                    value={formData.email}
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
                    onChange={handleChange}
                    value={formData.message}
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
