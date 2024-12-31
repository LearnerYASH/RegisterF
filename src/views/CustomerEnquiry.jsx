import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../views/api'; // Axios instance

import 'material-components-web/dist/material-components-web.css';
import './CustomerEnquiry.css'; // Import custom CSS file

const CustomerEnquiry = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/CustomerEnq/Customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = customers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (customer) => {
    navigate('/overview', { state: { customer } });
  };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div style={{ fontSize: '1.5rem', color: '#707070', fontFamily: 'Titillium Web' }}>
                All Customers
              </div>
              <div>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate('/newcustomer')}
                >
                  New
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-container">
                <table className="custom-table" aria-label="Customer Data Table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Business Name</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Website</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((customer, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(customer)}
                        className="clickable-row"
                      >
                        <td>{customer.CustomerName || ''}</td>
                        <td>{customer.BusinessName || ''}</td>
                        <td>{customer.Address || ''}</td>
                        <td>{customer.ContactEmail || ''}</td>
                        <td>{customer.ContactPhone || ''}</td>
                        <td>{customer.ContactWebsite || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="pagination">
                  {Array.from({ length: Math.ceil(customers.length / rowsPerPage) }, (_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? 'primary' : 'light'}
                      onClick={() => paginate(i + 1)}
                      className="pagination-btn"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerEnquiry;
