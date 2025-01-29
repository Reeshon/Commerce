import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderManagement from '../Admin/OrderManagement';
import { AuthProvider } from '../../contexts/AuthContext';
import { getAllOrders, updateOrderStatus } from '../../services/database';

jest.mock('../../services/database');

const mockOrders = [
  { id: 1, userEmail: 'test1@example.com', createdAt: '2024-01-15', total: 56.97, status: 'Delivered' },
  { id: 2, userEmail: 'test2@example.com', createdAt: '2024-01-10', total: 29.99, status: 'Processing' }
];

getAllOrders.mockResolvedValue(mockOrders);

test('renders order management', async () => {
  render(
    <AuthProvider>
      <OrderManagement />
    </AuthProvider>
  );

  expect(await screen.findByText(/Order Management/i)).toBeInTheDocument();
  mockOrders.forEach(order => {
    expect(screen.getByText(order.userEmail)).toBeInTheDocument();
    expect(screen.getByText(`$${order.total}`)).toBeInTheDocument();
    expect(screen.getByText(order.status)).toBeInTheDocument();
  });
});

test('updates order status', async () => {
  render(
    <AuthProvider>
      <OrderManagement />
    </AuthProvider>
  );

  fireEvent.click(await screen.findByText(/Manage/i));
  fireEvent.click(screen.getByText(/Mark as shipped/i));

  expect(updateOrderStatus).toHaveBeenCalledWith(1, 'shipped');
});
