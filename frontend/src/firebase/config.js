// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBD7lxKUiiCEbhlYjuqW_5hzMvrqCqP9t0",
    authDomain: "groblje-horora-89186.firebaseapp.com",
    projectId: "groblje-horora-89186",
    storageBucket: "groblje-horora-89186.appspot.com",
    messagingSenderId: "585709855913",
    appId: "1:585709855913:web:e8af5943f73c14ae0a75b8",
    measurementId: "G-68JRJVBKVY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export { auth, storage, db }
