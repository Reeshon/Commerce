import React, { useState, useEffect, useCallback } from 'react';
import { Table, Badge, Button, Modal, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { getAllOrders, updateOrderStatus } from '../../services/database';
import { showToast } from '../../utils/toast';
import { exportToCSV } from '../../utils/exportUtils';
import OrderAnalytics from './OrderAnalytics';
import MetaTags from '../MetaTags';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const loadOrders = useCallback(async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      showToast.error('Failed to load orders');
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

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

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesDate = (!dateRange.start || new Date(order.createdAt) >= new Date(dateRange.start)) &&
                         (!dateRange.end || new Date(order.createdAt) <= new Date(dateRange.end));
      return matchesSearch && matchesStatus && matchesDate;
    });

  const handleExport = () => {
    try {
      exportToCSV(filteredOrders, `orders_export_${new Date().toISOString().split('T')[0]}`);
      showToast.success('Orders exported successfully');
    } catch (error) {
      showToast.error('Failed to export orders');
    }
  };

  return (
    <>
      <MetaTags 
        title="Order Management - Deleen's Home Bake" 
        description="Manage orders in the admin dashboard." 
        keywords="admin, order management, home bake, cakes, bread, pastries, cookies" 
      />
      <OrderAnalytics />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
        <Button variant="success" onClick={handleExport}>
          Export to CSV
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Col>
        <Col md={5}>
          <Row>
            <Col>
              <Form.Control
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                placeholder="Start Date"
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                placeholder="End Date"
              />
            </Col>
          </Row>
        </Col>
      </Row>

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
          {filteredOrders.map(order => (
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
