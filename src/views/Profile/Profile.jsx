import "./Profile.css";
import { Logo } from "../../Components/Logo/Logo";
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Category } from "../../Components/Category/Category";

export function Profile() {
  const { username } = useParams(); // Obtener el username de la URL
  const [user, setUser] = useState(null); // Estado local para el usuario
  const authenticatedUsername = useSelector((state) => state.auth.username);

  const isThisTheAuthenticatedUser = useMemo(
    () => authenticatedUsername === user?.username,
    [authenticatedUsername, user?.username]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/Usuarios/getByUsername/${username}`
        );
        const data = await res.json();
        setUser(data); // Actualiza el estado con los datos del usuario
      } catch (exc) {
        console.log("Error fetching user data:", exc);
      }
    };

    fetchUserData();
  }, [username]);

  console.log(user);

  return user ? (
    <div className="user">
      <section className="user-section">
        <img
          className="user-img"
          src={
            user.fotoDePerfil === ""
              ? "/images/unknown_user.jpg"
              : user.fotoDePerfil
          }
          alt="User profile"
        />
        <div className="user-info">
          <h1 className="name">{user.nombre}</h1>
          <h3 className="username">@{user.username}</h3>
          <h3 className="city">De {user.ciudad}</h3>
        </div>
        <div className="user-div">
          <button className="user-btn">
            <Logo url={"/images/send.png"} />
            <span>Chatear</span>
          </button>
          {isThisTheAuthenticatedUser && (
            <button className="user-btn">
              <Logo url={"/images/settings.png"} />
              <span>Configuración</span>
            </button>
          )}
        </div>
      </section>
      <section className="user-services">
        <h1>Últimos servicios requeridos</h1>
        <div className="user-categories">
          {user.ultimasCategorias.map((cat, index) => (
            <Category key={index} categoryId={cat.categoriaId}/>
          ))}
        </div>
      </section>
      <section className="user-agenda">
        <h1>Agenda</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar defaultValue={dayjs("2024-10-01")} />
        </LocalizationProvider>
      </section>
    </div>
  ) : (
    <div>Cargando...</div>
  );
}
