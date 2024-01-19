import React from 'react';
import Alert from 'react-bootstrap/Alert';

//this component is for the error message which shows up when the credentials in the login are wrong
function BasicExample() {
  return (
    <Alert variant="danger">
      Wrong username or password!
    </Alert>
  );
}

export default BasicExample;