import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBarStudent.css';

function BasicExample() {
  return (
    <div className='nav'>
      <>
    <Navbar expand= "lg">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Priorities</Nav.Link>
            <Nav.Link href="#link">Newsletter</Nav.Link>
            <NavDropdown title="Languages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               Deutsch
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
              
            </NavDropdown>
        
          </Nav>
        </Navbar.Collapse>
        <Button>Sign out
        </Button>
      </Container>
    </Navbar>
    </>
    </div>
  );

}

export default BasicExample;