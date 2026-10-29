import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUkFFd2uhP2QhQ7z-aGYoJMh0eLT3e7co",
  authDomain: "vista-b3b2c.firebaseapp.com",
  projectId: "vista-b3b2c",
  storageBucket: "vista-b3b2c.firebasestorage.app",
  messagingSenderId: "527203744199",
  appId: "1:527203744199:web:c0d9d9a783fe100339c1e2"
};

// Check if valid Firebase credentials are provided
export const isLiveFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyDummyKeyForDevelopmentMode-Placeholder" &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let app;
let auth;
let db;

try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialized with local fallback adapter:", error.message);
}

export { app, auth, db };
