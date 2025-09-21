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
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} €</p>
                    <button class="add-to-cart-btn" data-id="${doc.id}">Ajouter au panier</button>
                    <a href="../pages/produit.html?id=${doc.id}" class="view-details">Voir détails</a>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
        
        // Ajouter les événements aux boutons "Ajouter au panier"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        productsContainer.innerHTML = '<p>Erreur lors du chargement des produits.</p>';
    }
}

// Fonction pour ajouter au panier
function addToCart(e) {
    const productId = e.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier!');
}

// Filtrer les produits par catégorie
if (document.getElementById('category-filter')) {
    document.getElementById('category-filter').addEventListener('change', (e) => {
        loadProducts(e.target.value);
    });
}

// Recherche de produits
if (document.getElementById('search-btn')) {
    document.getElementById('search-btn').addEventListener('click', searchProducts);
}

if (document.getElementById('search-input')) {
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

async function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '<p>Recherche en cours...</p>';
    
    try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            productsContainer.innerHTML = '<p>Aucun produit trouvé.</p>';
            return;
        }
        
        productsContainer.innerHTML = '';
        let foundProducts = false;
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            if (product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)) {
                
                foundProducts = true;
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price} €</p>
                        <button class="add-to-cart-btn" data-id="${doc.id}">Ajouter au panier</button>
                        <a href="../pages/produit.html?id=${doc.id}" class="view-details">Voir détails</a>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            }
        });
        
        if (!foundProducts) {
            productsContainer.innerHTML = '<p>Aucun produit ne correspond à votre recherche.</p>';
        }
        
        // Ajouter les événements aux boutons "Ajouter au panier"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    } catch (error) {
        console.error("Erreur lors de la recherche:", error);
        productsContainer.innerHTML = '<p>Erreur lors de la recherche.</p>';
    }
}

// Charger les produits au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});