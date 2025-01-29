import React, { useState } from 'react';
<<<<<<< HEAD
import { Form, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Search({ products }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col sm={10}>
            <FormControl 
              type="text" 
              placeholder="Search for products..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
          </Col>
          <Col sm={2}>
            <Button variant="primary" type="submit" className="w-100">Search</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        {results.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Link to={`/product/${product.id}`} className="text-decoration-none">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
        {results.length === 0 && query.trim() !== '' && (
          <Col>
            <p>No products found matching your search.</p>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Search;
=======
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const [searchResults] = useState([
    {
      id: 1,
      name: "Classic Chocolate Cake",
      price: 29.99,
      image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
      description: "Rich chocolate layers with ganache"
    },
    {
      id: 2,
      name: "Artisan Bread",
      price: 6.99,
      image: "https://placehold.co/300x200/png?text=Artisan+Bread",
      description: "Freshly baked sourdough"
    }
  ]);

  return (
    <Container className="my-4">
      <h2>Search Results for: {query}</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {searchResults.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {searchResults.length === 0 && (
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
>>>>>>> gh-pages
