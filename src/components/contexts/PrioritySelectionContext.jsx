import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";


export const PrioritySelectionContext = createContext({});
//This function is used to create the context for the priority panel. The context contains the functions to open and close the priority panel, as well as the functions to add, remove and get the priorities.//
export function usePrioritySelection() {
  return useContext(PrioritySelectionContext);
}

export function PrioritySelectionProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // the array to store priorities to localStorage
  const [priorities, setPriorities] = useLocalStorage("priorities", [] );
  const [dropPriorityFn, setDropPriorityFn] = useState(null);


  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);

  function getPriority(id) {
    return priorities.find((priority) => priority.id === id);
  }
// This function is used to add a priority to the priority panel. If the priority already exists, the priority is updated.//
  function addPriority(id, newValue) {
    setPriorities((prevPriorities) => {
      const priorityExists = prevPriorities.some((priority) => priority.id === id);
  
      if (priorityExists) {
        const updatedPriorities = prevPriorities.map((priority) => {
          if (priority.id === id) {
            return { ...priority, value: newValue }; 
          }
          return priority;
        });
  
        return updatedPriorities;
      } else {
        return [...prevPriorities, { id: id, value: newValue }]; 
      }
    });
  }
// This function is used to remove a priority from the priority panel.//
  function removePriority(id) {
    setPriorities((prevPriorities) => prevPriorities.filter((priority) => priority.id !== id));
  }

  function removeAllPriorities() {
    setPriorities([]);
  }
  

  return (
    <PrioritySelectionContext.Provider
      value={{
        openPanel,
        closePanel,
        isOpen,
        addPriority,
        getPriority,
        removePriority,
        removeAllPriorities,
        priorities,
        dropPriorityFn,
        setDropPriorityFn,
      }}
    >
      {children}
      
    </PrioritySelectionContext.Provider>
  );
}
