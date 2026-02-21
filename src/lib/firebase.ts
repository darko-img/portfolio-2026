// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo8nY9erkgVhhUuuxWWzxh2IXLRpH7_5w",
  authDomain: "portfolio-counter-986ef.firebaseapp.com",
  projectId: "portfolio-counter-986ef",
  storageBucket: "portfolio-counter-986ef.firebasestorage.app",
  messagingSenderId: "368930605687",
  appId: "1:368930605687:web:179d0b75d9fb6464e0d472"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
