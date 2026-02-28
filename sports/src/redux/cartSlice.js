import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.items.find(
                i => i.id === item.id
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push({
                    ...item,
                    quantity: item.quantity
                });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        resetCart: (state) => {
            state.items = [];
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

    },
});

export const { addToCart, removeFromCart, resetCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
