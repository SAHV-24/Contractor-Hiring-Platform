import "./Profile.css";
import { Logo } from "../../Components/Logo/Logo";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// eslint-disable-next-line react/prop-types
export function Profile() {
  //TODO! Esto debe de ser implementado con el paradigma de redux!

  const user = {
    _id: {
      $oid: "66e4890b5830452cc3c355fd",
    },
    nombre: "Luis",
    apellido: "Fernandez",
    ciudad: "Cartagena",
    especialidad: "Plomero",
    email: "luis@ejemplo.com",
    username: "luis123",
    password: "hashedpassword",
    fotoDePerfil:
      "https://www.hola.com/horizon/43/20dddfae05b6-luis-miguel.jpg",
    ultimosTrabajos: [
      {
        fotoTrabajo: "trabajo2.jpg",
      },
    ],
    ultimasCategorias: [
      {
        idCategoria: {
          $oid: "66e4886cbddb83c50ec356f5",
        },
        precioCategoria: 45000,
      },
      {
        idCategoria: {
          $oid: "66e4886cbddb83c50ec356f5",
        },
        precioCategoria: 45000,
      },
      {
        idCategoria: {
          $oid: "66e4886cbddb83c50ec356f5",
        },
        precioCategoria: 45000,
      },
      {
        idCategoria: {
          $oid: "66e4886cbddb83c50ec356f5",
        },
        precioCategoria: 45000,
      },
    ],
  };

  if (!user) return <div>Cargando...</div>; // Mostrar algo mientras carga

  const { fotoDePerfil, nombre, ciudad, ultimasCategorias } = user;

  return (
    <div className="user">
      <section className="user-section">
        <img
          className="user-img"
          src={fotoDePerfil == "" ? "/images/unknown_user.jpg" : fotoDePerfil}
          alt=""
        />
        <div className="user-info">
          <h1 className="name">{nombre}</h1>
          <h3 className="username">@{user.username}</h3>
          <h3 className="city">De {ciudad}</h3>
        </div>
        <div className="user-div">
          <button className="user-btn">
            <Logo url={"/images/send.png"} key={""}></Logo>
            <span>Chatear</span>
          </button>
        </div>
      </section>
      <section className="user-services">
        <h1>Últimos servicios requeridos</h1>
        <div className="user-categories">
          {ultimasCategorias.map((cat, key) => (
            <h2 key={key}>Categorias</h2>
          ))}
        </div>
      </section>
      <section className="user-agenda">
        <h1>Agenda</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
           defaultValue={dayjs("2024-10-01")}/>
        </LocalizationProvider>
      </section>
    </div>
  );
}
