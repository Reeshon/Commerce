import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const filterProducts = () => {
    // This would typically fetch from an API or filter a larger product list
    // For now, returning sample filtered products
    return [
      {
        id: 1,
        name: "Classic Chocolate Cake",
        price: 29.99,
        image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
        description: "Rich chocolate layers with ganache"
      }
    ];
  };

  const searchResults = filterProducts();

  return (
    <Container className="my-4">
      <h2>Search Results for: {query}</h2>
      {searchResults.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {searchResults.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Text>No products found matching your search.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Search;
