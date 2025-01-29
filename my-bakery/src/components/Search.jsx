import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Search({ products }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    setSuggestions(filtered);
  };

  return (
    <div className="position-relative">
      <Form className="d-flex mx-3">
        <Form.Control
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="me-2"
        />
      </Form>
      {suggestions.length > 0 && query && (
        <ListGroup className="position-absolute w-100 mt-1">
          {suggestions.map(product => (
            <ListGroup.Item 
              key={product.id}
              action
              onClick={() => {
                navigate(`/product/${product.id}`);
                setQuery('');
                setSuggestions([]);
              }}
            >
              {product.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Search;
