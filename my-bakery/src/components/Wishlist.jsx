import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Your wishlist is empty</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2>My Wishlist</h2>
      <Row>
        {wishlistItems.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline-danger"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wishlist;