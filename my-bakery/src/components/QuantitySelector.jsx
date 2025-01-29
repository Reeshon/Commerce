import React from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';

function QuantitySelector({ quantity, onChange, max = 99 }) {
  const handleChange = (e) => {
    const value = Math.min(Math.max(1, Number(e.target.value)), max);
    onChange(value);
  };

  return (
    <InputGroup size="sm">
      <Button 
        variant="outline-secondary" 
        onClick={() => quantity > 1 && onChange(quantity - 1)}
      >
        -
      </Button>
      <Form.Control
        type="number"
        min="1"
        max={max}
        value={quantity}
        onChange={handleChange}
        style={{ maxWidth: '60px', textAlign: 'center' }}
      />
      <Button 
        variant="outline-secondary" 
        onClick={() => quantity < max && onChange(quantity + 1)}
      >
        +
      </Button>
    </InputGroup>
  );
}

export default QuantitySelector;
