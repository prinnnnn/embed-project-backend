const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get, onValue} = require('firebase/database'); // Import the Realtime Database module
require('dotenv').config();

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getAllDocuments = async () => {
  try {
    const key = "humid_level"

    const humidRef = ref(db, '/humid_level');
    onValue(humidRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Humidity: " + data)
    });

    // if (snapshot.exists()) {
    //   const value = snapshot.val();
    //   console.log("Humidity: ", value)
    //   return res.send(value)
    // } else {
    //   return res.status(404).json({ error: 'Value not found for the given key' });
    // }

  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

getAllDocuments("sensors").then(docs => {
  console.log(docs);
});