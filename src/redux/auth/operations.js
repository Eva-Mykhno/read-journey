import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

const setAuthHeader = (token = null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const fetchUser = createAsyncThunk("user", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/users/current");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "User not found");
  }
});

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signin", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await api.post("/users/signout");
    setAuthHeader(null);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
  }
});

export const refresh = createAsyncThunk("refresh", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }

    setAuthHeader(token);
    const { data } = await api.get("/users/current/refresh");
    if (!data.token) {
      throw new Error("No token received");
    }

    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed");
  }
});
