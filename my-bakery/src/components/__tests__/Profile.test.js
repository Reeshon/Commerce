import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../Profile';
import { AuthProvider } from '../../contexts/AuthContext';

const mockUser = {
  email: 'test@example.com',
  displayName: 'Test User'
};

test('renders profile information', () => {
  render(
    <AuthProvider value={{ currentUser: mockUser }}>
      <Profile />
    </AuthProvider>
  );

  expect(screen.getByLabelText(/Email/i)).toHaveValue(mockUser.email);
  expect(screen.getByLabelText(/Display Name/i)).toHaveValue(mockUser.displayName);
});

test('updates profile information', () => {
  const updateUserProfile = jest.fn();
  render(
    <AuthProvider value={{ currentUser: mockUser, updateUserProfile }}>
      <Profile />
    </AuthProvider>
  );

  fireEvent.change(screen.getByLabelText(/Display Name/i), { target: { value: 'Updated User' } });
  fireEvent.click(screen.getByText(/Update Profile/i));

  expect(updateUserProfile).toHaveBeenCalledWith({ displayName: 'Updated User' });
});

test('sends password reset email', () => {
  const resetPassword = jest.fn();
  render(
    <AuthProvider value={{ currentUser: mockUser, resetPassword }}>
      <Profile />
    </AuthProvider>
  );

  fireEvent.click(screen.getByText(/Reset Password/i));

  expect(resetPassword).toHaveBeenCalledWith(mockUser.email);
});
