import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import './ProductsSection.css';

const ProductsSection = () => {
  const { products } = useCart();
  return (
    <section className="products-section section" id="products">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Products</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Handpicked organic goodness from the heart of Uttarakhand — 
            only two, but the best.
          </p>
        </motion.div>

        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
