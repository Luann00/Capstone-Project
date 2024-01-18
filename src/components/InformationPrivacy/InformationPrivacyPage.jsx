import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./InformationPrivacyPage.css"


const InformationPrivacyPage = ({ onAccept }) => {



    const acceptPolicy = () => {

        let storedUser = JSON.parse(localStorage.getItem('currentUser'));
        storedUser.acceptedPolicy = 'Yes';
        localStorage.setItem('currentUser', JSON.stringify(storedUser));

        onAccept();

        // Update Accepted Variable in database
        const matrikelnummer = storedUser.matrikelnummer;

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
        <div>
            <h1>Information privacy Policy</h1>
            <h3>In order to succeed, you have to accept the Information privacy policy</h3>
            <div id='exampleText'>
                <p>
                    The Privacy act statement of the University of Cologne applies:
                    <a href="https://portal.uni-koeln.de/en/privacy-protection-statement" target="_blank">
                        https://portal.uni-koeln.de/en/privacy-protection-statement
                    </a>
                    <br></br>
                    Your data will not be disclosed to third parties. Personal data collected will be used only to process and evaluate your application and your participation in the exchange programme.
                    If you want to stop the use of your data, please contact wiso-outgoings@uni-koeln.de
                    If you do not consent to the above sharing and processing of your information, a participation in the exchange programme will not be possible.
                    You agree that your current grades are verified using Klips in order to confirm your current average grade for the ranking.
                    <br></br>
                    If you don’t consent to the grade verification via Klips: As the grade average is required for the assignment of spots, you need to follow an alternative procedure. You need to make an appointment with the ZIB outgoing students team instead to personally show a printed and stamped transcript of records stating the current status of grades (showing a date that lies within the application period for this programme)
                </p>
                <Button variant="primary" id="acceptButton" onClick={acceptPolicy}>Accept Privacy Policy</Button>{' '}
            </div>
        </div>

    );

};


export default InformationPrivacyPage;

