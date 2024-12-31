import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';
import api from '../views/api';

const ProductEnquiry = () => {
  const [customers, setCustomers] = useState([]); // List of customers fetched from API
  const [selectedCustomer, setSelectedCustomer] = useState(''); // Selected customer
  const [productName, setProductName] = useState('');
  const [productDetail, setProductDetail] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState('');
  const [appType, setAppType] = useState(''); // Selected app type
  const [locationType, setLocationType] = useState(''); // Selected location type
  const [isFormVisible, setIsFormVisible] = useState(false); // To control the visibility of the form

  useEffect(() => {
    // Fetch customer data
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

  const handleAppTypeChange = (e) => {
    setAppType(e.target.value);
    generateProductDetails(e.target.value, locationType);
  };

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.value);
    generateProductDetails(appType, e.target.value);
  };

  const generateProductDetails = (selectedAppType, selectedLocationType) => {
    const prefix = selectedLocationType === 'Single Location' ? 'SINEXT' : 'MINEXT';
    const appCode = selectedAppType === 'APP' ? 'APP' :
                    selectedAppType === 'ACT' ? 'ACT' :
                    selectedAppType === 'MFG' ? 'MFG' : 'POS';
    const formattedAppCode = appCode.charAt(0).toUpperCase() + appCode.slice(1).toLowerCase();

    const detail = selectedAppType === 'APP' 
      ? `iNextApp v1.0 (${selectedLocationType === 'Single Location' ? 'Single Location' : 'Multi Location'})`
      : `iNext${formattedAppCode} v1.0 (${selectedLocationType === 'Single Location' ? 'Single Location' : 'Multi Location'})`;

    setProductName(`${prefix}${appCode}`);
    setProductDetail(detail);
  };

  const handleSave = async () => {
    if (!selectedCustomer || !appType || !locationType || !productCategory || !productType || !price) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await api.post('/CustomerEnq/AddProduct', {
        CustomerId: selectedCustomer,
        ProductName: productName,
        ProductDetail: productDetail,
        ProductCategory: productCategory,
        ProductType: productType,
        Price: price,
      });

      alert('Product details saved successfully.');
      setIsFormVisible(false); // Hide form after saving
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product.');
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false); // Hide form on cancel
    resetForm(); // Reset all fields
  };

  const handleNew = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
    if (isFormVisible) {
      resetForm(); // Reset fields if hiding form
    }
  };

  const resetForm = () => {
    setSelectedCustomer('');
    setProductName('');
    setProductDetail('');
    setProductCategory('');
    setProductType('');
    setPrice('');
    setAppType('');
    setLocationType('');
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' , color: 'black' }}>Product Enquiry</div>
            <Button variant="info" onClick={handleNew} className="me-2">
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
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.CustomerId} value={customer.CustomerId}>
                        {customer.CustomerName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="appType" className="mt-3">
                  <Form.Label>App Type</Form.Label>
                  <div>
                    {['APP', 'ACT', 'MFG', 'POS'].map((type) => (
                      <Form.Check
                        inline
                        type="radio"
                        name="appType"
                        label={type}
                        value={type}
                        key={type}
                        checked={appType === type}
                        onChange={handleAppTypeChange}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group controlId="locationType" className="mt-3">
                  <Form.Label>Location Type</Form.Label>
                  <div>
                    {['Single Location', 'Multi Location'].map((type) => (
                      <Form.Check
                        inline
                        type="radio"
                        name="locationType"
                        label={type}
                        value={type}
                        key={type}
                        checked={locationType === type}
                        onChange={handleLocationTypeChange}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group controlId="productCategory" className="mt-3">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="productType" className="mt-3">
                  <Form.Label>Product Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="price" className="mt-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="productName" className="mt-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" readOnly value={productName} />
                </Form.Group>

                <Form.Group controlId="productDetail" className="mt-3">
                  <Form.Label>Product Detail</Form.Label>
                  <Form.Control type="text" readOnly value={productDetail} />
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

export default ProductEnquiry;
