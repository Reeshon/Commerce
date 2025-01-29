import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getOrderAnalytics } from '../../services/database';
import { showToast } from '../../utils/toast';

function OrderAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  const loadAnalytics = useCallback(async () => {
    try {
      const data = await getOrderAnalytics();
      setAnalytics(data);
    } catch (error) {
      showToast.error('Failed to load analytics');
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <div className="mb-4">
      <h3 className="mb-4">Analytics Overview</h3>
      <Row>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <h3>{analytics?.totalOrders || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <h3>${analytics?.totalRevenue.toFixed(2) || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Avg. Order Value</Card.Title>
              <h3>${analytics?.averageOrderValue.toFixed(2) || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Pending Orders</Card.Title>
              <h3>{analytics?.statusBreakdown.pending || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderAnalytics;
