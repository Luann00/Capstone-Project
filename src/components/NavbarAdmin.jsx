import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./NavbarAdmin.css";


function NavbarAdmin() {
  return (
    <div className="Navbar">
      <>
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="nav-link"
href="#home">Home</Nav.Link>
                <Nav.Link className="nav-link" href="#features">Universitäten</Nav.Link>
                <Nav.Link className="nav-link"
                href="#pricing">StudentenWhitelist</Nav.Link>
                <Nav.Link className="nav-link"
                href="#pricing">VerwalterWhitelist</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default NavbarAdmin;
