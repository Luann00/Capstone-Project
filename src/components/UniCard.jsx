
import React,{ useState, useEffect } from 'react';
import { Card,CardImg,CardBody,Dropdown,Button,ListGroup,ListGroupItem } from 'react-bootstrap/';



const UniCard = () => {
  const [universities, setUniversity] = useState([]);
  const[selectedUniversity, setSelectedUniversity] =useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:8081/university');
        const data = await response.json();
        setUniversity(data);
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

  
  const [selectedPriority, setSelectedPriority] = useState('');
  const [updatedFirstPref, setUpdatedFirstPref] = useState({});

  const handlePrioritySelect = async (uniId,priority) => {
    
    if (priority === '1st Priority') {
      try {
        // Fetch the current university data
        const response = await fetch(`http://localhost:8081/university/${uniId}`);
        const universityData = await response.json();
        const updatedValue = universityData.firstPref + 1;

       
        
        // Update the database with the new firstPref value
        await fetch(`http://localhost:8081/university/${uniId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstPref: updatedValue }),
        });
        setUpdatedFirstPref({ ...updatedFirstPref, [uniId]: updatedValue });
      } catch (error) {
        console.error('Error updating database:', error);
        // Handle error scenarios
      }
    }
    setSelectedPriority(priority);
  };





    
  return (
    <div>
    {universities.map((university) => {

      return (
        <Card key={university.uniId} style={{ width: '18rem' }}>

<Card.Body>
            <Card.Title>{university.name}</Card.Title>
            <Card.Text>
              {/* University description or other relevant information */}
              Quick info about this University
            </Card.Text>
            <Card.Link href="#">View more</Card.Link>
          
          <ListGroup variant="flush">
          
            <ListGroup.Item>Country: {university.country}</ListGroup.Item>
            <ListGroup.Item>City: {university.city}</ListGroup.Item>
            <ListGroup.Item>Places available: {university.slots}</ListGroup.Item>
            <ListGroup.Item>
              Current first priority:{updatedFirstPref[university.uniId]||0}
            </ListGroup.Item>
          </ListGroup>

          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {selectedPriority || 'Add to your preferences'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* Dropdown items */}
              <Dropdown.Item onClick={() =>handlePrioritySelect(university.uniId,'1st Priority')}>
                1st Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePrioritySelect(university.uniId,'2nd Priority')}>
                2nd Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePrioritySelect(university.uniId,'3rd Priority')}>
                3rd Priority
              </Dropdown.Item>
            </Dropdown.Menu>
            
          </Dropdown>
          </Card.Body>
        </Card>
      );
    })}
  </div>
);
}

export default UniCard


