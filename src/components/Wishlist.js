import React, { useContext } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { AppContext } from './App';
import { removeFromWishlistAPI, addToCartAPI } from '../services/api';

function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(AppContext);

  const handleRemove = async (productName) => {
    try {
      await removeFromWishlistAPI(productName);
      removeFromWishlist(productName);
    } catch {
      alert('Failed to remove item from wishlist.');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCartAPI(product, 1);
      addToCart(product, 1);
      alert(`${product.name} has been added to your cart.`);
    } catch {
      alert('Failed to add product to cart.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlistItems.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>Price: ${product.price}</strong></Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(product.name)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Wishlist;