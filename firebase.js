import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBbL5OqC9f_F0kwVCu48r_XJEkn_oZFnOM",
  authDomain: "next--docs.firebaseapp.com",
  projectId: "next--docs",
  storageBucket: "next--docs.appspot.com",
  messagingSenderId: "1065661303775",
  appId: "1:1065661303775:web:4b692037bf02b6d356126a",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
