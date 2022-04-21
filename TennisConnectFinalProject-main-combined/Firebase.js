import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi4OrHOP2IRSsf2mQeeKU4OgRrIf218N4",
  authDomain: "tennisconnect-98777.firebaseapp.com",
  projectId: "tennisconnect-98777",
  storageBucket: "tennisconnect-98777.appspot.com",
  messagingSenderId: "481848369952",
  appId: "1:481848369952:web:f5b0dc6b7183d547606d45"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);