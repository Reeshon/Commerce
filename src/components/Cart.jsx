import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext.jsx';
import ProductCard from './ProductCard.jsx';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <Container className="my-4">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {cartItems.map(product => (
              <Col key={product.id}>
                <Card>
                  <ProductCard product={product} />
                  <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => updateQuantity(product.id, (product.quantity || 1) - 1)}
                          disabled={product.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="mx-2">{product.quantity || 1}</span>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => updateQuantity(product.id, (product.quantity || 1) + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4 text-end">
            <h4>Total: ${calculateTotal().toFixed(2)}</h4>
            <Button variant="success" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Text>Your cart is empty.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Cart;
