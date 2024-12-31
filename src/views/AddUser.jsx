import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import api from '../views/api'; // Axios instance for API calls

const AddUser = () => {
  const [userData, setUserData] = useState({
    UserName: '',
    ShortName: '',
    UserPwd: '',
    MobileNo: '',
    EmailId: '',
    ContactType: '', // Will hold 1 for Staff or 2 for Client
    UserRoleId: '',
  });
  const [userRoles, setUserRoles] = useState([]);

  // Fetch user roles on component mount
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await api.get('/UserMaster/UserRoles');
        if (response.status === 200) {
          setUserRoles(response.data);
        } else {
          alert('Failed to fetch user roles.');
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        alert('An error occurred while fetching user roles.');
      }
    };

    fetchUserRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const UserId = localStorage.getItem('UserId');
      if (!UserId) {
        alert('UserId is missing in local storage.');
        return;
      }

      // Include UserId in the payload
      const payload = { ...userData, UserId };
      const response = await api.post('/UserMaster/AddNew', payload);
      if (response.status === 200) {
        alert('User added successfully!');
        setUserData({
          UserName: '',
          ShortName: '',
          UserPwd: '',
          MobileNo: '',
          EmailId: '',
          ContactType: '',
          UserRoleId: '',
          
        });
      } else {
        alert('Failed to add user.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred while adding the user.');
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3 style={{ fontSize: '1.5rem', fontFamily: 'Titillium Web' }}>New User</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} style={{ padding: '10px 15px' }}>
          <Row className="align-items-center mb-3">
            <Col md={3}>
              <Form.Label>Full Name</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="UserName"
                value={userData.UserName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Short Name</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="ShortName"
                value={userData.ShortName}
                onChange={handleChange}
                placeholder="Enter short name"
                required
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-3">
            <Col md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="password"
                name="UserPwd"
                value={userData.UserPwd}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Mobile Number</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="MobileNo"
                value={userData.MobileNo}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-3">
            <Col md={3}>
              <Form.Label>Email ID</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                type="email"
                name="EmailId"
                value={userData.EmailId}
                onChange={handleChange}
                placeholder="Enter email ID"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Contact Type</Form.Label>
            </Col>
            <Col md={3}>
              <div>
                <Form.Check
                  type="radio"
                  name="ContactType"
                  id="staff"
                  label="Staff"
                  value="1"
                  checked={userData.ContactType === '1'}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  type="radio"
                  name="ContactType"
                  id="client"
                  label="Client"
                  value="2"
                  checked={userData.ContactType === '2'}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          <Row className="align-items-center mb-3">
            <Col md={3}>
              <Form.Label>User Role</Form.Label>
            </Col>
            <Col md={3}>
              <Form.Control
                as="select"
                name="UserRoleId"
                value={userData.UserRoleId}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                {userRoles.map((role) => (
                  <option key={role.UserRoleId} value={role.UserRoleId}>
                    {role.UserRoleName}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <div className="text-center">
            <Button variant="success" type="submit" className="mt-3 px-5">
              Save
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
