import { db } from './firebase.js';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    getDocs 
} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js';

export async function addProduct(productData) {
    try {
        const docRef = await addDoc(collection(db, 'products'), productData);
        return docRef.id;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getProductsByBoutique(boutiqueId) {
    try {
        const q = query(collection(db, 'products'), where('boutiqueId', '==', boutiqueId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error(error.message);
    }
}