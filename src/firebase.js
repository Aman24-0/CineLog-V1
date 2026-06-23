import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ============================================
// Firebase Configuration & Validation
// ============================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate required environment variables
const isConfigValid = firebaseConfig.apiKey && 
                      firebaseConfig.apiKey !== 'your_firebase_api_key' &&
                      firebaseConfig.projectId && 
                      firebaseConfig.projectId !== 'your-project-id';

let app, auth, db, storage;

if (isConfigValid) {
  try {
    // Fix: Prevent "Firebase App named '[DEFAULT]' already exists" error during Vite hot-reload
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
  }
} else {
  console.error('❌ CRITICAL: Firebase environment variables are missing or invalid.');
  console.error('Please check your .env file and ensure VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID are set correctly.');
}

// Export safely. Components should check if these are defined before use.
export { app, auth, db, storage };
