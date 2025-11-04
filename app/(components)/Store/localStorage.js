// src/Store/localStorage.js

const CART_STATE_KEY = 'cartState';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(CART_STATE_KEY);
        if (serializedState === null) {
            return undefined; // Hiçbir state bulunamadı
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from localStorage", err);
        return undefined; // Hata durumunda varsayılan state kullanılacak
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(CART_STATE_KEY, serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage", err);
    }
};