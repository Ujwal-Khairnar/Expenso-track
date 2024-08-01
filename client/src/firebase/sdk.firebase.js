// firebase.js or firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "expense-tracker-47d90.firebaseapp.com",
  projectId: "expense-tracker-47d90",
  storageBucket: "expense-tracker-47d90.appspot.com",
  messagingSenderId: "344151788819",
  appId: "1:344151788819:web:d5b55b3ee19cadadb69ee6",
  measurementId: "G-MEASUREMENT_ID" // Add this if you have it
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
