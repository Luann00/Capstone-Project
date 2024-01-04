import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Items } from './PriorityPanelItem';

import { usePrioritySelection }from '../contexts/PrioritySelectionContext';

function PrioritySelection() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {removeAllPriorities} = usePrioritySelection(); 

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Your priorities
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Current Priorities</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Items/>
        </Offcanvas.Body>
        <Button variant="primary" onClick={()=> removeAllPriorities()}>Delete all</Button>
      </Offcanvas>
    </>
  );
}

export default PrioritySelection;