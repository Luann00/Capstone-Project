import React from "react";
import { Button, Stack } from "react-bootstrap";
import { usePrioritySelection } from "../contexts/PrioritySelectionContext";
import "./PriorityItem.css";


const Items = ({dropPriority}) =>  {
  const { priorities, removePriority } = usePrioritySelection();
  
  
  if (!priorities || priorities.length === 0) {
    return <div>You have not chosen any preferences.</div>;
  }
  const handleRemove = (id) => {
    dropPriority(id);
  };

  return (
    <Stack direction="vertical" gap={3}>
      {priorities.sort((a, b) => {
        const numA = parseInt(a.value.priority.priority.match(/\d+/)[0]);
        const numB = parseInt(b.value.priority.priority.match(/\d+/)[0]);
        return numA - numB;
      }).map((priority, index) => (
        <Stack direction="horizontal" gap={3} className="Item" key={index}>
          <div className="Item-content">
            
              <h3> {priority.value.priority.priority}</h3>
              <p>{priority.value.universityData.name}</p>
            
          </div>
          <Button variant="outline-danger" size="sm" onClick={() => { removePriority(priority.id); handleRemove(priority.id) }}>
            &times;
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}
export default Items;
