import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    fetchOrders();
  };

  return (
    <>
      <h2>Order Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.date.seconds * 1000).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <Button 
                  variant="primary" 
                  onClick={() => updateOrderStatus(order.id, 'Processing')}
                  className="me-2"
                >
                  Process
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => updateOrderStatus(order.id, 'Shipped')}
                  className="me-2"
                >
                  Ship
                </Button>
                <Link to={`/admin/orders/${order.id}`}>
                  <Button variant="info">Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default OrderManagement;
