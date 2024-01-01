import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./NavbarAdmin.css";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavbarStudent = ({ onLogout }) => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const [acceptedPolicy, setAcceptedPolicy] = useState(storedUser ? storedUser.acceptedPolicy : false);

  // Update links when acceptedPolicy changes
  useEffect(() => {
    // Fetch the updated acceptedPolicy from localStorage
    const updatedStoredUser = JSON.parse(localStorage.getItem('currentUser'));
    setAcceptedPolicy(updatedStoredUser ? updatedStoredUser.acceptedPolicy : false);
  }, []);

  return (
    <div className="Navbar">
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/Home">
              <Navbar.Brand></Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* Dynamically render links based on acceptedPolicy */}
                {acceptedPolicy === 'Yes' && (
                  <>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/UniCardPage" className="nav-link">UniCardPage</Link>
                  </>
                )
                
                
                }

                <button onClick={onLogout}>Logout</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default NavbarStudent;
