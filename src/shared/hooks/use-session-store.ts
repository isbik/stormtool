import { useState } from "react";
import pkg from "../../../package.json";
import { isClient } from "../lib/is-client";

const prefix = `transform:${pkg.version}:`;

export function useSessionStorage<T extends string>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevState: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = isClient
        ? window.sessionStorage.getItem(prefix + key) || initialValue
        : initialValue;
      // Parse stored json or if none return initialValue
      return key.startsWith("data:") ? item : JSON.parse(item);
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function tha t ...
  // ... persists the new value to sessionStorage.
  const setValue = (value: T | ((prevState: T) => T)): void => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined")
        window.sessionStorage.setItem(
          prefix + key,
          key.startsWith("data:") ? valueToStore : JSON.stringify(valueToStore)
        );
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
