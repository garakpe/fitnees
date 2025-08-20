// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKFnz7veilhX4GvKm3lXEnHHp9ou5gGDE",
  authDomain: "fitness-garak.firebaseapp.com",
  projectId: "fitness-garak",
  storageBucket: "fitness-garak.firebasestorage.app",
  messagingSenderId: "547476274901",
  appId: "1:547476274901:web:f5d19f40be2e459ee72c5c",
  measurementId: "G-ET5RDRZNT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };