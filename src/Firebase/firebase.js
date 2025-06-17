import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7Z3UcaaHiHvGmmZZs6IF-yqKD7ne7Cjs",
  authDomain: "movieapp-2aedc.firebaseapp.com",
  projectId: "movieapp-2aedc",
  storageBucket: "movieapp-2aedc.firebasestorage.app",
  messagingSenderId: "614443940443",
  appId: "1:614443940443:web:b3e44fa0e50a84d9e79d7e",
  measurementId: "G-Z9TRWWPHKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
