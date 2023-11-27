import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';


import "./StudentTable.css";

function Home() {

  const [show, setShow] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [originalUniversities, setoriginalUniversities] = useState([]);



  const [search, setSearch] = useState("");



  const [sortOrder, setSortOrder] = useState("asc");
  const [uniIdSortOrder, setUniIdSortOrder] = useState("asc");
  const [countrySortOrder, setCountrySortOrder] = useState("asc");



  //For editing students
  const [selectedUniversity, setSelectedUniversity] = useState(null);


  const [newUniversity, setNewUniversity] = useState({
    uniId: "",
    name: "",
    country: "",
    city: "",
    slots: "",
    firstPref: "",
  });

  //The new values for a new student get saved here initially
  const inputFields = [
    { name: 'uniId', type: 'number', min: '1', placeholder: 'Enter University ID' },
    { name: 'name', type: 'text', placeholder: 'Enter name' },
    { name: 'country', type: 'text', placeholder: 'Enter Country' },
    { name: 'city', type: 'text', placeholder: 'Enter City' },
    { name: 'slots', type: 'number', min: '0', placeholder: 'Enter slots' },
    { name: 'firstPref', type: 'number', min: '0', placeholder: 'Enter first Preferences' },
  ];





  const handleClose = () => {
    setShow(false);
    setSelectedUniversity(null);
    setNewUniversity({
      uniId: "",
      name: "",
      country: "",
      city: "",
      slots: "",
      firstPref: "",
    });
  };



  const handleShow = () => setShow(true);

  const handleEdit = (university) => {
    setSelectedUniversity(university);
    setNewUniversity({
      uniId: university.uniId,
      name: university.name,
      country: university.country,
      city: university.city,
      slots: university.slots,
      firstPref: university.firstPref,
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
        setoriginalUniversities(data);
      } catch (error) {
        alert('Error fetching data:' + error);
      }
    };

    fetchUniversities();
  }, []);


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


  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    const updatedTableData = originalUniversities.filter((university) =>
      university.uniId.toString().startsWith(searchValue)
    );

    // Update the displayed universities
    setUniversities(updatedTableData);

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
        const updatedUniversities = [...universities, newUniversity];
        setUniversities(updatedUniversities);
        handleClose();
      } else {
        console.log("Anderweitiger Fehler..!");
      }

    } catch (error) {
      alert("Fehler beim Senden der Daten" + error);
    }
  };



  const deleteUniversity = async (uniId) => {

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


  //Sort function
  const handleSort = (column) => {
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
  };



  const deleteAllUniversities = () => {
    if (window.confirm('Are you sure you want to remove all Universities?')) {
      setUniversities([]);
      deleteAllUniversityDatabase();
    }

  };

  const deleteAllUniversityDatabase = async () => {
    const deleteEndpoint = `http://localhost:8081/university/all`;

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
      setNewUniversity((prevUniversity) => ({
        ...prevUniversity,
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
                  placeholder="Search University"
                  aria-label="Search"
                  onChange={handleSearch} />
              </form>
            </div>
          </div>
          <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Universities</b></h2></div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New University
            </Button>
            <Button variant="danger" onClick={deleteAllUniversities} style={{ marginTop: "10px" }}>
              Delete all Universities
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive " >
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th onClick={() => handleSort("uniId")}>
                    Uni-ID
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder === "asc" && <i className="material-icons" title="Sort descending">&#xE316;</i>}
                      {sortOrder === "desc" && <i className="material-icons" title="Sort ascending">&#xE313;</i>}
                    </a>
                  </th>
                  <th>Name</th>
                  <th onClick={() => handleSort("country")}>
                    Country
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder === "asc" && <i className="material-icons" title="Sort descending">&#xE316;</i>}
                      {sortOrder === "desc" && <i className="material-icons" title="Sort ascending">&#xE313;</i>}
                    </a>
                  </th>
                  <th>City</th>
                  <th>Slots </th>
                  <th onClick={() => handleSort("firstPref")}>
                    Number of First Preferences
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder === "asc" && <i className="material-icons" title="Sort descending">&#xE316;</i>}
                      {sortOrder === "desc" && <i className="material-icons" title="Sort ascending">&#xE313;</i>}
                    </a>
                  </th>
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
              <Modal.Title>Add University</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={selectedUniversity ? updateUniversity : addUniversity}>
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
                      value={selectedUniversity ? selectedUniversity[field.name] : newUniversity[field.name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                {selectedUniversity ? (
                  <button type="submit" className="btn btn-success mt-4">
                    Save Changes
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary mt-4">
                    Add University
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