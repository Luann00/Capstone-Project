import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./InformationPrivacyPage.css"


const InformationPrivacyPage = () => {



    const acceptPolicy = () => {

        let storedUser = JSON.parse(localStorage.getItem('currentUser'));
        storedUser.acceptedPolicy = 'Yes';
        localStorage.setItem('currentUser', JSON.stringify(storedUser));



        // Update Accepted Variable in database
        const matrikelnummer = storedUser.matrikelnummer; // assuming you have matrikelnummer in your storedUser object

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
                // Handle errors
                console.error('Error updating Accepted Policy:', error);
            });
    }



    return (
        <div>
            <h1>Information privacy Policy</h1>
            <h3>In order to succeed, you have to accept the Information privacy policy</h3>
            <div id='exampleText'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla in nulla nec posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vulputate in velit id consequat. Vestibulum nunc nulla, maximus sit amet placerat eget, placerat eu lacus. Nunc in enim sed ligula interdum tempor. Integer varius ex purus, et placerat purus luctus sed. Proin condimentum malesuada ante. Phasellus tempor nec ante in tincidunt. Nulla aliquet orci ac enim finibus, id mattis dolor fermentum. Etiam in justo a felis aliquam facilisis. In iaculis sapien in ullamcorper aliquet. Phasellus nec lobortis magna. Ut eget nisi non felis finibus dictum.

                    Aliquam non odio non lectus suscipit rutrum. Integer a arcu iaculis, facilisis lacus ut, gravida orci. Ut mollis, ipsum sit amet tincidunt elementum, nunc sapien tincidunt quam, iaculis suscipit diam est vitae massa. Integer interdum libero et tortor molestie pellentesque. In volutpat efficitur gravida. Integer quis mauris porta, tristique justo non, placerat felis. Donec id eros vitae metus bibendum molestie a at odio. Vivamus malesuada augue ut condimentum luctus. Aliquam ex justo, maximus sit amet orci in, iaculis porttitor ex. Donec egestas aliquam massa in imperdiet. Quisque a finibus arcu. Phasellus volutpat justo velit, sed placerat magna interdum eu.

                    Cras vel porttitor massa, non dignissim velit. Integer fermentum pretium lectus, sit amet accumsan nulla volutpat at. Sed vitae elit quis augue fringilla faucibus eu at ante. Quisque ullamcorper justo eget purus convallis, ac lobortis enim convallis. Suspendisse vulputate condimentum erat vitae fermentum. Integer at gravida ante, quis faucibus tellus. Curabitur mi sapien, imperdiet eget neque id, semper interdum est. Donec non commodo elit, sed tincidunt sem. Etiam fermentum mollis eros, at egestas dui rhoncus eget. Aenean posuere odio nisi. Sed porta sapien in scelerisque tincidunt. Nullam eu ligula blandit, elementum eros a, condimentum erat. Nulla malesuada magna sagittis elementum imperdiet.

                    Integer maximus nisi eu finibus suscipit. Proin a est in lacus vehicula pharetra. Quisque ac porttitor eros. Mauris pretium mi odio. Maecenas sed augue tincidunt, pellentesque risus quis, feugiat enim. Fusce rhoncus ligula et turpis consectetur tristique. Aliquam tincidunt urna magna, sed cursus tortor aliquet nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer non semper tellus, quis scelerisque arcu. Suspendisse orci felis, finibus id ullamcorper et, fringilla eu arcu. Proin aliquam sit amet nunc ut lacinia. Nam metus magna, sagittis ac dapibus in, varius ut justo. Sed vestibulum lacinia placerat.

                    Sed congue velit purus, et pulvinar sem consequat nec. Sed et est imperdiet, ultrices orci a, malesuada ante. Donec ac mi ex. In gravida erat eget diam mattis convallis. Mauris id lacus id ante faucibus euismod. Quisque quis dolor eget urna vestibulum consequat. Morbi sed rutrum nulla, eu posuere mi. Aenean quis massa vitae nibh sollicitudin laoreet.
                </p>
                <Button variant="primary" id="acceptButton" onClick={acceptPolicy}>Accept Privacy Policy</Button>{' '}
            </div>
        </div>

    );

};

export default InformationPrivacyPage;

