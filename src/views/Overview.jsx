import React, { useState } from 'react';
import { Tab, Tabs, Card, Row, Col, Button, Collapse } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './Overview.css';

const Overview = () => {
  const location = useLocation();
  const { customer } = location.state || {};

  if (!customer) {
    return <div>No customer data available.</div>;
  }

  const handleEdit = () => {
    // Handle edit action
    alert(`Edit customer: ${customer.CustomerName}`);
  };

  const handleDelete = () => {
    // Handle delete action
    if (window.confirm('Are you sure you want to delete this customer?')) {
      alert(`Delete customer: ${customer.CustomerName}`);
    }
  };

  return (
    <div className="overview-container">
      <Card className="customer-card">
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-center">
            {/* Placeholder for Profile Picture */}
            <div className="profile-picture">
              <img
                src={`https://via.placeholder.com/150?text=${customer.CustomerName.charAt(0)}`}
                alt="Profile"
                className="rounded-circle"
              />
              <div className="icon-group mt-3">
                <FaEdit className="icon edit-icon" onClick={handleEdit} />
                <FaTrashAlt className="icon delete-icon" onClick={handleDelete} />
              </div>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <h2>{customer.CustomerName}</h2>
            <h5 className="text-muted">{customer.BusinessName}</h5>
            <p>{customer.Address}</p>
          </Col>
        </Row>
      </Card>

      <Tabs defaultActiveKey="overview" className="mt-4">
        <Tab eventKey="overview" title="Overview">
          <Card className="mt-3">
            <Card.Body>
              <p><strong>Tax GSTIN:</strong> {customer.TaxGSTINNo || 'N/A'}</p>
              <p><strong>Trade:</strong> {customer.Trade || 'N/A'}</p>
              <p><strong>Installation Type:</strong> {customer.InstallationType || 'N/A'}</p>
              <p><strong>Automation Area:</strong> {customer.AutomationArea || 'N/A'}</p>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="contact" title="Contact">
          <Card className="mt-3">
            <Card.Header>
              <Button variant="primary" onClick={() => alert('Edit Contact Details')}>
                Edit Contact Details
              </Button>
            </Card.Header>
            <Card.Body>
              <p><strong>Email:</strong> {customer.ContactEmail || 'N/A'}</p>
              <p><strong>Phone:</strong> {customer.ContactPhone || 'N/A'}</p>
              <p><strong>Website:</strong> {customer.ContactWebsite || 'N/A'}</p>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="products" title="Products">
          <Card className="mt-3">
            <Card.Body>
              <p>Product-related data will be displayed here.</p>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="accounts" title="Accounts">
          <Card className="mt-3">
            <Card.Body>
              <p>Account-related data will be displayed here.</p>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Overview;
