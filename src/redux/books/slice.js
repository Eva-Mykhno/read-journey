import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendedBooks,
  addBookToLibrary,
  fetchUserLibrary,
} from "./operations";

const initialState = {
  books: [],
  userLibraryBooks: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  perPage: 2,
  filters: {
    title: "",
    author: "",
  },
  addingBookId: null,
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
    setFilters: (state, action) => {
      state.filters = action.payload;
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
      })
      .addCase(addBookToLibrary.pending, (state, action) => {
        state.addingBookId = action.meta.arg;
      })
      .addCase(addBookToLibrary.fulfilled, (state, action) => {
        state.addingBookId = null;
        state.userLibraryBooks.push(action.payload);
      })
      .addCase(addBookToLibrary.rejected, (state, action) => {
        state.addingBookId = null;
        state.error = action.payload;
      })
      .addCase(fetchUserLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserLibrary.fulfilled, (state, action) => {
        state.userLibraryBooks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setBooksPerPage, setFilters } =
  booksSlice.actions;
export const booksReducer = booksSlice.reducer;
