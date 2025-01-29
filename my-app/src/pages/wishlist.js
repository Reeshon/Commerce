import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useWishlist } from '../contexts/WishlistContext';
import MetaTags from '../components/MetaTags';

function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();

  return (
    <Container>
      <MetaTags 
        title="Wishlist - Deleen's Home Bake" 
        description="View and manage your wishlist items." 
        keywords="wishlist, home bake, cakes, bread, pastries, cookies" 
      />
      <h1 className="my-4">Your Wishlist</h1>
      <Row>
        {items.length === 0 ? (
          <Col>
            <p>Your wishlist is empty.</p>
          </Col>
        ) : (
          items.map(item => (
            <Col key={item.id} md={6} lg={4} className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>
                </div>
                <Button variant="danger" onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </Button>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Wishlist;