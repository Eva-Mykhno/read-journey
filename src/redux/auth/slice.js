import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, login, logout, register, refresh } from "./operations.js";

const initialState = {
  user: {
    name: null,
    email: null,
    password: null,
  },
  token: null,
  isLoggedIn: false,
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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
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
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null, password: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, (state) => {
        state.user = { name: null, email: null, password: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
