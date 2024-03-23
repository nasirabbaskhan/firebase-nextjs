// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Dgb_an386LYZjIu2-RZi4g966HaC5xM",
  authDomain: "nextjs-firebase-6fe95.firebaseapp.com",
  projectId: "nextjs-firebase-6fe95",
  storageBucket: "nextjs-firebase-6fe95.appspot.com",
  messagingSenderId: "287264945454",
  appId: "1:287264945454:web:671ebb06e8751f2ca2f6bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
