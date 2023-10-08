import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3aXAGY_DkRPB8RM00EPj6hRsoKrwMJy0",
  authDomain: "estrelato-d4bec.firebaseapp.com",
  projectId: "estrelato-d4bec",
  storageBucket: "estrelato-d4bec.appspot.com",
  messagingSenderId: "727360232191",
  appId: "1:727360232191:web:2c7b7929ceed70a3f14aca"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp);

export { db, storage }