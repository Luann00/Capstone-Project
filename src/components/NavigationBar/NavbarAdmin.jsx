import React from "react";
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import "./NavbarAdmin.css";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';




const NavbarAdmin = ({ onLogout }) => {
  return (
    <div className="Navbar">
      
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/Home">
          
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/HomePageAdmin" className="nav-link">Home</Link>
                <Link to="/StudentTable" className="nav-link">Students</Link>
                <Link to="/UniversityTable" className="nav-link">Universities</Link>
                <Link to="/WhitelistStudent" className="nav-link">WhitelistStudent</Link>
                <Link to="/WhitelistAdmin" className="nav-link">WhitelistAdmin</Link>
                <Link to="/SelectionProcess" className="nav-link">SelectionProcess</Link>
                
              </Nav>
              <Button  onClick={onLogout} className="ml-auto" >Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      
    </div>
  );
}

export default NavbarAdmin;
