// Register.js
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { registerAuth } from "../../redux/thunks/registerThunk";
import "./register.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { logout, register } from "../../redux/slices/authSlice";
import { auth } from "../../firebase/config";
import { googleThunk } from "../../redux/thunks/googleThunk";

export function Register() {
  const dispatch = useDispatch();

  const initialState = {
    email: "sergio_and.herrera@uao.edu.co",
    password: "hola123",
  };

  const { email, password, onInputChange } = useForm(initialState);

  function handleSubmit(evt) {
    evt.preventDefault();

    dispatch(registerAuth(email, password));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return dispatch(logout());
      dispatch(register({ email: user.email }));
    });
  }, [dispatch]);

  return (
    <div id="register-form">
      <h1>Register</h1>
      

      <form onSubmit={handleSubmit}>
        <section>
          <div>
            <h2>Email:</h2>
            <input
              required
              type="email"
              name="email"
              onChange={onInputChange}
            />
          </div>
          <div>
            <h2>Password:</h2>
            <input
              required
              type="password"
              name="password"
              onChange={onInputChange}
            />
          </div>
        </section>
        <section id="btn-section">
          <button type="submit">Register!</button>
        </section>
      </form>
    </div>
  );
}
