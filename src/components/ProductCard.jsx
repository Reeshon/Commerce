import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // ...existing code...

  return (
    <Card className="h-100">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price.toFixed(2)}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
        <Button 
          variant={isInWishlist(product.id) ? "danger" : "outline-danger"}
          onClick={toggleWishlist}
        >
          {isInWishlist(product.id) ? "♥" : "♡"}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
