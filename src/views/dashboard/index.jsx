import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

const DashDefault = () => {
  const [rowsData, setRowsData] = useState({
    PointofSale: [2,2,3],
    Inventory: [2,2,3],
    Accounts: [2,3,3],
    Production: [0,0,0]
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch data for each row
  useEffect(() => {
    const fetchData = async () => {
      // Example fetching logic, adjust with actual API routes
      const posData = await fetch('/api/pointOfSale').then(res => res.json());
      const invData = await fetch('/api/inventory').then(res => res.json());
      const accData = await fetch('/api/accounts').then(res => res.json());
      const prodData = await fetch('/api/production').then(res => res.json());
      
      setRowsData({ PointofSale: posData, Inventory: invData, Accounts: accData, Production: prodData });
    };
    fetchData();
  }, []);

  const handleEditRowOrder = (row) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Implement order save logic here
    setShowEditModal(false);
  };

  return (
    <React.Fragment>
      {Object.entries(rowsData).map(([rowName, rowData], rowIndex) => (
        <Row key={rowIndex} className="mb-4">
          <h5>{rowName.replace(/([A-Z])/g, ' $1').trim()}</h5>
          {rowData.map((card, cardIndex) => (
            <Col key={cardIndex} xl={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-4">{card.title}</h6>
                    <Button variant="link" onClick={() => handleEditRowOrder(rowName)}>
                      Edit
                    </Button>
                  </div>
                  {/* Display card data */}
                  <h3>{card.amount}</h3>
                  <p>Additional card data...</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}

      
    </React.Fragment>
  );
};

export default DashDefault;
