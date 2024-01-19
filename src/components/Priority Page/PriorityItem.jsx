import React from "react";
import { Button, Stack } from "react-bootstrap";
import { usePrioritySelection } from "../contexts/PrioritySelectionContext";
import "./PriorityItem.css";

// This function is used to display the priorities in the priority panel. The priorities are displayed in a list (add, delete using PrioritySelectionContext). The user can remove a priority from the list by clicking on the "x" button.//
const Items = ({dropPriority}) =>  {
  const { priorities, removePriority } = usePrioritySelection();
  
  // if there are no priorities, display a message
  if (!priorities || priorities.length === 0) {
    return <div>You have not chosen any preferences.</div>;
  }
  const handleRemove = (id) => {
    dropPriority(id);
  };

  return (
    // display the priorities in a list
    <Stack direction="vertical" gap={3}>
      // sort the priorities by priority number
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
