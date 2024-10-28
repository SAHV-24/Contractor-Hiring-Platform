import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    email: null,
    photoURL: null,
    uid: null,
    error: "",
  },
  reducers: {
    register: (state, action) => {
      const { email, photoURL, uid } = action?.payload?.auth;

      state.email = email;
      state.photoURL = photoURL;
      state.uid = uid;
    },
    login: (state, action) => {
      const { email, photoURL, uid } = action?.payload?.auth;

      state.email = email;
      state.photoURL = photoURL;
      state.uid = uid;
    },
    logout: (state, action) => {
      state.error = action.payload?.error || "";

      state.email = null;
      state.photoURL = null;
      state.uid = null;
    },

    error: (state, action) => {
      state.error = action.payload?.error || "";
    },
    loginWithGoogle: (state, action) => {
      const { email, photoURL, uid } = action.payload;

      state.email = email;
      state.photoURL = photoURL;
      state.uid = uid;
    },
  },
});

export const {
  register,
  login,
  loginWithGoogle,
  logout,
  checkingCredentials,
  error,
} = authSlice.actions;
