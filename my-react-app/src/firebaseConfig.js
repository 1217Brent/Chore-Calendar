// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyrqXpBjXX5r_qmqTWXS_Za-nw78K1Uvc",
  authDomain: "chore-scheduler-fda6a.firebaseapp.com",
  projectId: "chore-scheduler-fda6a",
  storageBucket: "chore-scheduler-fda6a.appspot.com", // Corrected here
  messagingSenderId: "235537563742",
  appId: "1:235537563742:web:236d06bd32271db33eb4cf",
  measurementId: "G-L4N06G3J4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, only if you use Analytics
export const db = getFirestore(app);
