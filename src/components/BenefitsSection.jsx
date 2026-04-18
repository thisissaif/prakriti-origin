import { motion } from 'framer-motion';
import { Zap, Heart, Brain, Sun, Droplets, Shield, Flame, Wind } from 'lucide-react';
import './BenefitsSection.css';

const moringaBenefits = [
  { icon: <Zap size={22} />, title: 'Energy Boost', desc: 'Natural energy without caffeine crash' },
  { icon: <Shield size={22} />, title: 'Immunity', desc: 'Strengthens immune response' },
  { icon: <Brain size={22} />, title: 'Brain Health', desc: 'Supports cognitive function' },
  { icon: <Heart size={22} />, title: 'Heart Health', desc: 'Helps manage cholesterol levels' },
];

const jaggeryBenefits = [
  { icon: <Droplets size={22} />, title: 'Blood Purifier', desc: 'Natural blood cleansing properties' },
  { icon: <Flame size={22} />, title: 'Digestion', desc: 'Stimulates digestive enzymes' },
  { icon: <Sun size={22} />, title: 'Rich in Iron', desc: 'Prevents iron deficiency anemia' },
  { icon: <Wind size={22} />, title: 'Detox', desc: 'Flushes out toxins from body' },
];

const BenefitsSection = () => {
  return (
    <section className="benefits-section section" id="benefits">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Why Choose Our Products?</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Discover the incredible health benefits packed in every spoonful
          </p>
        </motion.div>

        <div className="benefits-grid">
          <motion.div
            className="benefits-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="benefits-block__title">
              <span className="benefits-block__emoji">🌿</span>
              Moringa Powder Benefits
            </h3>
            <div className="benefits-items">
              {moringaBenefits.map((b, i) => (
                <motion.div
                  key={i}
                  className="benefit-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="benefit-item__icon benefit-item__icon--green">{b.icon}</div>
                  <div>
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="benefits-block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="benefits-block__title">
              <span className="benefits-block__emoji">🍯</span>
              Jaggery Powder Benefits
            </h3>
            <div className="benefits-items">
              {jaggeryBenefits.map((b, i) => (
                <motion.div
                  key={i}
                  className="benefit-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="benefit-item__icon benefit-item__icon--gold">{b.icon}</div>
                  <div>
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
