import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import UniCard from "../../components/UniCard/UniCard";
import NavBarStudent from '../NavigationBar/NavBarStudent';
import './UniCardPage.css';

const UniCardPage = () => {
  const [processIsActive, setProcessIsActive] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [extended, setExtended] = useState(false);
  const [extendedDeadline, setExtendedDeadline] = useState({ hours: 0, minutes: 0, seconds: 0 })

  const updateProcessData = (data) => {
    const activeProcess = getActiveProcess(data);

    if (activeProcess) {
      const endDateTime = new Date(activeProcess.endDate);
      endDateTime.setHours(18, 55, 0, 999);

      // Set the time zone to Europe/Berlin
      const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

      const timeRemaining = endDateTime.getTime() - new Date().getTime();
      const hours = Math.floor(timeRemaining / 3600000);
      const minutes = Math.floor((timeRemaining % 3600000) / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      // Use the updated state directly in the condition
      if (hours === 0 && minutes < 15) {
        // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
        const extendedDeadline = new Date(endDateTime.getTime() + activeProcess.deadlineExtensionMinutes * 60000);
        // Berechne hours, minutes und seconds für extendedDeadline
        const extendedHours = Math.floor(activeProcess.deadlineExtensionMinutes / 60);
        const extendedMinutes = activeProcess.deadlineExtensionMinutes % 60;
        const extendedSeconds = 0; // Du kannst hier eine Logik für Sekunden implementieren, wenn nötig

        // Set extended state
        setExtended(true);

        // Set extended deadline based on the condition
        setExtendedDeadline({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });

      } else {
        setExtended(false);
      }

      setRemainingTime({ hours, minutes, seconds });

      //get current process and fetch deadline extension in minutes variable
      setProcessIsActive(true);
    } else {
      setProcessIsActive(false);
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
        console.log('Error fetching data:' + error);
      }
    };
    fetchProcesses();
    const interval = setInterval(fetchProcesses, 1000);

    return () => clearInterval(interval);
  }, []);


  const getActiveProcess = (data) => {
    const currentDate = new Date();

    for (const process of data) {
      const startDateTime = new Date(process.startDate);
      const endDateTime = new Date(process.endDate);

      // Set time to the beginning of the day for startDateTime
      startDateTime.setHours(0, 0, 0, 0);

      // Set time to 11:59:59.999 for endDateTime
      endDateTime.setHours(18, 55, 0, 999);

      if (currentDate >= startDateTime && currentDate <= endDateTime) {
        return process;
      }
    }

    return null;
  };

  return (
    <div className='card-page'>
      {processIsActive ? (
        <div className='title'>
          {extended ? (
            <span>Deadline wurde verlängert!</span>
          ) : (
            <span>Remaining Time: {`${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`}</span>
          )}
          <h1>List of partner universities</h1>
          <span>Pick your top three preferred universities from the list below!</span>
        </div>
      ) : (
        <div className='empty-page'>
          <h1>There is no selection process open!</h1>
        </div>
      )}
      {processIsActive && (
        <div className='card-container'>
          <UniCard />
        </div>
      )}
    </div>
  );
};

export default UniCardPage;
