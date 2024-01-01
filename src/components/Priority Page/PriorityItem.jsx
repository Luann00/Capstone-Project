import React,{useEffect} from "react";
import { Button, Stack } from "react-bootstrap";
import { usePrioritySelection } from "../contexts/PrioritySelectionContext";
export function Items() {
  const { priorities, removePriority } = usePrioritySelection();

  useEffect(() => {
    console.log('priority', priorities);
  }, [priorities]);

  if (!priorities || priorities.length === 0) {
    return <div>No priorities available</div>;
  }

  return (
    <Stack direction="vertical" gap={3}>
      {priorities.map((priority, index) => (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center" key={index}>
          <div className="me-auto">
            <div>
            <h3> {priority.value.priority.priority}</h3>
              <p>Name: {priority.value.universityData.name}</p>
              
            </div>
          </div>
          <Button variant="outline-danger" size="sm" onClick={() => removePriority(priority.id)}>
            &times;
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}

