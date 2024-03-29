import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';
import { usePrioritySelection } from '../contexts/PrioritySelectionContext';
import { LiaUniversitySolid } from "react-icons/lia";

// This component is used to display the universities using the university card. The university card displays the university name, the country, the city, the faculty, the number of slots available, the minimum GPA (if available), the number of students who have chosen the university as their first priority, and the number of students who have chosen the university as their priority. The user can select the university as his first, second or third priority. The user can also remove the university from his list of priorities.//
// The forwardRef is used to access the methods of the component to its parent component UniCard//
export const UniversityCard = forwardRef(({ university, changePreference }, ref) => {
    // State variables for the university card
    const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
    const [updatedTotalPref, setUpdatedTotalPref] = useState(university.totalPref);


    // Fetching data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    const [firstPriority, setFirstPriority] = useState(storedUser ? storedUser.firstPref : '');
    const [secondPriority, setSecondPriority] = useState(storedUser ? storedUser.secondPref : '');
    const [thirdPriority, setThirdPriority] = useState(storedUser ? storedUser.thirdPref : '');

    const [currentPriority, setCurrentPriority] = useState(() => {
        if (storedUser) {
            if (storedUser.firstPref === university.uniId) {
                return '1st Priority';
            } else if (storedUser.secondPref === university.uniId) {
                return '2nd Priority';
            } else if (storedUser.thirdPref === university.uniId) {
                return '3rd Priority';
            }
        }

        return null;
    });
    // using PrioritySelectionContext to update the priorities to priority panel
    const { addPriority, removePriority } = usePrioritySelection();
 // Disable the dropdown during the update
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
    const [ID, setID] = useState('')
    const [studentPriorities, setStudentPriorities] = useState([]);

//Fetching student priorities from database to update the state of the dropdown menu
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const matrikelnummer = currentUser.matrikelnummer;

        const fetchStudentPriorities = async () => {
            try {
                const response = await fetch(`http://localhost:8081/student/${matrikelnummer}/priorities`);
                const data = await response.json();
                // Update localstorage items from database
                const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            } catch (error) {
                console.log('Error fetching data:' + error);
            }
        };


        setID(JSON.parse(localStorage.getItem('currentUser')).matrikelnummer);

        // Setze die Dropdown-Auswahl basierend auf den Prioritäten
        if (firstPriority === university.uniId) {
            setCurrentPriority('1st Priority');
        } else if (secondPriority === university.uniId) {
            setCurrentPriority('2nd Priority');
        } else if (thirdPriority === university.uniId) {
            setCurrentPriority('3rd Priority');
        }

        fetchStudentPriorities();

    },);


    const isPrioritySelected = (priority) => {
        return university.uniId === studentPriorities[`${priority}Pref`];
    };
//update the current state of universityCard after the user has selected a priority to student database
    const updatePriorities = async () => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        try {
            const response = await fetch(
                `http://localhost:8081/student/${ID}/updatePriorities`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "firstPref": storedUser.firstPref,
                        "secondPref": storedUser.secondPref,
                        "thirdPref": storedUser.thirdPref
                    }),
                }

            );

        } catch (error) {
        }


    }

//this method is used to handle the selection of the priority 
    const handlePrioritySelect = async (priority) => {
        setIsDropdownDisabled(true); // Disable the dropdown during the update
        if (priority === '1st Priority') {

            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (storedUser && storedUser.firstPref === 0) {

                //if current priority is not one, then set it to one and increment firstPrefs of unicard by 1
                if (currentPriority !== '1st Priority') {
                    setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref + 1);
                    await updateCurrentFirstPrioCount(university.uniId, true);

                }
                if (currentPriority === null) {
                    //if there wasnt a priority selected, increment totalPref variable by 1
                    setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
                    await updateCurrentTotalPrioCount(university.uniId, true);
                }

                storedUser.firstPref = university.uniId;
                localStorage.setItem('currentUser', JSON.stringify(storedUser));

                setFirstPriority(university.uniId)
                setCurrentPriority('1st Priority')
                updatePriorities();

            } else {
                alert("This preference is aleady set for another university!");
                setIsDropdownDisabled(false);
                return;
            }

        } else if (priority === '2nd Priority') {

            // Set firstPriority in localStorage
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (storedUser && storedUser.secondPref === 0) {

                //if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
                if (currentPriority === '1st Priority') {
                    setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
                    await updateCurrentFirstPrioCount(university.uniId, false);
                }

                if (currentPriority === null) {
                    setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
                    await updateCurrentTotalPrioCount(university.uniId, true);
                }



                storedUser.secondPref = university.uniId;
                localStorage.setItem('currentUser', JSON.stringify(storedUser));

                setSecondPriority(storedUser.secondPref)
                setCurrentPriority('2nd Priority')
                updatePriorities();

            } else {
                alert("This preference is aleady set for another university!");
                setIsDropdownDisabled(false);
                return;
            }


        } else if (priority === '3rd Priority') {
            // Set thirdPriority in localStorage
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (storedUser && storedUser.thirdPref === 0) {
                if (currentPriority === '1st Priority') {
                    //if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
                    setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
                    await updateCurrentFirstPrioCount(university.uniId, false);
                }
                if (currentPriority === null) {
                    //if there wasnt a priority selected, increment totalPref variable by 1
                    setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref + 1);
                    await updateCurrentTotalPrioCount(university.uniId, true);
                }

                storedUser.thirdPref = university.uniId;
                localStorage.setItem('currentUser', JSON.stringify(storedUser));
                setThirdPriority(university.uniId)
                setCurrentPriority('3rd Priority')
                updatePriorities();
            } else {
                alert("This preference is aleady set for another university!");
                setIsDropdownDisabled(false);
                return;
            }

        }

        if (currentPriority === '1st Priority') {
            setFirstPriority(0);
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            storedUser.firstPref = 0;
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
        } else if (currentPriority === '2nd Priority') {
            setSecondPriority(0);
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            storedUser.secondPref = 0;
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
        } else if (currentPriority === '3rd Priority') {
            setThirdPriority(0);
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            storedUser.thirdPref = 0;
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
        }
        updatePriorities();
        changePreference();


