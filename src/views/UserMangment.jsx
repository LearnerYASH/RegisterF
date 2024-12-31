import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../views/api'; // Axios instance

import './CustomerEnquiry.css'; // Import custom CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/UserMaster/allusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleRowClick = (user) => {
//     navigate('/userview', { state: { user } });
//   };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div style={{ fontSize: '1.5rem', color: '#707070', fontFamily: 'Titillium Web' }}>
                All Users
              </div>
              <div>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate('/newuser')}
                >
                  New
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-container">
                <table className="custom-table" aria-label="User Data Table">
                  <thead>
                    <tr>
                      
                      <th>Username</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((user, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(user)}
                        className="clickable-row"
                      >
                        
                        <td>{user.UserName || ''}</td>
                        <td>{user.EmailId || ''}</td>
                        <td>{user.MobileNo || ''}</td>
                        <td>{user.UserRoleId || ''}</td>
                        <td>{user.ActiveStatus ? 'Active' : 'Inactive'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="pagination">
                  {Array.from({ length: Math.ceil(users.length / rowsPerPage) }, (_, i) => (
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

export default UserManagement;
