import React, { useState, useEffect,useRef } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';
import {usePrioritySelection,PrioritySelectionProvider} from '../contexts/PrioritySelectionContext';



const UniversityCard = ({ university }) => {

  const [currentPriority, setCurrentPriority] = useState(null);
  const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
  const [updatedTotalPref, setUpdatedTotalPref] = useState(university.totalPref);
  const{addPriority,setDropPriorityFunction,removePriority}= usePrioritySelection();

  // Fetching data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  const [firstPriority, setFirstPriority] = useState(storedUser ? storedUser.firstPref : '');
  const [secondPriority, setSecondPriority] = useState(storedUser ? storedUser.secondPref : '');
  const [thirdPriority, setThirdPriority] = useState(storedUser ? storedUser.thirdPref : '');
 



  const [ID, setID] = useState('')

  





  const [studentPriorities, setStudentPriorities] = useState([]);

  useEffect(() => {


    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const matrikelnummer = currentUser.matrikelnummer;


    const fetchStudentPriorities = async () => {
      try {
        const response = await fetch(`http://localhost:8081/student/${matrikelnummer}/priorities`);
        const data = await response.json();


        // Update localstorage items from database
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
          storedUser.firstPref = data.firstPref;
          storedUser.secondPref = data.secondPref;
          storedUser.thirdPref = data.thirdPref;

          localStorage.setItem('currentUser', JSON.stringify(storedUser));
        }

      } catch (error) {
        console.log('Error fetching data:' + error);
      }
    };




    setID(JSON.parse(localStorage.getItem('currentUser')).matrikelnummer);

    // Setze die Dropdown-Auswahl basierend auf den Prioritäten
    if (firstPriority === university.uniId) {
      setCurrentPriority('1st Priority');
    } else if (secondPriority === university.uniId) {
      setCurrentPriority('2nd Priority');
    } else if (thirdPriority === university.uniId) {
      setCurrentPriority('3rd Priority');
    }

    console.log("firstPrio: " + firstPriority)


    fetchStudentPriorities();


  },);




  const isPrioritySelected = (priority) => {
    return university.uniId === studentPriorities[`${priority}Pref`];
  };



  
  const updatePriorities = async () => {

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));


    try {
      const response = await fetch(
        `http://localhost:8081/student/${ID}/updatePriorities`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "firstPref": storedUser.firstPref,
            "secondPref": storedUser.secondPref,
            "thirdPref": storedUser.thirdPref
          }),
        }

      );
      if (!response.ok) {

      }

    } catch (error) {
    }


  }

  const handlePrioritySelect = async (priority) => {

    if (priority === '1st Priority') {
      
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser && storedUser.firstPref === 0) {

        //if current priority is not one, then set it to one and increment firstPrefs of unicard by 1
        if (currentPriority !== '1st Priority') {
          setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
          await updateCurrentFirstPrioCount(university.uniId, true);

        }
        if (currentPriority === null) {
          //if there wasnt a priority selected, increment totalPref variable by 1
          setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
          await updateCurrentTotalPrioCount(university.uniId, true);
        }




        storedUser.firstPref = university.uniId;
        localStorage.setItem('currentUser', JSON.stringify(storedUser));

        setFirstPriority(university.uniId)
        setCurrentPriority('1st Priority')
        updatePriorities();
      } else {
        alert("This preference is aleady set for another university!");
        return;
      }

    } else if (priority === '2nd Priority') {

      // Set firstPriority in localStorage
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser && storedUser.secondPref === 0) {

        //if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
        if (currentPriority === '1st Priority') {
          setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
          await updateCurrentFirstPrioCount(university.uniId, false);
        }

        if (currentPriority === null) {
          setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
          await updateCurrentTotalPrioCount(university.uniId, true);
        }



        storedUser.secondPref = university.uniId;
        localStorage.setItem('currentUser', JSON.stringify(storedUser));

        setSecondPriority(storedUser.secondPref)
        setCurrentPriority('2nd Priority')
        updatePriorities();
      } else {
        alert("This preference is aleady set for another university!");
      }


    } else if (priority === '3rd Priority') {


      // Set thirdPriority in localStorage
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser && storedUser.thirdPref === 0) {

        if (currentPriority === '1st Priority') {
          //if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
          setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
          await updateCurrentFirstPrioCount(university.uniId, false);
        }

        if (currentPriority === null) {
          //if there wasnt a priority selected, increment totalPref variable by 1
          setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
          await updateCurrentTotalPrioCount(university.uniId, true);
        }



        storedUser.thirdPref = university.uniId;
        localStorage.setItem('currentUser', JSON.stringify(storedUser));

        setThirdPriority(university.uniId)
        setCurrentPriority('3rd Priority')
        updatePriorities();

      } else {
        alert("This preference is aleady set for another university!")
        return;
      }

    }


    if (currentPriority === '1st Priority') {
      setFirstPriority(0);
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      storedUser.firstPref = 0;
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
    } else if (currentPriority === '2nd Priority') {
      setSecondPriority(0);
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      storedUser.secondPref = 0;
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
    } else if (currentPriority === '3rd Priority') {
      setThirdPriority(0);
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      storedUser.thirdPref = 0;
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
    }
    updatePriorities();

    addPriority(university.uniId, {
      universityData: university,
      priority: { name: university.name, priority },
    }); 


  };



  const handleDropPriority = async () => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentPriority === '1st Priority' && updatedFirstPref > 0) {
      setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);

      await updateCurrentFirstPrioCount(university.uniId, false);

    }
    if (currentPriority !== null && updatedTotalPref > 0) {
      setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref - 1);
      await updateCurrentTotalPrioCount(university.uniId, false);

    }



    if (currentPriority === '1st Priority') {
      setFirstPriority(0);
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      storedUser.firstPref = 0;
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
    } else if (currentPriority === '2nd Priority') {
      setSecondPriority(0);
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      storedUser.secondPref = 0;
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
    } else if (currentPriority === '3rd Priority') {
      setThirdPriority(0);
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      storedUser.thirdPref = 0;
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
    }
    setCurrentPriority(null);

    await updatePriorities();
    removePriority(university.uniId);

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

  useEffect(() => {
    setDropPriorityFunction(handleDropPriority);
  }, []);




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
            {currentPriority !== null ? currentPriority : "Choose preference"}
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
