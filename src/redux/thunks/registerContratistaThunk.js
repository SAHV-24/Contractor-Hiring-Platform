import { registerContratista } from "../slices/authSlice";

export function registerContratistaThunk(
  contratista,
  username,
  clientKey,
  navigate
) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://server-production-789b.up.railway.app/api/Contratistas/insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": clientKey,
          },
          body: JSON.stringify(contratista), // Convertir a JSON
        }
      );
      if (response.status === 200) {
        // Enviar al endpoint (ejemplo de dispatch)
        dispatch(registerContratista({ isItAContratista: true }));

        // Navegar u otras acciones
        navigate(`/profile/${username}`);
      } else {
        // Manejar respuesta de error
        const errorResponse = await response.json();
        console.error("Error:", errorResponse);
      }
    } catch (exc) {
      console.error("Error en la solicitud:", exc.message);
      return exc.message;
    }
  };
}
