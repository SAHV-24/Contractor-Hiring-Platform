import { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export function NavBar() {
  // eslint-disable-next-line no-unused-vars

 const user = {
    nombre:"Usuario",
    fotoDePerfil:"https://i.pinimg.com/474x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg",
    username:"Bob"
  }

  

  return (
    <header>
      <section id="elements">
        <section id="links-section">
          <div className="navbar-picture">
            <img src={"./"} alt="" />
          </div>

          <span>
            <Link to="/" className="link">
              Inicio
            </Link>
          </span>
          <span>
            <Link to="/search" className="link">
              Buscar
            </Link>
          </span>
          <span>
            <Link to="/help" className="link">
              Ayuda
            </Link>
          </span>
        </section>
        <section id="user-section">
          <div className="navbar-picture">
            <img src={user?.fotoDePerfil} alt="" />
          </div>
          <span id="user-name">
            <Link
              to={`/profile/${user?.username}`}
              id="user-name"
              className="link"
            >
              {user?.nombre}
            </Link>
          </span>
        </section>
      </section>
    </header>
  );
}
