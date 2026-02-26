import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDs7YjpxbunDEx1sIsvB8ujEjlxGOPY_64",
    authDomain: "healthclear-ca79a.firebaseapp.com",
    projectId: "healthclear-ca79a",
    storageBucket: "healthclear-ca79a.firebasestorage.app",
    messagingSenderId: "450718846749",
    appId: "1:450718846749:web:2b8fe264a3872f99f61bf4",
    measurementId: "G-V303ZSW8WK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
