import React, { useState, useEffect } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';



const UniversityCard = ({ university, priorityState, setPriorityState }) => {

  const [selectedPriority, setSelectedPriority] = useState('');
  const [currentPriority, setCurrentPriority] = useState('');
  const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
  const [updatedTotalPref, setUpdatedTotalPref] = useState(university.totalPref);
  const [showMinGPA, setShowMinGPA] = useState(true);

  const [selected, setSelected] = useState(false);


  const [firstPriority, setFirstPriority] = useState('');
  const [secondPriority, setSecondPriority] = useState('');
  const [thirdPriority, setThirdPriority] = useState('');



  const [studentPriorities, setStudentPriorities] = useState([]);

  /* for later, when student priorities get fetched
  useEffect(() => {
    const fetchStudentPriorities = async () => {
      try {
        const response = await fetch(`http://localhost:8081/student/7379949/priorities`);
        const data = await response.json();
        // Wandele das Objekt in ein Array um
        // Überprüfe, ob Prioritäten für die aktuelle Universität vorhanden sind
        const universityPriorities = data;

        if (universityPriorities) {
          setFirstPriority(universityPriorities.firstPref);
          setSecondPriority(universityPriorities.secondPref);
          setThirdPriority(universityPriorities.thirdPref);


          // Setze die Dropdown-Auswahl basierend auf den Prioritäten
          if (universityPriorities.firstPref) {
            handlePrioritySelect('1st Priority');
          } else if (universityPriorities.secondPref) {
            handlePrioritySelect('2nd Priority');
          } else if (universityPriorities.thirdPref) {
            handlePrioritySelect('3rd Priority');
          }
        }



      } catch (error) {
        alert('Error fetching student priorities:' + error);
      }
    };

    fetchStudentPriorities();
  }, [7379949]);

  */


  const isPrioritySelected = (priority) => {
    return university.uniId === studentPriorities[`${priority}Pref`];
  };



  /*
  useEffect(() => {
    // Überprüfen, ob eine Priorität für die aktuelle Universität vorhanden ist
    const studentPriority = studentPriorities.find(prio => prio.uniId === university.uniId);


    if (studentPriority != null) {
      // Priorität vorhanden, Dropdown-Auswahl basierend auf der Priorität setzen
      if (studentPriority.firstPref) {
        setSelectedPriority('1st Priority');
        setCurrentPriority('1st Priority');
      } else if (studentPriority.secondPref) {
        setSelectedPriority('2nd Priority');
        setCurrentPriority('2nd Priority');
      } else if (studentPriority.thirdPref) {
        setSelectedPriority('3rd Priority');
        setCurrentPriority('3rd Priority');
      }
    }
  }, [university.uniId, studentPriorities]);
  */

  const handlePrioritySelect = async (priority) => {
    //If no priority was selected, then return method

    /* for later
    if (!selected) {
      return
    }
    */
    if (priority === '1st Priority') {
      //if current priority is not one, then set it to one and increment firstPrefs of unicard by 1
      if (currentPriority !== '1st Priority') {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
        await updateCurrentFirstPrioCount(university.uniId, true);

      }

      if (currentPriority === '') {
        //if there wasnt a priority selected, increment totalPref variable by 1
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
        await updateCurrentTotalPrioCount(university.uniId, true);
      }

      setCurrentPriority('1st Priority');
    } else if (priority === '2nd Priority') {
      //if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
      if (currentPriority === '1st Priority') {
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        await updateCurrentFirstPrioCount(university.uniId, false);
      }

      if (currentPriority === '') {
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
        await updateCurrentTotalPrioCount(university.uniId, true);
      }

      setCurrentPriority('2nd Priority');
    } else {
      if (currentPriority === '1st Priority') {
        //if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
        setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
        await updateCurrentFirstPrioCount(university.uniId, false);
      }

      if (currentPriority === '') {
        //if there wasnt a priority selected, increment totalPref variable by 1
        setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
        await updateCurrentTotalPrioCount(university.uniId, true);
      }

      setCurrentPriority('3rd Priority');
    }

    setSelectedPriority(priority);

  };



  const handleDropPriority = async () => {
    if (currentPriority === '1st Priority' && updatedFirstPref > 0) {
      setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);

      await updateCurrentFirstPrioCount(university.uniId, false);

    }
    if (currentPriority !== '' && updatedTotalPref > 0) {
      setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref - 1);
      await updateCurrentTotalPrioCount(university.uniId, false);

    }
    setCurrentPriority('');
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
            {/*  {!selected
              ? (firstPriority === university.uniId
                ? '1st Priority'
                : secondPriority === university.uniId
                  ? '2nd Priority'
                  : thirdPriority === university.uniId
                    ? '3rd Priority'
                    : 'Choose Preference')
              : "Choose Preference"} */}
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [originalUniversities, setOriginalUniversities] = useState([]);

  useEffect(() => {
    setOriginalUniversities(universities);
  }, [universities]);


  //For filter function by region for the student
  const handleFilterByRegion = (region) => {
    setSelectedRegion(region);

    const updatedTableData = originalUniversities.filter((university) =>
      university.country.toLowerCase().includes(region.toLowerCase()) ||
      university.city.toLowerCase().includes(region.toLowerCase())
    );

    setUniversities(updatedTableData);
  };

  //Showing the regions of the universities
  const getUniqueRegions = () => {
    const regions = Array.from(new Set(universities.flatMap((university) => [university.country])));
    return regions.filter(Boolean);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };



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

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='card-container'>
      <div className="filter-dropdown">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-region">
            {selectedRegion ? `Filtering by: ${selectedRegion}` : 'Filter by region'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {getUniqueRegions().map((region) => (
              <Dropdown.Item key={region} onClick={() => handleFilterByRegion(region)}>
                {region}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="search">
        <form className="form-inline">
          <span className="icon">🔍</span>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search by names..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
      {universities
        .filter((university) =>
          (selectedRegion ?
            university.country.toLowerCase().includes(selectedRegion.toLowerCase()) ||
            university.city.toLowerCase().includes(selectedRegion.toLowerCase()) :
            true) &&
          university.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((university) => (
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
