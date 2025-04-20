// registerThunk.js

import { error, register } from "../slices/authSlice";
import { createJWT } from "../../Helpers/createJWT";
import { analyzeErrors } from "../../Helpers/analyzeErrors";

export async function createUserOnDB(clientKey, newUser) {
  const databaseResponse = await fetch(
    "https://server-production-789b.up.railway.app/api/Usuarios/insert", // inserta un nuevo usuario en la base de datos.
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": clientKey,
      },
      body: JSON.stringify(newUser),
    }
  );
  return databaseResponse;
}

export const registerAuth = (
  formState,
  clientKey,
  navigate,
  notificacionDeError
) => {
  return async (dispatch) => {
    const newUser = { ...formState, ultimasCategorias: [], rol: "USER" }; // Añaade el rol y el atiributo de las ultimas categorias

    try {
      const databaseResponse = await createUserOnDB(clientKey, newUser);

      if (databaseResponse.status === 201) {
        const userCreatedOnDB = await databaseResponse.json();
        const { _id, username } = userCreatedOnDB;
        const JWT = await createJWT(_id, username, "USER");
        localStorage.setItem("user-jwt-token", JWT.token); // Saves The token in the local storage

        dispatch(register({ user: userCreatedOnDB })); // envía a la store

        navigate("/"); // se va a la home
      } else {
        await analyzeErrors(databaseResponse, dispatch, notificacionDeError); // función para analizar los errores
      }
    } catch (err) {
      dispatch(error({ error: err.message }));
      notificacionDeError(err.message);
    }
  };
};
