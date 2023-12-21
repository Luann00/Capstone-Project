import React, { useState, useEffect } from 'react';

const HomePageAdmin = () => {
    const [universities, setUniversities] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentPreferences, setStudentPreferences] = useState({});



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



    return (
        <div>
            <h1>This is the main page for the admin!</h1>
            <table className="table table-striped table-hover table-bordered">
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
    );

};

export default HomePageAdmin;