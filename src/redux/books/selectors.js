export const selectBooks = (state) => state.books.books;
export const selectCurrentPage = (state) => state.books.currentPage;
export const selectTotalPages = (state) => state.books.totalPages;
export const selectIsLoading = (state) => state.books.isLoading;
export const selectError = (state) => state.books.error;
export const selectPerPage = (state) => state.books.perPage;
