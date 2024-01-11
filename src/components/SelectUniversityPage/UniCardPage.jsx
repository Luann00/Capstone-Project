import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import UniCard from "../../components/UniCard/UniCard";
import NavBarStudent from '../NavigationBar/NavBarStudent';
import './UniCardPage.css';
import PrioritySelection from '../Priority Page/PriorityPage';

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


        // calculate the new deadline based on the extension minutes
        const extensionMinutes = activeProcess.deadlineExtensionMinutes;

        // calculate new hours, minutes, and seconds
        const newHours = Math.floor(extensionMinutes / 60);
        const newMinutes = extensionMinutes % 60;

        // extend the deadline
        endDateTime.setHours(newHours, newMinutes, 59, 999);

        const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

        const timeRemaining = endDateTime.getTime() - new Date().getTime();
        const hours = Math.floor(timeRemaining / 3600000);
        const minutes = Math.floor((timeRemaining % 3600000) / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);


        setProcessIsActive(true);

        // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
        const extendedDeadline = new Date(endDateTime.getTime());


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
      endDateTime.setHours(23, 59, 59, 999);

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


  const updateProcesses = async (selectedProcess) => {

    try {
      // compute new endDate
      const extendedMinutes = selectedProcess.deadlineExtensionMinutes;
      const extendedDays = Math.ceil(extendedMinutes / (24 * 60));

      // Convert selectedProcess.endDate to Date object
      const currentEndDate = new Date(selectedProcess.endDate);

      // Add the calculated days to the current endDate's date part
      currentEndDate.setDate(currentEndDate.getDate() + extendedDays);

      // Convert currentEndDate to ISO string without the time part
      const formattedEndDate = currentEndDate.toISOString().split('T')[0];


      selectedProcess.endDate = formattedEndDate;

      const response = await fetch(
        `http://localhost:8081/selectionProcess/${selectedProcess.year}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedProcess),

        }
      );

      if (!response.ok) {
        console.log("Error updating process. Response status:", response.status);
        console.log("Response body:", await response.text());
      } else {

      }
    } catch (error) {
      console.error("Error updating process:", error);
      console.log("Error during the request.");
    }
  };



  //this method is for extending the deadline after a change in the preference of a student in the last 15 minutes
  const checkAndExtendTime = () => {

    //get current process
    const activeProcess = currentProcess;


    //if process is already extended, leave the method and do nothing. if not, change database with put request accordingly
    if (activeProcess.extended) {
      return;
    }


    const endDateTime = new Date(activeProcess.endDate);



    // calculate the new deadline based on the extension minutes
    const extensionMinutes = activeProcess.deadlineExtensionMinutes;

    // calculate new hours, minutes, and seconds
    const newHours = Math.floor(extensionMinutes / 60);
    const newMinutes = extensionMinutes % 60;

    const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

    // Set hours, minutes, and seconds of endDateTime to 0
    endDateTime.setHours(23, 59, 99, 999);


    console.log("end time: " + endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

    // compute time
    const timeRemaining = endDateTime.getTime() - new Date().getTime();
    const hours = Math.floor(Math.floor(timeRemaining / 3600000));
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    console.log("hours: " + hours);
    console.log("minutes: " + minutes);
    console.log("seconds: " + seconds);


    if (hours === 0 && minutes < 15) {
      updateProcesses(activeProcess);
      const endDateTime = new Date(activeProcess.endDate);

      // calculate the new deadline based on the extension minutes
      const extensionMinutes = activeProcess.deadlineExtensionMinutes;

      // calculate new hours, minutes, and seconds
      const newHours = Math.floor(extensionMinutes / 60);
      const newMinutes = extensionMinutes % 60;
      endDateTime.setHours(newHours, newMinutes, 59, 999);


      // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
      const extendedDeadline = new Date(endDateTime.getTime());
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

        // Set time to the beginning of the day
        startDateTime.setHours(0, 0, 0, 0);

        const endDateTime = new Date(process.endDate);


        // calculate the new deadline based on the extension minutes
        const extensionMinutes = process.deadlineExtensionMinutes;

        // calculate new hours, minutes, and seconds
        const newHours = Math.floor(extensionMinutes / 60);
        const newMinutes = extensionMinutes % 60;

        // extend the deadline
        endDateTime.setHours(newHours, newMinutes, 59, 999);

        // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
        const extendedDeadline = new Date(endDateTime.getTime());

        endDateTime.setHours(extendedDeadline.getHours(), extendedDeadline.getMinutes(), extendedDeadline.getSeconds())

        const newTimeRemaining = extendedDeadline.getTime() - new Date().getTime();

        const extendedHours = Math.floor(newTimeRemaining / 3600000);
        const extendedMinutes = Math.floor((newTimeRemaining % 3600000) / 60000);
        const extendedSeconds = Math.floor((newTimeRemaining % 60000) / 1000);

        // Set extended deadline based on the new time
        setExtendedDeadline({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });

        setRemainingTime({ hours: extendedHours, minutes: extendedMinutes, seconds: extendedSeconds });

      } else {
        startDateTime.setHours(0, 0, 0, 0);

        endDateTime.setHours(23, 59, 59, 999);
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
          <div className='countdown'>
          {extended ? (
            
            <div className='clock'>
              <h4>Deadline was extended! New Time: </h4>
              <div className='content'>

              {Object.entries(remainingTime).map((el) => {
					const label = el[0];
					const value = el[1];
					return (
						<div className='box' key={label}>
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label'> {label} </span>
						</div>
					);
				})}
                </div></div>
          ) : (<div className='clock'>
          <h4>Remaining time: </h4>
          <div className='content'>

          {Object.entries(remainingTime).map((el) => {
      const label = el[0];
      const value = el[1];
      return (
        <div className='box' key={label}>
          <div className='value'>
            <span>{value}</span>
          </div>
          <span className='label'> {label} </span>
        </div>
      );
    })}
            </div></div>
            
          )}

          </div>

          
          <h1>List of partner universities</h1>
          <p>Pick your top three preferred universities from the list below!</p>
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