// expose this method to the parent component
        if (ref.current) {
            ref.current.getPriority();
        }

        //disable dropdown menu after setting preference to prevent from changing preference every second
        setTimeout(() => {
            setIsDropdownDisabled(false);
        }, 4000);

        addPriority(university.uniId, {
            universityData: university,
            priority: { name: university.name, priority },
        });
    };


//this method is used to handle the priority drop
    const handleDropPriority = async () => {
        setIsDropdownDisabled(true); // Disable the dropdown during the update
//if current priority was one and now gets changed, then decrement firstPrefs of unicard by 1
        if (currentPriority === '1st Priority' && updatedFirstPref > 0) {
            setUpdatedFirstPref((prevUpdatedFirstPref) => prevUpdatedFirstPref - 1);
            await updateCurrentFirstPrioCount(university.uniId, false);
        }
        if (currentPriority !== null && updatedTotalPref > 0) {
            setUpdatedTotalPref((prevUpdatedTotalPref) => prevUpdatedTotalPref - 1);
            await updateCurrentTotalPrioCount(university.uniId, false);
        }

        if (currentPriority === '1st Priority') {
            setFirstPriority(0);
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            storedUser.firstPref = 0;
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
        } else if (currentPriority === '2nd Priority') {
            setSecondPriority(0);
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            storedUser.secondPref = 0;
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
        } else if (currentPriority === '3rd Priority') {
            setThirdPriority(0);
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            storedUser.thirdPref = 0;
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
        }
        setCurrentPriority(null);

        updatePriorities();
        removePriority(university.uniId);

        if (ref.current) {
            ref.current.dropPriority();
        }

        changePreference();

        //disable dropdown menu after setting preference to prevent from changing preference every second
        setTimeout(() => {
            setIsDropdownDisabled(false);
        }, 4000);

    }

    //this method sets firstPrio count in university table
    const updateCurrentFirstPrioCount = async (uniId, increment) => {
        try {
            // Fetch the current university data
            const response = await fetch(`http://localhost:8081/university/${uniId}`);
            const universityData = await response.json();

            // Update the firstPref count based on the provided increment value
            universityData.firstPref = increment
                ? universityData.firstPref + 1
                : universityData.firstPref - 1;

            // Update the database with the modified data
            const putResponse = await fetch(`http://localhost:8081/university/${uniId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(universityData),
            });

            if (!putResponse.ok) {
                alert("Test: " + putResponse);
            }
        } catch (error) {
            alert("Catch: " + error);
        }
    };

    //this method sets total prio count in university table
    const updateCurrentTotalPrioCount = async (uniId, increment) => {
        try {
            const response = await fetch(`http://localhost:8081/university/${uniId}`);
            const universityData = await response.json();

            universityData.totalPref = increment
                ? universityData.totalPref + 1
                : universityData.totalPref - 1; // or use any other logic you need

            const putResponse = await fetch(`http://localhost:8081/university/${uniId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(universityData),
            });

            if (!putResponse.ok) {
                alert("Test: " + putResponse);
            }
        } catch (error) {
            alert("Catch: " + error);
        }
    };
//useImperativeHandle is used to expose the methods of the component to its parent component UniCard
    useImperativeHandle(ref, () => ({
        getPriority: () => {
            return currentPriority;
        },
        dropPriority: () => {
            handleDropPriority();
        },
    }));

//this method is used to display the university card
    return (
        <Card className="universityCard" key={university.uniId} >
            <Card.Body className='card.body'>

                <Card.Title> <a href={university.uniLink}>{university.name} ({university.abbName})</a></Card.Title>
                <Card.Text>

                    <span><BsPinMapFill /></span>
                    <span> {university.country},{university.city}</span>
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item> <span><LiaUniversitySolid  /></span> Faculty: {university.faculty}</ListGroup.Item>
                    <ListGroup.Item> <span><MdChairAlt /></span> Slots available: {university.slots}</ListGroup.Item>
                    {university.showGPA ? (
                        <ListGroup.Item> <span><CiPen /></span>Minimum GPA (as of last year): {university.minGPA}</ListGroup.Item>
                    ) : null}

                    <ListGroup.Item>
                        <span><BsFillPeopleFill /></span>
                        Chosen as first priority by: {updatedFirstPref}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span><BsFillPeopleFill /></span>
                        Chosen as priority by : {updatedTotalPref}
                    </ListGroup.Item>
                </ListGroup>

                <Dropdown >
                    <Dropdown.Toggle id="dropdown-autoclose-true" disabled={isDropdownDisabled} >
                        {currentPriority !== null ? currentPriority : "Choose preference"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handlePrioritySelect('1st Priority')}>
                            1st Priority
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePrioritySelect('2nd Priority')}>
                            2nd Priority
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handlePrioritySelect('3rd Priority')}>
                            3rd Priority
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropPriority()} >
                            Drop Priority
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card>

    );
});