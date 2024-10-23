// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        isCartOpen: false
    },
    reducers: {
        addProduct(state, action) {
            const productIndex = state.items.findIndex(product => product.id === action.payload.id);
            if (productIndex >= 0) {
                state.items[productIndex] = action.payload;
            } else {
                state.items.push(action.payload);
            }
        },
        removeProduct(state, action) {
            state.items = state.items.filter(product => product.id !== action.payload.id);
        },
        incrementCount(state, action) {
            const product = state.items.find(item => item.id === action.payload);
            if (product && product.count < 10) {
                product.count += 1;
            }
        },
        decrementCount(state, action) {
            const productIndex = state.items.findIndex(item => item.id === action.payload);
            if (productIndex >= 0) {
                const product = state.items[productIndex];
                if (product.count > 1) {
                    product.count -= 1;
                } else {
                    state.items.splice(productIndex, 1);
                }
            }
        },
        removeAllProducts(state) {
            state.items.length = 0;
        },
        toggleCart(state) {
            state.isCartOpen = !state.isCartOpen;
        }
    }
});

export const { addProduct, removeProduct, incrementCount, decrementCount, removeAllProducts, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
