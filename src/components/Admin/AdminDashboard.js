import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="ms-sm-auto px-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
