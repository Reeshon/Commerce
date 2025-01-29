import React from 'react';
<<<<<<< HEAD

function Cart() {
  return (
    <div>
      <h1>Cart</h1>
      {/* Add more content as needed */}
    </div>
  );
}

export default Cart;
=======
import { Container, Table, Button, Form, Image } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <h3>Your cart is empty</h3>
          <Button variant="primary" as={Link} to="/">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <Image src={item.image} alt={item.name} width={50} className="me-3" />
                      {item.name}
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td style={{ width: '150px' }}>
                    <Form.Control
                      type="number"
                      min="1"
                      max="100"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button variant="outline-primary" as={Link} to="/">
              Continue Shopping
            </Button>
            <div className="text-end">
              <h4>Subtotal: ${total.toFixed(2)}</h4>
              <p className="text-muted">Taxes and shipping calculated at checkout</p>
              <Button variant="success" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
>>>>>>> gh-pages
