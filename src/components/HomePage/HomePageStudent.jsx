import React, { useState, useEffect } from 'react';
import PrivacyPage from "../../components/InformationPrivacy/InformationPrivacyPage"
import { Carousel, Row, Col, Card } from 'react-bootstrap';
import './HomePageStudent.css';


const HomeStudent = ({ onAccept }) => {
  const [name, setname] = useState("");
  const [messages, setMessages] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const [acceptedPolicy, setAcceptedPolicy] = useState(storedUser.acceptedPolicy === 'Yes')


  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setname(currentUser.vorname + " " + currentUser.nachname)
    }

  }, []);

  //fetch the message which the admin specified in student homepage
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

  /*this method gets executed after student presses the accept button. the prompt gets redirected to the
  homepage component where a database post gets executed where the "acceptedPolicy" variable for the respective
  student gets setted to "true"*/
  const handleAccept = () => {
    setAcceptedPolicy(true);
    onAccept();
  }
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="homepage">
      {acceptedPolicy ? (
        <>
          <div className='welcome'>
            <h2>Welcome, {name}!</h2>
          </div>

          {/* make it possible to switch the messags in student homepage(e.g. when there are more
            messages, make it possible that the student can see these messages by switching the message with the
            arrows */}
          <Carousel data-bs-theme="dark" className="carousel" activeIndex={index} onSelect={handleSelect}>
            {messages.map((message) => (

              <Carousel.Item key={message.id}>
                <InstructionCard title={message.titel} content={message.text} />
              </Carousel.Item>

            ))}
          </Carousel>

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


