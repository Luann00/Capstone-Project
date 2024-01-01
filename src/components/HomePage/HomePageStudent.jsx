import React, { useState, useEffect } from 'react';
import PrivacyPage from "../../components/InformationPrivacy/InformationPrivacyPage"


const HomeStudent = () => {
  const [name, setname] = useState("");

  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  const [acceptedPolicy, setAcceptedPolicy] = useState(storedUser.acceptedPolicy)


  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setname(currentUser.vorname + " " + currentUser.nachname)
    }

    console.log("accepted:" + acceptedPolicy)
  }, []);



  return (
    <div>
      {acceptedPolicy ? (
        <PrivacyPage />
      ) : (
        <h1>Hello, {name}!</h1>

      )

      }
    </div>
  )
}

export default HomeStudent