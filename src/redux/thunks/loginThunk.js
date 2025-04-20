import { login, error } from "../slices/authSlice";
import { createJWT } from "../../Helpers/createJWT";
import { fetchUserByEmail } from "../../Helpers/fetchUserByEmail";
import { fetchAllContratistas } from "../../Helpers/fetchAllContratistas";
import { isUserAContratista } from "../../Helpers/isUserAContratista";

export const loginAuth = (email, password, clientKey, navigate) => {
  return async (dispatch) => {
    try {
      const userLoggedOnDb = await fetchUserByEmail(email, clientKey);
      checkUserPassword(userLoggedOnDb, password);

      const allContratistas = await fetchAllContratistas(clientKey);
      const isItAContratista = isUserAContratista(
        allContratistas,
        userLoggedOnDb._id
      );

      const JWT = await createJWT(
        userLoggedOnDb._id,
        userLoggedOnDb.username,
        userLoggedOnDb.rol
      );

      if (JWT.message === "OK") {
        storeJWTAndDispatch(
          dispatch,
          navigate,
          JWT,
          userLoggedOnDb,
          isItAContratista
        );
      } else {
        throw new Error("No se pudo hacer el registro.");
      }
    } catch (err) {
      alert(err.message);
      dispatch(error({ error: err.message }));
    }
  };
};

const checkUserPassword = (user, password) => {
  if (user.password !== password) throw new Error("Contraseña incorrecta");
};


const storeJWTAndDispatch = (
  dispatch,
  navigate,
  JWT,
  user,
  isItAContratista
) => {
  localStorage.setItem("user-jwt-token", JWT.token);
  dispatch(login({ user, token: JWT, isItAContratista }));
  navigate("/");
};
