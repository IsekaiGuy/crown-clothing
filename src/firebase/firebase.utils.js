import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCbeGhVU8q60WYEUUcwzxPg7QgnKKuWwww",
  authDomain: "crwn-db-ba6c8.firebaseapp.com",
  projectId: "crwn-db-ba6c8",
  storageBucket: "crwn-db-ba6c8.appspot.com",
  messagingSenderId: "634297711154",
  appId: "1:634297711154:web:2c588339fb9810763e5a2b",
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider).catch((error) => console.log(error));
