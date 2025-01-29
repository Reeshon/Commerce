import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Navigation';
import { AuthProvider } from '../../contexts/AuthContext';

test('renders navigation links', () => {
  render(
    <AuthProvider>
      <Router>
        <Navigation products={[]} />
      </Router>
    </AuthProvider>
  );

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

test('renders user dropdown when logged in', () => {
  const mockUser = { email: 'test@example.com', isAdmin: true };

  render(
    <AuthProvider value={{ currentUser: mockUser }}>
      <Router>
        <Navigation products={[]} />
      </Router>
    </AuthProvider>
  );

  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});
