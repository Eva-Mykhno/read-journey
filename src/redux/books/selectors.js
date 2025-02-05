export const selectBooks = (state) => state.books.books;
export const selectCurrentPage = (state) => state.books.currentPage;
export const selectTotalPages = (state) => state.books.totalPages;
export const selectIsLoading = (state) => state.books.isLoading;
export const selectError = (state) => state.books.error;
export const selectPerPage = (state) => state.books.perPage;
export const selectFilters = (state) => state.books.filters;
export const selectUserLibraryBooks = (state) => state.books.userLibraryBooks;
export const selectReadingBook = (state, bookId) =>
  state.books.userLibraryBooks.find((book) => book._id === bookId);
export const selectProgressByBookId = (state, bookId) => {
  const book = state.books.userLibraryBooks.find((book) => book._id === bookId);
  return book ? book.progress : [];
};
export const selectActiveProgressByBookId = (state, bookId) => {
  const progress = selectProgressByBookId(state, bookId);
  return progress.find((session) => session.status === "active");
};
export const selectTimeLeftToReadByBookId = (state, bookId) => {
  const book = state.books.userLibraryBooks.find((book) => book._id === bookId);
  return book ? book.timeLeftToRead : { hours: 0, minutes: 0, seconds: 0 };
};
export const selectCurrentPageOfBookById = (state, bookId) => {
  const book = state.books.userLibraryBooks.find((book) => book._id === bookId);
  return book ? book.progress[book.progress.length - 1]?.finishPage : 1;
};
export const selectFilteredUserLibraryBooks = (state) => {
  const { userLibraryBooks, status } = state.books;
  return userLibraryBooks.filter((book) => {
    return status ? book.status === status : true;
  });
};
