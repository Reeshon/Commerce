import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';
import MetaTags from '../components/MetaTags';

function Profile() {
  const { currentUser, updateUserProfile, resetPassword } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ displayName });
      showToast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update profile error:', error);
      showToast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await resetPassword(currentUser.email);
      showToast.success('Password reset email sent!');
    } catch (error) {
      console.error('Reset password error:', error);
      showToast.error('Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <MetaTags 
        title="Profile - Deleen's Home Bake" 
        description="View and update your profile." 
        keywords="profile, home bake, cakes, bread, pastries, cookies" 
      />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Profile</h2>
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group id="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={currentUser.email}
              readOnly
            />
          </Form.Group>
          <Form.Group id="displayName" className="mb-3">
            <Form.Label>Display Name</Form.Label>
            <Form.Control 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mb-3" type="submit">
            Update Profile
          </Button>
        </Form>
        <Button 
          variant="outline-danger" 
          disabled={loading} 
          className="w-100"
          onClick={handleResetPassword}
          type="button"
        >
          Reset Password
        </Button>
      </div>
    </Container>
  );
}

export default Profile;
