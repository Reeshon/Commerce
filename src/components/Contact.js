import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function Contact() {
  return (
    <Container>
      <h2 className="mb-4">Contact Us</h2>
      <Form action="https://formspree.io/f/your-form-id" method="POST">
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" required />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="_replyto" required />
        </Form.Group>

        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Message:</Form.Label>
          <Form.Control as="textarea" name="message" rows={5} required />
        </Form.Group>

        <Button variant="primary" type="submit">Send</Button>
      </Form>
    </Container>
  );
}

export default Contact;