import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.jpeg" alt="Prakriti Origin Logo" style={{ height: '40px', width: 'auto', borderRadius: '50%' }} />
          <div className="navbar__logo-text">
            <span className="navbar__brand">Prakriti</span>
            <span className="navbar__brand-sub">Origin</span>
          </div>
        </Link>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <button onClick={() => scrollToSection('home')} className="navbar__link">Home</button>
          <button onClick={() => scrollToSection('products')} className="navbar__link">Products</button>
          <button onClick={() => scrollToSection('about')} className="navbar__link">About</button>
          <button onClick={() => scrollToSection('benefits')} className="navbar__link">Benefits</button>
          <Link to="/track" className="navbar__link" onClick={() => setMenuOpen(false)}>Track Order</Link>
          <button onClick={() => scrollToSection('contact')} className="navbar__link">Contact</button>
        </div>

        <div className="navbar__actions">
          <button className="navbar__cart" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          <button className="navbar__menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
