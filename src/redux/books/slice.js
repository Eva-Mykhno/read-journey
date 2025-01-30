import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendedBooks } from "./operations";

const initialState = {
  books: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  perPage: 2,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setBooksPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        const { books, totalPages } = action.payload;
        state.books = books;
        state.totalPages = totalPages;
        state.isLoading = false;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setBooksPerPage } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
