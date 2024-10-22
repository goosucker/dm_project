import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addProduct(state, action) {
            const productIndex = state.findIndex(product => product.id === action.payload.id)
           if (productIndex >= 0) {
            state[productIndex] = action.payload;
           } else {
            state.push(action.payload)
           }
        },
        removeProduct(state, action) {
            return state.filter(product => product.id !== action.payload.id)
        },
        incrementCount: (state, action) => {
            const product = state.find(item => item.id === action.payload);
            if (product && product.count < 10) {
                product.count += 1;
            }
        },
        decrementCount: (state, action) => {
            const productIndex = state.findIndex(item => item.id === action.payload);
            if (productIndex >= 0) {
                const product = state[productIndex];
                if (product.count > 1) {
                    product.count -= 1;
                } else {
                    state.splice(productIndex, 1);
                }
            }
        },
        removeAllProducts(state) {
            state.length = 0;
        }
        
    }
});

export const { addProduct, removeProduct, incrementCount, decrementCount, removeAllProducts } = cartSlice.actions;
export default cartSlice.reducer;