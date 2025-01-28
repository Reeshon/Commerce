
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory Wishlist Data
let wishlist = [];

// Routes

// Get all wishlist items
app.get('/wishlist', (req, res) => {
  res.json(wishlist);
});

// Add item to wishlist
app.post('/wishlist', (req, res) => {
  const { product } = req.body;
  const existingItem = wishlist.find(item => item.id === product.id);
  if (!existingItem) {
    wishlist.push(product);
    res.status(201).json(wishlist);
  } else {
    res.status(400).json({ message: 'Product already in wishlist' });
  }
});

// Remove item from wishlist
app.delete('/wishlist/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  wishlist = wishlist.filter(item => item.id !== productId);
  res.json(wishlist);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Wishlist API is running on port ${PORT}`);
});