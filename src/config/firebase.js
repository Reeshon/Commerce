import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAD3V3YgDjN1ANBYfAfxegOwt6D8JqhDXY",
  authDomain: "shop-ad98d.firebaseapp.com",
  projectId: "shop-ad98d",
  storageBucket: "shop-ad98d.firebasestorage.app",
  messagingSenderId: "172119085311",
  appId: "1:172119085311:web:dbf1f64f95a30dce3bbcca",
  measurementId: "G-L51VV4QYSM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
