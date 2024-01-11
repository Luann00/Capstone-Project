import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container,Dropdown,Button } from 'react-bootstrap';
import "./NavBarStudent.css";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { usePrioritySelection } from '../contexts/PrioritySelectionContext';

const NavbarStudent = ({ onLogout }) => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const {openPanel,closePanel} = usePrioritySelection();  
  const [acceptedPolicy, setAcceptedPolicy] = useState(storedUser ? storedUser.acceptedPolicy : false);

  // Update links when acceptedPolicy changes
  useEffect(() => {
    // Fetch the updated acceptedPolicy from localStorage
    const updatedStoredUser = JSON.parse(localStorage.getItem('currentUser'));
    setAcceptedPolicy(updatedStoredUser ? updatedStoredUser.acceptedPolicy : false);
  }, []);

  return (
  
      <div className="navbar-container">
        <Navbar className='Navbar' expand="lg" >
          <Container>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" variant="tabs" >
                {acceptedPolicy === 'Yes' && (
                  <>
                    <LinkContainer className='link-container' to="/">
                      <Nav.Link className="nav-link" >Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer className='link-container' to="/UniCardPage">
                      <Nav.Link  className="nav-link" >Universities</Nav.Link>
                    </LinkContainer>
                  </>
                )}
                <Button className='PriorityButton' onClick={openPanel} >Your preferences</Button>
                
              </Nav>
              
              
              <Button  onClick={onLogout} className="Logout"> Log out</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
      
    );
  }

  export default NavbarStudent;
  