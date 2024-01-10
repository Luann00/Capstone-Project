import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsPinMapFill, BsFillPeopleFill } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { MdChairAlt } from "react-icons/md";
import './UniCard.css';
import { usePrioritySelection } from '../contexts/PrioritySelectionContext';


export const UniversityCard = forwardRef(({ university, changePreference }, ref) => {

    const [currentPriority, setCurrentPriority] = useState(null);
    const [updatedFirstPref, setUpdatedFirstPref] = useState(university.firstPref);
    const [updatedTotalPref, setUpdatedTotalPref] = useState(university.totalPref);


    // Fetching data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    const [firstPriority, setFirstPriority] = useState(storedUser ? storedUser.firstPref : '');
    const [secondPriority, setSecondPriority] = useState(storedUser ? storedUser.secondPref : '');
    const [thirdPriority, setThirdPriority] = useState(storedUser ? storedUser.thirdPref : '');
    const { addPriority, removePriority } = usePrioritySelection();



    const [isDropdownDisabled, setDropdownDisabled] = useState(false);





    const [ID, setID] = useState('')







    const [studentPriorities, setStudentPriorities] = useState([]);

    useEffect(() => {


        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const matrikelnummer = currentUser.matrikelnummer;


        const fetchStudentPriorities = async () => {
            try {
                const response = await fetch(`http://localhost:8081/student/${matrikelnummer}/priorities`);
                const data = await response.json();


                // Update localstorage items from database
                const storedUser = JSON.parse(localStorage.getItem('currentUser'));
                if (storedUser) {
                    storedUser.firstPref = data.firstPref;
                    storedUser.secondPref = data.secondPref;
                    storedUser.thirdPref = data.thirdPref;

                    localStorage.setItem('currentUser', JSON.stringify(storedUser));
                }

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
            if (!response.ok) {

            }
        } catch (error) {
        }


    }


    const handlePrioritySelect = async (priority) => {

        setDropdownDisabled(true); // Disable the dropdown during the update


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
                setDropdownDisabled(false);
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
                setDropdownDisabled(false);
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
                setDropdownDisabled(false);
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



        if (ref.current) {
            ref.current.getPriority();
        }


        //disable dropdown menu after setting preference to prevent from changing preference every second
        setTimeout(() => {
            setDropdownDisabled(false);
        }, 1500);

        addPriority(university.uniId, {
            universityData: university,
            priority: { name: university.name, priority },
          });



    };



    const handleDropPriority = async () => {

        setDropdownDisabled(true); // Disable the dropdown during the update

        const storedUser = JSON.parse(localStorage.getItem('currentUser'));

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

        await updatePriorities();
        removePriority(university.uniId);

        if (ref.current) {
            ref.current.dropPriority();
        }

        //disable dropdown menu after setting preference to prevent from changing preference every second
        setTimeout(() => {
            setDropdownDisabled(false);
        }, 3000);

    }



    const updateCurrentFirstPrioCount = async (uniId, increment) => {
        try {
            // Fetch the current university data
            const response = await fetch(`http://localhost:8081/university/${uniId}`);
            const universityData = await response.json();

            // Update the firstPref count based on the provided increment value
            universityData.firstPref = increment
                ? universityData.firstPref + 1
                : universityData.firstPref - 1;


            // Update the API with the modified data
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



    const updateCurrentTotalPrioCount = async (uniId, increment) => {
        try {
            // Fetch the current university data
            const response = await fetch(`http://localhost:8081/university/${uniId}`);
            const universityData = await response.json();

            // Update the firstPref count based on the provided increment value

            universityData.totalPref = increment
                ? universityData.totalPref + 1
                : universityData.totalPref - 1; // or use any other logic you need

            // Update the API with the modified data
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

    useImperativeHandle(ref, () => ({
        getPriority: () => {
            return currentPriority;
        },
        dropPriority: () => {
            handleDropPriority();
        },
    }));






    return (

        <Card className="universityCard" key={university.uniId} >
            <Card.Body className='card.body'>

                <Card.Title> <a href="#">{university.name} ({university.abbName})</a></Card.Title>
                <Card.Text>

                    <span><BsPinMapFill /></span>
                    <span> {university.country},{university.city}</span>
                </Card.Text>

                <ListGroup variant="flush">
                    <ListGroup.Item> <span><MdChairAlt /></span> Places available: {university.slots}</ListGroup.Item>


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