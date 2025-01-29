import React from 'react';
import { Form } from 'react-bootstrap';

function QuantitySelector({ quantity, onChange }) {
  return (
    <Form.Control
      type="number"
      min="1"
      max="100"
      value={quantity}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default QuantitySelector;
