
import React from 'react';

function Contact() {
  return (
    <div>
      <h2>Contact Us</h2>
      <form action="https://formspree.io/f/your-form-id" method="POST">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="_replyto" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;