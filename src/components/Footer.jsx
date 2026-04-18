import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Share2, Globe, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,20 1440,40 L1440,100 L0,100 Z" fill="var(--color-primary-dark)" />
        </svg>
      </div>
      <div className="footer__content">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon"><Leaf size={20} /></div>
                <div>
                  <span className="footer__brand-name">Prakriti</span>
                  <span className="footer__brand-sub">Origin</span>
                </div>
              </div>
              <p className="footer__tagline">
                Pure from Nature, Made for You. Bringing organic goodness from the foothills of Uttarakhand to your doorstep.
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-link"><Share2 size={18} /></a>
                <a href="#" className="footer__social-link"><Globe size={18} /></a>
                <a href="#" className="footer__social-link"><MessageCircle size={18} /></a>
              </div>
            </div>

            <div className="footer__section">
              <h4 className="footer__heading">Quick Links</h4>
              <button onClick={() => scrollToSection('home')} className="footer__link-btn">Home</button>
              <button onClick={() => scrollToSection('products')} className="footer__link-btn">Products</button>
              <button onClick={() => scrollToSection('about')} className="footer__link-btn">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="footer__link-btn">Contact</button>
            </div>

            <div className="footer__section">
              <h4 className="footer__heading">Our Products</h4>
              <Link to="/product/moringa-powder" className="footer__link">Moringa Powder</Link>
              <Link to="/product/jaggery-powder" className="footer__link">Jaggery Powder</Link>
            </div>

            <div className="footer__section">
              <h4 className="footer__heading">Contact Info</h4>
              <a href="tel:+919193399740" className="footer__contact">
                <Phone size={16} /> +91 91933 99740
              </a>
              <a href="mailto:info@prakritiorigin.com" className="footer__contact">
                <Mail size={16} /> info@prakritiorigin.com
              </a>
              <div className="footer__contact">
                <MapPin size={16} />
                <span>369/2, New Adarsh Nagar,<br />Roorkee (247667), Uttarakhand</span>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p>&copy; {new Date().getFullYear()} Prakriti Origin. All rights reserved.</p>
            <p className="footer__made">Made with 🌿 in Uttarakhand</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
