import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button,Modal,Input } from 'react-bootstrap';


import "./StudentTable.css";
 
function Home() {
 
    const [show, setShow] = useState(false);
    const [universities, setUniversities] = useState([]);

    //For editing students
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [edit, isEditing] = useState(false);


    const [newUniversity, setNewUniversity] = useState({
      UniID: "",
      Name: "",
      Country: "",
      City: "",
      Slots: "",
      FirstPref: "",
      
    });

    //The new values for a new student get saved here initially
    const inputFields = [
      { name: 'uniId', placeholder: 'Enter UniID' },
      { name: 'name', placeholder: 'Enter University Name' },
    
      { name: 'country', placeholder: 'Enter Country' },
      { name: 'city', placeholder: 'Enter City' },
      { name: 'slots', placeholder: 'Enter number of available slots' },
     
    ];



    
 
    const handleClose = () => {
      setShow(false);
      setSelectedUniversity(null);
      setNewUniversity({
        UniID: "",
        Name: "",
        Country: "",
        City: "",
        Slots: "",
        
        
      });
    };
    
    
    const handleShow = () => setShow(true);

    const handleEdit = (University) => {
      setSelectedUniversity(University);
      setNewUniversity({
        UniID: University.uniId,
        Name: University.name,
        Country: University.country,
        City: University.city,
        Slots: University.slots,
        FirstPref: University.firstPref,
        
      });
      handleShow();
    };
  //Show data of database in the table
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:8081/university');
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        alert('Error fetching data:'+ error);
      }
    };

    fetchUniversities();
  }, []);


  const updateUniversity = async () => {

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


      if (response.ok) {
        const updatedUniversities = universities.map((University) =>
          University.uniId === selectedUniversity.uniId
            ? selectedUniversity
            : University
        );
        setUniversities(updatedUniversities);
        handleClose();
      } else {
      }

    } catch (error) {
    }

  };




  const addUniversity = async () => {
    try {
              const response = await fetch("http://localhost:8081/university", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUniversity),
        });
  
        if (response.ok) {
          // Update die Student list after sucessful adding
          const updatedUniversities = [...universities, newUniversity];
          setUniversities(updatedUniversities);
          handleClose();
        } else {
          alert("Bitte geben Sie nur Zahlen ein!");
        }
      
    } catch (error) {
      alert("Fehler beim Senden der Daten" + error);
    }
  };
  


  const deleteUniversity = async (uniId) => {

    //test
    if (window.confirm('Are you sure you want to delete this university?')) {

      const deleteEndpoint = `http://localhost:8081/university/${uniId}`;

      try {
        const response = await fetch(deleteEndpoint, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedTableData = universities.filter((row) => row.uniId !== uniId);
          setUniversities(updatedTableData);
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
  if (selectedUniversity) {
    // If editing, update the selected student
    setSelectedUniversity((prevUniversity) => ({
      ...prevUniversity,
      [name]: value,
    }));
  } else {
    // If adding a new student, update the new student
    setNewUniversity((prevNewUniversity) => ({
      ...prevNewUniversity,
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
                 <input class="form-control mr-sm-2" type="search" placeholder="Search University" aria-label="Search"/>
                
                </form>
              </div>    
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>University Details</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add New University
              </Button>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>UniID</th>
                            <th>Name </th>
                            <th>Country</th>
                            <th>City </th>
                            <th>Slots </th>
                            <th>First Preferences</th>
                          
                            <th>Edit</th>


                        </tr>
                    </thead>
                    <tbody>
                        
                    {universities.map((row) => (
              <tr key={row.id}>
                    <td>{row.uniId}</td>
                    <td>{row.name}</td>
                    <td>{row.country}</td>
                    <td>{row.city}</td>
                    <td>{row.slots}</td>
                    <td>{row.firstPref}</td>
                    
                    

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
                    onClick={() => deleteUniversity(row.uniId)}
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
            <form>
              {inputFields.map((field) => (
                <div className="form-group mt-3" key={field.name}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={field.placeholder}
                  name={field.name}
                  value={selectedUniversity ? selectedUniversity[field.name] : newUniversity[field.name]}
                  onChange={handleChange}
                />
              </div>
              ))}
                
                {selectedUniversity ? (
                  <button type="submit" className="btn btn-success mt-4" onClick={updateUniversity}>
                    Save Changes
                  </button>
                  ) : (
                    <button type="submit" className="btn btn-primary mt-4" onClick={addUniversity}>
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