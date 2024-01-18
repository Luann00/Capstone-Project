import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';


import "./SelectionProcess.css";

function SelectionProcess() {

    const [show, setShow] = useState(false);
    const [processes, setProcesses] = useState([]);
    const [originalProcesses, setOriginalProcesses] = useState([]);
    const [universities, setUniversities] = useState([])
    const [firstTimeLoading, setFirstTimeLoading] = useState(true)
    const [students, setStudents] = useState([]);

    const [deletedStudents, setDeletedStudents] = useState(false);



    const [search, setSearch] = useState("");


    const [selectedProcess, setSelectedProcess] = useState(null);


    const [newProcess, setNewProcess] = useState({
        startDate: "",
        endDate: "",
        year: "",
        numberOfStudents: "",
        numberOfPreferences: 3,
        numberOfUniversities: "",
        deadlineExtensionMinutes: "",
        daysUntilStudentDataDeletion: ""
    });

    //The new values for a new university get saved here initially
    const inputFields = [
        { name: 'startDate', type: 'date', placeholder: 'Enter start date of the process' },
        { name: 'endDate', type: 'date', placeholder: 'Enter end date of the process', min: newProcess.startDate },
        {
            name: 'year', type: 'number', placeholder: 'Enter year of the process', min: new Date(newProcess.startDate).getFullYear(), max: new Date(newProcess.startDate).getFullYear()
        },
        { name: 'numberOfStudents', type: 'number', placeholder: 'Number of students(auto-filled)', disabled: true },
        { name: 'numberOfPreferences', type: 'number', min: '1', max: '8', placeholder: 'Number of preferences(3, can be changed later)', value: 3, disabled: true },
        {
            name: 'numberOfUniversities', type: 'number', min: '1', placeholder: 'Number of universities(auto-filled)', disabled: true
        },
        { name: 'deadlineExtensionMinutes', type: 'number', min: '60', max: '1440', placeholder: 'Enter the extension of the deadline' },
        { name: 'daysUntilStudentDataDeletion', type: 'number', min: '0', placeholder: 'Enter the days which should pass after the end of the process when student data gets deletet' },
    ];


    const handleClose = () => {
        setShow(false);
        setSelectedProcess(null);
        setNewProcess({
            startDate: "",
            endDate: "",
            year: "",
            numberOfStudents: "",
            numberOfPreferences: 3,
            numberOfUniversities: "",
            deadlineExtensionMinutes: "",
            daysUntilStudentDataDeletion: ""
        });
    };

    // Function to check if the current time is within the interval of a specific process
    const processIsActive = (process) => {
        const currentDate = new Date();
        const startDateTime = new Date(process.startDate);
        const endDateTime = new Date(process.endDate);

        if (process.extended) {
            startDateTime.setHours(0, 0, 0, 0);
            const newHours = Math.floor(process.deadlineExtensionMinutes / 60);
            const newMinutes = process.deadlineExtensionMinutes % 60;

            // extend the deadline
            endDateTime.setHours(newHours, newMinutes, 0, 999);
        } else {
            startDateTime.setHours(0, 0, 0, 0);
            endDateTime.setHours(23, 59, 59, 999);
        }

        return currentDate >= startDateTime && currentDate <= endDateTime;
    };



    const compareBoth = (arr1, arr2) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    };


    const handleShow = () => setShow(true);

    const handleEdit = (process) => {

        setSelectedProcess(process);
        setNewProcess({
            startDate: process.startDate,
            endDate: process.endDate,
            year: process.year,
            numberOfStudents: process.numberOfStudents,
            numberOfPreferences: 3,
            numberOfUniversities: universities.length,
            deadlineExtensionMinutes: process.deadlineExtensionMinutes,
            daysUntilStudentDataDeletion: process.daysUntilStudentDataDeletion
        });
        handleShow();

    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [processesResponse, universitiesResponse, studentsResponse] = await Promise.all([
                    fetch('http://localhost:8081/selectionProcess').then(response => response.json()),
                    fetch('http://localhost:8081/university').then(response => response.json()),
                    fetch('http://localhost:8081/student').then(response => response.json())
                ]);


                //set data only when
                if (firstTimeLoading) {
                    setProcesses(processesResponse.reverse());
                    setOriginalProcesses(processesResponse);
                    setUniversities(universitiesResponse);
                    setStudents(studentsResponse);
                    setFirstTimeLoading(false)
                    // Set the initial value for numberOfUniversities in newProcess
                    setNewProcess((prevProcess) => ({
                        ...prevProcess,
                        numberOfUniversities: universitiesResponse.length,
                        numberOfStudents: studentsResponse.length,
                    }));
                } else {
                    //set data only when new data is different than current data
                    if (!compareBoth(processesResponse, originalProcesses)) {
                        setProcesses(processesResponse.reverse());
                        setOriginalProcesses(processesResponse);
                        setUniversities(universitiesResponse);
                        setStudents(studentsResponse);

                        // Set the initial value for numberOfUniversities in newProcess
                        setNewProcess((prevProcess) => ({
                            ...prevProcess,
                            numberOfUniversities: universitiesResponse.length,
                            numberOfStudents: studentsResponse.length,
                        }));
                    }
                }

                checkDays();


            } catch (error) {
                console.log('Error fetching data:' + error);
            }
        };

        fetchData();


        //fetch student data every 3 second
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, [firstTimeLoading]);


    const checkDays = () => {
        for (const processItem of processes) {

            const startDateString = processItem.startDate;
            const startDate = new Date(startDateString);
            startDate.setHours(0, 0, 0, 0);
            const currentDate = new Date();
            const timeDifference = currentDate.getTime() - startDate.getTime();

            // Convert the time difference to days
            const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            // Delete all students from the database if the time has come
            if (daysPassed >= processItem.daysUntilStudentDataDeletion) {
                processItem.deletedStudents = true;
                updateDeleted(processItem);
            }
        }
    };



    const updateDeleted = async (process) => {
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

            if (!response.ok) {
                console.log("Error updating process. Response status:", response.status);
                console.log("Response body:", await response.text());
            }
        } catch (error) {
            console.error("Error updating process:", error);
        }
    }

    const updateProcesses = async () => {
        //Update at first the local table for a smoother user experience
        const updatedProcess = processes.map((process) =>
            process.year === process.year
                ? selectedProcess
                : process
        );
        setProcesses(updatedProcess);
        handleClose();

        try {

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
            }
        } catch (error) {
            console.error("Error updating process:", error);
        }

    };



    //Probably don't need search function by now
    const handleSearch = (event) => {

        const searchValue = event.target.value;
        setSearch(searchValue);

        const updatedTableData = originalProcesses.filter((process) =>
            process.year.toString().startsWith(searchValue)
        );

        // Update the displayed processes
        setProcesses(updatedTableData);
    };


    const addProcess = async () => {
        if (processes.length > 0) {
            alert("You have to delete the current process in order to create a new one!");
            return;
        }
        try {
            const response = await fetch("http://localhost:8081/selectionProcess", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProcess),
            });

            if (response.ok) {
                const updatedProcesses = [...processes, newProcess];
                setProcesses(updatedProcesses);
                handleClose();
            } else {
                console.log("Response body:", await response.text());
            }

        } catch (error) {
            console.error("Error adding process:", error);
        }
    };


    const deleteProcess = async (year) => {

        if (window.confirm('Are you sure you want to delete this process?')) {

            const deleteEndpoint = `http://localhost:8081/selectionProcess/${year}`;

            try {
                const response = await fetch(deleteEndpoint, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const updatedTableData = processes.filter((row) => row.year !== year);
                    setProcesses(updatedTableData);
                } else {
                    alert("Error deleting data from the database");
                }
            } catch (error) {
                alert("Error deleting data", error);
            }
        }
    };

    const deleteAllProcesses = () => {
        if (window.confirm('Are you sure you want to remove all Processes?')) {
            setProcesses([]);
            deleteAllProcessesDatabase();
        }

    };

    const deleteAllProcessesDatabase = async () => {
        const deleteEndpoint = `http://localhost:8081/selectionProcess/all`;

        try {
            const response = await fetch(deleteEndpoint, {
                method: "DELETE",
            });

            if (!response.ok) {
                alert("Error deleting data from the database");
            }
        } catch (error) {
            alert("Error deleting data", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (selectedProcess) {
            // If editing, update the selected student
            setSelectedProcess((prevProcess) => ({
                ...prevProcess,
                [name]: value,
            }));
        } else {
            // If adding a new process, update the new student
            setNewProcess((prevProcess) => ({
                ...prevProcess,
                [name]: value,
            }));
        }
    };




    return (
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <span className="icon">🔍</span>
                                <input className="form-control mr-sm-2"
                                    type="number" min={1}
                                    placeholder="Search by year"
                                    aria-label="Search"
                                    onChange={handleSearch} />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Manage process</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            Add New Process
                        </Button>
                        <Button variant="danger" onClick={deleteAllProcesses} style={{ marginTop: "10px" }}>
                            Delete all Processes
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered" >
                            <thead>
                                <tr style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'blue' }}>
                                    <th>Year</th>
                                    <th>Start date</th>
                                    <th>End date</th>
                                    <th>No. of students</th>
                                    <th>No. of preferences</th>
                                    <th>No. of universities</th>
                                    <th>Deadline extension in minutes</th>
                                    <th>Days until deletion</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Show the processes in the table*/}
                                {processes.map((row) => (
                                    <tr key={row.year}>
                                        <td>{row.year}</td>
                                        <td>{row.startDate}</td>
                                        <td>{row.endDate}</td>
                                        <td>{row.numberOfStudents}</td>
                                        <td>{row.numberOfPreferences}</td>
                                        <td>{row.numberOfUniversities}</td>
                                        <td>{row.deadlineExtensionMinutes}</td>
                                        <td>{row.daysUntilStudentDataDeletion}</td>
                                        <td>{processIsActive(row) ? 'Active 🟢' : 'Inactive🔴'} </td>
                                        <td>
                                            <a
                                                href="#"
                                                className="edit"
                                                title="Edit"
                                                data-toggle="tooltip"
                                                onClick={() => handleEdit(row)}
                                            >
                                                <i className="material-icons">&#xE254;</i>
                                            </a>


                                            <a
                                                href="#"
                                                className="delete"
                                                title="Delete"
                                                data-toggle="tooltip"
                                                style={{ color: "red" }}
                                                onClick={() => deleteProcess(row.year)}
                                            >
                                                <i className="material-icons">&#xE872;</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*Modal View when clicking on Add Button*/}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Process</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={selectedProcess ? updateProcesses : addProcess}>
                                {inputFields.map((field) => (
                                    <div className="form-group mt-3" key={field.name}>
                                        <input
                                            type={field.type}
                                            min={field.min}
                                            max={field.max}
                                            step={field.step}
                                            className="form-control"
                                            placeholder={field.placeholder}
                                            name={field.name}
                                            value={selectedProcess ? selectedProcess[field.name] : field.value}
                                            onChange={handleChange}
                                            disabled={field.disabled}
                                            required
                                        />
                                    </div>
                                ))}
                                {selectedProcess ? (
                                    <button type="submit" className="btn btn-success mt-4">
                                        Save Changes
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary mt-4">
                                        Add Process
                                    </button>
                                )}

                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default SelectionProcess;