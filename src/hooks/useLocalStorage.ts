"use client";

import React, { useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';

// Default TTL: 15 minutes
const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

// Custom React hook to manage state with localStorage and TTL
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  ttlMs: number = FIFTEEN_MINUTES_IN_MS
): [T, Dispatch<SetStateAction<T>>] {
  // Internal React state
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);

  // Effect to load from localStorage on component mount (client-side only)
  useEffect(() => {
    // Prevent execution on server
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);
        // Check if item has expiry and if it's still valid
        if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
          window.localStorage.removeItem(key); // Remove expired item
          setStoredValue(initialValue); // Fallback to initial value
        } else {
          setStoredValue(parsedItem.value); // Set state with stored value
        }
      } else {
        // If no item found, it might be the first load or cleared storage
        setStoredValue(initialValue);
        // Optionally, set the initial value in localStorage if not present
        // const expiry = Date.now() + ttlMs;
        // window.localStorage.setItem(key, JSON.stringify({ value: initialValue, expiry }));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue); // Fallback to initial value on error
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // initialValue removed from deps to prevent re-runs if it's a non-memoized object/array. ttlMs is also typically constant.

  // Wrapped setter function to update React state and localStorage
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        // Allow value to be a function (like useState's setter)
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore); // Update React state

        // Persist to localStorage
        if (typeof window !== 'undefined') {
          const expiry = Date.now() + ttlMs;
          window.localStorage.setItem(key, JSON.stringify({ value: valueToStore, expiry }));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, ttlMs, storedValue]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
