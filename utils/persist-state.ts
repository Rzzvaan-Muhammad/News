export const persistState = (storageKey: string, value: unknown): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }
};

export const clearState = (storageKey: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(storageKey);
  }
};

export const getInitialState = <T>(storageKey: string): T | undefined => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem(storageKey);
    try {
      if (!savedState) {
        return undefined;
      }
      return JSON.parse(savedState) as T;
    } catch (error) {
      console.error(`Error loading state: ${storageKey}`, error);
      return undefined;
    }
  }
  return undefined;
};
