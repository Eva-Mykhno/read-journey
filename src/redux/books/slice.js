import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendedBooks,
  addBookToLibrary,
  fetchUserLibrary,
  removeBook,
  addUserBook,
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
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(addBookToLibrary.fulfilled, (state, action) => {
        state.userLibraryBooks.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addBookToLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addUserBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserBook.fulfilled, (state, action) => {
        state.userLibraryBooks.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addUserBook.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(removeBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.userLibraryBooks = state.userLibraryBooks.filter(
          (book) => book._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setBooksPerPage, setFilters } =
  booksSlice.actions;
export const booksReducer = booksSlice.reducer;
