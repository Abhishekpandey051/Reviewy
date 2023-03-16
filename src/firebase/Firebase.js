// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhf5HD20cbUl596lnWZHHz-3swfTQgSFc",
  authDomain: "reviewy-8f52d.firebaseapp.com",
  projectId: "reviewy-8f52d",
  storageBucket: "reviewy-8f52d.appspot.com",
  messagingSenderId: "341529813715",
  appId: "1:341529813715:web:5bc264189b00eb1f0a6a26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db,"Reviewy");
export const reviewsRef = collection(db,"reviews")
export const usersRef = collection(db,"users")

export default app;