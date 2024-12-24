import {useState, useEffect} from "react";

// Hook for local storage.

const useLocalStorageState = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    //typically need a try and catch for errors!!!********
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return saved;
    }
  });

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];

}

export default useLocalStorageState;