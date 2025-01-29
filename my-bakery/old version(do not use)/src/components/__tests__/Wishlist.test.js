import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Wishlist from '../Wishlist';
import { WishlistProvider } from '../../contexts/WishlistContext';

const mockWishlistItems = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    price: 29.99,
    image: "https://placehold.co/300x200/png?text=Chocolate+Cake"
  },
  {
    id: 2,
    name: "Artisan Bread",
    price: 6.99,
    image: "https://placehold.co/300x200/png?text=Artisan+Bread"
  }
];

test('renders wishlist items', () => {
  render(
    <WishlistProvider value={{ items: mockWishlistItems }}>
      <Wishlist />
    </WishlistProvider>
  );

  mockWishlistItems.forEach(item => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
  });
});

test('removes item from wishlist', () => {
  const removeFromWishlist = jest.fn();
  render(
    <WishlistProvider value={{ items: mockWishlistItems, removeFromWishlist }}>
      <Wishlist />
    </WishlistProvider>
  );

  fireEvent.click(screen.getAllByText(/Remove/i)[0]);
  expect(removeFromWishlist).toHaveBeenCalledWith(1);
});
