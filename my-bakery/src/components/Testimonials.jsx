import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Testimonials() {
  const testimonials = [
    {
      name: 'John Doe',
      text: 'The best bakery in town! The chocolate cake is to die for.',
      image: 'https://placehold.co/100x100/png?text=John+Doe'
    },
    {
      name: 'Jane Smith',
      text: 'I love the artisan bread. It\'s always fresh and delicious.',
      image: 'https://placehold.co/100x100/png?text=Jane+Smith'
    },
    {
      name: 'Sam Wilson',
      text: 'The cupcakes are amazing! Perfect for any occasion.',
      image: 'https://placehold.co/100x100/png?text=Sam+Wilson'
    }
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Row>
        {testimonials.map((testimonial, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={testimonial.image} />
              <Card.Body>
                <Card.Title>{testimonial.name}</Card.Title>
                <Card.Text>{testimonial.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;
