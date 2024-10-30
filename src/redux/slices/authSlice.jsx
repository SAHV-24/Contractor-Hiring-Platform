import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({

  name: "authSlice",

  initialState: {
    email: null,
    nombre: null,
    apellido: null,
    ciudad: null,
    username: null,
    password: null,
    fotoDePerfil: null,
    ultimasCategorias: [],
    isLoggedIn:false,
  },

  reducers: {

    register: (state, action) => {
      
      const{email,nombre,apellido,ciudad,username,password,fotoDePerfil,ultimasCategorias} = action.payload.user;

      state.email = email;
      state.nombre = nombre;
      state.apellido = apellido;
      state.ciudad = ciudad;
      state.username = username;
      state.password = password;
      state.fotoDePerfil = fotoDePerfil;
      state.ultimasCategorias = ultimasCategorias || [];     
      state.isLoggedIn = true;
    
    },


    login: (state, action) => {
    
      const{email,nombre,apellido,ciudad,username,password,fotoDePerfil,ultimasCategorias} = action.payload.user;

      state.email = email;
      state.nombre = nombre;
      state.apellido = apellido;
      state.ciudad = ciudad;
      state.username = username;
      state.password = password;
      state.fotoDePerfil = fotoDePerfil;
      state.ultimasCategorias = ultimasCategorias || [];     
      state.isLoggedIn = true;

    },
    logout: (state, action) => {
      state.isLoggedIn = false;
    },

    error: (state, action) => {
      state.error = action.payload?.error || "";
    },
    loginWithGoogle: (state, action) => {
      const { email, photoURL, uid } = action.payload;
      state.displayName;
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
