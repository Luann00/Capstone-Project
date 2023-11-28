import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./NavbarAdmin.css";
import { LinkContainer } from 'react-router-bootstrap'



function NavbarAdmin() {
  return (
    <div className="Navbar">
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/Home">
              <Navbar.Brand>Navbar</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/Home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/StudentTable">
                  <Nav.Link>Students</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/UniversityTable">
                  <Nav.Link>Universities</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/WhitelistStudent">
                  <Nav.Link>WhitelistStudent</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/WhitelistVerwalter">
                  <Nav.Link>WhitelistVerwalter</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default NavbarAdmin;
