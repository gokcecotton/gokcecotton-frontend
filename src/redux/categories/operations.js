import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/categories");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addCategory = createAsyncThunk(
    "categories/add",
    async (categoryData, thunkAPI) => {
        try {
            const response = await axios.post("/categories", categoryData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
