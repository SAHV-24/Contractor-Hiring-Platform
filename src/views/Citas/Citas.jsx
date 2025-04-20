import { useContext, useEffect, useState } from "react";
import { CitaItem } from "../../Components";
import { useParams } from "react-router-dom";
import { AppContext } from "../../provider/AppContext/AppContext";
import { useSelector } from "react-redux";

export function Citas() {
  const { notificacionDeExito, notificacionDeError, clientKey } =
    useContext(AppContext);
  const { user } = useSelector((state) => state.auth);
  const [citas, setCitas] = useState([]);
  const [userOfCitas, setUserOfCitas] = useState({});
  const { username } = useParams();

  useEffect(() => {
    async function getCitas() {
      try {
        const response = await fetch(
          `https://server-production-789b.up.railway.app/api/Citas/getByUsername/${username}`,
          {
            headers: {
              "jwt-token": clientKey,
            },
          }
        );

        const data = await response.json();

        
        console.log(data)

        setCitas(data);
      } catch (exc) {
        console.log(exc.message);
        notificacionDeError("Ha habido un error");
      }
    }

    async function getUserOfCitas() {
      try {
        const response = await fetch(
          `https://server-production-789b.up.railway.app/api/Usuarios/getByUsername/${username}`,
          {
            headers: {
              "jwt-token": clientKey,
            },
          }
        );

        const data = await response.json();

        setUserOfCitas(data);
      } catch (exc) {
        console.log(exc.message);
        notificacionDeError("Ha habido un error");
      }
    }

    getCitas();
    getUserOfCitas();
  }, []);

  return (
    <div className="mt-16 mb-32">
      <h1 className="text-center text-mainColor font-bold">
        {user.username === userOfCitas.username
          ? "Mis Citas"
          : `Citas de ${userOfCitas.nombre}`}
      </h1>
      {citas
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .map((cita) => (
          <CitaItem
            key={cita._id}
            cita={cita}
            userOfCitas={userOfCitas}
            authenticatedUser={user}
          />
        ))}
    </div>
  );
}
