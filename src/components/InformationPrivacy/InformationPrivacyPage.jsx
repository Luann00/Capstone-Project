import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./InformationPrivacyPage.css"


const InformationPrivacyPage = ({ onAccept }) => {
const [policys, setPolicys] = useState([]);


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

    useEffect(() => {
        const fetchPolicys = async () => {
            try {
                const response = await fetch('http://localhost:8081/privacyPolicy');
                const data = await response.json();
                setPolicys(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchPolicys();
    },[]);



    return (
        <div>
            <h1>Information privacy Policy</h1>
            <h3>In order to succeed, you have to accept the Information privacy policy</h3>
            {policys.map((policy) => (
            <div key={policy.year} id='exampleText'>
                <p>
                    {policy.policy} 
                </p>
                <Button variant="primary" id="acceptButton" onClick={acceptPolicy}>Accept Privacy Policy</Button>{' '}
            </div>))}
        </div>

    );

};

export default InformationPrivacyPage;

