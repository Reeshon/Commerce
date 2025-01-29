import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { AuthProvider } from '../../contexts/AuthContext';

test('renders login form', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});

test('logs in user', async () => {
  const login = jest.fn();
  render(
    <AuthProvider value={{ login }}>
      <Login />
    </AuthProvider>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Log In/i));

  expect(login).toHaveBeenCalledWith('test@example.com', 'password');
});

test('logs in with Google', async () => {
  const signInWithGoogle = jest.fn();
  render(
    <AuthProvider value={{ signInWithGoogle }}>
      <Login />
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Sign in with Google/i));

  expect(signInWithGoogle).toHaveBeenCalled();
});
