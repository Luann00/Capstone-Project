import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import UniCard from '../components/UniCard';
import NavBarStudent from '../components/NavBarStudent';
import './UniCardPage.css';


const UniCardPage = () => {
  let condition = false; // Hier deine eigene Bedingung

  const [processes, setProcesses] = useState([]);
  const [search, setSearch] = useState("");

  



  // Datenbankanfrage, um die Daten beim Laden der Komponente abzurufen
  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response = await fetch('http://localhost:8081/selectionProcess');
        const data = await response.json();
        setProcesses(data);
      } catch (error) {
        alert('Error fetching data:' + error);
      }
    };

    fetchProcesses();
    const interval = setInterval(fetchProcesses, 10000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);


 // Function to check if the current time is within the interval
const processIsActive = () => {
  const currentDate = new Date();
  let isActive = false; // Variable to track if any process is active

  processes.forEach((process) => {
    const startDateTime = new Date(process.startDate);
    const endDateTime = new Date(process.endDate);

    // Check if the current date is within the interval
    if (currentDate >= startDateTime && currentDate <= endDateTime) {
      isActive = true; // Set the variable to true if an active process is found
    }
  });

  return isActive; // Return the final value after the loop
};

if (processIsActive()) {
  condition = true;
}

  return (
    <div className='card-page'>
      <div className='navbar'>
        <NavBarStudent />
      </div>

      {condition ? (
        // Wenn die Bedingung erfüllt ist
        <>
          <div className='title'>
            <h1>List of partner universities</h1>
            <span>Pick your top three preferred universities from the list below!</span>
          </div>
          <div className='card-container'>
            <UniCard />
          </div>
        </>
      ) : (
        // Wenn die Bedingung nicht erfüllt ist
        <div className='empty-page'>
          <h1>Es ist kein Auswahlverfahren offen!</h1>
        </div>
        
      )}
    </div>
  );
};

export default UniCardPage;
