import React from "react";
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import logo from './WiSo-Logo-transparent.png';




const NavbarAdmin = ({ onLogout }) => {
  return (
    <div className="navbar-container">
       
      
      <Navbar className="Navbar" expand="lg">
    
        <Container>
        <img className="navbar-logo" src={logo} // Replace with the actual path
              width="45"  // Replace with the actual width
              height="45"  // Replace with the actual height
              alt="UniPick logo"
              style={{marginRight: "20px"}}
              
            /> 
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" variant="tabs">
              
                
                  <LinkContainer className='link-container' to="/HomePageAdmin">
                    <Nav.Link className="nav-link">Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='link-container' to="/StudentTable">
                    <Nav.Link className="nav-link">Students</Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='link-container' to="/UniversityTable">
                    <Nav.Link className="nav-link">Universities</Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='link-container' to="/WhitelistStudent">
                    <Nav.Link className="nav-link">WhitelistStudent</Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='link-container' to="/WhitelistAdmin">
                    <Nav.Link className="nav-link">WhitelistAdmin</Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='link-container' to="/SelectionProcess">
                    <Nav.Link className="nav-link">SelectionProcess</Nav.Link>
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
