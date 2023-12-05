import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./NavbarAdmin.css";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';




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
                <Link to="/Home" className="nav-link">Home</Link>
                <Link to="/StudentTable" className="nav-link">Students</Link>
                <Link to="/UniversityTable" className="nav-link">Universities</Link>
                <Link to="/WhitelistStudent" className="nav-link">WhitelistStudent</Link>
                <Link to="/WhitelistVerwalter" className="nav-link">WhitelistVerwalter</Link>
                <Link to="/SelectionProcess" className="nav-link">SelectionProcess</Link>
                <Link to="/UniCardPage" className="nav-link">UniCardPage</Link>
                

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default NavbarAdmin;
