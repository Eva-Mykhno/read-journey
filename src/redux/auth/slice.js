import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, login, logout, register, refresh } from "./operations.js";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");
const parsedUser = userFromStorage
  ? JSON.parse(userFromStorage)
  : { name: null, email: null, password: null };

const initialState = {
  user: parsedUser,
  token: tokenFromStorage,
  isLoggedIn: !!tokenFromStorage,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(fetchUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
        state.isRefreshing = false;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null, password: null };
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(refresh.rejected, (state) => {
        state.user = { name: null, email: null, password: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const authReducer = authSlice.reducer;
