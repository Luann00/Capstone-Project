import React, { useState, useEffect } from 'react';







const HomeStudent = () => {
    const [name, setname] = useState(false);


    useEffect(() => {
        const storedUserName = localStorage.getItem('name');
        if (storedUserName) {
          setname(storedUserName)
        }
      }, []);

   

    return (
        <div>
            <h1>Hello, {name} !</h1>
        </div>
    )
}

export default HomeStudent