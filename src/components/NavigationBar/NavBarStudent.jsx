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
  
      <div className="Navbar">
        <Navbar >
          <Container>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" variant="pills" >
                {acceptedPolicy === 'Yes' && (
                  <>
                    <LinkContainer to="/">
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/UniCardPage">
                      <Nav.Link>Universities</Nav.Link>
                    </LinkContainer>
                  </>
                )}
                <Button className='PriorityButton' onClick={openPanel} >Your Priority</Button>
                <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Language
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Deutsch</Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
              </Nav>
              
              
              <Button  onClick={onLogout} className="ml-auto"> Log out</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

  export default NavbarStudent;
  