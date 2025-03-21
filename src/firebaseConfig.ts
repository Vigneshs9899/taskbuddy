// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEMtRyQUHw-XTBq-UO4zwKg3FbIzWmBt8",
  authDomain: "task-manager-app-5f03e.firebaseapp.com",
  projectId: "task-manager-app-5f03e",
  storageBucket: "task-manager-app-5f03e.firebasestorage.app",
  messagingSenderId: "631290993074",
  appId: "1:631290993074:web:d7d34ccb777cc7bf812cab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);