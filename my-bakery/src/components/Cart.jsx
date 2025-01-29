import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';
import QuantitySelector from './QuantitySelector.jsx';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Your cart is empty</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2>Shopping Cart</h2>
      <Table responsive>
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
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <QuantitySelector
                  quantity={item.quantity}
                  onChange={(value) => updateQuantity(item.id, value)}
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
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
            <td>${total.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default Cart;
