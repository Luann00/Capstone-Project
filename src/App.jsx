import "./App.css";
import LoginForm from "./components/loginform";
import React, { useState } from 'react';
import { WhitelistStudent } from "./components/whitelistStudent";
import { WhitelistVerwalter } from "./components/whitelistVerwalter";
import StudentTable from './components/StudentTable';
import UniCard from './components/UniCard';
import UniversityTable from './components/UniversityTable';
import UniCardPage from "./features/UniCardPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarAdmin from './components/NavbarAdmin';
import Home from "./components/Home";







function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
              <Route path="/StudentTable" element={<WhitelistVerwalter />} />
              <Route path="/WhitelistStudent" element={<WhitelistStudent />} />
            </>
          ) : (
            <>
              <Route path="/" element={<UniCard />} />
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