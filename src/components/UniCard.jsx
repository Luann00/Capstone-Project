
import React,{ useState, useEffect } from 'react';
import { Card,CardImg,CardBody,Dropdown,Button,ListGroup,ListGroupItem } from 'react-bootstrap/';



const UniCard = () => {
  const [universities, setUniversity] = useState([]);

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




    
  return (
    <div>
      {universities.map((university) => (
        <Card key={university.uniId} style={{ width: '18rem' }}>
          {/* Card image (if available) */}
          {/* <Card.Img variant="top" src={university.imageUrl} /> */}

          <Card.Body>
            <Card.Title>{university.name}</Card.Title>
            <Card.Text>
              {/* University description or other relevant information */}
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">View more</Card.Link>

            <ListGroup variant="flush">
              {/* List items for university information */}
              <ListGroup.Item>Places available: {university.slots}</ListGroup.Item>
              <ListGroup.Item>
                Current first priority: {university.firstPref}
              </ListGroup.Item>
            </ListGroup>

            {/* Dropdown example */}
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* Dropdown items */}
                <Dropdown.Item href="#">Action 1</Dropdown.Item>
                <Dropdown.Item href="#">Action 2</Dropdown.Item>
                <Dropdown.Item href="#">Action 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UniCard