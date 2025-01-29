import React from 'react';
import { Container } from 'react-bootstrap';

function Hero() {
  return (
    <div className="hero-section" style={{ backgroundImage: 'url(/path/to/your/image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0', color: '#fff', textAlign: 'center' }}>
      <Container>
        {/* Removed text */}
      </Container>
    </div>
  );
}

export default Hero;
