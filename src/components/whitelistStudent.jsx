import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
/*
import Button from 'react-bootstrap/Button';
*/

import "./whitelistStudent.css";

export const WhitelistStudent = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ matrikelnummer: "", jahr: "" });
  const [isEditing, setIsEditing] = useState(false);

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
            alert("Data added successfully!");
          } else {
            alert("Bitte geben Sie nur Zahlen ein!");
          }
        } catch (error) {
          alert("Error while posting data", error);
        }
      }
    };
  }, [newRow]);

  const addRow = () => {

    let variable1 = newRow.matrikelnummer;
    let variable2 = newRow.jahr;

    if (isNumber(newRow.matrikelnummer) && isNumber(newRow.jahr)) {

     
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
  } else {
    newRow.matrikelnummer = "";
    newRow.jahr = "";
    alert("Nur ganze Zahlen du Kek");
  }
  
  };

  const isNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const cancelInsertion = () => {
    setIsEditing(false);
  };

  const deleteRow = async (matrikelnummer) => {


    if (window.confirm('Sind Sie sich sicher dass Sie diesen Studenten entfernen möchten?')) {
      
      const deleteEndpoint = `http://localhost:8081/whitelistStudent/${matrikelnummer}`;

    try {
      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedTableData = tableData.filter((row) => row.matrikelnummer !== matrikelnummer);
        setTableData(updatedTableData);
      } else {
        alert("Error deleting data from the database");
      }
    } catch (error) {
      alert("Error deleting data", error);
    }


    }
  };

  const deleteAllRowsDatabase = async () => {
    const deleteEndpoint = `http://localhost:8081/whitelistStudent/all`;

    try {
      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Alles gelöscht!");
      } else {
        alert("Error deleting data from the database");
      }
    } catch (error) {
      alert("Error deleting data", error);
    }
  };

  const deleteAllRows = () => {
    
    if (window.confirm('Sind Sie sich sicher dass Sie alle bestehenden Einträge löschen wollen?')) {
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
      setIsEditing(false);
    }
  };

  return (
    <div className="whitelist-container">
      <div className="whitelist-title">Whitelist Studenten</div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Matrikelnummer</th>
              <th className="expand">Jahr</th>
              <th colSpan="3">Actions</th>
            </tr>
            <tr>
              <td>
                {isEditing && (
                  <input
                    type="text"
                    value={newRow.matrikelnummer}
                    onChange={(e) => setNewRow({ ...newRow, matrikelnummer: e.target.value })}
                    onKeyDown={handleKeyPress}
                  />
                )}
              </td>
              <td>
                {isEditing && (
                  <input
                    type="text"
                    value={newRow.jahr}
                    onChange={(e) => setNewRow({ ...newRow, jahr: e.target.value })}
                    onKeyDown={handleKeyPress}
                  />
                )}
              </td>
              <td>
                {isEditing ? (
                  <>
                    <span
                      role="img"
                      aria-label="Cancel"
                      style={{ cursor: "pointer", marginRight: "20px", fontSize: "25px" }}
                      onClick={cancelInsertion}
                    >
                      &#10006;
                    </span>
                    <span
                      role="img"
                      aria-label="Confirm"
                      style={{ cursor: "pointer", marginLeft: "20px", fontSize: "25px" }}
                      onClick={addRow}
                    >
                      &#10004;
                    </span>
                  </>
                ) : (
                  <span
                    role="img"
                    aria-label="Plus"
                    style={{ cursor: "pointer" }}
                    onClick={startEditing}
                  >
                    ➕
                  </span>
                )}
              </td>
              <td>
                <BsFillTrashFill style={{ cursor: "pointer" }} onClick={() => deleteAllRows()} />
              </td>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td class="rowCellMatrikelnummer">{row.matrikelnummer}</td>
                <td class="rowCellJahr">{row.jahr}</td>
                <td>
                  <BsFillPencilFill style={{ cursor: "pointer" }} />
                </td>
                <td>
                

                  <BsFillTrashFill style={{ cursor: "pointer" }} onClick={() => deleteRow(row.matrikelnummer)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

   
  );
};
