import React, { useState, useEffect } from 'react';

//Definiere in dieser Klasse die Endtabelle für den Admin mit allen wichtigen Informationen
const HomePageAdmin = () => {
    const [universities, setUniversities] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentPreferences, setStudentPreferences] = useState({});



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
                    // Alternatively, you can use the spread operator:
                    // return { ...acc, [studentId]: preferences };
                }, {});

                setStudentPreferences(preferencesMap); // Set the state with the preferences map


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
        } else if(preferenceOrder === 'firstPref'){
            pref = 1;
        } else {
            pref = '';
        }
    

        // If no setted preference is found, show nothing
        if (preferenceOrder === -1) {
            return <td key={studentID}></td>;
        }


        return <td key={studentID}>{pref}</td>;

    };



    return (
        <div>
            <h1>This is the main page for the admin!</h1>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                    <th style={{ backgroundColor: 'LightGreen' }}>Slots</th>
                        {universities.map((university) => (
                            <td key={university.id}>{university.slots}</td>
                        ))}
                    </tr>
                    <tr>
                    <th style={{ backgroundColor: 'LightGreen' }}>FirstPrio</th>
                        {universities.map((university) => (
                            <td key={university.id}>{university.firstPref}</td>
                        ))}
                    </tr>
                    <tr>
                        <th style={{ backgroundColor: 'LightGreen' }}>Uni Name</th>
                        {universities.map((university) => (
                            <td style={{ backgroundColor: '#F4A08E' }} key={university.id}>{university.name}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {studentMatrikelnumbers.map((studentName, index) => (
                        <tr key={index}>
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