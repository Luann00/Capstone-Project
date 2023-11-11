import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./whitelistStudent.css";

export const WhitelistStudent = () => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({ matrikelnummer: "", jahr: "" });
  const [isEditing, setIsEditing] = useState(false);

  const addRow = () => {
    if (newRow.matrikelnummer && newRow.jahr) {
      const newRowData = {
        id: tableData.length + 1,
        matrikelnummer: newRow.matrikelnummer,
        jahr: newRow.jahr,
      };

      setTableData([newRowData, ...tableData]);
      setNewRow({ matrikelnummer: "", jahr: "" });
      setIsEditing(false);
    }
  };

  const deleteRow = (id) => {
    const updatedTableData = tableData.filter((row) => row.id !== id);
    setTableData(updatedTableData);
  };

  // Function to delete all rows
  const deleteAllRows = () => {
    setTableData([]);
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
                <span
                  role="img"
                  aria-label="Plus"
                  style={{ cursor: "pointer" }}
                  onClick={isEditing ? addRow : startEditing}
                >
                  {isEditing ? "➕" : "➕"}
                </span>
              </td>
              <td>
                <BsFillTrashFill onClick={() => deleteAllRows()} />
              </td>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>{row.matrikelnummer}</td>
                <td>{row.jahr}</td>
                <td>
                  <BsFillPencilFill />
                </td>
                <td>
                  <BsFillTrashFill onClick={() => deleteRow(row.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
