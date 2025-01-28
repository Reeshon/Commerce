import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <h1 className="mb-4">Welcome to Commerce</h1>
      <p>Your website is successfully deployed to GitHub Pages.</p>
      <p>You can host this site on GitHub Pages by enabling it in your repo settings.</p>
      <h2 className="mt-5">Customer Reviews</h2>
      <Carousel>
        <Carousel.Item>
          <div className="testimonial">
            <p>"Best bakery in town! The chocolate cake was amazing."</p>
            <p>- Jane Doe</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="testimonial">
            <p>"Fresh bread and pastries every morning. Highly recommend!"</p>
            <p>- John Smith</p>
          </div>
        </Carousel.Item>
        {/* Add more testimonials as needed */}
      </Carousel>
    </Container>
  );
}

export default Home;