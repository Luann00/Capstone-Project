import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Button, Modal, Input } from 'react-bootstrap';
import logo from "../../logo.png";
import "./whitelistStudent.css";
import NavbarAdmin from "../NavigationBar/NavbarAdmin";
import CSVExportButton from '../CSVExportButton';



export const WhitelistStudent = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ matrikelnummer: "", jahr: "" });
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);


  const handleShow = () => setShow(true);


  const [newStudent, setNewStudent] = useState({
    Matrikelnummer: "",
    Jahr: "",
  });

  const handleClose = () => {
    setShow(false);
    setSelectedStudent(null);
    setNewStudent({
      Matrikelnummer: "",
      Jahr: "",
    });
  };


  const inputFields = [
    { name: 'matrikelnummer', type: 'number', min: '1', max: '10000000', placeholder: 'Enter Matrikelnummer', disabled: selectedStudent ? true : false },
    { name: 'jahr', type: 'text', placeholder: 'Enter year', min: '0' },

  ];

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
        `http://localhost:8081/whitelistStudent/update/${selectedStudent.matrikelnummer}`,
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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/whitelistStudent");
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    };

    fetchData();

  }, []);


  const addStudent = async () => {

    //Update at first the local table and then the database for a smoother experience
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    handleClose();

    try {
      const response = await fetch("http://localhost:8081/whitelistStudent", {
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


  let postData;
  useEffect(() => {
    postData = async () => {
      if (newRow.matrikelnummer && newRow.jahr) {
        try {
          const response = await fetch("http://localhost:8081/whitelistStudent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              matrikelnummer: newRow.matrikelnummer,
              jahr: newRow.jahr,
            }),
          });

          if (response.ok) {
            console.log("Data added successfully!");
          } else {
            console.log("Bitte geben Sie nur Zahlen ein!");
          }
        } catch (error) {
          console.log("Error while posting data", error);
        }
      }
    };
  }, [newRow]);

  const addRow = () => {

    if (newRow.matrikelnummer && newRow.jahr) {
      const newRowData = {
        id: tableData.length + 1,
        matrikelnummer: newRow.matrikelnummer,
        jahr: newRow.jahr,
      };

      setTableData([newRowData, ...tableData]);
      setNewRow({ matrikelnummer: "", jahr: "" });
      postData();
    }

  };



  const deleteAllRowsDatabase = async () => {
    const deleteEndpoint = `http://localhost:8081/whitelistStudent/all`;
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


  const deleteStudent = async (matrikelnummer) => {

    if (window.confirm('Are you sure you want to delete this student from this list?')) {

      const deleteEndpoint = `http://localhost:8081/whitelistStudent/${matrikelnummer}`;

      try {
        const response = await fetch(deleteEndpoint, {
          method: "DELETE",
        });
        if (response.ok) {
          const updatedTableData = tableData.filter((row) => row.matrikelnummer !== matrikelnummer);
          setTableData(updatedTableData);
        } else {
          console.log("Error deleting data from the database");
        }
      } catch (error) {
        console.log("Error deleting data", error);
      }
    }
  };

  const deleteAllRows = () => {
    if (window.confirm('Are you sure you want to delete all students from this list?')) {
      setTableData([]);
      deleteAllRowsDatabase();
    }
  };


  const handleEdit = (whitelistStudent) => {
    setSelectedStudent(whitelistStudent);
    setNewStudent({
      matrikelnummer: whitelistStudent.matrikelnummer,
      jahr: whitelistStudent.name,
    });
    handleShow();
  };

  //Show data of database in the table
  useEffect(() => {
    const fetchWhitelistStudents = async () => {
      try {
        const response = await fetch('http://localhost:8081/whitelistStudent');
        const data = await response.json();
        setStudents(data);

      } catch (error) {
        console.log('Error fetching data:' + error);
      }
    };
    fetchWhitelistStudents();
  }, []);

  return (
    <div className="list-page">
      <header className="App-header">
        <img src={logo} alt="Your Logo" className="logo" />
      </header>
      <div className="whitelist-container">
        <div className="titleAndButtons">
          <div className="whitelist-title"><h1>Whitelist Studenten</h1></div>
        </div>
        <form onSubmit={addRow}>
          <div className="button-container">
            <Button variant="primary" onClick={handleShow}>
              Add New Student
            </Button>
            <Button variant="danger" onClick={deleteAllRows}>
              Delete all Students
            </Button>
            <CSVExportButton data={students} filename="whitelistStudent.csv" selectedAttributes={['matrikelnummer', 'jahr']} />
          </div>
          <table className="tabelle">
            <thead>
              <tr>
                <th className="spalte">Matrikelnummer</th>
                <th className="spalte">Jahr</th>
                <th className="spalte">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td className="rowCell1">{row.matrikelnummer}</td>
                  <td className="rowCell2">{row.jahr}</td>
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
        </form>
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
};
