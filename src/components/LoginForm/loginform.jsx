import React, { useState, useEffect } from 'react';
import "./loginform.css";
import { Carousel } from "react-bootstrap";
import AlertModal from "../../components/AlertModal/AlertModal"

import logo2 from "./WiSo_Logo_TodaysIdeaTomorrowsImpact_eng.jpg";

import Footer from "../../components/Footer/footer";
import image1 from './Gespraechssituation-Wiso-Fakultaet-Cafe-1024px.jpg';
import image2 from './csm_Hauptgebaeude_543a6b79cf.jpg';
import axios from 'axios';


// This function is used to display the login page. It is the first page that the user sees when he opens the website.The user can log in as a student or as an admin. The login data is stored in the database.//

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

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);

  }, []);

  // This function is used to check if the user is a student or an admin. If the user is a student, he is redirected to the student homepage. If the user is an admin, he is redirected to the admin homepage. If the user is neither a student nor an admin, an error message is displayed.//
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
      <div className='logo-container'>
        <img className='WiSo-Slogan' src={logo2} alt="logo" />
      </div>

      <div className="login-carousel">
        <Carousel data-bs-theme="dark" className='carousel'>
          <Carousel.Item>
            <img className='carousel-img'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}

              src={image1}
              alt="First slide"
            />
            <Carousel.Caption className="caption">
              <h3 style={{ color: "rgba(255, 255, 255)", fontWeight: "bolder" }}>UniPick-Plan your dream exchange term</h3>
              <p style={{ color: "rgba(255, 255, 255)" }}>UniPick is a platform for students to plan their exchange term. Students can choose their favorite universities to apply to. </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='carousel-img'

              src={image2}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="First slide"
            />

            <Carousel.Caption className="caption">
              <h3 style={{ color: "rgba(255,255,255)", fontWeight: "bolder" }}>In the program of MESS</h3>
              <p style={{ color: "rgba(255, 255, 255)" }}>UniPick is a part of the program of MESS. MESS is an exchanged program for students from WiSo Faculty,University of Cologne. </p>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </div>


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


