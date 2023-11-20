import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button,Modal,Input } from 'react-bootstrap';


import "./Home.css";
 
function Home() {
 
    const [show, setShow] = useState(false);
    const [students, setStudents] = useState([]);

 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     //Show data of database
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
                            <th>EMail</th>
                            <th>Zugeteilte Universität</th>
                            <th>Actions</th>


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
                   
                    <a href="#" className="edit" title="Edit" data-toggle="tooltip">
                      <i className="material-icons">&#xE254;</i>
                    </a>
                    <a href="#" className="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }}>
                      <i className="material-icons">&#xE872;</i>
                    </a>
                  </td>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>   
        </div>  
 
        {/* <!--- Model Box ---> */}
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
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Country"/>
                </div>
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter City"/>
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Country"/>
                </div>
                
                  <button type="submit" class="btn btn-success mt-4">Add Record</button>
                </form>
            </Modal.Body>
 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
  
       {/* Model Box Finsihs */}
       </div>  
      </div>    
      </div>  
  );
}
 
export default Home;