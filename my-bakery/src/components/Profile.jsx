import React, { useState } from 'react';
import { Container, Card, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { currentUser, updateUserProfile, resetPassword, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [orders] = useState([
    // Placeholder for order history - will be replaced with real data
    { id: 1, date: '2024-01-15', total: 56.97, status: 'Delivered' },
    { id: 2, date: '2024-01-10', total: 29.99, status: 'Processing' }
  ]);
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile({ displayName });
      showToast.success('Profile updated successfully');
    } catch (error) {
      showToast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      await resetPassword(currentUser.email);
      showToast.success('Password reset email sent');
    } catch (error) {
      showToast.error('Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Profile</h2>
      <Tabs defaultActiveKey="profile" className="mb-4">
        <Tab eventKey="profile" title="Profile">
          <Card>
            <Card.Body>
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={currentUser.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" disabled={loading}>
                  Update Profile
                </Button>
                <Button
                  variant="link"
                  onClick={handlePasswordReset}
                  disabled={loading}
                >
                  Reset Password
                </Button>
              </Form>
              <Button variant="danger" onClick={handleLogout}>
                Log Out
              </Button>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="orders" title="Order History">
          <Card>
            <Card.Body>
              {orders.length > 0 ? (
                orders.map(order => (
                  <Card key={order.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>Order #{order.id}</Card.Title>
                      <Card.Text>
                        Date: {order.date}<br />
                        Total: ${order.total}<br />
                        Status: {order.status}
                      </Card.Text>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No orders found</p>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Profile;
