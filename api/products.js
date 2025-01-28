
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Products Data
let products = [
  {
    id: 1,
    name: 'Chocolate Cake',
    description: 'Delicious dark chocolate cake.',
    price: 20,
    image: '/assets/images/product1.jpg'
  },
  // Add more products as needed
];

// Routes

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

module.exports = app;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
  // Add more products as needed
];

// Routes

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

module.exports = app;
app.use(bodyParser.json());

// Sample Products Data
let products = [
    description: 'Delicious dark chocolate cake.',
    price: 20,
    image: '/assets/images/product1.jpg'
  },
  {
    id: 1,
    name: 'Chocolate Cake',