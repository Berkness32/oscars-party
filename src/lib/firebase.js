import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw_KtJJcmj-y0Ej_eHpxa4cgqyFX0R4hw",
  authDomain: "oscars-party-5043e.firebaseapp.com",
  projectId: "oscars-party-5043e",
  storageBucket: "oscars-party-5043e.firebasestorage.app",
  messagingSenderId: "45147434176",
  appId: "1:45147434176:web:84d997e9f43e4b6b3e5125",
  measurementId: "G-1WZH66G471"
};

// Initialize Firebase
// Might not want the 'export' - it wasn't in the 
// example but chatgpt said to use it
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
