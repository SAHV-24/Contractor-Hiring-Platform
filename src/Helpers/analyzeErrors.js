import { error } from "../redux/slices/authSlice";

export async function analyzeErrors(
  databaseResponse,
  dispatch,
  notificacionDeError = null
) {
  const errorMessages = {
    409: "Email y/o Nombre de Usuario en uso! Prueba a cambiarlos",
    404: "Correo Inválido",
    400: "Alguno de tus campos fueron enviados incorrectamente",
  };

  console.log(databaseResponse);

  if (errorMessages[databaseResponse.status]) {
    const errorMessage = errorMessages[databaseResponse.status];
    notificacionDeError
      ? notificacionDeError(errorMessage)
      : alert(errorMessage);
    dispatch(error({ error: { message: errorMessage } }));
  }
}
