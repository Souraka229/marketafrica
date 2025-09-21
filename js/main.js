// Script principal pour la page d'accueil
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import app from "./firebase.js";

const db = getFirestore(app);

// Charger les produits depuis Firestore
async function loadProducts(category = 'all') {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '<p>Chargement des produits...</p>';
    
    try {
        let q;
        if (category === 'all') {
            q = query(collection(db, "products"));
        } else {
            q = query(collection(db, "products"), where("category", "==", category));
        }
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            productsContainer.innerHTML = '<p>Aucun produit trouvé.</p>';
            return;
        }
        
        productsContainer.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </div>
                <div class="product