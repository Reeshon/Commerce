import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
<<<<<<< HEAD
import ProductCard from './ProductCard.jsx';
=======
import ProductCard from './ProductCard';
>>>>>>> gh-pages

function Home() {
  const products = [
    {
      id: 1,
      name: "Classic Chocolate Cake",
      price: 29.99,
      image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
      description: "Rich chocolate layers with ganache"
    },
    {
      id: 2,
      name: "Artisan Bread",
      price: 6.99,
      image: "https://placehold.co/300x200/png?text=Artisan+Bread",
      description: "Freshly baked sourdough"
    },
    {
      id: 3,
      name: "Cupcake Box",
      price: 19.99,
      image: "https://placehold.co/300x200/png?text=Cupcake+Box",
      description: "Assorted flavors, box of 6"
    }
  ];

  return (
    <div>
      <div className="hero-section bg-light py-5 text-center">
        <Container>
          <h1>Welcome to Deleen's Home Bake</h1>
          <p className="lead">Discover our delicious homemade treats</p>
        </Container>
      </div>
      <Container className="my-4">
        <h2>Featured Products</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
