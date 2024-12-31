import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import


const RequireAuth = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  const location = useLocation();

  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        console.log('No token found, redirecting to login.');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token has expired
          console.log('Token has expired, redirecting to login.');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          console.log('Token is valid, user is authenticated.');
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Invalid token
        console.log('Invalid token, redirecting to login.');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the token
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
