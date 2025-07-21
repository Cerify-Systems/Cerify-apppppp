import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, collection} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmZuh0cpEXJLSVpLZxJN7-GmtBMGoIPt8",
  authDomain: "cerify-d6812.firebaseapp.com",
  projectId: "cerify-d6812",
  storageBucket: "cerify-d6812.appspot.com",
  messagingSenderId: "991992626348",
  appId: "1:991992626348:web:ec7486e632b1a646f7f309",
  measurementId: "G-R3PLSN6ZYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Auth service
const db = getFirestore(app); // Firestore database
// const storage = getStorage(app);

// Export Firebase services
export { app, auth, db };
