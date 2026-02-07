import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addItem, updateCartItem, removeCartItem, clearCart, updateGiftWrap } from "./operations";

const initialState = {
    items: [],
    isGiftWrap: false,
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
                state.isGiftWrap = action.payload.isGiftWrap;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update Gift Wrap
            .addCase(updateGiftWrap.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.isGiftWrap = action.payload.isGiftWrap;
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
