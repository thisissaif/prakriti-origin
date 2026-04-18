import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="product-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -8 }}
    >
      {product.discount && (
        <div className="product-card__badge">-{product.discount}%</div>
      )}

      <Link to={`/product/${product.id}`} className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" />
        <div className="product-card__image-overlay">
          <Eye size={20} />
          <span>View Details</span>
        </div>
      </Link>

      <div className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <p className="product-card__desc">{product.shortDescription}</p>

        <div className="product-card__rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#C8A951' : 'none'} stroke="#C8A951" />
          ))}
          <span>({product.reviews})</span>
        </div>

        <div className="product-card__bottom">
          <div className="product-card__price">
            <span className="product-card__price-current">₹{product.price}</span>
            {product.originalPrice && (
              <span className="product-card__price-original">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            className="product-card__cart-btn"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
