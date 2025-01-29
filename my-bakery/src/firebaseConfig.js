import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB2POA6d5UYKRC3pT0JF2A-lC3PmcGAkM8",
  authDomain: "shop-ad98d.firebaseapp.com",
  projectId: "shop-ad98d",
  storageBucket: "shop-ad98d.appspot.com",
  messagingSenderId: "104400702920384493334",
  appId: "1:172119085311:web:dbf1f64f95a30dce3bbcca",
  measurementId: "G-L51VV4QYSM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };