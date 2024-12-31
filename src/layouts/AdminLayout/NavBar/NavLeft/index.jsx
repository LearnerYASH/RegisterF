import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';

const NavLeft = () => {
  const windowSize = useWindowSize();

  const [timeLeft, setTimeLeft] = useState(null);

  // Function to calculate the remaining time until token expiration
  const calculateTimeLeft = () => {
    const tokenExpiry = localStorage.getItem('tokenExpiration'); // token expiration time in milliseconds
  
    if (tokenExpiry) {
      const difference = tokenExpiry - Date.now(); // milliseconds remaining until expiration
  
      if (difference > 0) {
        const minutes = Math.floor(difference / 1000 / 60); // convert milliseconds to minutes
        const seconds = Math.floor((difference / 1000) % 60); // get remaining seconds
        return `${minutes}m ${seconds}s `;
      } else {
        return 'Token expired';
      }
    }
    return null;
  };
  

  useEffect(() => {
    // Update the time left every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        {/* <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Dropdown align={'start'}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
              Status
            </Dropdown.Toggle>
            <ul>
              <Dropdown.Menu>
                <li>
                  <Link to="#" className="dropdown-item">
                  Access Time Remaining   
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    {timeLeft || 'Loading...'}
                  </Link>
                </li>
                
              </Dropdown.Menu>
            </ul>
          </Dropdown>
        </ListGroup.Item> */}
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
