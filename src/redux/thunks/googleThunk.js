import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { login, loginWithGoogle } from "../slices/authSlice";

export function googleThunk({email}) {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((data) => {
        if (data && data.user) {
          const user = data.user;
          
          // const email = await fetch(`http://localhost:3000/api/Usuarios/getByEmail/${email}`)

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
