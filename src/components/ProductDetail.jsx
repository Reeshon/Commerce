import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'react-toastify';

function ProductDetail({ products }) {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <Container className="mt-4">Product not found</Container>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">{product.name}</Card.Title>
              <Card.Text className="fs-4 text-primary">
                ${product.price.toFixed(2)}
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant={isInWishlist(product.id) ? "danger" : "outline-danger"}
                  size="lg"
                  onClick={toggleWishlist}
                >
                  {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
