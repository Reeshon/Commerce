import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from './ProductCard';

function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <Container className="my-4">
      <h2>My Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {wishlistItems.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Text>Your wishlist is empty.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Wishlist;