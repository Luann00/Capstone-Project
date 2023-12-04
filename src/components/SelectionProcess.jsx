import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';


import "./SelectionProcess.css";

function SelectionProcess() {

    const [show, setShow] = useState(false);
    const [processes, setProcesses] = useState([]);
    const [originalProcesses, setOriginalProcesses] = useState([]);



    const [search, setSearch] = useState("");



    /*
    const [sortOrder, setSortOrder] = useState("asc");
    const [uniIdSortOrder, setUniIdSortOrder] = useState("asc");
    const [countrySortOrder, setCountrySortOrder] = useState("asc");
    */



    const [selectedProcess, setSelectedProcess] = useState(null);


    const [newProcess, setNewProcess] = useState({
        startDate: "",
        endDate: "",
        year: "",
        numberOfStudents: "",
        numberOfPreferences: "",
        numberOfUniversities: "",
        deadlineExtensionMinutes: "",
        daysUntilStudentDataDeletion: ""
    });

    //The new values for a new university get saved here initially
    const inputFields = [
        { name: 'startDate', type: 'date', placeholder: 'Enter start date of the process' },
        { name: 'endDate', type: 'date', placeholder: 'Enter end date of the process' },
        { name: 'year', type: 'number', min: '1', placeholder: 'Enter year of the process' },
        { name: 'numberOfStudents', type: 'number', placeholder: 'Enter number of students' },
        { name: 'numberOfPreferences', type: 'number', min: '1', max: '8', placeholder: 'Enter number of preferences' },
        { name: 'numberOfUniversities', type: 'number', min: '1', placeholder: 'Enter number of universities' },
        { name: 'deadlineExtensionMinutes', type: 'number', min: '60', placeholder: 'Enter the extension of the deadline when preferences changes in the last 15 minutes' },
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
            numberOfPreferences: "",
            numberOfUniversities: "",
            deadlineExtensionMinutes: "",
            daysUntilStudentDataDeletion: ""
        });
    };

    // Function to check if the current time is within the interval
    const processIsActive = (startDate, endDate) => {
        const currentDate = new Date();
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        return currentDate >= startDateTime && currentDate <= endDateTime;
    };



    const handleShow = () => setShow(true);

    const handleEdit = (process) => {
        /*
      setSelectedUniversity(process);
      setNewUniversity({
        uniId: university.uniId,
        name: university.name,
        country: university.country,
        city: university.city,
        slots: university.slots,
        firstPref: university.firstPref,
      });
      handleShow();
      */
    };



    //Show data of database in the table
    useEffect(() => {
        const fetchProcesses = async () => {
            try {
                const response = await fetch('http://localhost:8081/selectionProcess');
                const data = await response.json();
                setProcesses(data);
                setOriginalProcesses(data);
            } catch (error) {
                console.log('Error fetching data:' + error);
            }
        };

        fetchProcesses();
    }, []);


    /* Don't need update?
    const updateUniversity = async () => {
      //Update at first the local table for a smoother user experience
      const updatedUniversities = universities.map((university) =>
        university.uniId === selectedUniversity.uniId
          ? selectedUniversity
          : university
      );
      setUniversities(updatedUniversities);
      handleClose();
  
      try {
  
        const response = await fetch(
          `http://localhost:8081/university/${selectedUniversity.uniId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedUniversity),
          }
        );
  
  
        if (!response.ok) {
  
        }
  
      } catch (error) {
      }
  
    };
    */


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
                console.log("Anderweitiger Fehler..!");
            }

        } catch (error) {
            console.log("Fehler beim Senden der Daten" + error);
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


    //Don't need sort function!

    const handleSort = (column) => {
        /*
        let sortOrderForColumn, sortFunction;
    
        if (column === "firstPref") {
          sortOrderForColumn = sortOrder === "asc" ? "desc" : "asc";
          setSortOrder(sortOrderForColumn);
          sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
        } else if (column === "uniId") {
          sortOrderForColumn = uniIdSortOrder === "asc" ? "desc" : "asc";
          setUniIdSortOrder(sortOrderForColumn);
          sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
        } else {
          sortOrderForColumn = countrySortOrder === "asc" ? "desc" : "asc";
          setCountrySortOrder(sortOrderForColumn);
          sortFunction = (a, b) => {
            const valueA = a[column].toLowerCase();
            const valueB = b[column].toLowerCase();
            return sortOrderForColumn === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          };
        }
    
        const sortedUniversities = [...universities].sort(sortFunction);
        setUniversities(sortedUniversities);
        */
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
        <div class="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div class="row ">

                    <div class="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form class="form-inline">
                                <span class="icon">🔍</span>
                                <input class="form-control mr-sm-2"
                                    type="number" min={1}
                                    placeholder="Search Process"
                                    aria-label="Search"
                                    onChange={handleSearch} />
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Manage Processes</b></h2></div>
                    <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            Add New Process
                        </Button>
                        <Button variant="danger" onClick={deleteAllProcesses} style={{ marginTop: "10px" }}>
                            Delete all Processes
                        </Button>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive " >
                        <table class="table table-striped table-hover table-bordered" >
                            <thead>
                                <tr style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'blue' }}>
                                    <th>Start date</th>
                                    <th>End date</th>
                                    <th>Year</th>
                                    <th>No. of Students</th>
                                    <th>No. of Preferences</th>
                                    <th>No. of Universities</th>
                                    <th>Deadline Extension</th>
                                    <th>Days Deletion</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Show data in the table*/}
                                {processes.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.startDate}</td>
                                        <td>{row.endDate}</td>
                                        <td>{row.year}</td>
                                        <td>{row.numberOfStudents}</td>
                                        <td>{row.numberOfPreferences}</td>
                                        <td>{row.numberOfUniversities}</td>
                                        <td>{row.deadlineExtensionMinutes}</td>
                                        <td>{row.daysUntilStudentDataDeletion}</td>
                                        <td>{processIsActive(row.startDate, row.endDate) ? 'Active' : 'Inactive'}  &#128994;</td>
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
                            <form onSubmit={addProcess}>
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
                                            value={selectedProcess ? selectedProcess[field.name] : newProcess[field.name]}
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