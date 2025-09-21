import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2guxEEaWzxQmnp-Gy7tPY2xwgWCuMlow",
    authDomain: "marketplace-ben-63ddf.firebaseapp.com",
    projectId: "marketplace-ben-63ddf",
    storageBucket: "marketplace-ben-63ddf.firebasestorage.app",
    messagingSenderId: "691020926408",
    appId: "1:691020926408:web:20a8e52a2c3da9d489c4fd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;