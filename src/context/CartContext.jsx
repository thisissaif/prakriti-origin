import { createContext, useContext, useState, useEffect } from 'react';
import staticProducts from '../data/products';
import * as api from '../utils/api';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('prakriti-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [products, setProducts] = useState(staticProducts);

  useEffect(() => {
    api.fetchProducts().then(dbProducts => {
      setProducts(prev => prev.map(p => {
        // Map db id: 'p1'/'p2' or 'moringa-powder'. The DB has 'p1'. Wait, the static JS has id 'moringa-powder'.
        // My setupDB script inserted ids 'p1', 'p2', 'p3', 'p4'. Wait!! That's a mismatch!
        // In the setupDB I used 'p1' and 'p2'. Let me match by shortName instead, or name.
        const dbP = dbProducts.find(x => x.shortName === p.shortName);
        return dbP ? { ...p, price: dbP.price, originalPrice: dbP.originalPrice, inStock: dbP.inStock } : p;
      }));
    }).catch(console.error);
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('prakriti-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.shortName} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      products, cartItems, isCartOpen, setIsCartOpen, toast,
      addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal, showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};
