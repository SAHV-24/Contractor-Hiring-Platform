import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Es donde están TODOS los reducers de la autenticación
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* otros middlewares si los tienes */),
});
