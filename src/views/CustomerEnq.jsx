import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';
import api from '../views/api';

const CustomerEnq = () => {
  const [customers, setCustomers] = useState([]); // List of customers fetched from API
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle the visibility of the form

  // Form fields
  const [customerId, setCustomerId] = useState('');
  const [enquiryDt, setEnquiryDt] = useState('');
  const [demoDate, setDemoDate] = useState('');
  const [nextDemoDate, setNextDemoDate] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');
  const [callMode, setCallMode] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const [closedStr, setClosedStr] = useState('');
  const [remarks, setRemarks] = useState('');
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    // Fetch customers from API
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

  const handleSave = async () => {
    if (!customerId || !enquiryDt || !demoDate || !nextDemoDate || !assignedUserId || !callMode) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      EnquiryId: null, // This will be auto-generated by the backend
      CustomerId: customerId,
      EnquiryDt: enquiryDt,
      DemoDate: demoDate,
      NextDemoDate: nextDemoDate,
      AssignedUserId: assignedUserId,
      CallMode: callMode,
      IsClosed: isClosed,
      ClosedStr: closedStr,
      Remarks: remarks,
      ActionType: actionType,
    };

    try {
      await api.post('/CustomerEnq/AddEnquiry', payload);
      alert('Enquiry details saved successfully.');
      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving enquiry:', error);
      alert('Failed to save enquiry.');
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false); // Hide the form
    resetForm(); // Reset form fields
  };

  const resetForm = () => {
    setCustomerId('');
    setEnquiryDt('');
    setDemoDate('');
    setNextDemoDate('');
    setAssignedUserId('');
    setCallMode('');
    setIsClosed(false);
    setClosedStr('');
    setRemarks('');
    setActionType('');
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'black' }}>Enquiry Details</div> 
            <Button variant="info" onClick={() => setIsFormVisible(!isFormVisible)} className="me-2">
              {isFormVisible ? 'Hide Form' : 'Add'}
            </Button>
          </Card.Header>

          {isFormVisible && (
            <Card.Body>
              <Form>
                <Form.Group controlId="customerSelect">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    as="select"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.CustomerId} value={customer.CustomerId}>
                        {customer.CustomerName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="enquiryDt" className="mt-3">
                  <Form.Label>Enquiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={enquiryDt}
                    onChange={(e) => setEnquiryDt(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="demoDate" className="mt-3">
                  <Form.Label>Demo Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={demoDate}
                    onChange={(e) => setDemoDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="nextDemoDate" className="mt-3">
                  <Form.Label>Next Demo Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={nextDemoDate}
                    onChange={(e) => setNextDemoDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="assignedUserId" className="mt-3">
                  <Form.Label>Assigned User ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={assignedUserId}
                    onChange={(e) => setAssignedUserId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="callMode" className="mt-3">
                  <Form.Label>Call Mode</Form.Label>
                  <Form.Control
                    type="text"
                    value={callMode}
                    onChange={(e) => setCallMode(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="isClosed" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Is Closed"
                    checked={isClosed}
                    onChange={(e) => setIsClosed(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group controlId="closedStr" className="mt-3">
                  <Form.Label>Closed Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={closedStr}
                    onChange={(e) => setClosedStr(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="remarks" className="mt-3">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="actionType" className="mt-3">
                  <Form.Label>Action Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                  />
                </Form.Group>

                <Button variant="success" className="mt-3" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="secondary" className="mt-3 ms-2" onClick={handleCancel}>
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CustomerEnq;