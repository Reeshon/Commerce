import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { showToast } from '../../utils/toast';
import QuantitySelector from '../../components/QuantitySelector';
import MetaTags from '../../components/MetaTags';

function ProductDetail({ products }) {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  const handleGoBack = () => {
    router.back();
  };

  if (!product) {
    return <Container className="mt-4">Product not found</Container>;
  }

  return (
    <Container className="mt-4">
      <MetaTags 
        title={`${product.name} - Deleen's Home Bake`} 
        description={product.description} 
        keywords={`${product.name}, home bake, cakes, bread, pastries, cookies`} 
      />
      <Button variant="secondary" className="mb-3" onClick={handleGoBack}>
        Back
      </Button>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <h3 className="text-primary">${product.price}</h3>
          <p>{product.description}</p>
          {product.allergens && (
            <div className="mb-3">
              <h5>Allergens:</h5>
              {product.allergens.map(allergen => (
                <Badge key={allergen} bg="warning" className="me-2">{allergen}</Badge>
              ))}
            </div>
          )}
          <div className="mb-3">
            <label className="mb-2">Quantity:</label>
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
            />
          </div>
          <div className="d-grid gap-2">
            <Button 
              size="lg"
              onClick={() => {
                addToCart(product, quantity);
                showToast.success('Added to cart!');
              }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={() => {
                addToWishlist(product);
                showToast.success('Added to wishlist!');
              }}
            >
              Add to Wishlist
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
