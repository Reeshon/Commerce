import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Welcome to Commerce</h1>
          <p>Explore our online store!</p>
          <div className="d-grid gap-2">
            <Button as={Link} to="/products" variant="primary">
              View Products
            </Button>
            <Button as={Link} to="/cart" variant="secondary">
              Go to Cart
            </Button>
            <Button as={Link} to="/wishlist" variant="info">
              View Wishlist
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;