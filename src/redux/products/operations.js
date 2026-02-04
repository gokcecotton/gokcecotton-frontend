import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (params, thunkAPI) => {
        try {
            const response = await axios.get("/products", { params });
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getProductById = createAsyncThunk(
    "products/getById",
    async (productId, thunkAPI) => {
        try {
            const response = await axios.get(`/products/${productId}`);
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
