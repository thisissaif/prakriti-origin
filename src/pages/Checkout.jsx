import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import * as api from '../utils/api';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: 'Uttarakhand', pincode: ''
  });

  const shipping = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRazorpay = async () => {
    setLoading(true);

    try {
      // 1. Create order on server to get Razorpay ID
      const orderRes = await api.createRazorpayOrder(grandTotal);
      
      const options = {
        key: 'rzp_test_placeholder', // Should come from config in a real app
        amount: grandTotal * 100,
        currency: 'INR',
        name: 'Prakriti Origin',
        description: 'Order Payment',
        order_id: orderRes.id,
        handler: async function (response) {
          // 2. Verify payment on server
          try {
            const verifyRes = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            if (verifyRes.success) {
              const orderData = {
                items: cartItems,
                total: grandTotal,
                shipping,
                customer: formData,
                paymentMethod: 'online',
                paymentId: response.razorpay_payment_id,
                status: 'confirmed'
              };
              const saveRes = await api.createOrder(orderData);
              clearCart();
              navigate('/order-confirmation', { state: { order: { ...orderData, id: saveRes.id, date: saveRes.date } } });
            }
          } catch (error) {
            setLoading(false);
            alert('Payment verification failed.');
          }
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: '#0A2E1A' }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', () => {
          setLoading(false);
          alert('Payment failed. Please try again.');
        });
        rzp.open();
      } else {
        // Fallback demo for successful verification (bypassing real verification locally if no SDK)
        const verifyRes = await api.verifyPayment({
          razorpay_order_id: orderRes.id,
          razorpay_payment_id: 'demo_payment',
          razorpay_signature: '' // signature empty means it's demo bypass
        });
        
        if (verifyRes.success) {
          const orderData = {
            items: cartItems,
            total: grandTotal,
            shipping,
            customer: formData,
            paymentMethod: 'online',
            paymentId: 'demo_' + Date.now(),
            status: 'confirmed'
          };
          const saveRes = await api.createOrder(orderData);
          clearCart();
          navigate('/order-confirmation', { state: { order: { ...orderData, id: saveRes.id, date: saveRes.date } } });
        }
      }
    } catch (err) {
      setLoading(false);
      alert('Could not initialize payment.');
    }
  };

  const handleCOD = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems,
        total: grandTotal,
        shipping,
        customer: formData,
        paymentMethod: 'cod',
        paymentId: null,
        status: 'pending'
      };
      const saveRes = await api.createOrder(orderData);
      clearCart();
      navigate('/order-confirmation', { state: { order: { ...orderData, id: saveRes.id, date: saveRes.date } } });
    } catch (error) {
      setLoading(false);
      alert('Failed to place COD order.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'online') {
      handleRazorpay();
    } else {
      handleCOD();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="checkout page-transition">
      <div className="container">
        <button className="checkout__back" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Continue Shopping
        </button>

        <h1 className="checkout__title">Checkout</h1>

        <form onSubmit={handleSubmit} className="checkout__grid">
          <div className="checkout__left">
            <motion.div
              className="checkout__section glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3>📦 Delivery Details</h3>
              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
                </div>
                <div className="checkout__form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="checkout__form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
              </div>
              <div className="checkout__form-group">
                <label>Delivery Address *</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="House/Flat no., Street, Area" rows={3} />
              </div>
              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City" />
                </div>
                <div className="checkout__form-group">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                </div>
                <div className="checkout__form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="247667" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="checkout__section glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3>💳 Payment Method</h3>
              <div className="checkout__payment-options">
                <label className={`checkout__payment-option ${paymentMethod === 'online' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                  <CreditCard size={20} />
                  <div>
                    <h4>Pay Online (Razorpay)</h4>
                    <p>UPI, Cards, Netbanking, Wallets</p>
                  </div>
                </label>
                <label className={`checkout__payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <Truck size={20} />
                  <div>
                    <h4>Cash on Delivery</h4>
                    <p>Pay when you receive your order</p>
                  </div>
                </label>
              </div>
            </motion.div>
          </div>

          <div className="checkout__right">
            <motion.div
              className="checkout__summary glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3>Order Summary</h3>
              <div className="checkout__items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout__item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.shortName}</h4>
                      <span>{item.weight} × {item.quantity}</span>
                    </div>
                    <span className="checkout__item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="checkout__totals">
                <div className="checkout__total-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="checkout__total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {shipping === 0 && (
                  <p className="checkout__free-ship">🎉 Free shipping on orders above ₹500!</p>
                )}
                <div className="checkout__total-row checkout__total-row--final">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-accent btn-lg"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : paymentMethod === 'online' ?
                  <><Lock size={16} /> Pay ₹{grandTotal}</> :
                  <><Truck size={16} /> Place Order (COD)</>
                }
              </button>

              <div className="checkout__trust">
                <ShieldCheck size={16} />
                <span>100% Secure Payment • SSL Encrypted</span>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
