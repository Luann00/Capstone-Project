import React from "react";
import "./loginform.css";


const LoginForm = () => {



    return (
        <div className="cover">
            <h1 className="title">Anmeldung</h1>
            <input type="text" placeholder="Benutzername" />
            <input type="password" placeholder="Passwort" />
            <div className="d-flex justify-content-between mb-4">
            <a className= "pass-vergessen" href="!#">Passwort vergessen?</a>
          </div>
            <div className="login-btn">Melde an</div>

            
        </div>
    )
}

export default LoginForm


