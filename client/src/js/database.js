import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateRB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateRB')) {
        console.log('jateRB database already exists');
        return;
      }
      db.createObjectStore('jateRB', { keyPath: 'id', autoIncrement: true });
      console.log('jateRB database created');
    },
  });

// putDB accepts some content and adds it to the database
export const putDb = async (content) => {

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jateRB', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jateRB', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jateRB');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// getDB gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jateRB', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jateRB', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jateRB');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
