import React, { useState, useEffect } from 'react';
import {Button,Modal,Card,Row,Col,Container,Form,Input} from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
const PrivacyEdit = () => {
    const [show, setShow] = useState(false);
    const [policys, setPolicys] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const[originalPolicy,setOriginalPolicy] = useState(null);
    const[newPolicy,setNewPolicy] = useState({

        year: "",

        policy: ""
    });
   

    const inputFields =[
        {name: "year", label: "Year", type: "text",placeholder:"Enter year"},
     
        {name: "policy", label: "Policy", type: "textarea",placeholder:"Enter policy"}
    ];

    const [textareaRows, setTextareaRows] = useState(4); 

    const handleTextareaChange = (e) => {
        // Update the rows dynamically based on the content height
        const rows = Math.max(Math.ceil(e.target.scrollHeight / 20), 6);
        setTextareaRows(rows);

        // Call the handleChange function to update the state
        handleChange(e);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedPolicy(null);
        setNewPolicy({
            id: "",
            policy: ""
        });
    }
    const handleShow = () => setShow(true);
    const handleEdit = (policy) => {
        setSelectedPolicy(policy);
        setNewPolicy({
            year: policy.year,
        
            policy: policy.policy
        });
        
        handleShow();
    
    };

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
    }, []);
    const updatePolicy = async () => {
        const updatedPolicys = policys.map((policy) => 
            policy.id === selectedPolicy.year ? selectedPolicy : policy);
            setPolicys(updatedPolicys);
            handleClose();

            try {
                await fetch(`http://localhost:8081/privacyPolicy/${selectedPolicy.year}` , {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(selectedPolicy)
                });
            }
            catch (error) {
                console.log(error);
            }

    }

    const addPolicy = async () => {
        const updatedPolicys = [...policys, newPolicy];
        setPolicys(updatedPolicys);
        handleClose();
        try {
            await fetch(`http://localhost:8081/privacyPolicy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPolicy)
            });
        }
        catch (error) {
            console.log(error);
        }   
    }

    const deletePolicy = async (policy) => {
        const updatedPolicys = policys.filter((policy) => policy.id !== policy.year);
        setPolicys(updatedPolicys);
        if(window.confirm("Do you want to delete this policy?")) {
        try {
            await fetch(`http://localhost:8081/privacyPolicy/${privacy.year}`, {
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
        if(selectedPolicy) {
            setSelectedPolicy((prevPolicy) => ({
                ...prevPolicy,
                [name]: value
            }));
        }else{
            setNewPolicy((prevPolicy) => ({
                ...prevPolicy,
                [name]: value
            }));
        
        }
       
    }

    const handleCombinedChange = (event) => {
        handleChange(event);
        handleTextareaChange(event);
    }





    
    return (
        <div className="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row justify-content-center ">
            
            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green", textAlign:"center" }}><h2><b>Update Privacy Policy</b></h2></div>
            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Policy
            </Button>
            
            

            </div>

            </div>
            <div className="row">
                <div className="textbox_card">
                    {policys.map((policy) => (
                        
                    <Card key={policy.year}
                    className="text-center">
                        <Card.Header>Messages {policy.year}</Card.Header>
                        <Card.Body>
                    
                            <p style={{ whiteSpace: 'pre-line' }}>{policy.policy}</p>
                            
                            
                                    <Button variant="primary" onClick={() => handleEdit(policy)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deletePolicy(policy)}>Delete</Button>
                                
                            
                            
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
                                        value={selectedPolicy ? selectedPolicy[inputField.name] : newPolicy[inputField.name]}
                                        onChange={handleCombinedChange}
                                    />
                                ) : (
                                    <Form.Control
                                        name={inputField.name}
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        value={selectedPolicy ? selectedPolicy[inputField.name] : newPolicy[inputField.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </Form.Group>
                        ))}
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        {selectedPolicy ? (
                            <Button variant="primary" onClick={updatePolicy}>Update</Button>
                        ) : (
                            <Button variant="primary" onClick={addPolicy}>Add</Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
            </div>
    );
}

            

    



export default PrivacyEdit;