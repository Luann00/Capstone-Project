import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavbarAdmin() {
  return (
    <div className="App">
      <>
        <Navbar bg="primary" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Universitäten</Nav.Link>
                <Nav.Link href="#pricing">Studenten</Nav.Link>
                <Nav.Link href="#pricing">Whitelist</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default NavbarAdmin;
