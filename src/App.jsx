import "./App.css";
import LoginForm from "./components/LoginForm/loginform";
import React, { useState } from 'react';
import { WhitelistStudent } from "./components/WhiteLists/whitelistStudent";
import { WhitelistVerwalter } from "./components/WhiteLists/whitelistVerwalter";
import StudentTable from './components/StudentDataTable/StudentTable';
import UniCard from './components/UniCard/UniCard';
import UniversityTable from './components/UniversityDataTable/UniversityTable';
import SelectionProcess from './components/ProcessTable/SelectionProcess';
import UniCardPage from "./components/SelectUniversityPage/UniCardPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarAdmin from './components/NavigationBar/NavbarAdmin';
import NavBarStudent from './components/NavigationBar/NavBarStudent';
import HomePageAdmin from "./components/HomePage/HomePageAdmin";
import HomePageStudent from "./components/HomePage/HomePageStudent";
import { BsTruckFlatbed } from "react-icons/bs";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (userType) => {
    setLoggedIn(true);
    setIsAdmin(userType === 'admin');
  };

  return (
    <div>
      {isLoggedIn && (
        <>
          {isAdmin ? <NavbarAdmin /> : <NavBarStudent />}
          <Routes>
            {isAdmin ? (
              <>
                <Route path="/" element={<HomePageAdmin />} />
                <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
                <Route path="/UniversityTable" element={<UniversityTable />} />
                <Route path="/StudentTable" element={<StudentTable />} />
                <Route path="/WhitelistStudent" element={<WhitelistStudent />} />
                <Route path="/WhitelistVerwalter" element={<WhitelistVerwalter />} />
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
      )}

      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      )}
    </div>
  );
}

export default App;





//Hier haben Ha und ich versucht ein dummy login mithilfe von routern zu implementieren. Wir sind jedoch nicht so weit gekommen, da wir
//die anderen Aufgaben von Liska und Ha übernehmen mussten(LDAP-Authentifizierung) und dieses die höchste Priorität
//hatte.


// const AdminRoutes = () => {
  
//   return (
//     <>
//       <Route path="/" element={<Home />} />
//       <Route path="/Home" element={<Home />} />
//       <Route path="/UniversityTable" element={<UniversityTable />} />
//       <Route path="/StudentTable" element={<StudentTable />} />
//       <Route path="/WhitelistStudent" element={<WhitelistStudent />} />
//       <Route path="/WhitelistVerwalter" element={<WhitelistVerwalter />} />
//       <Route path="/SelectionProcess" element={<SelectionProcess />} />
//       <Route path="/UniCardPage" element={<UniCardPage />} />
//     </>
//   );
// };

// const StudentRoutes = () => {
//   return (
//     <Route path="/UniCardPage" element={<UniCardPage />} />
//   );
// };

// const App = () => {
//   const { currentUser, isStudent, isAdmin } = useAuth();
 
//   return (
//     <div>
//       <AuthProvider>
//         <PrioritySelectionProvider>
//         <Routes>
//             <Route
//               path="/"
//               element={
//                 currentUser ? (
//                   isAdmin ? <AdminRoutes /> : isStudent ? <StudentRoutes /> : <LoginForm />
//                 ) : (
//                   <LoginForm />
//                 )
//               }
//             />
//           </Routes>
//         </PrioritySelectionProvider>
//       </AuthProvider>
//     </div>
//   );
// };

// export default App;
