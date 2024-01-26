const serialize = value => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error(`Serialization failed: ${error.message}`);
  }
};

const deserialize = serializedState => {
  try {
    return JSON.parse(serializedState);
  } catch (error) {
    throw new Error(`Deserialization failed: ${error.message}`);
  }
};

const save = (key, value) => {
  try {
    const serializedState = serialize(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(
      `Save to localStorage failed for key '${key}': ${error.message}`
    );
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : deserialize(serializedState);
  } catch (error) {
    console.error(
      `Load from localStorage failed for key '${key}': ${error.message}`
    );
  }
};

// Numele explicit pentru exportul implicit
const storage = {
  save,
  load,
};

export default storage;
