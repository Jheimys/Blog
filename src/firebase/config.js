
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBKpLJjJS1XrN1KhlQADxTt38oKmtLa7Ng",
  authDomain: "blog-456c5.firebaseapp.com",
  projectId: "blog-456c5",
  storageBucket: "blog-456c5.appspot.com",
  messagingSenderId: "181837511838",
  appId: "1:181837511838:web:6e457c98460a7170b0cf8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}