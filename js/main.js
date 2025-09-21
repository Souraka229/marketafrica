import { db, auth } from './firebase.js';
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js';

let currentUser = null;

auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (!user) window.location.href = '../pages/login.html';
    loadProducts();
    loadBoutiques();
});

async function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '<p>Chargement...</p>';

    try {
        const q = query(collection(db, 'products'));
        const querySnapshot = await getDocs(q);
        
        productsContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = `
                <div class="product-card">
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">${product.price} €</p>
                        <p class="product-boutique">${product.boutiqueName}</p>
                        <button class="btn btn-primary" onclick="viewProduct('${doc.id}')">Voir le produit</button>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Erreur chargement produits:', error);
    }
}

function viewProduct(productId) {
    window.location.href = `../pages/produit.html?id=${productId}`;
}