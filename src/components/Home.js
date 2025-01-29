<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
=======
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, ButtonGroup } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Toast } from './Toast';
import QuantitySelector from './QuantitySelector';
import Image from 'next/image';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const categories = ['all', 'cakes', 'bread', 'pastries', 'cookies'];
  
  const products = [
    {
      id: 1,
      name: "Classic Chocolate Cake",
      price: 29.99,
      image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
      description: "Rich chocolate layers with ganache",
      category: "cakes"
    },
    {
      id: 2,
      name: "Artisan Bread",
      price: 6.99,
      image: "https://placehold.co/300x200/png?text=Artisan+Bread",
      description: "Freshly baked sourdough",
      category: "bread"
    },
    {
      id: 3,
      name: "Cupcake Box",
      price: 19.99,
      image: "https://placehold.co/300x200/png?text=Cupcake+Box",
      description: "Assorted flavors, box of 6",
      category: "pastries"
    },
    {
      id: 4,
      name: "Cookie Box",
      price: 12.99,
      image: "https://placehold.co/300x200/png?text=Cookie+Box",
      description: "Assorted cookies, dozen",
      category: "cookies",
      ingredients: ["flour", "sugar", "butter", "eggs"],
      allergens: ["nuts", "dairy"]
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleQuantityChange = (id, value) => {
    const quantity = Math.min(Math.max(1, Number(value)), 100);
    setQuantities({...quantities, [id]: quantity});
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    Toast.success('Added to cart!');
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    Toast.success('Added to wishlist!');
  };

>>>>>>> gh-pages
  return (
    <Container>
      <Row className="my-4">
        <Col>
<<<<<<< HEAD
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
=======
          <h1>Welcome to Deleen's Home Bake</h1>
          <ButtonGroup className="mb-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline-primary"}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 product-card">
              <Image 
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                style={{ cursor: 'pointer' }}
                onClick={() => handleShowDetails(product)}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <div className="mb-3">
                  <QuantitySelector
                    quantity={quantities[product.id] || 1}
                    onChange={(value) => handleQuantityChange(product.id, value)}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="primary" 
                    onClick={() => handleAddToCart(product, quantities[product.id] || 1)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => handleAddToWishlist(product)}
                  >
                    ♡ Wishlist
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  className="p-0 mb-2"
                  onClick={() => handleShowDetails(product)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    width={300}
                    height={200}
                    className="img-fluid" 
                  />
                </Col>
                <Col md={6}>
                  <h4>${selectedProduct.price}</h4>
                  <p>{selectedProduct.description}</p>
                  {selectedProduct.ingredients && (
                    <>
                      <h5>Ingredients:</h5>
                      <p>{selectedProduct.ingredients.join(', ')}</p>
                    </>
                  )}
                  {selectedProduct.allergens && (
                    <>
                      <h5>Allergens:</h5>
                      {selectedProduct.allergens.map(allergen => (
                        <Badge key={allergen} bg="warning" className="me-1">
                          {allergen}
                        </Badge>
                      ))}
                    </>
                  )}
                  <Form.Group className="mt-3">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="100"
                      value={quantities[selectedProduct.id] || 1}
                      onChange={(e) => handleQuantityChange(selectedProduct.id, e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  handleAddToCart(selectedProduct, quantities[selectedProduct.id] || 1);
                  setShowModal(false);
                }}
              >
                Add to Cart
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
>>>>>>> gh-pages
    </Container>
  );
}

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> gh-pages
