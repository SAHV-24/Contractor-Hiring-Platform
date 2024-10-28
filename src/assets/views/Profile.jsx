
import { Logo } from "../Components/Logo";
import { useParams } from "react-router-dom";
import { useDataFromUser } from "../Hooks/useDataFromUser";

// eslint-disable-next-line react/prop-types
export function Profile() {

  const user = {
    nombre:"Usuario",
    fotoDePerfil:"https://i.pinimg.com/474x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg",
    username:"Bob",
    ultimasCategorias:[]
  } 

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
            <h2 key={key}>Categoria</h2>
          ))}
        </div>
      </section>
      <section className="user-agenda">
        <h1>Agenda</h1>
        {/* <Agenda/> */}
      </section>
    </div>
  );
}
