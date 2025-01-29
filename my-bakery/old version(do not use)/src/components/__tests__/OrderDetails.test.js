import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderDetails from '../Admin/OrderDetails';
import { AuthProvider } from '../../contexts/AuthContext';
import { getOrderDetails } from '../../services/database';

jest.mock('../../.services/database');

const mockOrder = {
  id: 1,
  userEmail: 'test@example.com',
  createdAt: '2024-01-15',
  total: 56.97,
  status: 'Delivered',
  items: [
    { productId: 1, name: 'Product 1', quantity: 2, price: 10.99 },
    { productId: 2, name: 'Product 2', quantity: 1, price: 34.99 }
  ]
};

getOrderDetails.mockResolvedValue(mockOrder);

test('renders order details', async () => {
  render(
    <AuthProvider>
      <OrderDetails />
    </AuthProvider>
  );

  expect(await screen.findByText(/Order Details/i)).toBeInTheDocument();
  expect(screen.getByText(mockOrder.userEmail)).toBeInTheDocument();
  expect(screen.getByText(`$${mockOrder.total}`)).toBeInTheDocument();
  mockOrder.items.forEach(item => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`Quantity: ${item.quantity}`)).toBeInTheDocument();
    expect(screen.getByText(`$${(item.price * item.quantity).toFixed(2)}`)).toBeInTheDocument();
  });
});
