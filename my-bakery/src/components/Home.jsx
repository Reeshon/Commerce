import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import Hero from './Hero.jsx';

function Home({ products }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({ ...prev, [productId]: value }));
  };

  const getQuantity = (productId) => quantities[productId] || 1;

  return (
    <>
      <Hero />
      <Container>
        <h1 className="mt-4 mb-4">Our Products</h1>
        <Row>
          {products.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="h-100" style={{ transition: 'transform 0.2s', ':hover': { transform: 'scale(1.05)' } }}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="mb-3">
                    <QuantitySelector
                      quantity={getQuantity(product.id)}
                      onChange={(value) => handleQuantityChange(product.id, value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button onClick={() => addToCart(product, getQuantity(product.id))} variant="primary">
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => addToWishlist(product)}
                    >
                      ♡ Wishlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
