// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";

export function NavBar() {
  //TODO! Esto debe de ser implementado con el paradigma de redux!
  // !

  const nombre = useSelector((state)=> state.auth.nombre) 
  const username = useSelector((state)=> state.auth.username) 
  const fotoDePerfil = useSelector((state)=> state.auth.fotoDePerfil) 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  

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
          {isLoggedIn ? (
            <>
              <div className="navbar-picture">
                <img src={fotoDePerfil} alt="" />
              </div>
              <span>
                <Link to={`/profile/${username}`} className="link">
                  <a id="user-name"> {nombre}</a>
                </Link>
              </span>
            </>
          ) : (
            <>
              <div>
                <Link to={`/login`} className="link">
                  <a id="user-name"> Iniciar Sesión</a>
                </Link>
              </div>
              <div>
                <Link to={`/register`} className="link">
                  <a id="user-name"> Registrarse</a>
                </Link>
              </div>
            </>
          )}
        </section>
      </section>
    </header>
  );
}
