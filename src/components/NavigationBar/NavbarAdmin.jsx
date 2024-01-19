import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import logo from './WiSo-Logo-transparent.png';
import "./NavbarAdmin.css";


const NavbarAdmin = ({ onLogout }) => {
  return (
    <div className="navbar-container">
      <Navbar className="Navbar" expand="lg">
        <Container>
        <img className="navbar-logo" src={logo} 
              width="45"  
              height="45"
              alt="UniPick logo"
              style={{marginRight: "20px"}}
              
            /> 
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/HomePageAdmin">
                <Nav.Link className="nav-link nav-box">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/StudentTable">
                <Nav.Link className="nav-link nav-box">Students</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/UniversityTable">
                <Nav.Link className="nav-link nav-box">Universities</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/WhitelistStudent">
                <Nav.Link className="nav-link nav-box">WhitelistStudent</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/WhitelistAdmin">
                <Nav.Link className="nav-link nav-box">WhitelistVerwalter</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/SelectionProcess">
                <Nav.Link className="nav-link nav-box">SelectionProcess</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/TextOnStudentPage">
                <Nav.Link className="nav-link nav-box">Messages</Nav.Link>
              </LinkContainer>
            </Nav>
            <Button onClick={onLogout} className="Logout">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarAdmin;
