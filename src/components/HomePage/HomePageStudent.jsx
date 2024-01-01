import React, { useState, useEffect } from 'react';


const HomeStudent = () => {
    const [name, setname] = useState("");


    useEffect(() => {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
          setname(currentUser.vorname + " " + currentUser.nachname)
        }
      }, []);

   

    return (
        <div>
            <h1>Hello, {name}!</h1>
        </div>
    )
}

export default HomeStudent