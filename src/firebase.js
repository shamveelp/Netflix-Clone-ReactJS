// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { 
    setDoc, 
    doc, 
    getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
        });
        console.log('User added to Firestore:', { uid: user.uid, name, email });
        toast.success('Signed up successfully!');
    } catch (error) {
        console.error('SignUp Error:', error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', res.user);
        toast.success('Logged in successfully!');
    } catch (error) {
        console.error('Login Error:', error);
        toast.error(error.code.split('/')[1].split('-').join(' '));     
    }
};

const logout = () => {
    signOut(auth);
};

const addToFavorites = async (userId, movie) => {
    try {
        await setDoc(doc(db, 'users', userId, 'favorites', movie.id), {
            id: movie.id,
            title: movie.title,
            poster: movie.poster,
        });
        console.log('Added to favorites:', movie);
        toast.success('Added to favorites!');
    } catch (error) {
        console.error('Error adding to favorites:', error);
        toast.error('Failed to add to favorites');
    }
};

export { auth, db, signUp, login, logout, addToFavorites };