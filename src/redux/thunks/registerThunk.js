// registerThunk.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { error, register } from "../slices/authSlice";

// registerThunk.js
export const registerAuth = (email, password) => {
  return async (dispatch) => {
    try {
      
      const response = await createUserWithEmailAndPassword(
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

        dispatch(register({ auth: res }));
      }
    } catch (err) {
      console.log(err.code)
      dispatch(error({ error: err.message }));
    }
  };
};
