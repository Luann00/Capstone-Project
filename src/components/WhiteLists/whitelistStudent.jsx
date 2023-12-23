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
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);


  const handleShow = () => setShow(true);


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

    const interval = setInterval(fetchData, 1000);


    fetchData();
  }, []);




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

    let variable1 = newRow.matrikelnummer;
    let variable2 = newRow.jahr;

    if (newRow.matrikelnummer && newRow.jahr) {
      const newRowData = {
        id: tableData.length + 1,
        matrikelnummer: newRow.matrikelnummer,
        jahr: newRow.jahr,
      };

      setTableData([newRowData, ...tableData]);
      setNewRow({ matrikelnummer: "", jahr: "" });
      setIsEditing(false);
      postData();
    }


  };



  const cancelInsertion = () => {
    setIsEditing(false);
  };


  const deleteRow = async (matrikelnummer) => {

    //test
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

  const deleteAllRows = () => {

    if (window.confirm('Are you sure you want to delete all students from this list?')) {
      setTableData([]);
      deleteAllRowsDatabase();
    }


  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addRow();
    }
  };

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
            <CSVExportButton data={students} filename="students.csv" />
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
                    <Button variant="danger" onClick={deleteRow}>
                      Delete student
                    </Button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};
