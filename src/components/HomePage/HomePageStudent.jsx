import React, { useState, useEffect } from 'react';
import PrivacyPage from "../../components/InformationPrivacy/InformationPrivacyPage"
import { Container, Row, Col, Card } from 'react-bootstrap';
import './HomePageStudent.css';


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
    <div className="homepage">
      {acceptedPolicy ? (
        <>
        <h2>Welcome, {name}!</h2>
      <h3>Get started with UniPick:</h3>
        <Container className="mt-5">
        <Row className="mb-3">
          <Col>
            <InstructionCard 
              title="1.Explore & Choose"
              content= "Head to the 'Universities' section.The universities's information would be displayed in the card. Click on the university card title to view more information about the university.You can also filter the universities by country, city, as well as search for a specific university name."
            />
          </Col>
        </Row >
        <Row className="mb-3">
          <Col>
            <InstructionCard 
            title="2.Pick your preferred universities"
            content="Tap on the 'Choose preferences' dropdown on your preferred university card. Select the university as your 1st Priority, 2nd Priority or 3rd Priority.Each priority can only be selected once."
              
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <InstructionCard 
              title="3.Review your preferences"
              content="Go to 'Your preferences'. Here you can reset your priorities one by one or all of them together."
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <InstructionCard 
              title="4.Time management"
              content="Make sure that you finalize your decision within the time frame."
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <InstructionCard 
              title="5.Stay Updated"
              content="We'll send you an email as soon as the decision is made."
            />
          </Col>
        </Row>
      </Container>
        </>

      ) : (
        <PrivacyPage onAccept={handleAccept} />
      )

      }
    </div>
  )
}

export default HomeStudent



const InstructionCard = ({ title, content }) => {
  return (
    <Card className="instruction-card">
      <Card.Body>
        <Card.Title className="instruction-title">{title}</Card.Title>
        <Card.Text className="instruction-content">{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};


