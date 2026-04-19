import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, ArrowRight, CheckCircle, Truck, MapPin, XCircle } from 'lucide-react';
import * as api from '../utils/api';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setLoading(true);
    setError('');
    setOrderData(null);
    
    try {
      const data = await api.trackOrder(orderId.trim());
      setOrderData(data);
    } catch(err) {
      setError('Order not found. Please check your Order ID.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch(status) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  return (
    <div className="track-order page-transition section">
      <div className="container">
        <motion.div 
          className="track-order__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Track Your Order</h1>
          <div className="gold-divider" />
          <p className="section-subtitle">Enter your Order ID below to track your delivery status.</p>
        </motion.div>

        <motion.div 
          className="track-order__search-box glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleTrack} className="track-order__form">
            <div className="track-order__input-wrapper">
              <Search className="track-order__search-icon" size={20} />
              <input 
                type="text" 
                placeholder="e.g., ORD-1712435..." 
                value={orderId} 
                onChange={(e) => setOrderId(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
          {error && <p className="track-order__error">{error}</p>}
        </motion.div>

        {orderData && (
          <motion.div 
            className="track-order__result glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="track-order__info">
              <h3>Order <span>{orderData.id}</span></h3>
              <p>Placed on: {new Date(orderData.date).toLocaleString()}</p>
              <p>Total: <strong>₹{orderData.total}</strong> ({orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'})</p>
            </div>

            <div className="track-order__status-container">
              {orderData.status === 'cancelled' ? (
                <div className="track-order__cancelled">
                  <XCircle size={40} color="#e74c3c" />
                  <h2>Order Cancelled</h2>
                  <p>This order has been cancelled.</p>
                </div>
              ) : (
                <div className="track-order__timeline">
                  <div className={`timeline-step ${getStatusStep(orderData.status) >= 1 ? 'active' : ''}`}>
                    <div className="timeline-icon"><Package size={20} /></div>
                    <p>Pending</p>
                  </div>
                  <div className={`timeline-line ${getStatusStep(orderData.status) >= 2 ? 'active' : ''}`} />
                  <div className={`timeline-step ${getStatusStep(orderData.status) >= 2 ? 'active' : ''}`}>
                    <div className="timeline-icon"><CheckCircle size={20} /></div>
                    <p>Confirmed</p>
                  </div>
                  <div className={`timeline-line ${getStatusStep(orderData.status) >= 3 ? 'active' : ''}`} />
                  <div className={`timeline-step ${getStatusStep(orderData.status) >= 3 ? 'active' : ''}`}>
                    <div className="timeline-icon"><Truck size={20} /></div>
                    <p>Shipped</p>
                  </div>
                  <div className={`timeline-line ${getStatusStep(orderData.status) >= 4 ? 'active' : ''}`} />
                  <div className={`timeline-step ${getStatusStep(orderData.status) >= 4 ? 'active' : ''}`}>
                    <div className="timeline-icon"><MapPin size={20} /></div>
                    <p>Delivered</p>
                  </div>
                </div>
              )}
            </div>

            <div className="track-order__items">
              <h4>Items in Order</h4>
              <ul>
                {orderData.items.map(item => (
                  <li key={item.id}>
                    <span>{item.quantity}x {item.shortName} ({item.weight})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
