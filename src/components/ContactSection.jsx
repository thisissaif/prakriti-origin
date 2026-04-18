import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import * as api from '../utils/api';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitContactForm(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-info__card">
              <h3>Contact Information</h3>
              <p>Reach out to us through any of these channels</p>

              <div className="contact-info__items">
                <a href="tel:+919193399740" className="contact-info__item">
                  <div className="contact-info__icon"><Phone size={20} /></div>
                  <div>
                    <h4>Phone</h4>
                    <span>+91 91933 99740</span>
                  </div>
                </a>

                <a href="mailto:info@prakritiorigin.com" className="contact-info__item">
                  <div className="contact-info__icon"><Mail size={20} /></div>
                  <div>
                    <h4>Email</h4>
                    <span>info@prakritiorigin.com</span>
                  </div>
                </a>

                <div className="contact-info__item">
                  <div className="contact-info__icon"><MapPin size={20} /></div>
                  <div>
                    <h4>Address</h4>
                    <span>369/2, New Adarsh Nagar,<br />Roorkee (247667), Uttarakhand</span>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon"><Clock size={20} /></div>
                  <div>
                    <h4>Working Hours</h4>
                    <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="contact-form__group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="contact-form__group">
                <label>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you need..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                {submitted ? '✓ Message Sent!' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
