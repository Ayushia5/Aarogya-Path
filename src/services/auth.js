import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import useAuthStore from '../stores/useAuthStore';

export const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

export const logoutUser = () => {
    return signOut(auth);
};

// Listen for auth state changes
export const initAuthListener = () => {
    const setUser = useAuthStore.getState().setUser;
    const setLoading = useAuthStore.getState().setLoading;

    onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
    });
};
