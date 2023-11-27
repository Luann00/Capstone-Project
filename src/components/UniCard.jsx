import React, { useState, useEffect } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import './UniCard.css';

const UniversityCard = ({ university, onCardUpdate }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const [updatedFirstPref, setUpdatedFirstPref] = useState(0);


  const handlePrioritySelect = async (uniId, priority) => {
    let updatedValue;



    try {
      const response = await fetch(`http://localhost:8081/university/${uniId}`, {
        mode: 'no-cors'
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
      }
      const universityData = await response.json();

      console.log(universityData.firstPref);
      updatedValue = universityData.firstPref;

      if (priority === '1st Priority') {
        updatedValue += 1;
      } else if (priority === 'Drop Priority') {
        updatedValue = updatedValue > 0 ? updatedValue - 1 : 0;
      }



      await fetch(`http://localhost:8081/university/${uniId}`, {
        mode: 'no-cors',
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstPref: updatedValue }),
      });

      // Update the local state for this card
      setUpdatedFirstPref((prevUpdatedFirstPref) => ({
        ...prevUpdatedFirstPref,
        [uniId]: updatedValue,
      }));



      onCardUpdate(university.uniId, updatedValue);
    } catch (error) {
      console.error('Error updating database:', error);

    }

    setSelectedPriority(priority);
  };
  const dropPriority = async () => {
    setSelectedPriority('');
    if (selectedPriority === '1st Priority') {
      await handlePrioritySelect(university.uniId, 'Drop Priority');
    }

  };

  return (
    <Card className="universityCard" key={university.uniId} style={{ width: '25rem' }}>
      <Card.Body className='card.body'>
        <Card.Title>{university.name}</Card.Title>
        <Card.Text>

          Quick info about this University
        </Card.Text>
        <Card.Link href="#">View more</Card.Link>

        <ListGroup variant="flush">
          {/* List items */}
          <ListGroup.Item>
            Country: {university.country}
          </ListGroup.Item>
          <ListGroup.Item>City: {university.city}</ListGroup.Item>
          <ListGroup.Item>Places available: {university.slots}</ListGroup.Item>
          <ListGroup.Item>
            Current first priority: {updatedFirstPref}
          </ListGroup.Item>
        </ListGroup>

        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {selectedPriority || 'Add to your preferences'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handlePrioritySelect(university.uniId, '1st Priority')}>
              1st Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect(university.uniId, '2nd Priority')}>
              2nd Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect(university.uniId, '3rd Priority')}>
              3rd Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={dropPriority}>
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

    // Poll for updates every 10 seconds (adjust the interval as needed)
    const interval = setInterval(fetchUniversities, 10000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);




  const handleCardUpdate = (uniId, updatedValue) => {
    // Update the main state with the updated value for the specific card
    setUniversities((prevState) =>
      prevState.map((university) =>
        university.uniId === uniId ? { ...university, firstPref: updatedValue } : university
      )
    );
  };

  return (
    <div className='card-container'>
      {universities.map((university) => (
        <UniversityCard key={university.uniId} university={university} onCardUpdate={handleCardUpdate} />
      ))}
    </div>
  );
};

export default UniCard;