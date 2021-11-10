import 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCh6gnr2IWQnGzhbhOO2BGhAVzj1iXnciA",
  authDomain: "snatask-7a1f7.firebaseapp.com",
  projectId: "snatask-7a1f7",
  storageBucket: "snatask-7a1f7.appspot.com",
  messagingSenderId: "1058519846873",
  appId: "1:1058519846873:web:12ee37cd94f2362e5893c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);