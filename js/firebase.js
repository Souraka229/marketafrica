// Initialisation de Firebase avec la configuration fournie
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2guxEEaWzxQmnp-Gy7tPY2xwgWCuMlow",
    authDomain: "marketplace-ben-63ddf.firebaseapp.com",
    projectId: "marketplace-ben-63ddf",
    storageBucket: "marketplace-ben-63ddf.firebasestorage.app",
    messagingSenderId: "691020926408",
    appId: "1:691020926408:web:20a8e52a2c3da9d489c4fd"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter l'application Firebase pour une utilisation dans d'autres fichiers
export default app;