// loginThunk.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { login, error } from "../slices/authSlice";
import { auth } from "../../firebase/config";

export const loginAuth = (email, password) => {
  return async (dispatch) => {
    try {
      // Makes a request on the database to check if it exists
      const databaseResponse = await fetch(
        `http://localhost:3000/api/Usuarios/getByEmail/${email}`
      );

      console.log("databaseResponse")
      console.log(databaseResponse)

      // Handle database response based on status code
      if (databaseResponse.status === 200) {

        const userCreatedOnDB = await databaseResponse.json();

        // Register the user in Firebase Auth
        const firebaseResponse = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // If Firebase registration is successful, dispatch register action
        if (firebaseResponse) {
          dispatch(login({ user: userCreatedOnDB }));
        } else {
          // If Firebase registration fails, delete user from database
          throw new Error("No se pudo hacer el registro.");
        }
      } else if (databaseResponse.status === 409) {
        const err = await databaseResponse.json();
        dispatch(error({ error: err.message }));
        alert(err.message);
      } else if (databaseResponse.status === 400) {
        const errorMessage = "Por favor revisa tus campos.";
        dispatch(error({ error: { message: errorMessage } }));
        alert(errorMessage);
      }
    } catch (err) {
      dispatch(error({ error: err.message }));
      alert(err.message);
    }
  };
};
