import { useEffect, useState } from "react";
//  Hook to store and retrieve data from localStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  //  retrieve item from localStorage and set the initial state
  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  //  update localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
