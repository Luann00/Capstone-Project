import React, { useState, useEffect } from 'react';
import "./loginform.css";
import logo from "../../logo.png";
import axios from 'axios';

import Footer from "../../components/Footer/footer";




const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isStudent, setIsStudent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch students' data once when the component mounts
    const fetchStudents = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8081/student');
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    // Fetch admins' data once when the component mounts
    const fetchAdmins = async () => {
      try {
        const adminsResponse = await axios.get('http://localhost:8081/admin');
        setAdmins(adminsResponse.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchStudents();
    fetchAdmins();
  }, []);

  const handleAnmelden = () => {
    try {
      let foundStudent = null;
      let foundAdmin = null;

      // Find the student with the provided matrikelnummer
      students.forEach(student => {
        if (foundStudent) return;
        if (student.matrikelnummer.toString() === userName.toString()) {
          foundStudent = student;
        }
      });

      // Find the admin with the provided uniKim
      admins.forEach(admin => {
        if (foundAdmin) return;
        if (admin.uniKim.toString() === userName.toString()) {
          foundAdmin = admin;
        }
      });

      if (foundStudent) {
        // Check if the provided password matches the fetched student's password
        if ("password" === password) {
          setCurrentUser({ benutzername: foundStudent.matrikelnummer });
          setIsStudent(true);
          onLogin('student');
          setIsAdmin(false);
          setError('');
          localStorage.setItem('userType', 'student');
          return;
        } else {
          console.log("incorrect password for student!");
        }
        return;
      }

      if (foundAdmin) {
        // Check if the provided password matches the fetched admin's password
        if (foundAdmin.password === password) {
          setCurrentUser({ benutzername: foundAdmin.benutzername });
          localStorage.setItem('userType', 'admin');
          console.log("currentuser: " + currentUser);
          onLogin('admin');
          setIsStudent(false);
          setIsAdmin(true);
          setError('');
          return;
        } else {
          console.log("incorrect password for admin!");
        }
        return;
      }

      setError('User not found');
    } catch (error) {
      setError('Error logging in');
    }
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


