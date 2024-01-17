import React, { useState, useEffect } from 'react';
import "./loginform.css";
import logo from "../../logo.png";
import axios from 'axios';
import AlertModal from "../../components/AlertModal/AlertModal"

import Footer from "../../components/Footer/footer";




const LoginForm = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [whitelistStudents, setWhitelistStudents] = useState([]);
  const [whitelistAdmins, setWhitelistAdmins] = useState([]);



  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const studentItems = await axios.get('http://localhost:8081/student');
        setStudents(studentItems.data);

        const adminItems = await axios.get('http://localhost:8081/admin');
        setAdmins(adminItems.data);

        const whitelistStudentItems = await axios.get('http://localhost:8081/whitelistStudent');
        setWhitelistStudents(whitelistStudentItems.data);

        const whitelistAdminItems = await axios.get('http://localhost:8081/whitelistAdmin');
        setWhitelistAdmins(whitelistAdminItems.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    //fetch data initially
    fetchData();

    const intervalId = setInterval(fetchData, 20000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

  }, []); // Empty dependency array to run the effect only once on mount


  const handleAnmelden = () => {

    try {
      let foundStudent = null;
      let foundAdmin = null;

      // Find the student with the provided matrikelnummer
      students.forEach(student => {
        if (foundStudent) return;
        if (student.matrikelnummer.toString() === userName.toString()) {
          whitelistStudents.forEach(whitelistStudent => {
            if (whitelistStudent.matrikelnummer.toString() === userName.toString()) {
              foundStudent = student;
            }
          })
        }
      });

      // Find the admin with the provided uniKim both in admin table and whitelist
      admins.forEach(admin => {
        if (foundAdmin) return;
        if (admin.uniKim.toString() === userName.toString()) {
          whitelistAdmins.forEach(whitelistAdmin => {
            if (whitelistAdmin.pkz.toString() === userName.toString()) {
              foundAdmin = admin;
            }
          })
        }
      });

      if (foundStudent) {
        if ("password" === password) {
          //if password is right, set the student data on local computer to work with them after login
          setError('');
          localStorage.setItem('currentUser', JSON.stringify(foundStudent)); // Speichere das gesamte Studentenobjekt
          localStorage.setItem('userType', 'student');
          onLogin('student', JSON.parse(localStorage.getItem('currentUser')));
          return;
        } else {
          setShowAlert(true);
        }
        return;
      }

      if (foundAdmin) {
        if ("password" === password) {
          //if password is right, set the student data on local computer to work with them after login
          localStorage.setItem('currentUser', JSON.stringify(foundAdmin));
          localStorage.setItem('userType', 'admin');
          onLogin('admin', null);
          setError('');
          return;
        } else {
          setShowAlert(true);
        }
        return;
      }

      setError('User not found');
      setShowAlert(true);

    } catch (error) {
      setError('Error logging in');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnmelden();
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  }

  return (
    <div className="page">
      <header className="App-header">
        <img src={logo} alt="Your Logo" className="logo" />

      </header>
      <div className="cover">
        <h1 className="title">Welcome</h1>
        {showAlert && <AlertModal onClose={handleCloseAlert} />}
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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


