import React, { useState } from "react";
import "./loginform.css";
import logo from "../../logo.png";
import Footer from "../../components/Footer/footer";




const LoginForm = () => {
  const [benutzername, setBenutzername] = useState("");
  const [passwort, setPasswort] = useState("");

  /*URL des LDAP Servers
  const backendUrl = 'http://localhost:8080';
  const authenticationEndpoint = '/';

  */

  /* Diese Methode hier ist das Gerüst für die LDAP-Authentifizierung. Wenn die Authentifizierung per LDAP
geklappt hätte, hätten wir einfach die unten stehenden Credentials ersetzen müssen durch die des LDAP-Servers und
wären fertig gewesen. */


  const handleAnmelden = async () => {
    /*
    try {
      const response = await fetch(`${backendUrl}${authenticationEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          benutzername,
          passwort,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Erfolgreich authentifiziert', data);
      } else {
        console.log('Authentifizierung fehlgeschlagen');
      }
    } catch (error) {
      alert('ERROR GEHT NICHT', error);
    }
    */
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


