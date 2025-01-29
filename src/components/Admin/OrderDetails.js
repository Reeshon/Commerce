import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { getOrderDetails } from '../../services/database';
import { showToast } from '../../utils/toast';
import MetaTags from '../MetaTags';

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const loadOrderDetails = useCallback(async () => {
    try {
      const data = await getOrderDetails(orderId);
      setOrder(data);
    } catch (error) {
      showToast.error('Failed to load order details');
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      loadOrderDetails();
    }
  }, [orderId, loadOrderDetails]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <MetaTags 
        title={`Order Details #${orderId} - Deleen's Home Bake`} 
        description={`Details of order #${orderId}`} 
        keywords={`order details, order #${orderId}, home bake, cakes, bread, pastries, cookies`} 
      />
      <h2 className="mb-4">Order Details #{orderId}</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Items</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {order.items.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">Quantity: {item.quantity}</small>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Status:</strong> <Badge bg="info">{order.status}</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Customer:</strong> {order.userEmail}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetails;
