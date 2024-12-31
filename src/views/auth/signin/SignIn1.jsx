import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Ensure you have your axios or api setup

import logo from '../../../assets/images/inextlogo.png';

const Signin1 = () => {
  const [emailid, setEmailid] = useState('');
  const [userpwd, setUserpwd] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (emailid, userpwd) => {
    console.time("Login Time");
    try {
        setIsSubmitting(true);  // Disable login button
        const response = await api.post('/auth/login', { emailid, userpwd });
        
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('tokenExpiration', response.data.tokenExpiration);
            localStorage.setItem('customerId', response.data.customerId);
            localStorage.setItem('UserName', response.data.UserName);
            localStorage.setItem('UserId', response.data.UserId);
            
            navigate('/CustomerEnquiry');
        } else {
            setLoginError('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        setLoginError('An error occurred during login. Please try again.');
    } finally {
        console.timeEnd("Login Time");
        setIsSubmitting(false);  // Re-enable the login button
    }
};




  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailid, userpwd);
  };

  return (
    <React.Fragment>
 
  <section className="background-radial-gradient overflow-auto min-vh-100">
    <style>
      {`
        .background-radial-gradient {
          background-color: #9ACEEB; /* Change this line to your desired color */
          background-image: radial-gradient(650px circle at 0% 0%,
            #9ACEEB 15%, /* Modify this to match your color */
            #9ACEEB 35%,
            #9ACEEB 75%,
            #9ACEEB 80%,
            transparent 100%),
            radial-gradient(1250px circle at 100% 100%,
            #9ACEEB 15%,
            #9ACEEB 35%,
            #9ACEEB 75%,
            #9ACEEB 80%,
            transparent 100%);
          min-height: 100vh;
        }

        #radius-shape-1 {
          height: 220px;
          width: 220px;
          top: -60px;
          left: -130px;
          background: radial-gradient(#6495ed, #6495ed);
          overflow: hidden;
        }

        #radius-shape-2 {
          border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
          bottom: -60px;
          right: -110px;
          width: 300px;
          height: 300px;
          background: radial-gradient(#6495ed, #6495ed);
          overflow: hidden;
        }

        .bg-glass {
          background-color: hsla(0, 0%, 100%, 0.9) !important;
          backdrop-filter: saturate(200%) blur(25px);
        }

        body, h1, h2, h3, p, button {
          font-family: 'Titillium Web', sans-serif;
        }
      `}
    </style>

    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div className="row gx-lg-5 align-items-center mb-5">
        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
          <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Welcome to <br />
            <span style={{ color: '#6495ed' }}>iNextErp solutions</span>
          </h1>
          <p className="mb-4 opacity-70" style={{ color:  'hsl(218, 81%, 95%)' }}>
            "Empowering Businesses through Innovative and Integrated ERP, CRM, and POS Solutions that Drive Efficiency, Enhance Customer Engagement, and Foster Sustainable Growth in a Dynamic Market."
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <div className="card bg-glass">
            <Card.Body style={{
    minHeight: '400px', // Set the desired height
    display: 'flex', // Flexbox for alignment
    flexDirection: 'column', // Column alignment
    justifyContent: 'center', // Center vertically
    // Center horizontally
  }}>
              <div className="text-center mb-4">
                <img src={logo} alt="Company Logo" style={{ width: '80px' }} />
                <h3 className="mt-3" style={{ fontWeight: 'bold', fontFamily: 'Titillium Web, sans-serif', color: '#6495ed' }}>iNextErp</h3>
              </div>
              <h3 className="text-left mb-4" style={{ fontFamily: 'Titillium Web, sans-serif' }}>Login</h3>

              {/* Form */}
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formemail" className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    size="lg"
                    value={emailid}
                    onChange={(e) => setEmailid(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
    <Form.Control
        type="password"
        placeholder="Enter Password"
        size="lg"
        value={userpwd}
        onChange={(e) => setUserpwd(e.target.value)}
        required
    />
    {isSubmitting && (
        <div className="d-flex justify-content-center">
            
        </div>
    )}
</Form.Group>

                {loginError && <div className="text-danger mb-3">{loginError}</div>}

                <div className="d-flex justify-content-between align-items-center">
                  <Form.Group className="mb-0">
                    <Form.Check type="checkbox" label="Remember me" id="formRemember" />
                  </Form.Group>
                  <NavLink to="#" className="text-body">
                    Forgot password?
                  </NavLink>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                <Button
  type="submit"
  variant="primary"
  size="lg"
  className="px-5 d-flex align-items-center justify-content-center gap-2"
  style={{
    fontFamily: 'Titillium Web, sans-serif',
    backgroundColor: '#6495ed',
    borderColor: '#6495ed',
  }}
  disabled={isSubmitting} // Disable button while submitting
>
  {isSubmitting && (
    <div
      className="spinner-border spinner-border-sm text-light"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  )}
  <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
</Button>


                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don’t have an account?{' '}
                    <NavLink to="/auth/signup-1" className="link-danger">
                      Register
                    </NavLink>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </div>
        </div>
      </div>
    </div>
  </section>
</React.Fragment>
  );
};

export default Signin1;
