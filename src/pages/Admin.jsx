import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, LogOut, 
  TrendingUp, Users, IndianRupee, Eye, Trash2, 
  Check, X, Edit3, Save, Plus, Minus, Search,
  Leaf, MessageCircle
} from 'lucide-react';
import * as api from '../utils/api';
import './Admin.css';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem('prakriti-admin');
    if (auth === 'true') setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadOrders();
      loadProducts();
      loadMessages();
    }
  }, [authenticated]);

  const loadMessages = async () => {
    try {
      const data = await api.fetchMessages();
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await api.fetchOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await api.fetchProducts();
      setProductList(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.adminLogin('admin', password);
      sessionStorage.setItem('prakriti-token', res.token);
      sessionStorage.setItem('prakriti-admin', 'true');
      setAuthenticated(true);
      setError('');
    } catch (e) {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('prakriti-admin');
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.updateOrderStatus(orderId, status);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.deleteOrder(orderId);
      setOrders(orders.filter(o => o.id !== orderId));
    } catch (e) {
      alert('Failed to delete order');
    }
  };

  const updateProductPrice = async (productId, newPrice) => {
    const p = productList.find(x => x.id === productId);
    try {
      await api.updateProduct(productId, { price: Number(newPrice), inStock: p.inStock });
      setProductList(productList.map(x => x.id === productId ? { ...x, price: Number(newPrice) } : x));
    } catch (e) {
      alert('Failed to update price');
    }
  };

  const toggleProductStock = async (productId) => {
    const p = productList.find(x => x.id === productId);
    try {
      await api.updateProduct(productId, { price: p.price, inStock: !p.inStock });
      setProductList(productList.map(x => x.id === productId ? { ...x, inStock: !x.inStock } : x));
    } catch (e) {
      alert('Failed to update stock');
    }
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="admin-login">
        <motion.div 
          className="admin-login__card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="admin-login__logo">
            <Leaf size={32} />
          </div>
          <h2>Admin Panel</h2>
          <p>Prakriti Origin Management</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <span className="admin-login__error">{error}</span>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
          <button className="admin-login__back" onClick={() => navigate('/')}>
            ← Back to Website
          </button>
        </motion.div>
      </div>
    );
  }

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const confirmedOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'delivered').length;

  const filteredOrders = orders.filter(o => 
    o.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin__sidebar">
        <div className="admin__sidebar-logo">
          <Leaf size={24} />
          <div>
            <span>Prakriti</span>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav className="admin__nav">
          <button
            className={`admin__nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            className={`admin__nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingCart size={18} /> Orders
            {pendingOrders > 0 && <span className="admin__badge">{pendingOrders}</span>}
          </button>
          <button
            className={`admin__nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} /> Products
          </button>
          <button
            className={`admin__nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageCircle size={18} /> Messages
          </button>
        </nav>

        <button className="admin__logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin__main">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="admin__dashboard">
            <h2>Dashboard Overview</h2>
            <div className="admin__stats-grid">
              <div className="admin__stat-card admin__stat-card--revenue">
                <IndianRupee size={24} />
                <div>
                  <span className="admin__stat-value">₹{totalRevenue.toLocaleString()}</span>
                  <span className="admin__stat-label">Total Revenue</span>
                </div>
              </div>
              <div className="admin__stat-card admin__stat-card--orders">
                <ShoppingCart size={24} />
                <div>
                  <span className="admin__stat-value">{totalOrders}</span>
                  <span className="admin__stat-label">Total Orders</span>
                </div>
              </div>
              <div className="admin__stat-card admin__stat-card--pending">
                <TrendingUp size={24} />
                <div>
                  <span className="admin__stat-value">{pendingOrders}</span>
                  <span className="admin__stat-label">Pending Orders</span>
                </div>
              </div>
              <div className="admin__stat-card admin__stat-card--customers">
                <Users size={24} />
                <div>
                  <span className="admin__stat-value">{confirmedOrders}</span>
                  <span className="admin__stat-label">Completed Orders</span>
                </div>
              </div>
            </div>

            <div className="admin__recent">
              <h3>Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="admin__empty">No orders yet</p>
              ) : (
                <table className="admin__table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td><strong>{order.id}</strong></td>
                        <td>{order.customer?.name}</td>
                        <td>₹{order.total}</td>
                        <td>{order.paymentMethod === 'cod' ? 'COD' : 'Online'}</td>
                        <td>
                          <span className={`admin__status admin__status--${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="admin__orders">
            <div className="admin__orders-header">
              <h2>Order Management</h2>
              <div className="admin__search">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="admin__empty">No orders found</p>
            ) : (
              <div className="admin__orders-list">
                {filteredOrders.map(order => (
                  <div key={order.id} className="admin__order-card">
                    <div className="admin__order-header">
                      <div>
                        <strong>{order.id}</strong>
                        <span className="admin__order-date">
                          {new Date(order.date).toLocaleString()}
                        </span>
                      </div>
                      <span className={`admin__status admin__status--${order.status}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="admin__order-customer">
                      <p><strong>{order.customer?.name}</strong></p>
                      <p>{order.customer?.phone} • {order.customer?.email}</p>
                      <p>{order.customer?.address}, {order.customer?.city} - {order.customer?.pincode}</p>
                    </div>

                    <div className="admin__order-items">
                      {order.items?.map(item => (
                        <div key={item.id} className="admin__order-item">
                          <span>{item.shortName} ({item.weight})</span>
                          <span>× {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="admin__order-footer">
                      <div>
                        <span>Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                        {order.paymentId && <span> • ID: {order.paymentId}</span>}
                      </div>
                      <strong>Total: ₹{order.total}</strong>
                    </div>

                    <div className="admin__order-actions">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button className="admin__delete-btn" onClick={() => deleteOrder(order.id)}>
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="admin__products">
            <h2>Product Management</h2>
            <div className="admin__products-grid">
              {productList.map(product => (
                <div key={product.id} className="admin__product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="admin__product-info">
                    <h3>{product.name}</h3>
                    <p>{product.category} • {product.weight}</p>
                    
                    <div className="admin__product-price-edit">
                      <label>Price (₹):</label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProductPrice(product.id, e.target.value)}
                        min="1"
                      />
                    </div>

                    <div className="admin__product-stock">
                      <span>Stock Status:</span>
                      <button
                        className={`admin__stock-toggle ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
                        onClick={() => toggleProductStock(product.id)}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </div>

                    <div className="admin__product-meta">
                      <span>⭐ {product.rating} ({product.reviews} reviews)</span>
                      <span>Original: ₹{product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <div className="admin__orders">
            <div className="admin__orders-header">
              <h2>Contact Messages</h2>
            </div>
            {messages.length === 0 ? (
              <p className="admin__empty">No messages found</p>
            ) : (
              <div className="admin__orders-list">
                {messages.map(msg => (
                  <div key={msg._id} className="admin__order-card">
                    <div className="admin__order-header">
                      <div>
                        <strong>{msg.name}</strong>
                        <span className="admin__order-date">
                          {new Date(msg.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="admin__order-customer">
                      <p>{msg.phone} • {msg.email}</p>
                    </div>
                    <div className="admin__order-items">
                      <p style={{ marginTop: '10px', fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="admin__modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin__modal" onClick={e => e.stopPropagation()}>
            <h3>Order Details</h3>
            <pre>{JSON.stringify(selectedOrder, null, 2)}</pre>
            <button className="btn btn-primary" onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
