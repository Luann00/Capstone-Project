import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container,Dropdown,Button } from 'react-bootstrap';
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
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {acceptedPolicy === 'Yes' && (
                  <>
                    <LinkContainer to="/">
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/UniCardPage">
                      <Nav.Link>UniCardPage</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
              <Dropdown alignRight>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Language
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Deutsch</Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-light" onClick={onLogout} className="ml-auto">Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

  export default NavbarStudent;
  