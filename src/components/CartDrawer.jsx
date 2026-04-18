import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-drawer__header">
              <h3><ShoppingBag size={20} /> Your Cart ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="cart-drawer__close">
                <X size={22} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-drawer__empty">
                <ShoppingBag size={48} />
                <p>Your cart is empty</p>
                <button className="btn btn-primary btn-sm" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <img src={item.image} alt={item.name} className="cart-item__image" />
                      <div className="cart-item__info">
                        <h4>{item.shortName}</h4>
                        <span className="cart-item__weight">{item.weight}</span>
                        <span className="cart-item__price">₹{item.price}</span>
                      </div>
                      <div className="cart-item__actions">
                        <div className="cart-item__qty">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="cart-drawer__footer">
                  <div className="cart-drawer__total">
                    <span>Total</span>
                    <span className="cart-drawer__total-amount">₹{cartTotal}</span>
                  </div>
                  <button className="btn btn-accent btn-lg" style={{ width: '100%' }} onClick={handleCheckout}>
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
