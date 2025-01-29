import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import { getAllOrders, updateOrderStatus } from '../../services/database';
import { showToast } from '../../utils/toast';
import OrderAnalytics from '../../components/OrderAnalytics';
import MetaTags from '../../components/MetaTags';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      showToast.error('Failed to load orders');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadOrders();
      showToast.success('Order status updated');
      setShowModal(false);
    } catch (error) {
      showToast.error('Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <>
      <MetaTags 
        title="Order Management - Deleen's Home Bake" 
        description="Manage orders in the admin dashboard." 
        keywords="admin, order management, home bake, cakes, bread, pastries, cookies" 
      />
      <OrderAnalytics />
      <h2 className="mb-4">Order Management</h2>
      <Table responsive striped bordered hover>
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
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userEmail}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                >
                  Manage
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Order #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Current Status: {selectedOrder?.status}</h6>
          <div className="d-grid gap-2">
            {['processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <Button
                key={status}
                variant="outline-primary"
                disabled={selectedOrder?.status === status}
                onClick={() => handleStatusUpdate(selectedOrder?.id, status)}
              >
                Mark as {status}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderManagement;
