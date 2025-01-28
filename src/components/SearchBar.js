import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AppContext } from './App';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // The search functionality is already handled via context in Products component
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="outline-success" type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;