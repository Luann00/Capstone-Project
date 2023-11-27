import React from 'react';
import { Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavBarStudent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBarStudent() {
  return (
    <div className='nav'>
      <Navbar expand="lg" className="navbar-wrapper">
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

        </Container>

      </Navbar>
      <Button className="signout">Sign out
      </Button>

    </div>
  );

}

export default NavBarStudent;