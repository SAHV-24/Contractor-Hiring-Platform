import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { logout } from "../slices/authSlice";

export function logoutThunk() {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout()); // Despacha la acción logout sin necesidad de pasar un objeto vacío.
      
      
    } catch (error) {
      dispatch(logout({ error: error.message })); // Proporciona el mensaje de error.
    }
  };
}
