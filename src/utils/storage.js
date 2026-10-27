export function loadData(key, fallback) {
  try {
    const savedData = localStorage.getItem(key);

    return savedData ? JSON.parse(savedData) : fallback;
  } catch (error) {
    console.error(`Unable to load ${key}:`, error);
    return fallback;
  }
}

export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Unable to save ${key}:`, error);
  }
}