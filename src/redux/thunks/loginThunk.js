import { signInWithEmailAndPassword } from "firebase/auth";
import { login, error } from "../slices/authSlice";
import { auth } from "../../firebase/config";

export function loginAuth(email, password) {
  return async (dispatch) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      if (response) {
        const res = {
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
        };
        dispatch(login({ auth: res }));
      }
    } catch (err) {
      dispatch(error({ error: err.message }));
    }
  };
}
