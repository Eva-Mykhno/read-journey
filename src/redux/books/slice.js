import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendedBooks,
  addBookToLibrary,
  fetchUserBooks,
  removeBook,
  addUserBook,
  startReadingBook,
  finishReadingBook,
  fetchInfoAboutBook,
  deleteReadingSession,
} from "./operations";

const initialState = {
  books: [],
  userLibraryBooks: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  perPage: null,
  filters: {
    title: "",
    author: "",
  },
  status: "",
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
    setStatus: (state, action) => {
      const validStatuses = ["", "unread", "in-progress", "done"];
      if (validStatuses.includes(action.payload)) {
        state.status = action.payload;
      }
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
      .addCase(fetchUserBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.userLibraryBooks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserBooks.rejected, (state, action) => {
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
      })
      .addCase(startReadingBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startReadingBook.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.userLibraryBooks.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (index !== -1) {
          state.userLibraryBooks[index] = updatedBook;
        } else {
          state.userLibraryBooks.push(updatedBook);
        }
        const newProgress =
          updatedBook.progress[updatedBook.progress.length - 1];
        if (newProgress && newProgress.status === "active") {
          state.currentPage = newProgress.startPage;
        }

        state.isLoading = false;
      })
      .addCase(startReadingBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(finishReadingBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(finishReadingBook.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.userLibraryBooks.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (index !== -1) {
          state.userLibraryBooks[index] = updatedBook;
        }
        const updatedProgress = updatedBook.progress;
        const currentProgress = updatedProgress.find(
          (item) => item.status === "active"
        );

        if (currentProgress) {
          currentProgress.status = "inactive";
        }
        if (action.payload.timeLeftToRead) {
          const { hours, minutes, seconds } = action.payload.timeLeftToRead;
          state.timeLeftToRead = { hours, minutes, seconds };
        }

        state.isLoading = false;
      })
      .addCase(finishReadingBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchInfoAboutBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInfoAboutBook.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.userLibraryBooks.findIndex(
          (book) => book._id === updatedBook._id
        );

        if (index !== -1) {
          state.userLibraryBooks[index] = updatedBook;
        }

        state.isLoading = false;
      })
      .addCase(fetchInfoAboutBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteReadingSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReadingSession.fulfilled, (state, action) => {
        const { bookId, readingId } = action.payload;
        const book = state.userLibraryBooks.find((book) => book._id === bookId);

        if (book) {
          book.progress = book.progress.filter(
            (session) => session._id !== readingId
          );
        }

        state.isLoading = false;
      })
      .addCase(deleteReadingSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setBooksPerPage, setFilters, setStatus } =
  booksSlice.actions;
export const booksReducer = booksSlice.reducer;
