// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import storage module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPMVJpqO_-N9Cpp78_nyskpsqjGjlnJ8Y",
  authDomain: "senior-design-f7fd3.firebaseapp.com",
  projectId: "senior-design-f7fd3",
  storageBucket: "senior-design-f7fd3.appspot.com",
  messagingSenderId: "281315042096",
  appId: "1:281315042096:web:bb9b5bc4f36139c7099ef5",
  measurementId: "G-W9WX3EP6JL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Initialize storage module

