
import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './App.css';
function App() {

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        {/* <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol> */}

        <MDBCol col='4' md='6'>


          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Anmeldung</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Benutzername' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Passwort' id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Erinnern mich' />
            <a href="!#">Passwort vergessen?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Melde an</MDBBtn>
            
          </div>

        </MDBCol>

      </MDBRow>


        

         

      

    </MDBContainer>
  );
}

export default App;

