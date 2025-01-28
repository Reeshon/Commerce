
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Products Data (should be shared or fetched from a common source)
const products = [
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

// Search products
app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  res.json(results);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Search API is running on port ${PORT}`);
});