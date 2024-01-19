import React, { useState, useEffect } from 'react';


import "./HomePageAdmin.css"

const HomePageAdmin = () => {
    const [universities, setUniversities] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentPreferences, setStudentPreferences] = useState({});

    const [deadline, setDeadline] = useState({});
    const [processes, setProcesses] = useState([]);
    const [extendedDeadline, setExtendedDeadline] = useState({ days: 0, hours: 0, minutes: 0 })
    const [extended, setExtended] = useState(false);
    const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0 });
    const [currentProcess, setCurrentProcess] = useState([])






    useEffect(() => {

        const fetchUniversities = async () => {
            try {
                const response = await fetch('http://localhost:8081/university');
                const data = await response.json();
                setUniversities(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8081/student');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        const fetchStudentPreferences = async () => {
            try {
                const preferences = await Promise.all(
                    students.map(async (student) => {
                        const response = await fetch(`http://localhost:8081/student/${student.matrikelnummer}/priorities`);
                        const prefs = await response.json();
                        return { studentID: student.matrikelnummer, preferences: prefs };
                    })
                );
                const preferencesMap = preferences.reduce((acc, { studentID, preferences }) => {
                    return Object.assign(acc, { [studentID]: preferences });

                }, {});

                setStudentPreferences(preferencesMap);


            } catch (error) {
                console.log('Error fetching student preferences:', error);
            }
        };

        fetchUniversities();
        fetchStudents();
        fetchStudentPreferences();
    }, [students]);



    const studentNames = students.map((student) => `${student.vorname} ${student.nachname}`);
    const studentMatrikelnumbers = students.map((student) => student.matrikelnummer);

    const fillTableCells = (uniID, studentID) => {

        const preferences = studentPreferences[studentID] || {};

        const preferenceOrder = ['thirdPref', 'secondPref', 'firstPref'].find(
            pref => preferences[pref] === uniID
        );

        let pref = 0;
        if (preferenceOrder === 'thirdPref') {
            pref = 3;
        } else if (preferenceOrder === 'secondPref') {
            pref = 2;
        } else if (preferenceOrder === 'firstPref') {
            pref = 1;
        } else {
            pref = '';
        }
        if (preferenceOrder === -1) {
            return <td ></td>;
        }
        return <td >{pref}</td>;
    };

    useEffect(() => {
        const fetchProcesses = async () => {
            try {
                const response = await fetch('http://localhost:8081/selectionProcess');
                const data = await response.json();
                setProcesses(data);
                const activeProcess = getActiveProcess(data);
                setCurrentProcess(activeProcess);
                /*
                if (activeProcess && new Date() > new Date(activeProcess.endDate)) {
                    await fetch('http://localhost:8081/triggerAllocation', { method: 'POST' });
                }
                */

            } catch (error) {
                console.log('Error fetching data:' + error);
            }
        };


        fetchProcesses();
        const interval = setInterval(fetchProcesses, 1000);


        return () => clearInterval(interval);
    }, []);

    /*

    useEffect(() => {
        const allocateStudents = async () => {
            try {
                const response = await fetch("http://localhost:8081/allocation/allocateStudentsToUniversities", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {

                } else {
                    console.error('Error during allocation:', response.statusText);
                    // Handle the error appropriately
                }
            } catch (error) {
                console.error('Error during allocation:', error.message);
                // Handle the error appropriately
            }
        };

        if (currentProcess && new Date() > new Date(currentProcess.endDate)) {
            allocateStudents();

        };
    }, [currentProcess]); // Empty dependency array ensures the effect runs once when the component mounts

    */


    //fetch the current process if one is active or return false otherwise
    const getActiveProcess = (data) => {
        const currentDate = new Date();

        for (const process of data) {
            const startDateTime = new Date(process.startDate);


            const endDateTime = new Date(process.endDate);

            if (process.extended) {
                startDateTime.setHours(0, 0, 0, 0);

                endDateTime.setHours(23, 59, 59, 0);

                const extensionMinutes = process.deadlineExtensionMinutes;

                const newHours = Math.floor(extensionMinutes / 60);
                const newMinutes = extensionMinutes % 60;
                endDateTime.setHours(newHours, newMinutes, 0, 999);

                // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
                const extendedDeadline = new Date(endDateTime.getTime());
                const newTimeRemaining = extendedDeadline.getTime() - new Date().getTime();
                const extendedDays = Math.floor(newTimeRemaining / (24 * 60 * 60 * 1000));
                const extendedHours = Math.floor((newTimeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                const extendedMinutes = Math.floor((newTimeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                const extendedSeconds = Math.floor((newTimeRemaining % (60 * 1000)) / 1000);

                // Set extended deadline based on the new time
                setExtendedDeadline({ days: extendedDays, hours: extendedHours, minutes: extendedMinutes });

                setRemainingTime({ days: extendedDays, hours: extendedHours, minutes: extendedMinutes });


            } else {
                startDateTime.setHours(0, 0, 0, 0);

                endDateTime.setHours(23, 59, 59, 0);

                const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

                const timeRemaining = endDateTime.getTime() - new Date().getTime();
                const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
                const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
                setRemainingTime({ days, hours, minutes });

            }

            if (currentDate >= startDateTime && currentDate <= endDateTime) {
                return process;
            }
        }
        return null;
    };



    return (
        <div>
            <div className="table-container">
                <div>
                    {currentProcess ? (
                        currentProcess.extended ? (
                            <h2 style={{ marginLeft: '20px' }}> Deadline was extended! New Current selection process deadline: {`${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes`} </h2>
                        ) : (
                            <h2 style={{ marginLeft: '20px' }}> Current selection process deadline: {`${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes`} </h2>
                        )
                    ) : (
                        <h2>No process is open!</h2>
                    )
                    }
                </div>
                <div className="table-responsive " >

                    <table className="table table-bordered table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: 'LightGreen' }}>Slots</th>
                                {universities.map((university) => (
                                    <td>{university.slots}</td>
                                ))}
                            </tr>
                            <tr>
                                <th style={{ backgroundColor: 'LightGreen' }}>FirstPrio</th>
                                {universities.map((university) => (
                                    <td >{university.firstPref}</td>
                                ))}
                            </tr>
                            <tr>
                                <th style={{ backgroundColor: 'LightGreen' }}>Uni Name</th>
                                {universities.map((university) => (
                                    <td style={{ backgroundColor: '#F4A08E' }} >{university.name}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {studentMatrikelnumbers.map((studentName, index) => (
                                <tr >
                                    <th colSpan={1}>Student ID {studentName}</th>
                                    {universities.map((university) => (
                                        fillTableCells(university.uniId, studentName)
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default HomePageAdmin;