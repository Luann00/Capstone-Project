import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./whitelistStudent.css";
import "./AlertMessage.jsx";



export const WhitelistStudent = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ matrikelnummer: "", jahr: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(-1);
  const [isModifying, setIsModifying] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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

          if(isModifying) {
            alert("Erfolgreich bearbeitet!")
          } else {
            
          }

          if (response.ok) {
            if(!isModifying) {
              alert("Data added successfully!");
            }
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




  const addModifiedRow = () => {

    deleteRow(editingRow.matrikelnummer);


    if (isNumber(newRow.matrikelnummer) && isNumber(newRow.jahr)) {
      if (newRow.matrikelnummer && newRow.jahr) {
        const newRowData = {

          //id: tableData.length + 1,
          matrikelnummer: newRow.matrikelnummer,
          jahr: newRow.jahr,
        };

        setNewRow({ matrikelnummer: "", jahr: "" });
       
        setTableData([newRowData, ...tableData]);
        setNewRow({ matrikelnummer: "", jahr: "" });
        if(isModifying) {
          postData();
        }
        setIsModifying(false);

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


    /*If we don't modify a row, this means that we actually want to delete a student. So make User
    aware of this
    */
    if(!isModifying) {
      if (window.confirm("Sind Sie sich sicher dass Sie diesen Studenten entfernen möchten?")) {
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
      } else {
        setIsModifying(false);
      }
    } else {
    /*We enter this case when we are actually only modifying a row
    */
      let decision = window.confirm("Sind Sie sich sicher dass Sie diese Spalte bearbeiten möchten?")


      //If User really wants to edit the row, delete the previous cell with the previous values first
      if (decision) {
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
      } else {
        //If user don't want to edit the row, cancel the modifying
        setIsModifying(false);

        return;
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
    if (window.confirm("Sind Sie sich sicher dass Sie alle bestehenden Einträge löschen wollen?")) {
      setTableData([]);
      deleteAllRowsDatabase();
    }
  };

  const startModifying = (row) => {
    setIsEditing(true);
    setEditingRow(row);
    setNewRow({ matrikelnummer: row.matrikelnummer, jahr: row.jahr });
  };


  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setNewRow({ matrikelnummer: "", jahr: "" });
  };

  const cancelModifying = () => {
    setIsModifying(false);
  };
  
  


  const updateRow = () => {
    const updatedTableData = tableData.map((row) =>
      row.matrikelnummer === editingRow.matrikelnummer ? { ...row, ...newRow } : row
    );

    setTableData(updatedTableData);
    setIsEditing(false);
    setNewRow({ matrikelnummer: "", jahr: "" });
  };


  const startRowEditing = (row) => {
    // This method is for editing an existing row without involving the addRow method
    setIsModifying(true);
    setEditingRow(row);
    setNewRow({ matrikelnummer: row.matrikelnummer, jahr: row.jahr });
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isModifying) {
        setEditingRow(tableData.find((row) => row.matrikelnummer === editingRow.matrikelnummer));
        updateRow();
      } else {
        addRow();
      }
      setIsEditing(false);
    }
  };


  //Filter Function
  const filterTableData = () => {
    return tableData.filter((row) =>
      row.matrikelnummer.toString().includes(searchInput)
    );
  };


  return (
    <div className="whitelist-container">
      <div className="whitelist-title">
        <h1>Whitelist Studenten</h1>
      </div>
      <div className="tabelle-wrapper">
        <table className="tabelle">
          <thead>
            <tr>
              <th className="spalte">Matrikelnummer</th>
              <th className="spalte">Jahr</th>
              <th className="spalte" colSpan="3">
                Actions
              </th>
            </tr>
            <tr>
              <td className="cells">
                {isEditing ? (
                  <input
                    type="text"
                    value={newRow.matrikelnummer}
                    onChange={(e) => setNewRow({ ...newRow, matrikelnummer: e.target.value })}
                    onKeyDown={handleKeyPress}
                  />
                ) : null}
              </td>
              <td className="cells">
                {isEditing ? (
                  <input
                    type="text"
                    value={newRow.jahr}
                    onChange={(e) => setNewRow({ ...newRow, jahr: e.target.value })}
                    onKeyDown={handleKeyPress}
                  />
                ) : null}
              </td>
              <td className="cells">
                {isEditing ? (
                  <>
                    <span
                      role="img"
                      aria-label="Cancel"
                      style={{ cursor: "pointer", marginRight: "20px", fontSize: "20px" }}
                      onClick={cancelEdit}
                    >
                      &#10006;
                    </span>
                    <span
                      role="img"
                      aria-label="Confirm"
                      style={{ cursor: "pointer", marginLeft: "20px", fontSize: "20px" }}
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
              <td className="cells">
                <BsFillTrashFill style={{ cursor: "pointer" }} onClick={() => deleteAllRows()} />
              </td>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="rowCellMatrikelnummer">
                  {isModifying && editingRow.matrikelnummer === row.matrikelnummer ? (
                    <input
                      type="text"
                      value={newRow.matrikelnummer}
                      onChange={(e) => setNewRow({ ...newRow, matrikelnummer: e.target.value })}
                    />
                  ) : (
                    row.matrikelnummer
                  )}
                </td>
                <td className="rowCellJahr">
                  {isModifying && editingRow.matrikelnummer === row.matrikelnummer ? (
                    <input
                      type="text"
                      value={newRow.jahr}
                      onChange={(e) => setNewRow({ ...newRow, jahr: e.target.value })}
                    />
                  ) : (
                    row.jahr
                  )}
                </td>
                <td className="cells">
                  {!isModifying ? (
                    <BsFillPencilFill style={{ cursor: "pointer" }} onClick={() => startRowEditing(row)} />
                  ) : <>
                  <span
                    role="img"
                    aria-label="Cancel"
                    style={{ cursor: "pointer", marginRight: "20px", fontSize: "20px" }}
                    onClick={cancelModifying}
                  >
                    &#10006;
                  </span>
                  <span
                    role="img"
                    aria-label="Confirm"
                    style={{ cursor: "pointer", marginLeft: "20px", fontSize: "20px" }}
                    onClick={addModifiedRow}
                  >
                    &#10004;
                  </span>
                </>}
                </td>
                <td className="cells">
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
