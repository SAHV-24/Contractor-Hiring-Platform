// Thunk para verificar si el usuario que tiene un JWT en el localStorage
// está autenticado

import { error, login } from "../slices/authSlice";

// Token es un string que se obtiene del localStorage
export const verifyCredentialsThunk = (token) => {
  return async (dispatch) => {
    try {
      //  Busca si es un contratista
      const response = await fetch(
        "https://server-production-789b.up.railway.app/api/Auth/verifyToken",
        {
          method: "POST",
          headers: {
            "jwt-token": token,
          },
        }
      );

      const user = await response.json();

      const resListas = await fetch(
        "https://server-production-789b.up.railway.app/api/Contratistas/",
        {
          method: "GET",
          headers: {
            "jwt-token": token,
          },
        }
      );
      const listaContratistas = await resListas.json(); 

      const isItAContratista = listaContratistas.some(
        (contratista) => contratista.usuarioId === user._id
      );

      if (user) {
        dispatch(login({ user, token, isItAContratista })); // Pasar isItAContratista a login
      } else {
        console.log("Hubo un error al verificar el token");
      }
    } catch (exc) {
      dispatch(error({ message: exc }));
    }
  };
};
