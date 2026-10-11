
export const readSession = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};
export const writeSession = (key, value) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};
