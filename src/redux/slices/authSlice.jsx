/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",

  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    isItAContratista: false,
  },

  reducers: {
    register: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.isLoggedIn = true;
    },
    registerContratista: (state, action) => {
      state.isItAContratista = action.payload.isItAContratista;
    },
    login: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.isLoggedIn = true;
      state.isItAContratista = action.payload?.isItAContratista;
    },
    
    logout: (state) => {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      state.isItAContratista = false;
    },

    error: (state, action) => {
      state.error = action.payload?.error || "";
    },
  },
});

export const { register, login, logout, error, registerContratista } =
  authSlice.actions;
