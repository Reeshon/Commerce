
import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to Commerce</h1>
      <p>Your website is successfully deployed to GitHub Pages.</p>
      <p>You can host this site on GitHub Pages by enabling it in your repo settings.</p>
      <h2>Customer Reviews</h2>
      <div className="testimonials">
        <div className="testimonial">
          <p>"Best bakery in town! The chocolate cake was amazing."</p>
          <p>- Jane Doe</p>
        </div>
        {/* Add more testimonials as needed */}
      </div>
    </div>
  );
}

export default Home;