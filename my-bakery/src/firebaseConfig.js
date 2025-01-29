import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB2POA6d5UYKRC3pT0JF2A-lC3PmcGAkM8", // This is public anyway
  authDomain: "shop-ad98d.firebaseapp.com",
  projectId: "shop-ad98d",
  storageBucket: "shop-ad98d.appspot.com",
  messagingSenderId: "104400702920384493334",
  appId: process.env.REACT_APP_FIREBASE_APP_ID, // Move sensitive values to .env
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { auth, analytics };