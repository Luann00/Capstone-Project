
/*
Diese Klasse ist noch nicht einsatzbereit. Diese Klasse ist für die Prioritäten 
des Studenten. Da die LDAP-Authentifizierung von den anderen Mitgliedern nicht implementiert wurde,
kann man diese Klasse auch nicht nutzen. Wir sind nicht ganz fertig geworden, weil
wir diese Aufgabe vernachlässigen mussten und die Aufgabe LDAP-Authentifizierung übernehmen mussten.

*/


import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";


const PrioritySelectionContext = createContext({});

export function usePrioritySelection() {
  return useContext(PrioritySelectionContext);
}

export function PrioritySelectionProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [priorities, setPriorities] = useLocalStorage("priorities", [] );


  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);

  function getPriority(id) {
    return priorities.find((priority) => priority.id === id);
  }

  function addPriority(id, newValue) {
    setPriorities((prevPriorities) => {
      const priorityExists = prevPriorities.some((priority) => priority.id === id);
  
      if (priorityExists) {
        // Update the existing priority
        const updatedPriorities = prevPriorities.map((priority) => {
          if (priority.id === id) {
            return { ...priority, value: newValue }; // Replace 'value' with the property you want to update
          }
          return priority;
        });
  
        // Return the updated priorities
        return updatedPriorities;
      } else {
        // Add a new priority
        return [...prevPriorities, { id: id, value: newValue }]; // Replace 'value' with the property you want to set
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
        addPriority,
        getPriority,
        removePriority,
        removeAllPriorities,
        priorities,
      }}
    >
      {children}
      
    </PrioritySelectionContext.Provider>
  );
}
