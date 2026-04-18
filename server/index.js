const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { setupDB, Product, Order, User, Contact } = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Products API
app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.put('/api/products/:id', authenticateJWT, async (req, res) => {
  const { price, inStock } = req.body;
  try {
    await Product.findOneAndUpdate({ id: req.params.id }, { price, inStock });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database update failed' });
  }
});

// Orders & Contact API
app.post('/api/contact', async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database update failed' });
  }
});

app.get('/api/contact', authenticateJWT, async (req, res) => {
  const messages = await Contact.find({}).sort({ date: -1 });
  res.json(messages);
});

app.delete('/api/contact/:id', authenticateJWT, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.post('/api/orders', async (req, res) => {
  const { items, total, shipping, customer, paymentMethod, paymentId, status } = req.body;
  const id = 'ORD-' + Date.now();
  const date = new Date().toISOString();

  await Order.create({
    id, items, total, shipping, customer, paymentMethod, paymentId, status, date
  });
  
  res.json({ success: true, id, date });
});

app.get('/api/orders', authenticateJWT, async (req, res) => {
  // Sort descending by date
  const orders = await Order.find({}).sort({ date: -1 });
  res.json(orders);
});

app.put('/api/orders/:id/status', authenticateJWT, async (req, res) => {
  const { status } = req.body;
  await Order.findOneAndUpdate({ id: req.params.id }, { status });
  res.json({ success: true });
});

app.delete('/api/orders/:id', authenticateJWT, async (req, res) => {
  await Order.findOneAndDelete({ id: req.params.id });
  res.json({ success: true });
});

// Razorpay API
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

app.post('/api/payment/create-order', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: 'rcpt_' + Date.now()
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Razorpay order creation failed' });
  }
});

app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder');
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  
  if (hmac.digest('hex') === razorpay_signature) {
    res.json({ success: true });
  } else {
    // Demo bypass
    if (!razorpay_signature) return res.json({ success: true }); 
    res.status(400).json({ error: 'Signature mismatch' });
  }
});

const PORT = process.env.PORT || 5000;

setupDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(console.error);
