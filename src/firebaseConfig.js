import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsCQ_fFiI06lnrBGJPN9zL-VqiVEe0jwE",
  authDomain: "finly-webapp.firebaseapp.com",
  projectId: "finly-webapp",
  storageBucket: "finly-webapp.appspot.com",
  messagingSenderId: "1030901219015",
  appId: "1:1030901219015:web:89f505ac96ddd3ba21c8e2",
  measurementId: "G-SZXNXHR0ZF",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
