import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5oYG-m27ZSwb9YyH5n6wXnjJPzYY_8_Q",
  authDomain: "shop-ad98d.firebaseapp.com",
  projectId: "shop-ad98d",
  storageBucket: "shop-ad98d.appspot.com",
  messagingSenderId: "1032298398709",
  appId: "1:1032298398709:web:1f8256ca4d13e6c800da1e",
  measurementId: "G-9K2MXCNNXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
