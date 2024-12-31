import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all items from localStorage
    localStorage.clear();

    // Redirect the user to the login page
    navigate('/login'); // Replace '/login' with the appropriate route for your application
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
