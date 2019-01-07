export const setLocalStorageItem = (key, value) => {
  if (!localStorage) return null;

  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = key => {
  if (!localStorage) return null;

  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
};

export const removeLocalStorageItem = key => {
  if (!localStorage) return null;

  return localStorage.removeItem(key);
};
