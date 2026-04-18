import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, Shield, Leaf, Award } from 'lucide-react';
import './AboutSection.css';

const stats = [
  { number: 500, suffix: '+', label: 'Happy Customers' },
  { number: 1000, suffix: '+', label: 'Orders Delivered' },
  { number: 100, suffix: '%', label: 'Organic & Natural' },
  { number: 2, suffix: '', label: 'Premium Products' },
];

const values = [
  { icon: <Leaf size={24} />, title: 'Organic', desc: 'Naturally grown, no chemicals' },
  { icon: <Heart size={24} />, title: 'Healthy', desc: 'Packed with essential nutrients' },
  { icon: <Shield size={24} />, title: 'Pure', desc: 'No preservatives or additives' },
  { icon: <Award size={24} />, title: 'Quality', desc: 'Hand-picked & carefully processed' },
];

const Counter = ({ target, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  return (
    <section className="about-section section" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Story</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Born from the pristine foothills of Uttarakhand, 
            we bring nature's purest offerings to your table.
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="about-text__heading">
              From <span>Uttarakhand's Fields</span> to Your Home
            </h3>
            <p>
              At <strong>Prakriti Origin</strong>, we believe that the best things come from nature — 
              pure, untouched, and powerful. Our journey started with a simple mission: to bring the 
              extraordinary benefits of Moringa and the natural sweetness of Cane Jaggery to every Indian household.
            </p>
            <p>
              Every product we offer is sourced directly from organic farms in the foothills of Uttarakhand, 
              where the soil is rich, the air is clean, and nature thrives in its purest form. We work closely 
              with local farmers, ensuring sustainable practices and fair trade.
            </p>
            <p>
              No chemicals. No preservatives. No compromises. Just pure, honest goodness — 
              the way nature intended it.
            </p>
          </motion.div>

          <motion.div
            className="about-values"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {values.map((item, i) => (
              <motion.div
                key={i}
                className="about-value glass-card"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="about-value__icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="about-stat">
              <span className="about-stat__number">
                <Counter target={stat.number} suffix={stat.suffix} />
              </span>
              <span className="about-stat__label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
