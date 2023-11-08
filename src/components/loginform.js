import React from "react";
// import GoogleLogin from "react-google-login";
// import { gapi } from "gapi-script";
import "./loginform.css";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';


const LoginForm = () => {



    return (
        <div className="cover">
            <h1>Anmeldung</h1>
            <input type="text" placeholder="Benutzername" />
            <input type="password" placeholder="Passwort" />
            <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Erinnern mich' />
            <a href="!#">Passwort vergessen?</a>
          </div>

            <div className="login-btn">Melde an</div>

            
        </div>
    )
}

export default LoginForm


