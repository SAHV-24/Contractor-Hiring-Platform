import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { login, loginWithGoogle } from "../slices/authSlice";

export function googleThunk() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((data) => {
        if (data && data.user) {
          const user = data.user;
          dispatch(loginWithGoogle(user));
        } else {
          console.error("No user data returned from signInWithPopup");
        }
      })
      .catch((error) => {
        console.error("Error with Google sign-in:", error);
      });
  };
}
