/* eslint-disable no-unused-vars */
import { useEffect, useId, useMemo, useState } from "react";
import { AppContext } from "./AppContext";
import { login } from "../../redux/slices/authSlice";
import { loginAuth } from "../../redux/thunks/loginThunk";
import { useDispatch, useSelector } from "react-redux";
import { verifyCredentialsThunk } from "../../redux/thunks/verifyCredentialsThunk";
import { ToastContainer } from "react-toastify";
import { Notifications } from "../../Hooks/Notifications";
import { useNotifications } from "../../Hooks/useNotifications";

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
  const clientKey = useMemo(() => import.meta.env.VITE_CLIENT_TOKEN, []);
  const dispatch = useDispatch();
  const { notificacionDeExito, notificacionDeError, notifications } =
    useNotifications();
  if (!clientKey) console.error("CLIENT_TOKEN no está en el archivo .env .");
  const token = useMemo(
    () => window.localStorage.getItem("user-jwt-token"),
    []
  );

  useEffect(() => {
    if (token) {
      dispatch(verifyCredentialsThunk(token)); // va y verifica el token asincrónicamente
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{ clientKey, notificacionDeError, notificacionDeExito }}
    >
      {children}
      <Notifications notifications={notifications} />
    </AppContext.Provider>
  );
}
