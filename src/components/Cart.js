import React, { useContext } from 'react';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { AppContext } from './App';
import { removeFromCartAPI, updateCartAPI } from '../services/api';

function Cart() {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(AppContext);

  const handleQuantityChange = async (e, productName) => {
    const quantity = parseInt(e.target.value) || 1;
    try {
      await updateCartAPI(productName, quantity);
      updateCartQuantity(productName, quantity);
    } catch {
      alert('Failed to update cart.');
    }
  };

  const handleRemove = async (productName) => {
    try {
      await removeFromCartAPI(productName);
      removeFromCart(productName);
    } catch {
      alert('Failed to remove item from cart.');
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container>
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.name)}
                  />
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemove(item.name)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end"><strong>Total:</strong></td>
              <td colSpan="2"><strong>${totalPrice}</strong></td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Cart;