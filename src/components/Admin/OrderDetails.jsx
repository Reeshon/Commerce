import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Table } from 'react-bootstrap';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (orderDoc.exists()) {
        setOrder({ id: orderDoc.id, ...orderDoc.data() });
      } else {
        console.log("No such order!");
      }
    };
    fetchOrder();
  }, [orderId, db]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>Order #{order.id}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Customer: {order.customerName}</ListGroup.Item>
            <ListGroup.Item>Date: {new Date(order.date.seconds * 1000).toLocaleString()}</ListGroup.Item>
            <ListGroup.Item>Status: {order.status}</ListGroup.Item>
            <ListGroup.Item>Total: ${order.total.toFixed(2)}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <h3 className="mt-4">Order Items</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderDetails;
