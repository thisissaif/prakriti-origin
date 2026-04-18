import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeft, Minus, Plus, Leaf, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, products } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);
  const otherProduct = products.find(p => p.id !== id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail__not-found">
        <h2>Product Not Found</h2>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="product-detail page-transition">
      <div className="container">
        <button className="product-detail__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="product-detail__main">
          <motion.div
            className="product-detail__image-wrap"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-detail__badge">-{product.discount}%</div>
            <img src={product.image} alt={product.name} className="product-detail__image" />
          </motion.div>

          <motion.div
            className="product-detail__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="product-detail__category">{product.category}</span>
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__tagline">{product.tagline}</p>

            <div className="product-detail__rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? '#C8A951' : 'none'} stroke="#C8A951" />
              ))}
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="product-detail__price-row">
              <span className="product-detail__price">₹{product.price}</span>
              <span className="product-detail__original-price">₹{product.originalPrice}</span>
              <span className="product-detail__save">Save ₹{product.originalPrice - product.price}</span>
            </div>

            <p className="product-detail__weight">Weight: {product.weight}</p>
            <p className="product-detail__desc">{product.description}</p>

            <div className="product-detail__qty-row">
              <div className="product-detail__qty">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingBag size={18} /> Add to Cart — ₹{product.price * quantity}
              </button>
            </div>

            <div className="product-detail__features">
              <div><Check size={16} /> 100% Organic</div>
              <div><Check size={16} /> No Chemicals</div>
              <div><Check size={16} /> Free Shipping</div>
              <div><Check size={16} /> COD Available</div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="product-detail__tabs">
          <div className="product-detail__tab-headers">
            {['description', 'benefits', 'howToUse', 'nutrition'].map(tab => (
              <button
                key={tab}
                className={`product-detail__tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'howToUse' ? 'How to Use' : tab === 'nutrition' ? 'Nutrition Info' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            className="product-detail__tab-content glass-card"
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'benefits' && (
              <ul className="product-detail__benefits">
                {product.benefits.map((b, i) => (
                  <li key={i}><Leaf size={16} /> {b}</li>
                ))}
              </ul>
            )}
            {activeTab === 'howToUse' && (
              <ul className="product-detail__how">
                {product.howToUse.map((h, i) => (
                  <li key={i}><span>{i + 1}</span>{h}</li>
                ))}
              </ul>
            )}
            {activeTab === 'nutrition' && (
              <table className="product-detail__nutrition">
                <tbody>
                  {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                    <tr key={key}><td>{key}</td><td>{val}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </div>

        {/* Other Product */}
        {otherProduct && (
          <div className="product-detail__related">
            <h3>You Might Also Like</h3>
            <Link to={`/product/${otherProduct.id}`} className="product-detail__related-card glass-card">
              <img src={otherProduct.image} alt={otherProduct.name} />
              <div>
                <h4>{otherProduct.name}</h4>
                <p>{otherProduct.shortDescription}</p>
                <span className="product-detail__related-price">₹{otherProduct.price}</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
