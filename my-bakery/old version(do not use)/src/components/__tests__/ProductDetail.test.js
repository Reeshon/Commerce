import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetail from '../ProductDetail';
import { CartProvider } from '../../contexts/CartContext';
import { WishlistProvider } from '../../contexts/WishlistContext';

const mockProducts = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    price: 29.99,
    image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
    description: "Rich chocolate layers with ganache",
    allergens: ["nuts", "dairy"]
  }
];

test('renders product details', () => {
  render(
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ProductDetail products={mockProducts} />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );

  expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
  expect(screen.getByText(`$${mockProducts[0].price}`)).toBeInTheDocument();
  expect(screen.getByText(mockProducts[0].description)).toBeInTheDocument();
  mockProducts[0].allergens.forEach(allergen => {
    expect(screen.getByText(allergen)).toBeInTheDocument();
  });
});

test('adds product to cart', () => {
  const addToCart = jest.fn();
  render(
    <CartProvider value={{ addToCart }}>
      <WishlistProvider>
        <Router>
          <ProductDetail products={mockProducts} />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );

  fireEvent.click(screen.getByText(/Add to Cart/i));
  expect(addToCart).toHaveBeenCalledWith(mockProducts[0], 1);
});

test('adds product to wishlist', () => {
  const addToWishlist = jest.fn();
  render(
    <CartProvider>
      <WishlistProvider value={{ addToWishlist }}>
        <Router>
          <ProductDetail products={mockProducts} />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );

  fireEvent.click(screen.getByText(/Add to Wishlist/i));
  expect(addToWishlist).toHaveBeenCalledWith(mockProducts[0]);
});
