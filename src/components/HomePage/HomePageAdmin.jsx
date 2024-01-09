import React, { useState, useEffect } from 'react';
import CSVExportButton from '../CSVExportButton';


import "./HomePageAdmin.css"

const HomePageAdmin = () => {
    const [universities, setUniversities] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentPreferences, setStudentPreferences] = useState({});

    const [deadline, setDeadline] = useState({});
    const [processes, setProcesses] = useState([]);
    const [extendedDeadline, setExtendedDeadline] = useState({ hours: 0, minutes: 0, seconds: 0 })
    const [extended, setExtended] = useState(false);
    const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [currentProcess, setCurrentProcess] = useState([])






    useEffect(() => {

        //fetch all universities and store them in universities usestate
        const fetchUniversities = async () => {
            try {
                const response = await fetch('http://localhost:8081/university');
                const data = await response.json();
                setUniversities(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        //fetch all students and store them in students usestate
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8081/student');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        //fetch student preferences and store them in an object
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

        //convert string to integer in order to show the respective preference it in endTable
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
        // If no setted preference is found, show nothing
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
                setCurrentProcess(activeProcess)

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
                endDateTime.setHours(23, 35, 59, 999);

                // Verlängere die Deadline um die in activeProcess.deadlineExtensionMinutes angegebene Zeit
                const extendedDeadline = new Date(endDateTime.getTime() + process.deadlineExtensionMinutes * 60000);

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

                endDateTime.setHours(23, 35, 59, 999);


                // Set the time zone to Europe/Berlin
                const endDateTimeEuropeBerlin = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

                const timeRemaining = endDateTime.getTime() - new Date().getTime();
                const hours = Math.floor(timeRemaining / 3600000);
                const minutes = Math.floor((timeRemaining % 3600000) / 60000);
                const seconds = Math.floor((timeRemaining % 60000) / 1000);

                setRemainingTime({ hours, minutes, seconds });





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
                            <h2 style={{ marginLeft: '20px' }}> Deadline was extended! New Current selection process deadline: {`${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`} </h2>
                        ) : (
                            <h2 style={{ marginLeft: '20px' }}> Current selection process deadline: {`${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`} </h2>
                        )
                    ) : (
                        <h2>No process is open!</h2>
                    )
                    }
                </div>
                <div className="headerAndButton">
                    <CSVExportButton data={students} filename="endTable.csv" />
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