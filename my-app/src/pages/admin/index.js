import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import MetaTags from '../../components/MetaTags';

function AdminDashboard() {
  const router = useRouter();

  return (
    <Container>
      <MetaTags 
        title="Admin Dashboard - Deleen's Home Bake" 
        description="Admin dashboard for managing products and orders." 
        keywords="admin, dashboard, home bake, cakes, bread, pastries, cookies" 
      />
      <h1 className="my-4">Admin Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product Management</Card.Title>
              <Card.Text>Manage products in the store.</Card.Text>
              <Button variant="primary" onClick={() => router.push('/admin/products')}>
                Manage Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Order Management</Card.Title>
              <Card.Text>Manage customer orders.</Card.Text>
              <Button variant="primary" onClick={() => router.push('/admin/orders')}>
                Manage Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;