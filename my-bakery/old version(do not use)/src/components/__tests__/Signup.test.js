
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../Signup';
import { AuthProvider } from '../../contexts/AuthContext';

test('renders signup form', () => {
  render(
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password Confirmation/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

test('signs up user', async () => {
  const signup = jest.fn();
  render(
    <AuthProvider value={{ signup }}>
      <Signup />
    </AuthProvider>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByLabelText(/Password Confirmation/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/Sign Up/i));

  expect(signup).toHaveBeenCalledWith('test@example.com', 'password');
});

test('signs up with Google', async () => {
  const signInWithGoogle = jest.fn();
  render(
    <AuthProvider value={{ signInWithGoogle }}>
      <Signup />
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Sign up with Google/i));

  expect(signInWithGoogle).toHaveBeenCalled();
});