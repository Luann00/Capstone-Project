import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import UniCard from "../../components/UniCard/UniCard";
import NavBarStudent from '../NavigationBar/NavBarStudent';
import './UniCardPage.css';

const UniCardPage = () => {
  const [processIsActive, setProcessIsActive] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [currentProcess, setCurrentProcess] = useState([])
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [extended, setExtended] = useState(false);
  const [extendedDeadline, setExtendedDeadline] = useState({ hours: 0, minutes: 0, seconds: 0 })


  const updateProcessData = (data) => {
    const activeProcess = getActiveProcess(data);
    setCurrentProcess(activeProcess)

    if (activeProcess) {

      //if deadline was extended, set the new deadline based on the minutes specified in process table
      if (activeProcess.extended) {

        const endDateTime = new Date(activeProcess.endDate);
        endDateTime.setHours(18, 45, 0, 999);
        const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

        const timeRemaining = endDateTime.getTime() - new Date().getTime();
        const hours = Math.floor(timeRemaining / 3600000);
        const minutes = Math.floor((timeRemaining % 3600000) / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);


        setProcessIsActive(true);

        // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
        const extendedDeadline = new Date(endDateTime.getTime() + activeProcess.deadlineExtensionMinutes * 60000);
        // Extrahiere Stunden, Minuten und Sekunden aus extendedDeadline

        const newTimeRemaining = extendedDeadline.getTime() - new Date().getTime();

        const extendedHours = Math.floor(newTimeRemaining / 3600000);
        const extendedMinutes = Math.floor((newTimeRemaining % 3600000) / 60000);
        const extendedSeconds = Math.floor((newTimeRemaining % 60000) / 1000);

        // Set extended deadline based on the condition
        setExtendedDeadline({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });


        setRemainingTime({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });
        setExtended(activeProcess.extended)
        return;
      }
      const endDateTime = new Date(activeProcess.endDate);
      endDateTime.setHours(18, 45, 0, 999);

      // Set the time zone to Europe/Berlin
      const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

      const timeRemaining = endDateTime.getTime() - new Date().getTime();
      const hours = Math.floor(timeRemaining / 3600000);
      const minutes = Math.floor((timeRemaining % 3600000) / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);

      setRemainingTime({ hours, minutes, seconds });

      setProcessIsActive(true);
      setExtended(activeProcess.extended)
    } else {
      setProcessIsActive(false);
    }
  };


  const checkAndExtendTime = () => {

    //get current process
    const activeProcess = currentProcess;

    const endDateTime = new Date(activeProcess.endDate);
    endDateTime.setHours(18, 45, 0, 999);


    // Set the time zone to Europe/Berlin
    const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

    //compute time
    const timeRemaining = endDateTime.getTime() - new Date().getTime();
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);

    if (hours === 0 && minutes < 15) {
      if (activeProcess.extended) {
        return;
      }
      // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
      const extendedDeadline = new Date(endDateTime.getTime() + activeProcess.deadlineExtensionMinutes * 60000);
      // Extrahiere Stunden, Minuten und Sekunden aus extendedDeadline
      const extendedHours = extendedDeadline.getHours();
      const extendedMinutes = extendedDeadline.getMinutes();
      const extendedSeconds = extendedDeadline.getSeconds();

      // Set extended state
      setExtended(true);


      // Set extended deadline based on the condition
      setExtendedDeadline({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });


      //set extended in database to true
      activeProcess.extended = true;
      updateProcessDatabase(activeProcess);

    } else {
      setExtended(false);
    }


  }

  const updateProcessDatabase = async (process) => {

    try {
      const response = await fetch(
        `http://localhost:8081/selectionProcess/${process.year}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(process),
        }
      );


    } catch (error) {
      console.error("Error updating process:", error);
    }

  }

  useEffect(() => {

    const fetchProcesses = async () => {
      try {
        const response = await fetch('http://localhost:8081/selectionProcess');
        const data = await response.json();
        setProcesses(data);
        updateProcessData(data);
        if (extendedDeadline === null) { }

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



      if (process.extended) {
          // Set time to the beginning of the day for startDateTime
          startDateTime.setHours(0, 0, 0, 0);

          // Set time to 11:59:59.999 for endDateTime
          endDateTime.setHours(18, 45, 0, 999);

        // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
        const extendedDeadline = new Date(endDateTime.getTime() + process.deadlineExtensionMinutes * 60000);
        // Extrahiere Stunden, Minuten und Sekunden aus extendedDeadline

        endDateTime.setHours(extendedDeadline.getHours(), extendedDeadline.getMinutes(), extendedDeadline.getSeconds())

        const newTimeRemaining = extendedDeadline.getTime() - new Date().getTime();

        const extendedHours = Math.floor(newTimeRemaining / 3600000);
        const extendedMinutes = Math.floor((newTimeRemaining % 3600000) / 60000);
        const extendedSeconds = Math.floor((newTimeRemaining % 60000) / 1000);

        // Set extended deadline based on the condition
        setExtendedDeadline({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });

        setRemainingTime({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });


      } else {
        // Set time to the beginning of the day for startDateTime
        startDateTime.setHours(0, 0, 0, 0);

        // Set time to 11:59:59.999 for endDateTime
        endDateTime.setHours(18, 45, 0, 999);
      }


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
            <span>Deadline wurde verlängert! Neue Deadline: {`${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`}</span>
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
          <UniCard changePreference={checkAndExtendTime} />
        </div>
      )}
    </div>
  );
};

export default UniCardPage;
