// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBkkA-gU1LJO37LHNT4gPIFXJaJTwzvh0A",
  authDomain: "movexa-1101.firebaseapp.com",
  projectId: "movexa-1101",
  storageBucket: "movexa-1101.firebasestorage.app",
  messagingSenderId: "705746500825",
  appId: "1:705746500825:web:5e9c1453910583ffd792c8",
  measurementId: "G-1KPGX066NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);