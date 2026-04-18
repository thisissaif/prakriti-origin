import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Phone, ArrowRight } from 'lucide-react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="order-confirmation">
        <div className="container" style={{ textAlign: 'center', paddingTop: '150px' }}>
          <h2>No order found</h2>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation page-transition">
      <div className="container">
        <motion.div
          className="order-confirmation__card glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="order-confirmation__icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={64} />
          </motion.div>

          <h1>Order Confirmed! 🎉</h1>
          <p className="order-confirmation__subtitle">
            Thank you for your order. {order.paymentMethod === 'cod' ?
              'You can pay when your order arrives.' :
              'Payment received successfully.'
            }
          </p>

          <div className="order-confirmation__details">
            <div className="order-confirmation__row">
              <span>Order ID</span>
              <strong>{order.id}</strong>
            </div>
            <div className="order-confirmation__row">
              <span>Payment Method</span>
              <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</strong>
            </div>
            <div className="order-confirmation__row">
              <span>Total Amount</span>
              <strong>₹{order.total}</strong>
            </div>
            <div className="order-confirmation__row">
              <span>Delivery To</span>
              <strong>{order.customer.name}</strong>
            </div>
          </div>

          <div className="order-confirmation__items">
            <h3><Package size={18} /> Items Ordered</h3>
            {order.items.map(item => (
              <div key={item.id} className="order-confirmation__item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.shortName}</h4>
                  <span>{item.weight} × {item.quantity}</span>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="order-confirmation__contact">
            <Phone size={16} />
            <span>Questions? Call us at <a href="tel:+919193399740">+91 91933 99740</a></span>
          </div>

          <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: '20px' }}>
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
