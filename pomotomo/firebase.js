// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOtQzmYO_WqlKC5KhXplC8T64A3HIn4IM",
  authDomain: "pomotomo-1ffab.firebaseapp.com",
  projectId: "pomotomo-1ffab",
  storageBucket: "pomotomo-1ffab.appspot.com",
  messagingSenderId: "495843553318",
  appId: "1:495843553318:web:dcf217abe42d8ea1d536e7",
  measurementId: "G-J80B03Z9RL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
