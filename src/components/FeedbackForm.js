import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { showToast } from '../utils/toast';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your feedback submission logic
      console.log('Feedback submitted:', feedback);
      showToast.success('Thank you for your feedback!');
      setFeedback('');
    } catch (error) {
      showToast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">User Feedback</h2>
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </Form>
    </Container>
  );
}

export default FeedbackForm;
