// Gestion de l'authentification Firebase
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import app from "./firebase.js";

const auth = getAuth(app);

// Éléments du DOM
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');
const profilLink = document.getElementById('profil-link');
const panierLink = document.getElementById('panier-link');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const closeButtons = document.querySelectorAll('.close');

// Fonctions pour gérer les modals
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Événements pour ouvrir/fermer les modals
if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
}

if (showRegister) {
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
}

if (showLogin) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
}

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(registerModal);
    });
});

// Fermer le modal en cliquant en dehors
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
    if (e.target === registerModal) {
        closeModal(registerModal);
    }
});

// Inscription
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            
            alert('Inscription réussie!');
            closeModal(registerModal);
            updateUI();
        } catch (error) {
            console.error("Erreur d'inscription:", error);
            alert('Erreur: ' + error.message);
        }
    });
}

// Connexion
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Connexion réussie!');
            closeModal(loginModal);
            updateUI();
        } catch (error) {
            console.error("Erreur de connexion:", error);
            alert('Erreur: ' + error.message);
        }
    });
}

// Déconnexion
if (logoutLink) {
    logoutLink.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            await signOut(auth);
            alert('Déconnexion réussie!');
            updateUI();
        } catch (error) {
            console.error("Erreur de déconnexion:", error);
            alert('Erreur: ' + error.message);
        }
    });
}

// Mettre à jour l'UI en fonction de l'état d'authentification
function updateUI() {
    const user = auth.currentUser;
    
    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
        if (profilLink) profilLink.style.display = 'block';
        if (panierLink) panierLink.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
        if (profilLink) profilLink.style.display = 'none';
        if (panierLink) panierLink.style.display = 'none';
    }
}

// Écouter les changements d'état d'authentification
auth.onAuthStateChanged((user) => {
    updateUI();
});

// Initialiser l'UI au chargement de la page
document.addEventListener('DOMContentLoaded', updateUI);