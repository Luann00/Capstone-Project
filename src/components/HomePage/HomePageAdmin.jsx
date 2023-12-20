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

    const fillTableCells = (uniID) => {
        return students.map((student, studentIndex) => {
            const preferences = studentPreferences[student.matrikelnummer] || {};


            // Determine the preference order for the current university
            const preferenceOrder = ['thirdPref', 'secondPref', 'firstPref'].find(
                pref => preferences[pref] === uniID
            );


            console.log(preferenceOrder)
            // If no match is found, display "No Preference"
            if (preferenceOrder === -1) {
                return <td key={studentIndex}></td>;
            }

            return <td key={studentIndex}>{preferenceOrder}</td>;
        });
    };


    return (
        <div>
            <h1>This is the main page for the admin!</h1>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Uni Name</th>
                        <th>Slots</th>
                        <th>FirstPrio</th>
                        {studentMatrikelnumbers.map((studentName, index) => (
                            <th key={index}>{studentName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {universities.map((university) => (
                        <tr key={university.id}>
                            <td>{university.name}</td>
                            <td>{university.slots}</td>
                            <td>{university.firstPref}</td>
                            {fillTableCells(university.uniId)}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePageAdmin;