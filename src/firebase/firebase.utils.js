import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
//prettier-ignore
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCbeGhVU8q60WYEUUcwzxPg7QgnKKuWwww",
  authDomain: "crwn-db-ba6c8.firebaseapp.com",
  projectId: "crwn-db-ba6c8",
  storageBucket: "crwn-db-ba6c8.appspot.com",
  messagingSenderId: "634297711154",
  appId: "1:634297711154:web:2c588339fb9810763e5a2b",
};

const app = initializeApp(config);
const db = getFirestore(app);

export const userAuth = getAuth(app);
export const firestore = getFirestore(app);
export const createAccount = createUserWithEmailAndPassword;
export const signInAccount = signInWithEmailAndPassword;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(userAuth, provider).catch((error) => console.log(error));

// 102Storing user data in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return {
    userRef,
    onSnapshot,
  };
};
