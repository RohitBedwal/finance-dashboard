const STORAGE_EVENT = "localStorageUpdated";

/**
 * Get item from localStorage
 */
export const getItem = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return null;
  }
};

/**
 * Set item in localStorage
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));

    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

/**
 * Remove item from localStorage
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);

    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch (error) {
    console.error("Error removing localStorage item:", error);
  }
};

/**
 * Clear entire localStorage
 */
export const clearStorage = () => {
  try {
    localStorage.clear();

    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

/**
 * Subscribe to localStorage updates
 */
export const subscribeStorage = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
};