import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Tabs, Tab } from 'react-bootstrap';
import api from '../views/api'; // Axios instance for API calls

const NewCustomer = () => {
  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    businessName: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    gstTreatment: '',
    taxGSTINNo: '',
    tradeSelection: '',
    storeType: '',
    headOffice: '',
    warehouse: '',
    pos: '',
    sis: '',
    automationArea: [],
    installationType: '',
    advanceAmount: '',
    totalAmount: '',
    payMode: '',
    chequeNo: '',
    chequeDate: '',
  });
  const [selectedTab, setSelectedTab] = useState('productDetails');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        automationArea: checked
          ? [...prevState.automationArea, value]
          : prevState.automationArea.filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/CustomerEnq/Customer', formData);
      alert('Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer.');
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3 style={{  fontSize: '1.5rem', color: '#707070', fontfamily: 'Titillium Web' }}>New Customer</h3>
      </Card.Header>
      <Card.Body>
        <Form style={{ paddingTop: '10px' }}>
          {/* 1. Customer Name */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>Customer Name</Form.Label>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={3}>
                  <Form.Control
                    as="select"
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    <option value="">Salutation</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </Form.Control>
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* 2. Business Name */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>Business Name</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          {/* 3. Address */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>Address</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          {/* 4. Email */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col md={6}>
           
              <Form.Control
                type="email"
                name="email"
                
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
               
            </Col>
          </Row>

          {/* 5. Phone */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>Phone</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          {/* 6. Website */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>Website</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          {/* 7. GST Treatment */}
          <Row className="mb-3 align-items-center">
            <Col md={4}>
              <Form.Label>GST Treatment</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                as="select"
                name="gstTreatment"
                value={formData.gstTreatment}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                <option value="">Select GST Treatment</option>
                <option value="Registered Taxpayer">Registered Taxpayer</option>
                <option value="Normal Taxpayer">Normal Taxpayer</option>
                <option value="Composition Taxpayer">Composition Taxpayer</option>
              </Form.Control>
            </Col>
          </Row>

          {/* GSTIN Field (Conditional) */}
          {formData.gstTreatment === 'Registered Taxpayer' && (
            <Row className="mb-3 align-items-center">
              <Col md={4}>
                <Form.Label>GSTIN Number</Form.Label>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="taxGSTINNo"
                  placeholder="Enter GSTIN Number"
                  value={formData.taxGSTINNo}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          )}
          {/* Tabs for Product Details and Accounting Details */}
          <Tabs
            activeKey={selectedTab}
            onSelect={(k) => setSelectedTab(k)}
            className="mb-3"
          >
            {/* Product Details Tab */}
            <Tab eventKey="productDetails" title="Product Details">
              {/* Trade Selection */}
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Trade</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    as="select"
                    name="tradeSelection"
                    value={formData.tradeSelection}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    <option value="">Select Trade</option>
                    <option value="Garment">Garment</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Books and Stationery">
                      Books and Stationery
                    </option>
                    <option value="Furniture">Furniture</option>
                    <option value="PCS and Quantity">PCS and Quantity</option>
                  </Form.Control>
                </Col>
              </Row>

              {/* Store Type Selection */}
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Store Type</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    as="select"
                    name="storeType"
                    value={formData.storeType}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    <option value="">Select Store Type</option>
                    <option value="Single Location">Single Location</option>
                    <option value="Multi Location">Multi Location</option>
                  </Form.Control>
                </Col>
              </Row>

              {/* Multi-location Fields */}
              {formData.storeType === 'Multi Location' && (
                <>
                  <Row className="mb-3 align-items-center">
                    <Col md={4}>
                      <Form.Label>Head Office</Form.Label>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        name="headOffice"
                        value={formData.headOffice}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    <Col md={4}>
                      <Form.Label>Warehouse</Form.Label>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        name="warehouse"
                        value={formData.warehouse}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    <Col md={4}>
                      <Form.Label>POS</Form.Label>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        name="pos"
                        value={formData.pos}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    <Col md={4}>
                      <Form.Label>SIS</Form.Label>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        name="sis"
                        value={formData.sis}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                </>
              )}

              {/* Automation Area */}
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Automation Area</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Inventory Management"
                    name="automationArea"
                    value="Inventory Management"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Point of Sale"
                    name="automationArea"
                    value="Point of Sale"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Accounting"
                    name="automationArea"
                    value="Accounting"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Customer Relation Management"
                    name="automationArea"
                    value="Customer Relation Management"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Manufacturing"
                    name="automationArea"
                    value="Manufacturing"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {/* Installation Type */}
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Installation Type</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    as="select"
                    name="installationType"
                    value={formData.installationType}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    <option value="">Select Installation Type</option>
                    <option value="On Cloud">On Cloud</option>
                    <option value="On Premises">On Premises</option>
                  </Form.Control>
                </Col>
              </Row>
            </Tab>

            {/* Accounting Details Tab */}
            <Tab eventKey="accountingDetails" title="Accounting Details">
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Advance Amount</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="advanceAmount"
                    value={formData.advanceAmount}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Total Amount</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Paymode</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="payMode"
                    value={formData.payMode}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Cheque No.</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="chequeNo"
                    value={formData.chequeNo}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label>Cheque Date</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    name="chequeDate"
                    value={formData.chequeDate}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
            </Tab>
          </Tabs>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewCustomer;
