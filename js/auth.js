import { auth } from './firebase.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updatePassword 
} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js';

export async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateUserPassword(newPassword) {
    try {
        await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
        throw new Error(error.message);
    }
}