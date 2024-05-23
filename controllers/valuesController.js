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
const humidRef = ref(db, '/Data/humid_level');
const waterRef = ref(db, '/Data/water_level');
const tempRef = ref(db, '/Data/Temperature');
const pumpStateRef = ref(db, '/Data/State');

exports.getHumidity = async (req, res) => {
  
  console.log("Requesting Humidity")

  try {

    let humidity, data

    onValue(humidRef, (snapshot) => {
      data = snapshot.val();
    });
    
    humidity = data

    console.log("Humidity: ", humidity)
    return res.send({"data":humidity})
  } catch (err) {
    return res.status(404).json({ error: 'Value not found for the given key' });
  }

};


exports.getWaterLevel = async (req, res) => {

  console.log("Requesting Water Level")
  
  try {

    let water_level, data

    onValue(waterRef, (snapshot) => {
      data = snapshot.val();
    });
    
    water_level = data
    
    console.log("Water Level: " + water_level)
    return res.send({"data":water_level})

  } catch (err) {
    return res.status(404).json({ error: 'Value not found for the given key' });
  }

};

exports.getTemperature = async (req, res) => {

  console.log("Requesting Temperature Level")
  
  try {

    let temperature, data

    onValue(tempRef, (snapshot) => {
      data = snapshot.val();
    });
    
    temperature = data
    
    console.log("Temperature Level: " + temperature)
    return res.send({"data":temperature})

  } catch (err) {
    return res.status(404).json({ error: 'Value not found for the given key' });
  }

};

exports.getPumpState = async (req, res) => {

  console.log("Requesting Button State")
  
  try {

    let state, data, pumpStatus

    onValue(pumpStateRef, (snapshot) => {
      data = snapshot.val();
    });
    
    state = data

    if (state) {
      pumpStatus = "Active"
    } else {
      pumpStatus = "Inactive"
    }
    
    console.log("Pump Status: " + pumpStatus)
    return res.send({"data":pumpStatus})

  } catch (err) {
    return res.status(404).json({ error: 'Value not found for the given key' });
  }

};
