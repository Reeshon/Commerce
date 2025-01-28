
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

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

// Start Server
app.listen(PORT, () => {
  console.log(`Products API is running on port ${PORT}`);
});