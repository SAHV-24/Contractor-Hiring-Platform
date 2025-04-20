import { logout } from "../slices/authSlice";

export function logoutThunk(navigate) {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem("user-jwt-token");
      dispatch(logout()); // Despacha la acción logout sin necesidad de pasar un objeto vacío.
      navigate("/")

    } catch (error) {
      dispatch(logout({ error: error.message })); // Proporciona el mensaje de error.
    }
  };
}
