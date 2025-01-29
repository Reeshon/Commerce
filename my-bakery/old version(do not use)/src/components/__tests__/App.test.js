import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../App';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/CartContext';
import { WishlistProvider } from '../../contexts/WishlistContext';

test('renders home page', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <App />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );

  expect(screen.getByText(/Welcome to Deleen's Home Bake/i)).toBeInTheDocument();
});

test('navigates to product detail page', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <App />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Classic Chocolate Cake/i));
  expect(screen.getByText(/Rich chocolate layers with ganache/i)).toBeInTheDocument();
});

test('adds product to cart from product detail page', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <App />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Classic Chocolate Cake/i));
  fireEvent.click(screen.getByText(/Add to Cart/i));
  expect(screen.getByText(/Added to cart!/i)).toBeInTheDocument();
});

test('navigates to cart page', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <App />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Cart/i));
  expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
});

test('navigates to wishlist page', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <App />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Wishlist/i));
  expect(screen.getByText(/Your Wishlist/i)).toBeInTheDocument();
});
