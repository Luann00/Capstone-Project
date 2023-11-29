import React, { useState } from "react";
import "./loginform.css";
import logo from "../logo.png";
import Footer from "./footer";

const LoginForm = () => {
  const [benutzername, setBenutzername] = useState("");
  const [passwort, setPasswort] = useState("");

  const handleAnmelden = () => {


  };



  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnmelden();
    }
  };

  return (
    <div className="page">
      <header className="App-header">
        <img src={logo} alt="Your Logo" className="logo" />

      </header>

      <div className="cover">
        <h1 className="title">Willkommen</h1>
        <input
          type="text"
          placeholder="Benutzername"
          onChange={(e) => setBenutzername(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Passwort"
          onChange={(e) => setPasswort(e.target.value)}
          onKeyDown={handleKeyPress}

        />



        <div className="login-btn" onClick={handleAnmelden}>
          Melde an
        </div>
      </div>

      <footer>
        <Footer />
      </footer>

    </div>
  );
};

export default LoginForm;


