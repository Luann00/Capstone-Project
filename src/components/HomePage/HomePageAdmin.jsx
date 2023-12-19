import React, { useState, useEffect } from 'react';

//Definiere in dieser Klasse die Endtabelle für den Admin mit allen wichtigen Informationen
const HomePageAdmin = () => {
    const [universities, setUniversities] = useState([]);
    const [students, setStudents] = useState([]);


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

        fetchUniversities();
    }, []);


    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await fetch('http://localhost:8081/student');
            const data = await response.json();
            setStudents(data);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
    
        fetchStudents();
      }, []);

    return (
        <div>
            <h1>This is the main page for the admin!</h1>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Uni Name</th>
                        <th>Slots</th>
                        <th>FirstPrio</th>

                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {universities.map((university) => (
                        <tr key={university.id}>
                            <td>{university.name}</td>
                            <td>{university.slots}</td>
                            <td>{university.firstPref}</td>

                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePageAdmin;