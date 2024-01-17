import React, { useState, useEffect } from 'react';
import CSVExportButton from '../CSVExportButton';
import "bootstrap/dist/css/bootstrap.min.css";

const EndTable = () => {

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


    return (
        <div className="endTable">
            <CSVExportButton
                headers={studentNames}
                rows={universities.map((uni) => {
                    const uniID = uni.id;
                    return {
                        id: uni.id,
                        name: uni.name,
                        students: studentMatrikelnumbers.map((studentID) => fillTableCells(uniID, studentID))
                    };
                })}
            />
        </div>
    );

}
export default EndTable;