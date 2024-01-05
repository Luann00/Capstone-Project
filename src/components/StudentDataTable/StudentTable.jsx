import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import CSVExportButton from '../CSVExportButton';



import "./StudentTable.css";

function Home() {

  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsDownload, setStudentsDownload] = useState([])
  const [originalStudents, setOriginalStudents] = useState([]);



  //For editing students
  const [selectedStudent, setSelectedStudent] = useState(null);


  const [search, setSearch] = useState("");


  const [sortOrder, setSortOrder] = useState("asc");
  const [gradeSortOrder, setGradeSortOrder] = useState("asc");



  const [newStudent, setNewStudent] = useState({
    Matrikelnummer: "",
    Vorname: "",
    Nachname: "",
    Durchschnitt: "",
    Email: "",
    Titel: "",
    Geschlecht: "",
    FirstPref: "",
    SecondPref: "",
    ThirdPref: "",
    AcceptedPolicy: ""
  });



  const numberOfPreferences = 3

  //render the preferences column 
  const renderPreferenceColumns = () => {
    const preferenceColumns = [];
    for (let i = 1; i <= numberOfPreferences; i++) {
      preferenceColumns.push(<th key={`preference${i}`}>Präferenz {i}</th>);
    }
    return preferenceColumns;
  };


  //The new values for a new student get saved here initially
  const inputFields = [
    { name: 'matrikelnummer', type: 'number', min: '1', max: '10000000', placeholder: 'Enter ID', disabled: selectedStudent ? true : false },
    { name: 'vorname', type: 'text', placeholder: 'Enter name' },
    { name: 'nachname', type: 'text', placeholder: 'Enter surname' },
    { name: 'titel', type: 'text', placeholder: 'Enter title' },
    { name: 'geschlecht', type: 'text', placeholder: 'Enter gender' },
    { name: 'durchschnitt', type: 'number', step: "0.1", min: '1', max: '4', placeholder: 'Enter GPA' },
    { name: 'email', type: 'email', placeholder: 'Enter e-mail' },
    { name: 'firstPref', type: 'number', placeholder: 'Enter first preference', min: '0' },
    { name: 'secondPref', type: 'number', placeholder: 'Enter second preference', min: '0' },
    { name: 'thirdPref', type: 'number', placeholder: 'Enter third preference', min: '0' },
  ];


  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    const updatedTableData = originalStudents.filter((student) =>
      student.matrikelnummer.toString().startsWith(searchValue)
    );

    // Update the displayed universities
    setStudents(updatedTableData);

  };





  const handleClose = () => {
    setShow(false);
    setSelectedStudent(null);
    setNewStudent({
      Matrikelnummer: "",
      Vorname: "",
      Nachname: "",
      Durchschnitt: "",
      Email: "",
      Titel: "",
      Geschlecht: "",
      FirstPref: "",
      SecondPref: "",
      ThirdPref: "",
      AcceptedPolicy: ""
    });
  };



  const handleShow = () => setShow(true);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setNewStudent({
      Matrikelnummer: student.matrikelnummer,
      Vorname: student.vorname,
      Nachname: student.nachname,
      Titel: student.titel,
      Geschlecht: student.geschlecht,
      Durchschnitt: student.durchschnitt,
      Email: student.email,
      FirstPref: student.firstPref,
      SecondPref: student.secondPref,
      ThirdPref: student.thirdPref,
      AcceptedPolicy: student.acceptedPolicy

    });
    handleShow();
  };
  //Show data of database in the table
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8081/student');
        const data = await response.json();
        setStudents(data);
        setOriginalStudents(data)
      } catch (error) {
        console.log('Error fetching data:' + error);
      }
    };

    fetchStudents();
  }, []);


  const updateStudent = async () => {


    //Update at first the local table for a smoother user experience
    const updatedStudents = students.map((student) =>
      student.matrikelnummer === selectedStudent.matrikelnummer
        ? selectedStudent
        : student
    );
    setStudents(updatedStudents);
    handleClose();

    try {
      const response = await fetch(
        `http://localhost:8081/student/${selectedStudent.matrikelnummer}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedStudent),
        }

      );


      if (!response.ok) {

      }

    } catch (error) {
    }

  };




  const addStudent = async () => {

    //Update at first the local table and then the database for a smoother experience
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    handleClose();

    try {
      const response = await fetch("http://localhost:8081/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        console.log("Anderweitiger Fehler..!");
      }

    } catch (error) {
      console.log("Fehler beim Senden der Daten" + error);
    }
  };



  const deleteStudent = async (matrikelnummer) => {

    //Delete student at first from the local table for a smoother user experience
    const updatedTableData = students.filter((row) => row.matrikelnummer !== matrikelnummer);
    setStudents(updatedTableData);

    if (window.confirm('Are you sure you want to delete this student?')) {

      const deleteEndpoint = `http://localhost:8081/student/${matrikelnummer}`;

      try {
        const response = await fetch(deleteEndpoint, {
          method: "DELETE",
        });

        if (!response.ok) {
          console.log("Error deleting data from the database");
        }
      } catch (error) {
        console.log("Error deleting data", error);
      }
    }
  };


  const deleteAllStudents = () => {
    if (window.confirm('Are you sure you want to remove all Students?')) {
      setStudents([]);
      deleteAllStudentsDatabase();
    }

  };

  const deleteAllStudentsDatabase = async () => {
    const deleteEndpoint = `http://localhost:8081/student/all`;

    try {
      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("Error deleting data from the database");
      }
    } catch (error) {
      console.log("Error deleting data", error);
    }
  };


  //Sort function
  const handleSort = (column) => {
    let sortOrderForColumn, sortFunction;

    if (column === "matrikelnummer") {
      sortOrderForColumn = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(sortOrderForColumn);
      sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
    } else if (column === "durchschnitt") {
      sortOrderForColumn = gradeSortOrder === "asc" ? "desc" : "asc";
      setGradeSortOrder(sortOrderForColumn);
      sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
    }

    const sortedStudents = [...students].sort(sortFunction);
    setStudents(sortedStudents);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedStudent) {
      // If editing, update the selected student
      setSelectedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    } else {
      // If adding a new student, update the new student
      setNewStudent((prevNewStudent) => ({
        ...prevNewStudent,
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
                  placeholder="Search Student"
                  aria-label="Search"
                  onChange={handleSearch} />
              </form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Students</b></h2></div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Student
            </Button>
            <Button variant="danger" onClick={deleteAllStudents} style={{ marginTop: "10px", marginBottom: "10px" }}>
              Delete all Students
            </Button>
            <CSVExportButton data={students} filename="students.csv" selectedAttributes={['matrikelnummer', 'vorname', 'nachname', 'title', 'durchschnitt', 'email', 'firstPref', 'secondPref', 'thirdPref', 'acceptedPolicy']} />
          </div>
        </div>
        <div className="row">
          <div className="table-responsive " >
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th onClick={() => handleSort("matrikelnummer")}>
                    Student ID
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder === "asc" && <i className="material-icons" title="Sort descending">&#xE316;</i>}
                      {sortOrder === "desc" && <i className="material-icons" title="Sort ascending">&#xE313;</i>}
                    </a>
                  </th>
                  <th>Name </th>
                  <th>Surname</th>
                  <th>Title </th>
                  <th>Gender </th>
                  <th onClick={() => handleSort("durchschnitt")}>
                    GPA
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder === "asc" && <i className="material-icons" title="Sort descending">&#xE316;</i>}
                      {sortOrder === "desc" && <i className="material-icons" title="Sort ascending">&#xE313;</i>}
                    </a>
                  </th>
                  <th>E-Mail</th>
                  <th>FirstPref</th>
                  <th>SecondPref</th>
                  <th>ThirdPref</th>
                  <th>Accepted Policy</th>
                  {//<th>Assigned University</th>
                  }
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {/*Modal View when clicking on Add Button*/}
                {students.map((row) => (
                  <tr key={row.id}>
                    <td>{row.matrikelnummer}</td>
                    <td>{row.vorname}</td>
                    <td>{row.nachname}</td>
                    <td>{row.titel}</td>
                    <td>{row.geschlecht}</td>
                    <td>{row.durchschnitt}</td>
                    <td>{row.email}</td>
                    <td>{row.firstPref}</td>
                    <td>{row.secondPref}</td>
                    <td>{row.thirdPref}</td>
                    <td>{row.acceptedPolicy}</td>
                    {//  <td>{row.zugeteilteUniversität}</td>
                    }
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
                        onClick={() => deleteStudent(row.matrikelnummer)}
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
              <Modal.Title>Add Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={selectedStudent ? updateStudent : addStudent}>
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
                      value={selectedStudent ? selectedStudent[field.name] : newStudent[field.name]}
                      onChange={handleChange}
                      disabled={field.disabled}


                      required
                    />
                  </div>
                ))}

                {selectedStudent ? (
                  <button type="submit" className="btn btn-success mt-4">
                    Save Changes
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary mt-4">
                    Add Record
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

export default Home;
