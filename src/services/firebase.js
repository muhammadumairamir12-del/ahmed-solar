import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

// Config template - user can update this live in Admin Panel or via environment variables
export const defaultFirebaseConfig = {
  apiKey: "AIzaSyDemoKeyForLuminaSolarSystems2025",
  authDomain: "lumina-solar-app.firebaseapp.com",
  projectId: "lumina-solar-app",
  storageBucket: "lumina-solar-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};

let db = null;
let app = null;

export const initFirebase = (customConfig) => {
  try {
    const configToUse = customConfig || defaultFirebaseConfig;
    if (!app) {
      app = initializeApp(configToUse);
      db = getFirestore(app);
    }
    return { success: true, db };
  } catch (error) {
    console.warn("Firebase initialization warning/fallback:", error.message);
    return { success: false, error: error.message };
  }
};

export { db };
