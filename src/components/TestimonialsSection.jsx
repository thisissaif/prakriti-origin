import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'I\'ve been using Prakriti Origin\'s Moringa Powder for 3 months now. My energy levels have improved dramatically and I feel healthier than ever!',
    product: 'Moringa Powder'
  },
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'The jaggery powder is amazing! My family has completely switched from sugar. The taste is incredible and we feel good about eating natural.',
    product: 'Jaggery Powder'
  },
  {
    name: 'Anita Devi',
    location: 'Dehradun',
    rating: 5,
    text: 'Best quality organic products I\'ve found online. The packaging is beautiful and the products are as pure as they claim. Highly recommended!',
    product: 'Both Products'
  },
  {
    name: 'Vikram Singh',
    location: 'Haridwar',
    rating: 4,
    text: 'Switched to their jaggery powder 6 months ago. My digestion has improved and I love knowing it\'s chemical-free. Great value for money.',
    product: 'Jaggery Powder'
  },
  {
    name: 'Meera Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'The moringa powder is very fresh and fine-quality. I add it to my smoothies every morning. My skin and hair have never looked better!',
    product: 'Moringa Powder'
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Real stories from happy customers across India</p>
        </motion.div>

        <div className="testimonials-carousel">
          <div className="testimonials-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-slide">
                <div className="testimonial-card glass-card">
                  <Quote size={32} className="testimonial-card__quote" />
                  <p className="testimonial-card__text">{t.text}</p>
                  <div className="testimonial-card__rating">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} fill={j < t.rating ? '#C8A951' : 'none'} stroke="#C8A951" />
                    ))}
                  </div>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4>{t.name}</h4>
                      <span>{t.location} • {t.product}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials-dot ${i === current ? 'testimonials-dot--active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
