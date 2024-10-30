import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { loginAuth } from "../../redux/thunks/loginThunk";
import { googleThunk } from "../../redux/thunks/googleThunk";
import "./login.css";
import { GoogleSVG } from "../../assets/GoogleSVG";

export function Login() {
  const { onInputChange, email, password } = useForm();
  const dispatch = useDispatch();

  function handleLoginSubmit(evt) {
    evt.preventDefault();

    dispatch(loginAuth(email, password));
  }

  return (
    <div id="register-form">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleLoginSubmit}>
        <section>
          {/* <button onClick={() => dispatch(googleThunk())} className="svg-auth">
            <GoogleSVG />
          </button> */}
        </section>
        <section>
          <div>
            <h2>Email:</h2>
            <input
              required
              onChange={onInputChange}
              type="email"
              name="email"
            />
          </div>

          <div>
            <h2>Contraseña:</h2>
            <input
              required
              onChange={onInputChange}
              type="password"
              name="password"
            />
          </div>
        </section>
        <section id="btn-section">
          <button type="submit" id="submit-lgn">
            Iniciar Sesión
          </button>
        </section>
      </form>
    </div>
  );
}
