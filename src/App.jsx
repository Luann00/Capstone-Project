import "./App.css";
import LoginForm from "./components/loginform";
import React, { useState } from 'react';
import { WhitelistStudent } from "./components/whitelistStudent";
import { WhitelistVerwalter } from "./components/whitelistVerwalter";
import StudentTable from './components/StudentTable';
import UniCard from './components/UniCard';
import UniversityTable from './components/UniversityTable';
import SelectionProcess from './components/SelectionProcess';
import UniCardPage from "./features/UniCardPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarAdmin from './components/NavbarAdmin';
import NavBarStudent from './components/NavBarStudent';
import Home from "./components/Home";



function App() {

  // return(
  //   <UniCardPage/>
  // )

  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  const handleLogin = (userType) => {
    setLoggedIn(true);
    setIsAdmin(userType === 'admin');
  };

  return (
    <div>
      {isAdmin && <NavbarAdmin />} {/* Render NavbarAdmin only if isAdmin is true */}
      <Routes>
        {isLoggedIn ? (
          isAdmin ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/UniversityTable" element={<UniversityTable />} />
              <Route path="/StudentTable" element={<StudentTable />} />
              <Route path="/WhitelistStudent" element={<WhitelistStudent />} />
              <Route path="/WhitelistVerwalter" element={<WhitelistVerwalter />} />
              <Route path="/SelectionProcess" element={<SelectionProcess />} />
              <Route path="/UniCardPage" element={<UniCardPage />} />



            </>
          ) : (
            <>
              <Route path="/" element={<UniCardPage/>} />
            </>
          )
        ) : (
          <>
            <Route path="/" element={<LoginForm />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;