import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../ProductForm';

test('renders product form', () => {
  render(<ProductForm onSubmit={jest.fn()} />);

  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Stock/i)).toBeInTheDocument();
});

test('submits product form', () => {
  const handleSubmit = jest.fn();
  render(<ProductForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Product' } });
  fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10.99' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'https://example.com/image.jpg' } });
  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });
  fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '100' } });

  fireEvent.click(screen.getByText(/Save Product/i));

  expect(handleSubmit).toHaveBeenCalled();
});
