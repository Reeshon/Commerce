import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        userId: currentUser ? currentUser.uid : 'anonymous',
        feedback,
        createdAt: new Date()
      });
      setSuccess('Feedback submitted successfully');
      setFeedback('');
    } catch (error) {
      setError('Failed to submit feedback');
      console.error('Error submitting feedback:', error);
    }

    setLoading(false);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Provide Feedback</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Submit Feedback
        </Button>
      </Form>
    </Container>
  );
}

export default FeedbackForm;
