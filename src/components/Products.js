import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Products() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      image: "https://via.placeholder.com/150",
      description: "This is product 1"
    },
    {
      id: 2,
      name: "Product 2",
      price: 149.99,
      image: "https://via.placeholder.com/150",
      description: "This is product 2"
    },
    {
      id: 3,
      name: "Product 3",
      price: 199.99,
      image: "https://via.placeholder.com/150",
      description: "This is product 3"
    }
  ];

  return (
    <Container className="mt-4">
      <h1>Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;