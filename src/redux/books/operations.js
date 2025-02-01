import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommended",
  async ({ page, perPage, filters }, thunkAPI) => {
    try {
      const params = { page, limit: perPage };

      if (filters.title) params.title = filters.title;
      if (filters.author) params.author = filters.author;

      const { data } = await api.get("/books/recommend", { params });

      return { books: data.results, totalPages: data.totalPages };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Fetching books failed"
      );
    }
  }
);

export const addBookToLibrary = createAsyncThunk(
  "books/addToLibrary",
  async (bookId, thunkAPI) => {
    try {
      const { data } = await api.post(`/books/add/${bookId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add book"
      );
    }
  }
);

export const addUserBook = createAsyncThunk(
  "books/addUserBook",
  async (bookData, thunkAPI) => {
    try {
      const { data } = await api.post("/books/add", bookData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add user book"
      );
    }
  }
);

export const fetchUserLibrary = createAsyncThunk(
  "books/fetchUserLibrary",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/books/own");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Fetching user library failed"
      );
    }
  }
);

export const removeBook = createAsyncThunk(
  "books/removeFromLibrary",
  async (bookId, thunkAPI) => {
    try {
      await api.delete(`/books/remove/${bookId}`);
      return bookId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to remove book"
      );
    }
  }
);
