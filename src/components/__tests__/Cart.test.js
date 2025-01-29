import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../Cart';
import { CartProvider } from '../../contexts/CartContext';

const mockCartItems = [
  {
    productId: 1,
    name: "Classic Chocolate Cake",
    price: 29.99,
    quantity: 1
  },
  {
    productId: 2,
    name: "Artisan Bread",
    price: 6.99,
    quantity: 2
  }
];

test('renders cart items', () => {
  render(
    <CartProvider value={{ items: mockCartItems }}>
      <Cart />
    </CartProvider>
  );

  mockCartItems.forEach(item => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Quantity: ${item.quantity}`)).toBeInTheDocument();
  });
});

test('removes item from cart', () => {
  const removeFromCart = jest.fn();
  render(
    <CartProvider value={{ items: mockCartItems, removeFromCart }}>
      <Cart />
    </CartProvider>
  );

  fireEvent.click(screen.getAllByText(/Remove/i)[0]);
  expect(removeFromCart).toHaveBeenCalledWith(1);
});
