import React, { useState } from 'react';
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


``` 
}

export default Search;
          <Col>
            <p>No products found matching your search.</p>
          </Col>
        )}
      </Row>
    </div>
  );
          </Col>
        ))}
        {results.length === 0 && query.trim() !== '' && (