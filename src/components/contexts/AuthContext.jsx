/*Diese Klasse war ursprünglich für das Dummy Login gedacht. Diese Aufgabe musste jedoch abgebrochen werden,
als klar wurde, dass noch keine LDAP-Authentifizierung stattgefunden hat von 2 Mitgliedern
*/


import React, { createContext, useState, useContext, useEffect,useMemo } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const[isStudent, setIsStudent] = useState(false);
  const[isAdmin, setIsAdmin] = useState(false);
  


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8081/student');
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

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

  const login = (id, password) => {
    try {
      let foundStudent = null;
      let foundAdmin = null;


      students.forEach(student => {
        if (foundStudent) return; 
        if (student.matrikelnummer.toString() === id.toString()) {
          foundStudent = student;
        }
      });

      admins.forEach(admin => {
        if (foundAdmin) return; 
        if (admin.uniKim.toString() === id.toString()) {
          foundAdmin = admin;
        }
      });

      if (foundStudent) {
        if ("password" === password) {
          setCurrentUser(foundStudent);
          setIsStudent(true);
          setError('');
          console.log("correct password!");
         
          return;
        } else {
          console.log("incorrect password for student!")

        }

        return;
      }

      // Check if an admin with the provided uniKim exists
      if (foundAdmin) {
        // Check if the provided password matches the fetched admin's password
        if (foundAdmin.password === password) {
          setCurrentUser(foundAdmin);
          setIsAdmin(true);
          setError('');
          console.log("and correct password!")
          return;
        } else {
          console.log("incorrect password!")

        }
        setError('Incorrect password');
        return;
      }

      setError('User not found');
    } catch (error) {
      setError('Error logging in');
    }

  };

  const logout = () => {
    setCurrentUser(null);
  };




  const memoizedValue = useMemo(() => ({
    currentUser,
    error,
    login,
    logout,
    isStudent,
    isAdmin,
  }), [currentUser, error, login, logout, isStudent, isAdmin]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };