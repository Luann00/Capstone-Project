import React, { useState, useEffect } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';



const UniversityCard = ({ university, priorityState, setPriorityState }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
  const [firstPrioritySelected, setFirstPrioritySelected] = useState(false);
  const [otherPrioritySelected,setOtherPrioritySelected]= useState(false);
  const [updatedTotalPref, setUpdatedTotalPref] = useState(university.totalPref);


  const handlePrioritySelect = async (priority) => {
    if (priority === '1st Priority') {
      if (!firstPrioritySelected) {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
        setSelectedPriority(priority);
        await updateCurrentFirstPrioCount(university.uniId, true); 

        if (updatedTotalPref === 0) {
          setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1); // Increment totalPref by 1 
          await updateCurrentTotalPrioCount(university.uniId, true);
          

        }
        setFirstPrioritySelected(true);
      } else{
        setSelectedPriority(priority);

      }
      setOtherPrioritySelected(false);
      
        
    }
    else {
      setOtherPrioritySelected(true);
      if (firstPrioritySelected) {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        await updateCurrentFirstPrioCount(university.uniId, false);
        setFirstPrioritySelected(false);

      }
      if (updatedTotalPref === 0) {
        setSelectedPriority(priority);
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1); // Increment totalPref by 1 only once
        await updateCurrentTotalPrioCount(university.uniId, true);
      }
      setSelectedPriority(priority);
      

    }
    
    
  };


  const handleDropPriority = async() => {
    if(firstPrioritySelected&&updatedFirstPref>0){
      setUpdatedFirstPref((prevUpdatedFirstPref)=> prevUpdatedFirstPref-1);
      
      await updateCurrentFirstPrioCount(university.uniId, false);
      setFirstPrioritySelected(false);
    }
    if(otherPrioritySelected&&updatedTotalPref>0){
      setUpdatedTotalPref((prevUpdatedTotalPref)=> prevUpdatedTotalPref-1);
    await updateCurrentTotalPrioCount(university.uniId,false);

    }
    
    setSelectedPriority('');
    

    }

  







  const updateCurrentFirstPrioCount = async (uniId, increment) => {
    try {
      // Fetch the current university data
      const response = await fetch(`http://localhost:8081/university/${uniId}`);
      const universityData = await response.json();

      // Update the firstPref count based on the provided increment value
      universityData.firstPref = increment
        ? universityData.firstPref + 1
        : universityData.firstPref - 1;


      // Update the API with the modified data
      const putResponse = await fetch(`http://localhost:8081/university/${uniId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(universityData),
      });

      if (!putResponse.ok) {
        alert("Test: " + putResponse);
      }
    } catch (error) {
      alert("Catch: " + error);
    }
  };



  const updateCurrentTotalPrioCount = async (uniId, increment) => {
    try {
      // Fetch the current university data
      const response = await fetch(`http://localhost:8081/university/${uniId}`);
      const universityData = await response.json();

      // Update the firstPref count based on the provided increment value

      universityData.totalPref = increment
        ? universityData.totalPref + 1
        : universityData.totalPref - 1; // or use any other logic you need

      // Update the API with the modified data
      const putResponse = await fetch(`http://localhost:8081/university/${uniId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(universityData),
      });

      if (!putResponse.ok) {
        alert("Test: " + putResponse);
      }
    } catch (error) {
      alert("Catch: " + error);
    }
  };




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
          <ListGroup.Item> Minimum GPA (as of last year) : {university.minGPA}</ListGroup.Item>
          <ListGroup.Item>
            <span><BsFillPeopleFill /></span>
            Chosen as first priority by: {updatedFirstPref}
          </ListGroup.Item>
          <ListGroup.Item>
            <span><BsFillPeopleFill /></span>
            Chosen as priority by : {updatedTotalPref}
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
            <Dropdown.Item onClick={() => handleDropPriority()} >
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
    '1st Priority': "",
    '2nd Priority': "",
    '3rd Priority': "",
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
