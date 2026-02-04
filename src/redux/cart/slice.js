import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCart, updateCartItem, removeCartItem, clearCart } from "./operations";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
            });
    },
});

export const cartReducer = cartSlice.reducer;
