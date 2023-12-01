import React, { useState, useEffect } from 'react';
import { Card, Dropdown, ListGroup,Carousel } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';


if (!Object.values) {
  Object.values = function (obj) {
    if (obj !== Object(obj)) {
      throw new TypeError('Object.values called on a non-object');
    }
    let values = [];
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        values.push(obj[key]);
      }
    }
    return values;
  };
}

const UniversityCard = ({ university, priorityState, setPriorityState }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
  const [firstPrioritySelected, setFirstPrioritySelected] = useState(false);


  const handlePrioritySelect = async (priority) => {
   


    if (priority === '1st Priority') {

      
      if (!firstPrioritySelected) {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
        setFirstPrioritySelected(true);
        setSelectedPriority(priority);

        await updateCurrentPrioCount(university.uniId);
      } else {

        setSelectedPriority(priority);

      }
    } else if (priority === 'Drop Priority') {
      if (updatedFirstPref === 0) {
        setUpdatedFirstPref(0);
        setSelectedPriority('');
      } else {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        setSelectedPriority('');
        await updateCurrentPrioCount(university.uniId);

      }
      setFirstPrioritySelected(false);
    } else {

      if (firstPrioritySelected) {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        setFirstPrioritySelected(false);
      }

      setSelectedPriority(priority);
      await updateCurrentPrioCount(university.uniId);
      setSelectedPriority(priority);
      await updateCurrentPrioCount(university.uniId);

    }



  };



  const updateCurrentPrioCount = async (uniId) => {

    try {
      // Fetch the current university data
      const response = await fetch(`http://localhost:8081/university/${uniId}`);
      const universityData = await response.json();


      setUpdatedFirstPref(universityData.firstPref);

      // Update the API with the modified data
      const putResponse = await fetch(`http://localhost:8081/university/${uniId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(universityData),
      });

      if (!putResponse.ok) {
        // Handle unsuccessful API update
      }
    } catch (error) {
      // Handle fetch or other errors
    }

  }



  return (
    <Card className="universityCard" key={university.uniId} style={{ width: '25rem' }}>
      <Card.Body className='card.body'>
      <Carousel>
      <Carousel.Item>
    
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
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
            <Dropdown.Item onClick={() => handlePrioritySelect('1st Priority')}>
              1st Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect('2nd Priority')}>
              2nd Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect('3rd Priority')}>
              3rd Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrioritySelect('Drop Priority')} >
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
  const [priorityState, setPriorityState] = useState({
    '1st Priority': false,
    '2nd Priority': false,
    '3rd Priority': false,
  });

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
        <UniversityCard
          key={university.uniId}
          university={university}
          priorityState={priorityState}
          setPriorityState={setPriorityState}
        />
      ))}
    </div>
  );
};

export default UniCard;
