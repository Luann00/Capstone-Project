import React,{useEffect,useState} from 'react';
import {Button,Modal,Card,Row,Col,Container,Form,Input} from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
const TextOnStudentPage = () => {
    const [show, setShow] = useState(false);
    const [texts, setTexts] = useState([]);
    const [selectedText, setSelectedText] = useState(null);
    const[originalText,setOriginalText] = useState(null);
    const[newText,setNewText] = useState({

        id: "",
        titel:"",
        text: ""
    });
   

    const inputFields =[
        {name: "id", label: "ID", type: "text",placeholder:"Enter id"},
        {name: "titel", label: "Message title", type: "text",placeholder:"Enter message title"},
        {name: "text", label: "Message", type: "text",placeholder:"Enter message"}
    ];

    const handleClose = () => {
        setShow(false);
        setSelectedText(null);
        setNewText({
            id: "",
            titel:"",
            text: ""
        });
    }
    const handleShow = () => setShow(true);
    const handleEdit = (text) => {
        setSelectedText(text);
        setNewText({
            id: text.id,
            titel: text.titel,
            text: text.text
        });
        
        handleShow();
    
    };

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const response = await fetch('http://localhost:8081/textOnStudentPage');
                const data = await response.json();
                setTexts(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchTexts();
    }, []);
    const updateText = async () => {
        const updatedTexts = texts.map((text) => 
            text.id === selectedText.id ? selectedText : text);
            setTexts(updatedTexts);
            handleClose();

            try {
                await fetch(`http://localhost:8081/textOnStudentPage/${selectedText.id}` , {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(selectedText)
                });
            }
            catch (error) {
                console.log(error);
            }

    }

    const addText = async () => {
        const updatedTexts = [...texts, newText];
        setTexts(updatedTexts);
        handleClose();
        try {
            await fetch(`http://localhost:8081/textOnStudentPage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newText)
            });
        }
        catch (error) {
            console.log(error);
        }   
    }

    const deleteText = async (text) => {
        const updatedTexts = texts.filter((text) => text.id !== text.id);
        setTexts(updatedTexts);
        if(window.confirm("Do you want to delete this textbox?")) {
        try {
            await fetch(`http://localhost:8081/textOnStudentPage/${text.id}`, {
                method: "DELETE"
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    }
    const deleteAllTexts = async () => {  
        if(window.confirm("Do you want to delete all textbox?")) {
            setTexts([]);
        try {
            await fetch(`http://localhost:8081/textOnStudentPage/all`, {
                method: "DELETE"
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        if(selectedText) {
            setSelectedText((prevText) => ({
                ...prevText,
                [name]: value
            }));
        }else{
            setNewText((prevText) => ({
                ...prevText,
                [name]: value
            }));
        
        }
       
    }





    
    return (
        <div className="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row justify-content-center ">
            
            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green", textAlign:"center" }}><h2><b>Update messages to Students</b></h2></div>
            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Message
            </Button>
            <Button variant="danger" onClick={deleteAllTexts} style={{ marginTop: "10px", marginBottom: "10px" }}>
              Delete All Messages
            </Button>
            

            </div>

            </div>
            <div className="row">
                <div className="textbox_card">
                    {texts.map((text) => (
                        
                    <Card key={text.id}
                    className="text-center">
                        <Card.Header>Messages {text.id}</Card.Header>
                        <Card.Body>
                          <h3>{text.titel}</h3>
                            <p>{text.text}</p>
                            
                            
                                    <Button variant="primary" onClick={() => handleEdit(text)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteText(text)}>Delete</Button>
                                
                            
                            
                        </Card.Body>
                        </Card>
                    ))}

                </div>
            </div>
            <div className='model-box'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        {inputFields.map((inputField) => (
                            <Form.Group key={inputField.name} controlId={inputField.name}>
                                <Form.Label>{inputField.label}</Form.Label>
                                {inputField.type === 'textarea' ? (
                                    <Form.Control
                                        as="textarea"
                                        rows={4} // You can set an initial number of rows
                                        name={inputField.name}
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        value={selectedText ? selectedText[inputField.name] : newText[inputField.name]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Form.Control
                                        name={inputField.name}
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        value={selectedText ? selectedText[inputField.name] : newText[inputField.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </Form.Group>
                        ))}
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        {selectedText ? (
                            <Button variant="primary" onClick={updateText}>Update</Button>
                        ) : (
                            <Button variant="primary" onClick={addText}>Add</Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
            </div>
    );
}

            

    



export default TextOnStudentPage;