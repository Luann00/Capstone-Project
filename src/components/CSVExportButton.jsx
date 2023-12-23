import React from 'react';


const CSVExportButton = ({ data, filename }) => {
  const exportCSV = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename || 'export.csv';
    link.click();
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',') + '\n';
    const csvRows = data.map((row) => Object.values(row).join(',') + '\n');
    return header + csvRows.join('');
  };

  return (
    <button className="btn btn-info" onClick={exportCSV}>
      Export as CSV
    </button>
  );
};

export default CSVExportButton;