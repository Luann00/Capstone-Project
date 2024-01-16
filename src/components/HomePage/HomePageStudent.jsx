import React, { useState, useEffect } from 'react';
import PrivacyPage from "../../components/InformationPrivacy/InformationPrivacyPage"
import { Container, Row, Col, Card } from 'react-bootstrap';
import './HomePageStudent.css';


const HomeStudent = ({ onAccept }) => {
  const [name, setname] = useState("");
  const[messages,setMessages] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  const [acceptedPolicy, setAcceptedPolicy] = useState(storedUser.acceptedPolicy === 'Yes')


  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setname(currentUser.vorname + " " + currentUser.nachname)
    }

  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8081/textOnStudentPage");
        const data = await response.json();
        setMessages(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
  
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
        <Container>
          {messages.map((message) => (
            <Row className="message-row">
              <Col>
                <InstructionCard title={message.titel} content={message.text} />
              </Col>
            </Row>
          ))}
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


