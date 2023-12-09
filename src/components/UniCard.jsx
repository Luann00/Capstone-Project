import React, { useState, useEffect } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';



const UniversityCard = ({ university, priorityState, setPriorityState }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [previousPriority, setPreviousPriority]= useState('');
  const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
  const [updatedTotalPref, setUpdatedTotalPref] = useState(university.totalPref);
  const [showMinGPA, setShowMinGPA] = useState(true);

useEffect(() => {
  const storeState = window.localStorage.getItem('stored Priority');
  setSelectedPriority(JSON.parse(storeState));
}, [])




useEffect(()=>{
console.log('Priority',selectedPriority);
window.localStorage.setItem('stored Priority',JSON.stringify(selectedPriority));
},[selectedPriority]);

  const handlePrioritySelect = async (priority) => {
    if (priority === '1st Priority') {
      if (previousPriority !== '1st Priority') {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
        await updateCurrentFirstPrioCount(university.uniId, true);
      }
  
      if (previousPriority === '') {
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
        await updateCurrentTotalPrioCount(university.uniId, true);
      }
  
      setPreviousPriority('1st Priority');
    } else if (priority === '2nd Priority') {
      if (previousPriority === '1st Priority') {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        await updateCurrentFirstPrioCount(university.uniId, false);
      }
  
      if (previousPriority === '') {
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
        await updateCurrentTotalPrioCount(university.uniId, true);
      }
  
      setPreviousPriority('2nd Priority');
    } else {
      if (previousPriority === '1st Priority') {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        await updateCurrentFirstPrioCount(university.uniId, false);
      }
  
      if (previousPriority === '') {
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
        await updateCurrentTotalPrioCount(university.uniId, true);
      }
  
      setPreviousPriority('3rd Priority');
    }
  
    setSelectedPriority(priority);
  };
  


  const handleDropPriority = async () => {
    if (previousPriority==='1st Priority' && updatedFirstPref > 0) {
      setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);

      await updateCurrentFirstPrioCount(university.uniId, false);
      
    }
    if (previousPriority!=='' && updatedTotalPref > 0) {
      setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref - 1);
      await updateCurrentTotalPrioCount(university.uniId, false);

    }
    setPreviousPriority('');
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

        <Card.Title> <a href="#">{university.name} ({university.abbName})</a></Card.Title>
        <Card.Text>

          <span><BsPinMapFill /></span>
          <span> {university.country},{university.city}</span>
        </Card.Text>

        <ListGroup variant="flush">
          <ListGroup.Item> <span><MdChairAlt /></span> Places available: {university.slots}</ListGroup.Item>


          {university.showGPA ? (
          <ListGroup.Item> <span><CiPen /></span>Minimum GPA (as of last year): {university.minGPA}</ListGroup.Item>
        ) : null}

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
  const [showMinGPA, setShowMinGPA] = useState(true);


  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:8081/university');
        const data = await response.json();
        setUniversities(data);
        const initialShowMinGPAColumn = data.length > 0 ? data[0].showGPA : false;
        

        setShowMinGPA(initialShowMinGPAColumn);
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
