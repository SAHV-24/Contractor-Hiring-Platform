import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSelector } from "react-redux";

export function NavBar() {
  const { nombre, username, fotoDePerfil } = useSelector(
    (state) => state.auth.user
  );
  const navigate = useNavigate();

  const isUserAContratista = useSelector(
    (state) => state.auth.isItAContratista
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  async function handleWantToPublish() {
    navigate(`/registerContratista/${username}`);
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-10">
      <section id="elements">
        <section id="links-section">
          <span>
            <Link
              to="/"
              className="link hover:transition-colors  hover:text-gray-200"
            >
              Inicio
            </Link>
          </span>
          <span>
            <Link
              to="/search"
              className="link hover:transition-colors  hover:text-gray-200"
            >
              Buscar
            </Link>
          </span>{" "}
          <span>
            <Link
              to={`/citas/${username}`}
              className="link hover:transition-colors  hover:text-gray-200"
            >
              Mis Citas
            </Link>
          </span>
          {!isUserAContratista && isLoggedIn && (
            <span
              onClick={handleWantToPublish}
              className="text-[#4f2b58] font-bold cursor-pointer hover:text-xl hover:transition-all hover:ease-in ease-out hover:text-gray-200"
            >
              ¿Quieres publicar?
            </span>
          )}
        </section>
        <section id="user-section">
          {isLoggedIn ? (
            <div className="flex items-center justify-center">
              <div className="navbar-picture">
                <img src={fotoDePerfil} alt="" />
              </div>
              <span>
                <Link
                  to={`/profile/${username}`}
                  className="link  hover:transition-colors  hover:text-gray-200"
                >
                  {nombre}
                </Link>
              </span>
            </div>
          ) : (
            <>
              <div>
                <Link
                  to={`/login`}
                  className="link  hover:transition-colors  hover:text-gray-200"
                >
                  Iniciar Sesión
                </Link>
              </div>
              <div>
                <Link
                  to={`/register`}
                  className="link  hover:transition-colors  hover:text-gray-200"
                >
                  Registrarse
                </Link>
              </div>
            </>
          )}
        </section>
      </section>
    </header>
  );
}
