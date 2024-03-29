import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import CSVExportButton from '../ExportButton/CSVExportButton';


//import same format as student table
import "../../components/StudentDataTable/StudentTable.css";

function Home() {

  const [show, setShow] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [originalUniversities, setoriginalUniversities] = useState([]);
  const [showMinGPAColumn, setShowMinGPAColumn] = useState(true);
  const [search, setSearch] = useState("");
  const [firstTimeLoading, setFirstTimeLoading] = useState(true)

  const [sortOrder, setSortOrder] = useState({
    uniId: "asc",
    country: "asc",
    minimumGPA: "asc",
    firstPref: "asc",
    totalPref: "asc"
  });

  //For editing universities
  const [selectedUniversity, setSelectedUniversity] = useState(null);


  const [newUniversity, setNewUniversity] = useState({
    uniId: "",
    name: "",
    abbName: "",
    faculty: "",
    country: "",
    city: "",
    minGPA: "",
    slots: "",
    firstPref: "",
    totalPref: "",
    uniLink: "",


  });

  //The new values for a new university get saved here initially
  const inputFields = [
    { name: 'uniId', type: 'number', min: '1', placeholder: 'Enter University ID', disabled: selectedUniversity ? true : false, required: true },
    { name: 'name', type: 'text', placeholder: 'Enter name', required: true },
    { name: 'abbName', type: 'text', placeholder: 'Enter abbreviated name', required: true },
    { name: 'faculty', type: 'text', placeholder: 'Enter Faculty', required: true },
    { name: 'country', type: 'text', placeholder: 'Enter Country', required: true },
    { name: 'city', type: 'text', placeholder: 'Enter City', required: true },
    { name: 'minGPA', type: 'number', step: 'any', placeholder: 'Enter minimum required GPA', required: true },
    { name: 'slots', type: 'number', min: '0', placeholder: 'Enter slots', required: true },
    { name: 'firstPref', type: 'number', min: '0', placeholder: 'Enter first Preferences', required: true },
    { name: 'totalPref', type: 'number', min: '0', placeholder: 'Enter number of total Preferences', required: true },
    { name: 'uniLink', type: 'text', placeholder: 'Enter Link to University website', required: false },
  ];

  const handleShowMinGPAColumn = async () => {
    setShowMinGPAColumn(!showMinGPAColumn);
    try {
      const response = await fetch('http://localhost:8081/university/updateShowGPA', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(!showMinGPAColumn),
      });


      if (!response.ok) {
        alert('Fehler beim Aktualisieren der Datenbank');
      }
    } catch (error) {
      alert('Fehler beim Senden der PUT-Anfrage' + error);
    }

  };





  const handleClose = () => {
    setShow(false);
    setSelectedUniversity(null);
    setNewUniversity({
      uniId: "",
      name: "",
      abbName: "",
      faculty: "",
      country: "",
      city: "",
      minGPA: "",
      slots: "",
      firstPref: "",
      totalPref: "",
      uniLink: "",

    });
  };

  const handleShow = () => setShow(true);

  const handleEdit = (university) => {
    setSelectedUniversity(university);
    setNewUniversity({
      uniId: university.uniId,
      name: university.name,
      abbName: university.abbName,
      faculty: university.faculty,
      country: university.country,
      city: university.city,
      minGPA: university.minGPA,
      slots: university.slots,
      firstPref: university.firstPref,
      totalPref: university.totalPref,
      uniLink: university.uniLink,

    });
    handleShow();
  };


  const compareBoth = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };



  //Show data of database in the table
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:8081/university');
        const data = await response.json();

        if (firstTimeLoading) {
          setUniversities(data);
          setoriginalUniversities(data);
          setFirstTimeLoading(false)
        } else {
          //set data only when new data is different than current data
          if (!compareBoth(data, universities)) {
            setUniversities(data);
            setoriginalUniversities(data);
          }
        }


        const initialShowMinGPAColumn = data.length > 0 ? data[0].showGPA : false;
        setShowMinGPAColumn(initialShowMinGPAColumn);


      } catch (error) {
        console.log('Error fetching data:' + error);
      }
    };

    fetchUniversities();

    //fetch university data every 5 seconds
    const intervalId = setInterval(fetchUniversities, 5000);
    return () => clearInterval(intervalId);

  }, [firstTimeLoading]);

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


  //For the search function 
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
      console.log("Fehler beim Senden der Daten" + error);
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
          console.log("Error deleting data from the database");
        }
      } catch (error) {
        console.log("Error deleting data", error);
      }
    }
  };


  //for function
  const handleSort = (column) => {
    let sortOrderForColumn, sortFunction;

    if (column === "firstPref") {
      sortOrderForColumn = sortOrder.firstPref === "asc" ? "desc" : "asc";
      setSortOrder((prevSortOrder) => ({ ...prevSortOrder, firstPref: sortOrderForColumn }));
      sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
    } else if (column === "uniId") {
      sortOrderForColumn = sortOrder.uniId === "asc" ? "desc" : "asc";
      setSortOrder((prevSortOrder) => ({ ...prevSortOrder, uniId: sortOrderForColumn }));
      sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
    } else if (column === "totalPref") {
      sortOrderForColumn = sortOrder.totalPref === "asc" ? "desc" : "asc";
      setSortOrder((prevSortOrder) => ({ ...prevSortOrder, totalPref: sortOrderForColumn }));
      sortFunction = (a, b) => sortOrderForColumn === "asc" ? a[column] - b[column] : b[column] - a[column];
    } else {
      sortOrderForColumn = sortOrder.country === "asc" ? "desc" : "asc";
      setSortOrder((prevSortOrder) => ({ ...prevSortOrder, country: sortOrderForColumn }));
      sortFunction = (a, b) => {
        const valueA = a[column].toLowerCase();
        const valueB = b[column].toLowerCase();
        return sortOrderForColumn === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      };
    }
    const sortedUniversities = [...universities].sort(sortFunction);
    setUniversities(sortedUniversities);
  };






  //this method deletes all universities which ar estored in the local array and then deletes from the database
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

  const handleChangeShowMin = (e) => {
    const { showGPA } = e.target;
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedUniversity) {
      // If editing, update the selected university
      setSelectedUniversity((prevUniversity) => ({
        ...prevUniversity,
        [name]: value,
      }));
    } else {
      // If adding a new university, update the new university
      setNewUniversity((prevUniversity) => ({
        ...prevUniversity,
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
                  id="inputID"
                  type="number" min={1}
                  placeholder="Search by ID"
                  aria-label="Search"
                  onChange={handleSearch} />
              </form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Universities</b></h2></div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New University
            </Button>
            <Button variant="danger" onClick={deleteAllUniversities} style={{ marginTop: "10px", marginBottom: "10px" }}>
              Delete all Universities
            </Button>
            <CSVExportButton data={universities} filename="universities.csv" selectedAttributes={['uniId', 'name', 'abbName', 'faculty', 'country', 'city', 'minGPA', 'slots', 'firstPref', 'totalPref', 'uniLink']} />
          </div>
        </div>
        <div className="row">
          <div className="table-responsive " >
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr style={{ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'bold', color: 'blue' }}>
                  <th onClick={() => handleSort("uniId")}>
                    Uni-ID
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder.uniId === "asc" && (
                        <i className="material-icons" title="Sort descending">
                          &#xE316;
                        </i>
                      )}
                      {sortOrder.uniId === "desc" && (
                        <i className="material-icons" title="Sort ascending">
                          &#xE313;
                        </i>
                      )}
                    </a>
                  </th>
                  <th>Name</th>
                  <th>Abbreviated Name</th>
                  <th>Faculty</th>
                  <th onClick={() => handleSort("country")}>
                    Country
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder.country === "asc" && (
                        <i className="material-icons" title="Sort descending">
                          &#xE316;
                        </i>
                      )}
                      {sortOrder.country === "desc" && (
                        <i className="material-icons" title="Sort ascending">
                          &#xE313;
                        </i>
                      )}
                    </a>
                  </th>
                  <th>City</th>
                  <th><label>
                    <input
                      id="inputID"
                      type="checkbox"
                      checked={showMinGPAColumn}
                      onChange={() => handleShowMinGPAColumn(!showMinGPAColumn)}
                    />
                  </label>
                    Minimum GPA</th>
                  <th>Slots</th>
                  <th onClick={() => handleSort("firstPref")}>
                    No. of first Preferences
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder.firstPref === "asc" && (
                        <i className="material-icons" title="Sort descending">
                          &#xE316;
                        </i>
                      )}
                      {sortOrder.firstPref === "desc" && (
                        <i className="material-icons" title="Sort ascending">
                          &#xE313;
                        </i>
                      )}
                    </a>
                  </th>
                  <th onClick={() => handleSort("totalPref")}>
                    No. of total Preferences
                    <a href="#" className="sort-icon" data-toggle="tooltip">
                      {sortOrder.totalPref === "asc" && (
                        <i className="material-icons" title="Sort descending">
                          &#xE316;
                        </i>
                      )}
                      {sortOrder.totalPref === "desc" && (
                        <i className="material-icons" title="Sort ascending">
                          &#xE313;
                        </i>
                      )}
                    </a>
                  </th>
                  <th>Link to University Website</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {/*Show university data in the table*/}
                {universities.map((row) => (
                  <tr key={row.uniId}>
                    <td>{row.uniId}</td>
                    <td>{row.name}</td>
                    <td>{row.abbName}</td>
                    <td>{row.faculty}</td>
                    <td>{row.country}</td>
                    <td>{row.city}</td>
                    <td>{row.minGPA}</td>
                    <td>{row.slots}</td>
                    <td>{row.firstPref}</td>
                    <td>{row.totalPref}</td>
                    <td>{row.uniLink}</td>
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
              <Modal.Title>{selectedUniversity ? "Edit university" : "Add university"}</Modal.Title>
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
                      disabled={field.disabled}
                      required={field.required}
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