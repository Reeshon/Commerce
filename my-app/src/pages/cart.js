import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import MetaTags from '../components/MetaTags';

function Cart() {
  const { items, removeFromCart } = useCart();

  return (
    <Container>
      <MetaTags 
        title="Cart - Deleen's Home Bake" 
        description="View and manage your cart items." 
        keywords="cart, home bake, cakes, bread, pastries, cookies" 
      />
      <h1 className="my-4">Your Cart</h1>
      <Row>
        {items.length === 0 ? (
          <Col>
            <p>Your cart is empty.</p>
          </Col>
        ) : (
          items.map(item => (
            <Col key={item.productId} md={6} lg={4} className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(item.productId)}>
                  Remove
                </Button>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Cart;
