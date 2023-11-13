import React, { useState } from "react";
import "./loginform.css";

const LoginForm = () => {
  const [benutzername, setBenutzername] = useState("");
  const [passwort, setPasswort] = useState("");

  const handleAnmelden = () => {
    // Hier können Sie den eingegebenen Text verwenden, wie zum Beispiel:
    alert("Benutzername:", benutzername);
    alert("Passwort:", passwort);
    // Oder Sie können den Text auf andere Weise anzeigen oder verarbeiten.
  };

  return (
    <div className="cover">
      <h1 className="title">Anmeldung</h1>
      <input
        type="text"
        placeholder="Benutzername"
        onChange={(e) => setBenutzername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        onChange={(e) => setPasswort(e.target.value)}
      />
      <div className="d-flex justify-content-between mb-4">
        <a className="pass-vergessen" href="!#">
          Passwort vergessen?
        </a>
      </div>
      <div className="login-btn" onClick={handleAnmelden}>
        Melde an
      </div>
    </div>
  );
};

export default LoginForm;


