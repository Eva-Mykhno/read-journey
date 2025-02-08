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

export const fetchUserBooks = createAsyncThunk(
  "books/fetchUserBooks",
  async (status, thunkAPI) => {
    try {
      const queryParam = status ? `?status=${status}` : "";
      const { data } = await api.get("/books/own", { queryParam });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user's books"
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

export const startReadingBook = createAsyncThunk(
  "books/startReading",
  async ({ bookId, page }, thunkAPI) => {
    try {
      const { data } = await api.post("/books/reading/start", {
        id: String(bookId),
        page: Number(page),
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to start reading"
      );
    }
  }
);

export const finishReadingBook = createAsyncThunk(
  "books/finishReading",
  async ({ bookId, page }, thunkAPI) => {
    try {
      const { data } = await api.post("/books/reading/finish", {
        id: String(bookId),
        page: Number(page),
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to finish reading"
      );
    }
  }
);

export const fetchInfoAboutBook = createAsyncThunk(
  "books/id",
  async ({ bookId }, thunkAPI) => {
    try {
      const { data } = await api.get(`/books/${bookId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch info about the book"
      );
    }
  }
);
