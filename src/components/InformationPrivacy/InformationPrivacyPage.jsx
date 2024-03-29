import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./InformationPrivacyPage.css"


//this page gets shown to the student if the student hasnt accepted the privacy policy
const InformationPrivacyPage = ({ onAccept }) => {


    /*this method gets executed after the student has accepted the policy with the button. the values get stored
    locally at first and then get sended to the database
    */

    const acceptPolicy = () => {

        let storedUser = JSON.parse(localStorage.getItem('currentUser'));
        storedUser.acceptedPolicy = 'Yes';
        localStorage.setItem('currentUser', JSON.stringify(storedUser));

        onAccept();

        // Update Accepted Variable in database
        const matrikelnummer = storedUser.matrikelnummer;


        //save the option in the database so the admin sees it in the student table 
        fetch(`http://localhost:8081/student/${matrikelnummer}/updateAccepted`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Accepted Policy Updated:', data);

                //redirect the student to the main page after successful accept
                window.location.href = '/';

            })
            .catch(error => {
                console.error('Error updating Accepted Policy:', error);
            });
    }


    return (
        <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
            <h1 style={{ fontWeight: "700" }} >Information Privacy Policy</h1>
            <h3>In order to succeed, you have to accept the Information privacy policy</h3>

            <div style={{ boxShadow: "0 0.188em 1.550em rgb(156, 156, 156)" }}
                id='exampleText'>
                <p style={{ fontSize: "1.25rem", whiteSpace: "pre-line" }}>
                    The Privacy act statement of the University of Cologne applies: <a href="https://portal.uni-koeln.de/en/privacy-protection-statement">https://portal.uni-koeln.de/en/privacy-protection-statement</a>.

                    Your data will not be disclosed to third parties. Personal data collected will be used only to process and evaluate your application and your participation in the exchange programme.

                    If you want to stop the use of your data, please contact <span style={{ fontStyle: "italic" }}>wiso-outgoings@uni-koeln.de </span>
                    If you do not consent to the above sharing and processing of your information, a participation in the exchange programme will not be possible.
                    You agree that your current grades are verified using Klips in order to confirm your current average grade for the ranking.
                    <br></br>


                    <span style={{ fontSize: '0.75rem', whiteSpace: "preserve" }}>If you don't consent to the grade verfication via Klips: As the grade average is required for he assignment of spots, you need to follow an alternative procedure. You need to make an appointment with the ZIB outgoing students team instead to personally show a printed and stamped transcript of records stating the current status of grades (showing a date that lies within the application period for this programme)</span>


                </p>

                <Button id="acceptButton" onClick={acceptPolicy}>Accept Privacy Policy</Button>{' '}
            </div>
        </div>

    );

};


export default InformationPrivacyPage;

