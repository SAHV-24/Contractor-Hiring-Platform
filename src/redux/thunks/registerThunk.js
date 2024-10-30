// registerThunk.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { error, register } from "../slices/authSlice";

export const registerAuth = (formState) => {
  return async (dispatch) => {
    try {
      // Add default categories to the user object
      const newUser = { ...formState, ultimasCategorias: [] };

      // Make a POST request to insert the user into the database
      const databaseResponse = await fetch(
        "http://localhost:3000/api/Usuarios/insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      // Handle database response based on status code
      if (databaseResponse.status === 201) {
        const userCreatedOnDB = await databaseResponse.json();
        const { email, password } = newUser;

        // Register the user in Firebase Auth
        const firebaseResponse = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // If Firebase registration is successful, dispatch register action
        if (firebaseResponse) {
          dispatch(register({ user: userCreatedOnDB }));
        } else {
          // If Firebase registration fails, delete user from database
          await fetch(`http://localhost:3000/api/Usuarios/delete/${userCreatedOnDB._id}`, {
            method: "DELETE",
          });
          throw new Error("Failed to register user in Firebase.");
        }
      } else if (databaseResponse.status === 409) {
        const err = await databaseResponse.json();
        dispatch(error({ error: err.message }));
        alert(err.message);
      } else if (databaseResponse.status === 400) {
        const errorMessage = "Please check your input fields.";
        dispatch(error({ error: { message: errorMessage } }));
        alert(errorMessage);
      }
    } catch (err) {
      dispatch(error({ error: err.message }));
      alert(err.message);
    }
  };
};
