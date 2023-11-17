import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import logo from "../logo.png";
import NavbarAdmin from "./NavbarAdmin";
import "./whitelistStudent.css";

export const WhitelistVerwalter = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ pkz: ""});
  const [isEditing, setIsEditing] = useState(false);

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
  }, []);

  let postData;
  useEffect(() => {
    postData = async () => {
      if (newRow.pkz) {
        try {
          const response = await fetch("http://localhost:8081/whitelistAdmin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pkz: newRow.pkz,
              
            }),
          });

          if (response.ok) {
            console.log("Data added successfully!");
          } else {
            alert("Bitte geben Sie nur Zahlen ein!");
          }
        } catch (error) {
          console.log("Error while posting data", error);
        }
      }
    };
  }, [newRow]);

  const addRow = () => {

    let variable1 = newRow.pkz;
   

    if (isNumber(newRow.pkz)) {


      if (newRow.pkz) {
        const newRowData = {
          id: tableData.length + 1,
          pkz: newRow.pkz,
          
        };

        setTableData([newRowData, ...tableData]);
        setNewRow({ pkz: ""});
        setIsEditing(false);
        postData();
      }
    } else {
      newRow.pkz = "";
      
      alert("Es sind nur Integer Zahlen erlaubt!");
      setIsEditing(false);

    }

  };

  const isNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const cancelInsertion = () => {
    setIsEditing(false);
  };


  const deleteRow = async (pkz) => {

    //test
    if (window.confirm('Sind Sie sich sicher dass Sie diesen Verwalter entfernen möchten?')) {

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
    <div className="list-page">
      <header className="App-header">
        <div className="Navbar"> <NavbarAdmin/> </div>
        <img src={logo} alt="Your Logo" className="logo" />

        
      </header>
    <div className="whitelist-container">
      <div className="whitelist-title"><h1>Whitelist Verwalter</h1></div>
      <div className="tabelle-wrapper">
        <table className="tabelle">
          <thead>
            <tr>
              <th className="spalte">Uni-KIM</th>
              <th className="spalte" colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cells">
                {isEditing && (
                  <input
                    type="text"
                    value={newRow.pkz}
                    onChange={(e) => setNewRow({ ...newRow, pkz: e.target.value })}
                    onKeyDown={handleKeyPress}
                    className="cellTextInput"
                  />
                )}
              </td>

              <td className="cells">
                {isEditing ? (
                  <>
                    <span className="deleteButton"
                      role="img"
                      aria-label="Cancel"
                      style={{ cursor: "pointer", marginRight: "20px", fontSize: "25px" }}
                      onClick={cancelInsertion}
                    >
                      &#10006;
                    </span>
                    <span className="addButton"
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
              <td className="cells">
                <BsFillTrashFill style={{ cursor: "pointer" }} onClick={() => deleteAllRows()} />
              </td>
            </tr>

            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="rowCell1">{row.pkz}</td>
                <td id="cells1" colSpan="2" >
                  <BsFillTrashFill style={{ cursor: "pointer" }} onClick={() => deleteRow(row.pkz)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>


  );
};