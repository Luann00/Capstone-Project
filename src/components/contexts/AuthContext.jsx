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
  }, []); // Empty dependency array ensures these effects run only once on mount

  const login = (id, password) => {
    try {
      let foundStudent = null;
      let foundAdmin = null;


      // Find the student with the provided matrikelnummer
      students.forEach(student => {
        if (foundStudent) return; // Abbruch, wenn bereits gefunden
        if (student.matrikelnummer.toString() === id.toString()) {
          foundStudent = student;
        }
      });

      // Find the admin with the provided uniKim
      admins.forEach(admin => {
        if (foundAdmin) return; // Abbruch, wenn bereits gefunden
        if (admin.uniKim.toString() === id.toString()) {
          foundAdmin = admin;
        }
      });

      // Check if a student with the provided matrikelnummer exists
      if (foundStudent) {
        // Check if the provided password matches the fetched student's password
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