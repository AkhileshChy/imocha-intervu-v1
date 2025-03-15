const DB_NAME = 'InterviewDB';
const STORE_NAME = 'recordings';
const DB_VERSION = 1;

// Initialize the IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Store video blob for a specific question
export const storeVideo = async (questionIndex, videoBlob) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(videoBlob, questionIndex);

    // Handle transaction completion
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error storing video:', error);
  }
};

// Get video blob for a specific question index
export const getVideo = async (questionIndex) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(questionIndex);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result); // returns video blob
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return null; // Return null if there's an error
  }
};

// Open a database connection
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};
