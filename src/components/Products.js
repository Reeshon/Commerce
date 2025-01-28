import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { AppContext } from './App';
import { fetchProducts, addToCartAPI, addToWishlistAPI, searchProductsAPI } from '../services/api';

function Products() {
  const { addToCart, addToWishlist, searchQuery } = useContext(AppContext);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = searchQuery ? await searchProductsAPI(searchQuery) : await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, [searchQuery]);

  const handleQuantityChange = (e, productName) => {
    setQuantities({
      ...quantities,
      [productName]: parseInt(e.target.value) || 1,
    });
  };

  const handleAddToCart = async (product) => {
    const quantity = quantities[product.name] || 1;
    try {
      await addToCartAPI(product, quantity);
      addToCart(product, quantity);
      alert(`${product.name} has been added to your cart.`);
    } catch {
      alert('Failed to add product to cart.');
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      await addToWishlistAPI(product);
      addToWishlist(product);
      alert(`${product.name} has been added to your wishlist.`);
    } catch {
      alert('Failed to add product to wishlist.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Our Products</h2>
      <Row>
        {products.map((product, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Price: ${product.price}</strong></Card.Text>
                <Form.Group controlId={`quantity-${index}`} className="mb-2">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantities[product.name] || 1}
                    onChange={(e) => handleQuantityChange(e, product.name)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button variant="secondary" onClick={() => handleAddToWishlist(product)}>
                  Add to Wishlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;