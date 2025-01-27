import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommended",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const { data } = await api.get("/books/recommend", {
        params: { page, perPage },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Fetching books failed"
      );
    }
  }
);
