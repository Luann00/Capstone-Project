import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import logo from "../../logo.png";
import NavbarAdmin from "../NavigationBar/NavbarAdmin";
import "./whitelistStudent.css";

export const WhitelistVerwalter = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ pkz: "" });
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

    const interval = setInterval(fetchData, 1000);


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
            console.log("Bitte geben Sie nur Zahlen ein!");
          }
        } catch (error) {
          console.log("Error while posting data", error);
        }
      }
    };
  }, [newRow]);

  const addRow = () => {

    let variable1 = newRow.pkz;

    if (newRow.pkz) {
      const newRowData = {
        id: tableData.length + 1,
        pkz: newRow.pkz,

      };

      setTableData([newRowData, ...tableData]);
      setNewRow({ pkz: "" });
      setIsEditing(false);
      postData();
    }


  };

  const isNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const cancelInsertion = () => {
    setIsEditing(false);
  };


  const deleteRow = async (pkz) => {

    if (window.confirm('Are you sure you want to delete this admin from the list?')) {

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
    if (window.confirm('Are you sure you want to remove every admin from this list?')) {
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
        <img src={logo} alt="Your Logo" className="logo" />
      </header>
      <div className="whitelist-container">
        <div className="whitelist-title"><h1>Whitelist Admin</h1></div>
        <form onSubmit={addRow}>
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
                      type="number"
                      value={newRow.pkz}
                      onChange={(e) => setNewRow({ ...newRow, pkz: e.target.value })}
                      className="cellTextInput"
                      min={1}
                      required={isEditing}
                    />
                  )}
                </td>
                
                <td className="cells">
                  {isEditing ? (
                    <>
                      <span className="deleteButton" role="img" aria-label="Cancel" style={{ cursor: "pointer", marginRight: "20px", fontSize: "25px" }} onClick={cancelInsertion}>
                        &#10006;
                      </span>
                      <button type="submit" className="addButton" role="img" aria-label="Confirm" style={{ cursor: "pointer", marginLeft: "20px", fontSize: "25px" }}>
                        &#10004;
                      </button>
                    </>
                  ) : (
                    <span className="addButton" role="img" aria-label="Plus" style={{ cursor: "pointer" }} onClick={startEditing}>
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
        </form>
      </div>
    </div>
  );
};