import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import UniCard from '../components/UniCard';
import NavBarStudent from '../components/NavBarStudent';
import './UniCardPage.css';

const UniCardPage = () => {
  const [condition, setCondition] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const updateProcessData = (data) => {
    const activeProcess = getActiveProcess(data);

    if (activeProcess) {
      const endDateTime = new Date(activeProcess.endDate);
      endDateTime.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
      // Set the time zone to Europe/Berlin
      const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

      setDeadline(endDateTime);

      const timeRemaining = endDateTime.getTime() - new Date().getTime();
      const hours = Math.floor(timeRemaining / 3600000);
      const minutes = Math.floor((timeRemaining % 3600000) / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      setRemainingTime({ hours, minutes, seconds });
      setCondition(true);
    } else {
      setCondition(false);
    }
  };

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response = await fetch('http://localhost:8081/selectionProcess');
        const data = await response.json();
        setProcesses(data);
        updateProcessData(data);
      } catch (error) {
        alert('Error fetching data:' + error);
      }
    };

    fetchProcesses();
    const interval = setInterval(fetchProcesses, 1000);

    return () => clearInterval(interval);
  }, []);

  const processIsActive = () => {
    const currentDate = new Date();
    let isActive = false;

    processes.forEach((process) => {
      const startDateTime = new Date(process.startDate);
      const endDateTime = new Date(process.endDate);

      if (currentDate >= startDateTime && currentDate <= endDateTime) {
        isActive = true;
      }
    });

    return isActive;
  };

  const getActiveProcess = (data) => {
    const currentDate = new Date();

    for (const process of data) {
      const startDateTime = new Date(process.startDate);
      const endDateTime = new Date(process.endDate);

      if (currentDate >= startDateTime && currentDate <= endDateTime) {
        return process;
      }
    }

    return null;
  };

  return (
    <div className='card-page'>
      <div className='navbar'>
        <NavBarStudent />
      </div>

      {condition ? (
        <div className='title'>
          Remaining Time: {`${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`}
          <h1>List of partner universities</h1>
          <span>Pick your top three preferred universities from the list below!</span>
        </div>
      ) : (
        <div className='empty-page'>
          <h1>Es ist kein Auswahlverfahren offen!</h1>
        </div>
      )}

      {condition && (
        <div className='card-container'>
          <UniCard />
        </div>
      )}
    </div>
  );
};

export default UniCardPage;
