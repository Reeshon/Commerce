
import React, { useState } from 'react';

function Products() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productName, price) => {
    const newItem = { name: productName, price };
    setCartItems([...cartItems, newItem]);
    alert(`${productName} has been added to your cart.`);
  };

  const viewCart = () => {
    const items = cartItems.map(item => `${item.name} - $${item.price}`).join('\n');
    alert(`Your Cart:\n${items}`);
  };

  return (
    <div>
      <h2>Our Products</h2>
      <div className="product-list">
        <div className="product-item">
          <img src="images/product1.jpg" alt="Chocolate Cake" />
          <h3>Chocolate Cake</h3>
          <p>Delicious dark chocolate cake.</p>
          <p>Price: $20</p>
          <button onClick={() => addToCart('Chocolate Cake', 20)}>Add to Cart</button>
        </div>
        {/* Add more products as needed */}
      </div>
      <button onClick={viewCart}>View Cart</button>
    </div>
  );
}

export default Products;