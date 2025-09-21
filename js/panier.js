// Script pour la page panier
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import app from "./firebase.js";

const db = getFirestore(app);

// Charger les articles du panier
async function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
        cartTotalElement.textContent = '0';
        checkoutBtn.disabled = true;
        return;
    }
    
    cartItemsContainer.innerHTML = '<p>Chargement du panier...</p>';
    
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    for (const item of cart) {
        try {
            const docRef = doc(db, "products", item.id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const product = docSnap.data();
                const itemTotal = product.price * item.quantity;
                total += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-image">
                            <img src="${product.imageUrl}" alt="${product.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3>${product.name}</h3>
                            <p class="cart-item-price">${product.price} €</p>
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Supprimer</button>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            }
        } catch (error) {
            console.error("Erreur lors du chargement du produit:", error);
        }
    }
    
    cartTotalElement.textContent = total.toFixed(2);
    checkoutBtn.disabled = false;
    
    // Ajouter les événements aux boutons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Augmenter la quantité
function increaseQuantity(e) {
    const productId = e.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

// Diminuer la quantité
function decreaseQuantity(e) {
    const productId = e.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

// Supprimer un article
function removeItem(e) {
    const productId = e.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Procéder au paiement
if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Fonctionnalité de paiement à implémenter!');
    });
}

// Charger les articles du panier au chargement de la page
document.addEventListener('DOMContentLoaded', loadCartItems);