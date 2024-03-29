import React, { useState, useEffect } from "react";
import { Button, Modal, Input } from 'react-bootstrap';
import "./whitelistStudent.css";
import CSVExportButton from '../ExportButton/CSVExportButton';



export const WhitelistAdmin = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ pkz: "", year: "" });
  const [show, setShow] = useState(false);
  const [admins, setAdmins] = useState([]);

  const [selectedAdmin, setSelectedAdmin] = useState(null);


  const handleShow = () => setShow(true);


  const [newAdmin, setNewAdmin] = useState({
    Pkz: "",
    Year: "",
  });

  const handleClose = () => {
    setShow(false);
    setSelectedAdmin(null);
    setNewAdmin({
      Pkz: "",
      Year: "",
    });
  };


  const inputFields = [
    { name: 'pkz', type: 'number', min: '1', max: '10000000', placeholder: 'Enter Matrikelnummer', disabled: selectedAdmin ? true : false },
    { name: 'year', type: 'number', placeholder: 'Enter year', min: '1' },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedAdmin) {
      // If editing, update the selected admin
      setSelectedAdmin((prevAdmin) => ({
        ...prevAdmin,
        [name]: value,
      }));
    } else {
      // If adding a new admin, update the new admin
      setNewAdmin((prevNewAdmin) => ({
        ...prevNewAdmin,
        [name]: value,
      }));
    }
  };

  const updateAdmin = async () => {

    //Update at first the local table for a smoother user experience
    const updatedAdmin = admins.map((admin) =>
      admin.pkz === selectedAdmin.pkz
        ? selectedAdmin
        : admin
    );
    setAdmins(updatedAdmin);
    handleClose();

    try {
      const response = await fetch(
        `http://localhost:8081/whitelistAdmin/update/${selectedAdmin.pkz}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedAdmin),
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
        const response = await fetch("http://localhost:8081/whitelistAdmin");
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

    //fetch interval every 3 seconds
    const intervalId = setInterval(fetchData, 1000); 

    return () => clearInterval(intervalId);

  }, []);


  const addAdmin = async () => {
    //Update at first the local table and then the database for a smoother experience
    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    handleClose();


    try {
      const response = await fetch("http://localhost:8081/whitelistAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
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
      if (newRow.pkz && newRow.year) {
        try {
          const response = await fetch("http://localhost:8081/whitelistAdmin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              matrikelnummer: newRow.pkz,
              year: newRow.year,
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

  const addRow = (e) => {

    e.preventDefault();

    if (newRow.pkz && newRow.year) {
      const newRowData = {
        id: tableData.length + 1,
        pkz: newRow.matrikelnummer,
        year: newRow.year,
      };

      setTableData([newRowData, ...tableData]);
      setNewRow({ pkz: "", year: "" });
      postData();
    }

  };



  const deleteAllRowsDatabase = async () => {
    const deleteEndpoint = `http://localhost:8081/whitelistAdmin/all`;
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


  const deleteAdmin = async (pkz) => {

    if (window.confirm('Are you sure you want to delete this admin from this list?')) {

      const deleteEndpoint = `http://localhost:8081/whitelistAdmin/${pkz}`;

      try {
        const response = await fetch(deleteEndpoint, {
          method: "DELETE",
        });
        if (response.ok) {
          const updatedTableData = tableData.filter((row) => row.pkz !== pkz);
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
    if (window.confirm('Are you sure you want to delete all admins from this list?')) {
      setTableData([]);
      deleteAllRowsDatabase();
    }
  };


  const handleEdit = (whitelistAdmin) => {
    setSelectedAdmin(whitelistAdmin);
    setNewAdmin({
      pkz: whitelistAdmin.pkz,
      year: whitelistAdmin.year,
    });
    handleShow();
  };

  //Show data of database in the table
  useEffect(() => {
    const fetchWhitelistAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8081/whitelistAdmin');
        const data = await response.json();
        setAdmins(data);

      } catch (error) {
        console.log('Error fetching data:' + error);
      }
    };
    fetchWhitelistAdmins();
  }, []);

  return (
    <div className="list-page">
      <div className="whitelist-container">
        <div className="titleAndButtons">
          <div className="whitelist-title"><h1 style={{color:'green',textTransform:'none',fontWeight:'600'}}>Whitelist Admin</h1></div>
        </div>
        <form onSubmit={addRow}>
          <div className="button-container">
            <Button variant="primary" onClick={handleShow}>
              Add New Admin
            </Button>
            <Button variant="danger" onClick={deleteAllRows}>
              Delete all Admins
            </Button>
            <CSVExportButton data={tableData} filename="whitelistAdmin.csv" selectedAttributes={['pkz', 'year']} />
          </div>
          <table className="tabelle">
            <thead>
              <tr>
                <th className="spalte">PKZ</th>
                <th className="spalte">Year</th>
                <th className="spalte">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.pkz}>
                  <td className="rowCell1">{row.pkz}</td>
                  <td className="rowCell2">{row.year}</td>
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
                      onClick={() => deleteAdmin(row.pkz)}
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
              <form onSubmit={selectedAdmin ? updateAdmin : addAdmin}>
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
                      value={selectedAdmin ? selectedAdmin[field.name] : newAdmin[field.name]}
                      onChange={handleChange}
                      disabled={field.disabled}
                      required
                    />
                  </div>
                ))}

                {selectedAdmin ? (
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
