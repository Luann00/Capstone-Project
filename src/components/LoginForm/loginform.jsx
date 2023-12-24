import React, { useState, useEffect } from 'react';
import "./loginform.css";
import logo from "../../logo.png";
import Footer from "../../components/Footer/footer";




const LoginForm = () => {
  const [benutzername, setBenutzername] = useState("");
  const [passwort, setPasswort] = useState("");

  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);



  useEffect(() => {
    // Fetch students' data once when the component mounts
    const fetchStudents = async () => {
      try {
        const studentResponse = await fetch('http://localhost:8081/student');
        setStudents(studentResponse.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    // Fetch admins' data once when the component mounts
    const fetchAdmins = async () => {
      try {
        const adminResponse = await fetch('http://localhost:8081/admin');
        setAdmins(adminResponse.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchStudents();
    fetchAdmins();
  }, []); // Empty dependency array ensures these effects run only once on mount


  console.log(students)
  console.log(admins)



  /*URL des LDAP Servers
  const backendUrl = 'http://localhost:8080';
  const authenticationEndpoint = '/';

  */

  /* Diese Methode hier ist das Gerüst für die LDAP-Authentifizierung. Wenn die Authentifizierung per LDAP
geklappt hätte, hätten wir einfach die unten stehenden Credentials ersetzen müssen durch die des LDAP-Servers und
wären fertig gewesen. */


  const handleAnmelden = async () => {
   
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
        <h1 className="title">Welcome</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setBenutzername(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPasswort(e.target.value)}
          onKeyDown={handleKeyPress}

        />



        <div className="login-btn" onClick={handleAnmelden}>
          Log in
        </div>
      </div>

      <footer>
        <Footer />
      </footer>

    </div>
  );
};

export default LoginForm;


