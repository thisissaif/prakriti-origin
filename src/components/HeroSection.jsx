import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      {/* Floating Moringa Leaves */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`hero__leaf hero__leaf--${i + 1}`}>
          <svg viewBox="0 0 60 80" fill="none">
            <path d="M30 0C30 0 5 20 5 45C5 65 15 75 30 80C45 75 55 65 55 45C55 20 30 0 30 0Z" fill="rgba(34,139,34,0.15)" />
            <path d="M30 10C30 10 28 75 30 80" stroke="rgba(34,139,34,0.2)" strokeWidth="1" />
          </svg>
        </div>
      ))}

      {/* Sugarcane Decorations */}
      <div className="hero__cane hero__cane--left">
        <svg viewBox="0 0 30 400" fill="none">
          {[0, 60, 120, 180, 240, 300].map((y, i) => (
            <g key={i}>
              <rect x="8" y={y} width="14" height="55" rx="4" fill="rgba(200,169,81,0.12)" />
              <rect x="6" y={y + 52} width="18" height="6" rx="3" fill="rgba(200,169,81,0.18)" />
            </g>
          ))}
        </svg>
      </div>
      <div className="hero__cane hero__cane--right">
        <svg viewBox="0 0 30 400" fill="none">
          {[0, 60, 120, 180, 240, 300].map((y, i) => (
            <g key={i}>
              <rect x="8" y={y} width="14" height="55" rx="4" fill="rgba(200,169,81,0.12)" />
              <rect x="6" y={y + 52} width="18" height="6" rx="3" fill="rgba(200,169,81,0.18)" />
            </g>
          ))}
        </svg>
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles size={16} />
          <span>100% Organic & Natural</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Pure from <span className="hero__title-accent">Nature</span>,
          <br />Made for <span className="hero__title-accent">You</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Discover the power of organic Moringa & pure Cane Jaggery — 
          sourced from the pristine foothills of Uttarakhand.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button className="btn btn-accent btn-lg" onClick={scrollToProducts}>
            Shop Now
          </button>
          <button className="btn btn-outline btn-lg hero__btn-outline" onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            Our Story
          </button>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="hero__stat">
            <span className="hero__stat-number">100%</span>
            <span className="hero__stat-label">Organic</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">No</span>
            <span className="hero__stat-label">Chemicals</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">Farm</span>
            <span className="hero__stat-label">Fresh</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToProducts}
      >
        <span>Scroll Down</span>
        <ArrowDown size={18} className="hero__scroll-icon" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
