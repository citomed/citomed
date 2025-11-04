// src/Store/cart.js
import {
    createSlice
} from "@reduxjs/toolkit";

// Ayrı başlangıç durumları tanımlamak daha iyi olabilir
const initialCartState = {
    items_checkup: []
};

const initialTestState = {
    items_tests: []
};

const cartSlice = createSlice({
    name: "cart", // Bu, root state'de bu slice'ın verileri için anahtar olacaktır
    initialState: initialCartState,
    reducers: {
        addToCardCheckup(state, action) {
            const {
                productId,
                quantity,
                price,
                slug,
                checkup_id,
                checkup_name,
                valyuta
            } = action.payload;
            const indexProductId = state.items_checkup.findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items_checkup[indexProductId].quantity += quantity;
            } else {
                state.items_checkup.push({
                    productId,
                    quantity,
                    price,
                    slug,
                    checkup_id,
                    checkup_name,
                    valyuta
                });
            }
        },
        // İsim çakışmasını önlemek için redüktör adını değiştirebiliriz
        removeCheckupFromCart(state, action) {
            const {
                productId
            } = action.payload;
            state.items_checkup = state.items_checkup.filter(item => item.productId !== productId);
        }
    }
});

const testSlice = createSlice({
    name: "test", // Bu, root state'de bu slice'ın verileri için anahtar olacaktır
    initialState: initialTestState,
    reducers: {
        addToCardTest(state, action) {
            const {
                productId,
                quantity,
                price,
                slug,
                lab_id,
                lab_name,
                lab_cat_name,
                valyuta
            } = action.payload;
            const indexProductId = state.items_tests.findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items_tests[indexProductId].quantity += quantity;
            } else {
                state.items_tests.push({
                    productId,
                    quantity,
                    price,
                    slug,
                    lab_id,
                    lab_name,
                    valyuta,
                    lab_cat_name
                });
            }
        },
        // İsim çakışmasını önlemek ve doğru state'i güncellemek için redüktör adını değiştirebiliriz
        removeTestFromCart(state, action) {
            const {
                productId
            } = action.payload;
            // DİKKAT: Burası state.items_tests olmalıydı, state.items_checkup değil!
            state.items_tests = state.items_tests.filter(item => item.productId !== productId);
        }
    }
});

// Eylemleri ayrı ayrı ve doğru slice'lardan dışa aktar
export const {
    addToCardCheckup,
    removeCheckupFromCart
} = cartSlice.actions;
export const {
    addToCardTest,
    removeTestFromCart
} = testSlice.actions;

// Redüktörleri isimlendirilmiş olarak dışa aktar
export const cartReducer = cartSlice.reducer;
export const testReducer = testSlice.reducer;