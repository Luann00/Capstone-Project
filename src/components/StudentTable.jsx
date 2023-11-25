import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button,Modal,Input } from 'react-bootstrap';


import "./StudentTable.css";
 
function Home() {
 
    const [show, setShow] = useState(false);
    const [students, setStudents] = useState([]);

    //For editing students
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [edit, isEditing] = useState(false);


    const [newStudent, setNewStudent] = useState({
      Matrikelnummer: "",
      Vorname: "",
      Nachname: "",
      Durchschnitt: "",
      Email: "",
      Titel: "",
      Geschlecht: ""
    });

    //The new values for a new student get saved here initially
    const inputFields = [
      { name: 'matrikelnummer', type: 'number', min: '1',placeholder: 'Enter Matrikelnummer' },
      { name: 'vorname', type: 'text', placeholder: 'Enter Vorname' },
      { name: 'nachname', type: 'text', placeholder: 'Enter Nachname' },
      { name: 'titel', type: 'text',placeholder: 'Enter title' },
      { name: 'geschlecht', type: 'text',placeholder: 'Enter geschlecht' },
      { name: 'durchschnitt', type: 'number', step:"0.1", min: '1', placeholder: 'Enter durchschnitt' },
      { name: 'email', type: 'email',placeholder: 'Enter e-mail' },
    ];



    
 
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
      });
    };


    const testi = () => {
      alert("Moin!");
    };
    
    
    const handleShow = () => setShow(true);

    const handleEdit = (student) => {
      setSelectedStudent(student);
      setNewStudent({
        Matrikelnummer: student.matrikelnummer,
        Vorname: student.vorname,
        Nachname: student.nachname,
        Durchschnitt: student.durchschnitt,
        Email: student.email,
        Titel: student.titel,
        Geschlecht: student.geschlecht,
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
      } catch (error) {
        alert('Error fetching data:'+ error);
      }
    };

    fetchStudents();
  }, []);


  const updateStudent = async () => {

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


      if (response.ok) {
        const updatedStudents = students.map((student) =>
          student.matrikelnummer === selectedStudent.matrikelnummer
            ? selectedStudent
            : student
        );
        setStudents(updatedStudents);
        handleClose();
      } else {
      }

    } catch (error) {
    }

  };




  const addStudent = async () => {

    
    try {
          const response = await fetch("http://localhost:8081/student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        });
  
        if (response.ok) {
          // Update die Student list after sucessful adding
          const updatedStudents = [...students, newStudent];
          setStudents(updatedStudents);
          handleClose();
        } else {
          console.log("Anderweitiger Fehler..!");
        }
      
    } catch (error) {
      alert("Fehler beim Senden der Daten" + error);
    }
  };
  


  const deleteStudent = async (matrikelnummer) => {

    //test
    if (window.confirm('Are you sure you want to delete this student?')) {

      const deleteEndpoint = `http://localhost:8081/student/${matrikelnummer}`;

      try {
        const response = await fetch(deleteEndpoint, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedTableData = students.filter((row) => row.matrikelnummer !== matrikelnummer);
          setStudents(updatedTableData);
        } else {
          alert("Error deleting data from the database");
        }
      } catch (error) {
        alert("Error deleting data", error);
      }


    }
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
 
       <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div class="row ">
           
           <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search"/>
                
                </form>
              </div>    
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Student Details</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add New Student
              </Button>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Matrikelnummer</th>
                            <th>Vorname </th>
                            <th>Nachname</th>
                            <th>Titel </th>
                            <th>Geschlecht </th>
                            <th>Durchschnitt</th>
                            <th>E-Mail</th>
                            <th>Zugeteilte Universität</th>
                            <th>Edit</th>


                        </tr>
                    </thead>
                    <tbody>
                        
                    {students.map((row) => (
              <tr key={row.id}>
                    <td>{row.matrikelnummer}</td>
                    <td>{row.vorname}</td>
                    <td>{row.nachname}</td>
                    <td>{row.titel}</td>
                    <td>{row.geschlecht}</td>
                    <td>{row.durchschnitt}</td>
                    <td>{row.email}</td>
                    <td>{row.zugeteilteUniversität}</td>
                    

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
                  step={field.step}
                  className="form-control"
                  placeholder={field.placeholder}
                  name={field.name}
                  value={selectedStudent ? selectedStudent[field.name] : newStudent[field.name]}
                  onChange={handleChange}
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