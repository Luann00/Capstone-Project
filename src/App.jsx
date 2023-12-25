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


  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    console.log(storedUserType);
    if (storedUserType) {
      setIsAdmin(storedUserType === 'admin');
      setIsStudent(storedUserType === 'student');
    }

   
    // No need to clear localStorage here


  }, []);




  const handleLogout = () => {
    // Zurücksetzen der Zustände und Löschen der Einträge im localStorage
    setIsAdmin(false);
    setIsStudent(false);
    localStorage.removeItem('userType');
    localStorage.removeItem('name'); // Falls du auch den Benutzernamen gespeichert hast

    window.location.href = '/';
  };



  return (
    <div>
      {isStudent && (
        <>
          {isAdmin ? <NavbarAdmin onLogout={handleLogout} /> : <NavBarStudent onLogout={handleLogout} />}
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
      )}

      {!isStudent && (
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
