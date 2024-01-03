import React, { useState, useEffect } from 'react';
import PrivacyPage from "../../components/InformationPrivacy/InformationPrivacyPage"


const HomeStudent = ({ onAccept }) => {
  const [name, setname] = useState("");

  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  const [acceptedPolicy, setAcceptedPolicy] = useState(storedUser.acceptedPolicy === 'Yes')


  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setname(currentUser.vorname + " " + currentUser.nachname)
    }

  }, []);

  const handleAccept = () => {
    setAcceptedPolicy(true);
    onAccept();
  }



  return (
    <div>
      {acceptedPolicy ? (
        <h1>Hello, {name}!</h1>
      ) : (
        <PrivacyPage onAccept={handleAccept} />
      )

      }
    </div>
  )
}

export default HomeStudent