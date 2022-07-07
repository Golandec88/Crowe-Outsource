import { useState } from "react";

const useLocalStorage = (key: string, initialValue?: string) => {
  const [storedValue, setStoredValue] = useState(
    (): string | undefined | null => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? item.toString() : initialValue;
      } catch (error) {
        return initialValue;
      }
    }
  );

  const setValue = <T>(value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, valueToStore.toString());
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(null);
      window.localStorage.removeItem(key);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    item: storedValue,
    setItem: setValue,
    removeItem: removeValue,
  };
};

export default useLocalStorage;
