import React, { useState, useEffect ,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import {  Dropdown} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './UniCard.css';
import { usePrioritySelection} from '../contexts/PrioritySelectionContext';
import Items from '../Priority Page/PriorityItem';
import { UniversityCard } from './UniversityCard';







const UniCard = ({ changePreference }) => {
  const [universities, setUniversities] = useState([]);

  const [showMinGPA, setShowMinGPA] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [originalUniversities, setOriginalUniversities] = useState([]);
  const cardRefs = useRef([]);
  const [priorityState, setPriorityState] = useState({
    '1st Priority': "",
    '2nd Priority': "",
    '3rd Priority': "",
  });
  const { addPriority, removePriority,openPanel,closePanel } = usePrioritySelection();

  const dropPriority = (uniId) => {
    const priorityToDrop = getPriority(uniId);

    if (priorityToDrop !== null) {
      cardRefs.current[uniId]?.dropPriority();

    }
  };



  const getPriority = (uniId) => {
    if (cardRefs.current[uniId]) {
      return cardRefs.current[uniId].getPriority();
    }
    return null;
  };

  useEffect(() => {
    universities.forEach((university) => {
      const priority = getPriority(university.uniId);
      if (priority !== null) {

        addPriority(university.uniId, {
          universityData: university,
          priority: { name: university.name, priority },
        });
      }
    });
  }, [universities]);




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


  
  const { removeAllPriorities, priorities,isOpen } = usePrioritySelection();
  const removeAll = () => {
    priorities.forEach(priority => dropPriority(priority.id));
  };

  return (
    <>
    
      <div className={`priorityPanel ${isOpen ? '' : 'hidden'}`}>
        

        <Offcanvas show={isOpen} onHide={closePanel}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='priorityPage-title'> <h3>Your Current Preferences:</h3></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Items dropPriority={dropPriority} />
          </Offcanvas.Body>
          
          <Button variant="primary" onClick={() => { removeAllPriorities(); removeAll(); }}>Delete all</Button>
        </Offcanvas>

      </div>

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
              changePreference={changePreference}
              ref={(el) => {
                if (el) cardRefs.current[university.uniId] = el;
              }}
            />
          ))}
      </div>
    </>
  );
};

export default UniCard;
