import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import QuantitySelector from './QuantitySelector.jsx';

function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <Container>Product not found</Container>;
  }

  return (
    <Container className="py-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        Back
      </Button>
      <Row>
        <Col md={6}>
          <Card.Img src={product.image} alt={product.name} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <h3 className="text-primary">${product.price}</h3>
          <p>{product.description}</p>
          <div className="mb-3">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
            />
          </div>
          <div className="d-flex gap-2">
            <Button onClick={() => addToCart(product, quantity)}>
              Add to Cart
            </Button>
            <Button variant="outline-primary" onClick={() => addToWishlist(product)}>
              Add to Wishlist
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
