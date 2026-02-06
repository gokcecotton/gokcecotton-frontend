import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/categories");
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addCategory = createAsyncThunk(
    "categories/add",
    async (categoryData, thunkAPI) => {
        try {
            const response = await axios.post("/categories", categoryData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
