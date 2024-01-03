import React from 'react';

const CSVExportButton = ({ data, filename, selectedAttributes }) => {
  const exportCSV = () => {
    const csvContent = convertToCSV(data, selectedAttributes);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename || 'export.csv';
    link.click();
  };

  const convertToCSV = (data, selectedAttributes) => {
    const header = selectedAttributes.join(',') + '\n';
    const csvRows = data.map((row) => selectedAttributes.map(attr => row[attr]).join(',') + '\n');
    return header + csvRows.join('');
  };

  return (
    <button className="btn btn-info" onClick={exportCSV}>
      Export as CSV
    </button>
  );
};

export default CSVExportButton;
