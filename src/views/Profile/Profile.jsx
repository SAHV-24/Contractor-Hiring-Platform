import "./Profile.css";
import { Logo, Category, WorkedWith } from "../../Components";
import { useState, useMemo, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../provider/AppContext/AppContext";
import { Error404 } from "../";
import { logoutThunk } from "../../redux/thunks/logoutThunk";
import { ContratistaSection } from "../../Components/ContratistaSection/ContratistaSection";

export function Profile() {
  const { notificacionDeError, clientKey } = useContext(AppContext);
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el mensaje de carga
  const [lastHirings, setLastHirings] = useState([]);
  const [uniqueHirings, setUniqueHirings] = useState([]);
  const authenticatedUsername = useSelector(
    (state) => state.auth.user.username
  );
  const navigate = useNavigate();

  const isThisTheAuthenticatedUser = useMemo(
    () => authenticatedUsername === user?.username,
    [authenticatedUsername, user?.username]
  );

  const [isItAContratista, setIsItAContratista] = useState(null);

  function handleDeleteButton() {
    dispatch(logoutThunk(navigate));
  }

  // useEffect(() => {
  //   if (user) {
  //     console.log(
  //       user.ultimasCategoria
  //     );
  //   }
  // }, [user]);

  useEffect(() => {
    if (clientKey) {
      const fetchUserData = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://server-production-789b.up.railway.app/api/Usuarios/getByUsername/${username}`,
            {
              headers: {
                "jwt-token": clientKey,
              },
            }
          );
          const data = await res.json();

          if (data.message) {
            throw new Error(data.message);
          }

          setUser(data);
        } catch (exc) {
          console.log("Error fetching user data:", exc);
          navigate("/error404"); // Redirige a Error404 si hay un error
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [username, clientKey, navigate]);

  useEffect(() => {
    if (lastHirings.length > 0) {
      setUniqueHirings(
        lastHirings.filter(
          (hiring, index, self) =>
            index ===
            self.findIndex(
              (h) =>
                h.contratistaUsuario.username ===
                hiring.contratistaUsuario.username
            )
        )
      );
    }
  }, [lastHirings]);

  useEffect(() => {
    if (user) {
      const fetchIsAnAuthenticatedUser = async () => {
        const resListas = await fetch(
          "https://server-production-789b.up.railway.app/api/Contratistas/",
          {
            method: "GET",
            headers: {
              "jwt-token": clientKey,
            },
          }
        );
        const listaContratistas = await resListas.json();

        const contratistaBool = listaContratistas.some(
          (contratista) => contratista.usuarioId === user._id
        );

        setIsItAContratista(contratistaBool);
      };

      async function fetchLastHirings() {
        try {
          const response = await fetch(
            `https://server-production-789b.up.railway.app/api/Usuarios/getLastCitas/${user._id}`,
            {
              headers: {
                "jwt-token": clientKey,
              },
            }
          );

          const data = await response.json();

          setLastHirings(data); // se establece el lastHirigns
        } catch (exc) {
          notificacionDeError("ha habido un error: " + exc.message);
        }
      }

      fetchIsAnAuthenticatedUser();
      fetchLastHirings();
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );

  // Redirigir a Error404 si el usuario es admin
  if (user?.rol === "ADMIN" && user.username != currentUser.username) {
    return <Error404 />;
  }

  function handleChatButton() {
    const loggedInUsername = currentUser?.username;

    if (!loggedInUsername) {
      notificacionDeError("El usuario no se ha autenticado");
      return;
    }

    navigate(`/chat/${username}/${loggedInUsername}`);
  }

  return user ? (
    <div className="user mb-32 mt-16">
      <section className="user-section">
        <img
          className="w-[100px] h-[100px]  object-cover overflow-hidden "
          src={
            user.fotoDePerfil === ""
              ? "https://i.imgur.com/QMMN2PB.jpeg"
              : user.fotoDePerfil
          }
          alt="User profile"
        />
        <div className="user-info mb">
          <h1 className="2xl:text-6xl xl:text-4xl p-0  m-0">{user.nombre}</h1>
          <div>
            <h3 className="text-base p-0 m-0 text-mainColor">
              @{user.username}
            </h3>
            <h3 className="text-base p-0 mt-[-3px] text-gray-400">
              De {user.ciudad}
            </h3>
          </div>
        </div>
        <div className="gap-8 flex items-center justify-center">
          {isThisTheAuthenticatedUser ? (
            <button
              className="px-1 py-1 rounded-full bg-red-500 text-white font-bold hover:transition-all hover:cursor-pointer hover:bg-red-700 "
              onClick={() => handleDeleteButton()}
            >
              <span> Cerrar Sesión</span>
            </button>
          ) : (
            <button
              className="py-2 flex justify-center items-center px-3 rounded-full bg-mainColor text-white font-bold hover:transition-all hover:cursor-pointer hover:bg-terColor"
              onClick={handleChatButton}
            >
              <Logo url={"/images/send.png"} className="inline p-0 m-0" />
            </button>
          )}
          {isItAContratista ? (
            <button
              className="py-2 px-2 rounded-full bg-mainColor text-white font-bold hover:transition-all hover:cursor-pointer hover:bg-terColor"
              onClick={() => navigate(`/contratar/${username}`)}
            >
              <span>Agendar Cita</span>
            </button>
          ) : (
            <></>
          )}
        </div>
      </section>
      {isItAContratista ? (
        <ContratistaSection username={user.username} clientKey={clientKey} />
      ) : (
        <>
          <section className="user-services ">
            <h1 className="2xl:text-4xl xl:text-2xl mt-[15px]">
              Últimos servicios requeridos
            </h1>

            <div className="user-categories">
              {user.ultimasCategorias.length != 0 ? (
                user.ultimasCategorias.map((cat, index) => (
                  <Category key={index} categoryId={cat.categoriaId} />
                ))
              ) : (
                <h1
                  style={{ color: "gray" }}
                  className="2xl:text-4xl xl:text-2xl"
                >
                  No hay nada por aquí :(
                </h1>
              )}
            </div>
          </section>
          <section className="flex flex-col justify-center items-center gap-3">
            <h2 className="2xl:text-4xl xl:text-2xl mt-[15px]">
              ⟬⟪ Últimas contrataciones de {user.nombre} ⟫⟭
            </h2>
            <div className="flex items-center justify-center gap-16 overflow-clip ">
              {uniqueHirings.map((hiring, key) => (
                <div key={key}>
                  {<WorkedWith message="Trabajó" hiring={hiring} />}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  ) : (
    <Error404 />
  );
}
