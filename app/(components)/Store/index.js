// src/Store/index.js
import {
    configureStore
} from "@reduxjs/toolkit";
// cart.js'den isimlendirilmiş olarak import ettiğimizi varsayıyoruz
import {
    cartReducer,
    testReducer
} from './cart';
import {
    loadState,
    saveState
} from './localStorage';

const loadedStateFromLocalStorage = loadState(); // localStorage'dan yüklenen tüm state

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        test: testReducer // testReducer'ı buraya ekleyin
    },

    preloadedState: loadedStateFromLocalStorage
});

// Store'daki her değişiklikte localStorage'a kaydet
store.subscribe(() => {
    const currentState = store.getState();
    saveState({
        cart: currentState.cart,
        test: currentState.test
    });
});