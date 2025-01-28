
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory Cart Data
let cart = [];

// Routes

// Get all cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/cart', (req, res) => {
  const { product, quantity } = req.body;
  const existingItem = cart.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  res.status(201).json(cart);
});

// Update cart item quantity
app.put('/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Product not found in cart' });
  }
});

// Remove item from cart
app.delete('/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  cart = cart.filter(item => item.product.id !== productId);
  res.json(cart);
});

module.exports = app;
    cart.push({ product, quantity });
  }
  const { quantity } = req.body;
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Product not found in cart' });
  }
});

// Remove item from cart
app.delete('/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  cart = cart.filter(item => item.product.id !== productId);
  res.json(cart);
});

module.exports = app;
  res.status(201).json(cart);
});

// Update cart item quantity
app.put('/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const existingItem = cart.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
  const { product, quantity } = req.body;
  res.json(cart);
});

// Add item to cart
app.post('/cart', (req, res) => {
let cart = [];

// Routes

// Get all cart items
app.get('/cart', (req, res) => {

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory Cart Data
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');