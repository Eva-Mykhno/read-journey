import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { booksReducer } from "./books/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});
export default store;
