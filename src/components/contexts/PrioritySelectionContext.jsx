import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";


export const PrioritySelectionContext = createContext({});

export function usePrioritySelection() {
  return useContext(PrioritySelectionContext);
}

export function PrioritySelectionProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [priorities, setPriorities] = useLocalStorage("priorities", [] );
  const [dropPriorityFn, setDropPriorityFn] = useState(null);


  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);

  function getPriority(id) {
    return priorities.find((priority) => priority.id === id);
  }

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
