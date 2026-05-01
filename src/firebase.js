import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAvV2m7IAbDGSr0ZdFNv9Rnq9oUEAgufyI",
  authDomain: "watchlist-bcdfd.firebaseapp.com",
  projectId: "watchlist-bcdfd",
  storageBucket: "watchlist-bcdfd.firebasestorage.app",
  messagingSenderId: "479628005507",
  appId: "1:479628005507:web:12e0aa5b98977c82860bb6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
