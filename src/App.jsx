import "./App.css";
import LoginForm from "./components/loginform";
import React, { useState } from 'react';
import { WhitelistStudent } from "./components/whitelistStudent";
import { WhitelistVerwalter } from "./components/whitelistVerwalter";
import StudentTable from './components/StudentTable';
import UniCard from './components/UniCard';
import UniversityTable from './components/UniversityTable';
import UniCardPage from "./features/UniCardPage";





function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic here
    // For example, you might call an authentication API
    // Once the login is successful, setLoggedIn(true)
    setLoggedIn(true);
  };



  return (

    //<UniversityTable />
    //<LoginForm/>
    <UniCardPage/> 

    //  <UniCard/>  

    //  <WhitelistStudent />//
    //<WhitelistVerwalter />  






  );
}

export default App