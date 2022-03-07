import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCi4OrHOP2IRSsf2mQeeKU4OgRrIf218N4",
    authDomain: "tennisconnect-98777.firebaseapp.com",
    projectId: "tennisconnect-98777",
    storageBucket: "tennisconnect-98777.appspot.com",
    messagingSenderId: "481848369952",
    appId: "1:481848369952:web:f5b0dc6b7183d547606d45"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };