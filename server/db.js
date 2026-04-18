const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  shortName: String,
  price: Number,
  originalPrice: Number,
  weight: String,
  category: String,
  inStock: Boolean,
  image: String,
  rating: Number,
  reviews: Number,
  description: String,
  benefits: String
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  id: String,
  items: Array,
  total: Number,
  shipping: Number,
  customer: Object,
  paymentMethod: String,
  paymentId: String,
  status: String,
  date: String
});
const Order = mongoose.model('Order', orderSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

async function setupDB() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prakriti';
  // Use latest parser setup automatically handled by mongoose v6+
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Seed Admin
  const bcrypt = require('bcrypt');
  const admin = await User.findOne({ username: 'admin' });
  if (!admin) {
    const hash = await bcrypt.hash('prakriti@admin', 10);
    await User.create({ username: 'admin', password: hash });
  }

  // Seed Products
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Seeding initial products into MongoDB...');
    const staticProducts = [
      { id: 'p1', name: 'Premium Moringa Leaf Powder', shortName: 'Moringa Powder', price: 299, originalPrice: 399, weight: '100g', category: 'Powder', inStock: true, image: 'https://images.unsplash.com/photo-1615486171440-4f5bfdbef923?auto=format&fit=crop&q=80', rating: 4.8, reviews: 124, description: '100% natural, finely ground moringa leaf powder. Packed with essential vitamins, minerals, and antioxidants.', benefits: 'Boosts immunity|Improves energy levels|Rich in antioxidants|Supports digestion' },
      { id: 'p2', name: 'Premium Moringa Leaf Powder', shortName: 'Moringa Powder', price: 499, originalPrice: 699, weight: '250g', category: 'Powder', inStock: true, image: 'https://images.unsplash.com/photo-1628795054173-10d6a4220b32?auto=format&fit=crop&q=80', rating: 4.9, reviews: 86, description: '100% natural, finely ground moringa leaf powder. Packed with essential vitamins, minerals, and antioxidants.', benefits: 'Boosts immunity|Improves energy levels|Rich in antioxidants|Supports digestion' },
      { id: 'p3', name: 'Pure Cane Jaggery Powder', shortName: 'Jaggery Powder', price: 199, originalPrice: 249, weight: '500g', category: 'Sweetener', inStock: true, image: 'https://images.unsplash.com/photo-1623594247551-7fb1403bf6cc?auto=format&fit=crop&q=80', rating: 4.7, reviews: 210, description: 'Chemical-free, naturally processed cane jaggery powder. The perfect healthy alternative to refined white sugar.', benefits: 'Natural sweetener|Rich in iron|Aids digestion|Cleanses the body' },
      { id: 'p4', name: 'Pure Cane Jaggery Powder', shortName: 'Jaggery Powder', price: 349, originalPrice: 450, weight: '1kg', category: 'Sweetener', inStock: true, image: 'https://images.unsplash.com/photo-1542442828-287217bfb805?auto=format&fit=crop&q=80', rating: 4.8, reviews: 156, description: 'Chemical-free, naturally processed cane jaggery powder. The perfect healthy alternative to refined white sugar.', benefits: 'Natural sweetener|Rich in iron|Aids digestion|Cleanses the body' }
    ];
    await Product.insertMany(staticProducts);
  }
}

module.exports = { setupDB, Product, Order, User };
