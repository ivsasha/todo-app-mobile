import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBio2WKiTishDPtSQR2jCj-CJKTdB05ahg",
  authDomain: "todo-list-kkn-iog.firebaseapp.com",
  projectId: "todo-list-kkn-iog",
  storageBucket: "todo-list-kkn-iog.appspot.com",
  messagingSenderId: "189432636226",
  appId: "1:189432636226:web:36dd28e45a2350cf9c9edb",
  measurementId: "G-MS8CKCETFM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
