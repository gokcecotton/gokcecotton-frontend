import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    "cart/fetch",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/cart");
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/add",
    async ({ productId, quantity, selectedAttributes }, thunkAPI) => {
        try {
            const response = await axios.post("/cart", { productId, quantity, selectedAttributes });
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/update",
    async ({ itemId, quantity }, thunkAPI) => {
        try {
            const response = await axios.patch(`/cart/${itemId}`, { quantity });
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/remove",
    async (itemId, thunkAPI) => {
        try {
            const response = await axios.delete(`/cart/${itemId}`);
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const clearCart = createAsyncThunk(
    "cart/clear",
    async (_, thunkAPI) => {
        try {
            await axios.delete("/cart");
            return [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateGiftWrap = createAsyncThunk(
    "cart/updateGiftWrap",
    async (isGiftWrap, thunkAPI) => {
        try {
            const response = await axios.patch("/cart/gift-wrap", { isGiftWrap });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
