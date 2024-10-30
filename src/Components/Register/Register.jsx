// Register.js
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { registerAuth } from "../../redux/thunks/registerThunk";
import "./register.css";
import Alert from '@mui/material/Alert';
import { googleThunk } from "../../redux/thunks/googleThunk";
import { GoogleSVG } from "../../assets/GoogleSVG";
import { Input } from "../Input";
import { useState } from "react";

export function Register() {
  const dispatch = useDispatch();

  const [fields, setFields] = useState([
    "email",
    "nombre",
    "apellido",
    "ciudad",
    "username",
    "password",
    "fotoDePerfil",
  ]);

  const initialState = {
    email: "sergio_and.herrera@uao.edu.co",
    password: "hola123",
  };

  const { onInputChange, formState } = useForm(initialState);

  function handleSubmit(evt) {
    evt.preventDefault();

    dispatch(registerAuth(formState));
  }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) return dispatch(logout());
  //     dispatch(register({ email: user.email }));
  //   });
  // }, [dispatch]);

  return (
    <div id="register-form">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <button onClick={() => dispatch(googleThunk())} className="svg-auth">
            <GoogleSVG />
          </button>
        </section>
        <section>
          {fields.map((field, key) => {
            switch (field) {
              case "password":
                return (
                  <Input
                    key={key}
                    onInputChange={onInputChange}
                    text={"Contraseña"}
                    type="password"
                    name="password"
                  />
                );
              case "email":
                return (
                  <Input
                    key={key}
                    onInputChange={onInputChange}
                    text={"Correo"}
                    type="email"
                    name="email"
                  />
                );
              case "Foto De Perfil":
                return (
                  <Input
                    key={key}
                    onInputChange={onInputChange}
                    text={field}
                    name="fotoDePerfil"
                  />
                );

              default:
                return (
                  <Input
                    key={key}
                    onInputChange={onInputChange}
                    name={field}
                    text={field}
                  />
                );
            }
          })}
        </section>
        <section id="btn-section">
          <button type="submit">Registrarse!</button>
        </section>
      </form>
    </div>
  );
}
