import {getAuth} from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8pJVqRmYqCu0UO62-TfdCDOnmF2qNGLM",
  authDomain: "e-commerce-c6b9d.firebaseapp.com",
  projectId: "e-commerce-c6b9d",
  storageBucket: "e-commerce-c6b9d.appspot.com",
  messagingSenderId: "730195392717",
  appId: "1:730195392717:web:ab1d961d3821a2e01cd184"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()