// src/firebase-config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// PASTE YOUR CONFIG OBJECT HERE
const firebaseConfig = {
  apiKey: "AIzaSyDPDUjBDivHIX-Um8PvjVVq6f6vaGtRF-k",
  authDomain: "reddit-proto-app.firebaseapp.com",
  projectId: "reddit-proto-app",
  storageBucket: "reddit-proto-app.firebasestorage.app",
  messagingSenderId: "703544145807",
  appId: "1:703544145807:web:a9157987d5d29c6c3dfdfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// THIS LINE MUST HAVE 'export'
export const db = getFirestore(app);