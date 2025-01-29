import React from 'react';
<<<<<<< HEAD

function Wishlist() {
  return (
    <div>
      <h1>Wishlist</h1>
      {/* Add more content as needed */}
    </div>
=======
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Toast } from './Toast';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <Container className="py-5">
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center my-5">
          <h3>Your wishlist is empty</h3>
          <Button as={Link} to="/" variant="primary">Browse Products</Button>
        </div>
      ) : (
        <Row>
          {wishlistItems.map(item => (
            <Col key={item.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => {
                        addToCart(item, 1);
                        Toast.success('Added to cart!');
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        removeFromWishlist(item.id);
                        Toast.success('Removed from wishlist');
                      }}
                    >
                      Remove from Wishlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
>>>>>>> gh-pages
  );
}

export default Wishlist;