export const get = (key) => {
  const item = JSON.parse(localStorage.getItem(key));
  return item;
};

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
