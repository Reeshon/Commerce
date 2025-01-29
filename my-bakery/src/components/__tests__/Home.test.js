import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';
import { CartProvider } from '../../contexts/CartContext';
import { WishlistProvider } from '../../contexts/WishlistContext';

const mockProducts = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    price: 29.99,
    image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
    description: "Rich chocolate layers with ganache",
    category: "cakes"
  },
  {
    id: 2,
    name: "Artisan Bread",
    price: 6.99,
    image: "https://placehold.co/300x200/png?text=Artisan+Bread",
    description: "Freshly baked sourdough",
    category: "bread"
  }
];

test('renders product categories', () => {
  render(
    <CartProvider>
      <WishlistProvider>
        <Home />
      </WishlistProvider>
    </CartProvider>
  );

  expect(screen.getByText(/cakes/i)).toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();
});

test('renders products', () => {
  render(
    <CartProvider>
      <WishlistProvider>
        <Home />
      </WishlistProvider>
    </CartProvider>
  );

  mockProducts.forEach(product => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});

test('adds product to cart', () => {
  render(
    <CartProvider>
      <WishlistProvider>
        <Home />
      </WishlistProvider>
    </CartProvider>
  );

  const addToCartButton = screen.getAllByText(/Add to Cart/i)[0];
  fireEvent.click(addToCartButton);

  expect(screen.getByText(/Added to cart!/i)).toBeInTheDocument();
});
