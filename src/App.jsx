import "./App.css";
import LoginForm from "./components/LoginForm/loginform";
import React, { useState, useEffect } from 'react';
import { WhitelistStudent } from "./components/WhiteLists/whitelistStudent";
import { WhitelistAdmin } from "./components/WhiteLists/whitelistVerwalter";
import StudentTable from './components/StudentDataTable/StudentTable';
import UniversityTable from './components/UniversityDataTable/UniversityTable';
import SelectionProcess from './components/ProcessTable/SelectionProcess';
import UniCardPage from "./components/SelectUniversityPage/UniCardPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarAdmin from './components/NavigationBar/NavbarAdmin';
import NavBarStudent from './components/NavigationBar/NavBarStudent';
import HomePageAdmin from "./components/HomePage/HomePageAdmin";
import HomePageStudent from "./components/HomePage/HomePageStudent";

function App() {
  const [isStudent, setIsStudent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    console.log(storedUserType);
    if (storedUserType) {
      setIsAdmin(storedUserType === 'admin');
      setIsStudent(storedUserType === 'student');
    }
    
    // No need to clear localStorage here


  }, []);



  const handleLogin = (userType) => {
    setIsAdmin(userType === 'admin');
    setIsStudent(userType === 'student');

    if(setIsAdmin ||setIsStudent) {
      setIsLoggedIn(true)
    }
  };


  const handleLogout = () => {
    // Zurücksetzen der Zustände und Löschen der Einträge im localStorage
    window.location.href = '/';
    localStorage.removeItem('userType');
    localStorage.removeItem('name'); // Falls du auch den Benutzernamen gespeichert hast
    setIsAdmin(false);
    setIsStudent(false);
    

  };


  return (
    <div>
      {isLoggedIn ? (
        <>
          {isAdmin ? (
            <NavbarAdmin onLogout={handleLogout} />
          ) : (
            <NavBarStudent onLogout={handleLogout} />
          )}
          <Routes>
            {isAdmin ? (
              <>
                <Route path="/" element={<HomePageAdmin />} />
                <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
                <Route path="/UniversityTable" element={<UniversityTable />} />
                <Route path="/StudentTable" element={<StudentTable />} />
                <Route path="/WhitelistStudent" element={<WhitelistStudent />} />
                <Route path="/WhitelistAdmin" element={<WhitelistAdmin />} />
                <Route path="/SelectionProcess" element={<SelectionProcess />} />
                <Route path="/UniCardPage" element={<UniCardPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePageStudent />} />
                <Route path="/UniCardPage" element={<UniCardPage />} />
              </>
            )}
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
