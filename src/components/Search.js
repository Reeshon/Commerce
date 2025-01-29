<<<<<<< HEAD
import React from 'react';

function Search() {
  return (
    <div>
      <h1>Search</h1>
      {/* Add more content as needed */}
=======
import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Search({ products = [] }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleProductSelect = (product) => {
    setQuery('');
    setSuggestions([]);
    navigate(`/product/${product.id}`);
  };

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    });

    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
  };

  return (
    <div className="position-relative">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="me-2"
        />
      </Form>
      {suggestions.length > 0 && query && (
        <ListGroup className="position-absolute w-100 mt-1 shadow-sm" style={{ zIndex: 1000 }}>
          {suggestions.map(product => (
            <ListGroup.Item 
              key={product.id} 
              action 
              className="d-flex justify-content-between align-items-center"
              onClick={() => handleProductSelect(product)}
            >
              <span>{product.name}</span>
              <span className="text-muted">${product.price}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
>>>>>>> gh-pages
    </div>
  );
}

<<<<<<< HEAD
export default Search;
=======
export default Search;
>>>>>>> gh-pages
