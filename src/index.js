import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UniversityTable from './components/UniversityTable';
import StudentTable from './components/StudentTable';
import NavbarAdmin from './components/NavbarAdmin';
import LoginForm from "./components/loginform";
import { WhitelistStudent } from "./components/whitelistStudent";
import { WhitelistVerwalter } from "./components/whitelistVerwalter";
import Home from "./components/Home";



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavbarAdmin />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UniversityTable" element={<UniversityTable />} />
        <Route path="/StudentTable" element={<StudentTable />} />
        <Route path="/WhitelistStudent" element={<WhitelistStudent />} />
        <Route path="/WhitelistVerwalter" element={<WhitelistVerwalter />} />


      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
