import React, { useState, useEffect } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill,BsFillPeopleFill } from "react-icons/bs";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';

const UniversityCard = ({ university }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [updatedFirstPref, setUpdatedFirstPref] = useState(0);
 
  const handlePrioritySelect = async (priority) => {
    if (priority === '1st Priority') {
      setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
      setSelectedPriority(priority);
      await updateCurrentPrioCount(university.uniId);
    } else if (priority === 'Drop Priority') {
      if (updatedFirstPref === 0) {
        setUpdatedFirstPref(0);
        setSelectedPriority('');
      } else {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        setSelectedPriority('');
        await updateCurrentPrioCount(university.uniId);
      }
    } else {
      setSelectedPriority(priority);
    }
  };
      

  
  const updateCurrentPrioCount= async(uniId) => {
    try {
      // Fetch the current university data
      const updateEndpoint = `http://localhost:8081/university/${uniId}`;
      const response = await fetch(updateEndpoint);
      const universityData = await response.json();
      const updatedValue = universityData.firstPref;
  
      // Update the local state for this card
      setUpdatedFirstPref(updatedValue);
  
      // Update the API with the new firstPref value
      await fetch(updateEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstPref: updatedValue }),
      });
    } catch (error) {
      console.error('Error updating current priority count:', error);
      // Handle error scenarios
    }


  }
  
  

  return (
    <Card className="universityCard" key={university.uniId} style={{ width: '25rem' }}>
      <Card.Body className='card.body'>
        <Card.Title> <a href="#">{university.name}</a></Card.Title>
        <Card.Text>

          <span><BsPinMapFill /></span>
          <span> {university.country},{university.city}</span>
        </Card.Text>

        <ListGroup variant="flush">
          <ListGroup.Item> <span><MdChairAlt /></span> Places available: {university.slots}</ListGroup.Item>
          <ListGroup.Item>
            <span><BsFillPeopleFill /></span>
            Current first priority: {updatedFirstPref}
          </ListGroup.Item>
        </ListGroup>

        <Dropdown >
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {selectedPriority || 'Add to your preferences'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handlePrioritySelect( '1st Priority')}>
              1st Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect('2nd Priority')}>
              2nd Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect( '3rd Priority')}>
              3rd Priority
            </Dropdown.Item>
            <Dropdown.Item onClick=  {() => handlePrioritySelect( 'Drop Priority')} >
              Drop Priority
            </Dropdown.Item>


          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
};

const UniCard = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:8081/university');
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUniversities();

    const interval = setInterval(fetchUniversities, 10000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);


 
  return (
    <div className='card-container'>
      {universities.map((university) => (
        <UniversityCard key={university.uniId} university={university}  />
      ))}
    </div>
  );
};

export default UniCard;
