import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations.js";

const initialState = {
  user: {
    name: null,
    email: null,
    password: null,
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    });
  },
});

export const authReducer = authSlice.reducer;
