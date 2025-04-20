/* eslint-disable react/prop-types */
import { useState, useContext, useMemo } from "react";
import { Estado } from "../";
import { AppContext } from "../../provider/AppContext/AppContext";
import { Rating } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function CitaItem({ cita, userOfCitas, authenticatedUser }) {
  const { notificacionDeExito, notificacionDeError, clientKey } =
    useContext(AppContext);
  const {
    _id,
    fecha,
    hora,
    locacion,
    estado,
    ratingUsuario,
    contratistaUsuario,
    usuarioData,
    categoriaData,
  } = cita;

  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const navigate = useNavigate();

  const isThisAContratistaCita = useMemo(
    () => userOfCitas.username === contratistaUsuario.username,
    [contratistaUsuario, userOfCitas]
  );

  const isTheUserAllowed = useMemo(
    () =>
      authenticatedUser?.username === userOfCitas.username ||
      authenticatedUser?.username === "admin",
    [authenticatedUser]
  );

  const canItBeCanceled = useMemo(() => estado === "pendiente", [estado]);

  const handleClickOpen = (valor) => {
    setRatingValue(valor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      // Actualización de la cita con el estado "finalizada"
      const theCita = { estado: "finalizada", ratingUsuario: ratingValue };
      const response = await fetch(
        `https://server-production-789b.up.railway.app/api/Citas/update/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify(theCita),
          headers: {
            "jwt-token": clientKey,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        notificacionDeExito("Cita finalizada y calificación guardada!");

        setTimeout(() => {
          navigate(`/citas/${userOfCitas.username}`);
        });
      } else {
        const data = await response.json();
        notificacionDeError(`Error al finalizar cita: ${data.message}`);
      }
      setOpen(false); // Cerrar el modal
    } catch (exc) {
      notificacionDeError("Hubo un error: ", exc.message);
    }
  };

  const handleCancelCita = async () => {
    try {
      const theCita = { estado: "cancelada" };
      const response = await fetch(
        `https://server-production-789b.up.railway.app/api/Citas/update/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify(theCita),
          headers: {
            "jwt-token": clientKey,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        notificacionDeExito("Cita cancelada!");
      } else {
        const data = await response.json();
        notificacionDeError(`Error al cancelar cita: ${data.message}`);
      }
    } catch (exc) {
      console.log(exc.message);
      notificacionDeError("Hubo un error: ", exc.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Usuario Info */}
        <div className="flex flex-col items-center bg-[#f8fffe] p-4 rounded-lg">
          <img
            onClick={() => navigate(`/profile/${userOfCitas.username}`)}
            src={userOfCitas.fotoDePerfil}
            alt="Perfil Usuario"
            className="w-20 h-20 rounded-full object-cover border-4 border-[#57bbb4] hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <div className="mt-2 text-center">
            {isThisAContratistaCita ? (
              <h4 className="bold">Calificación del servicio prestado 🔨</h4>
            ) : (
              <h3>Calificación</h3>
            )}
            <div className="flex items-center justify-center space-x-1 bg-[#57bbb4] text-white  rounded-full">
              <div className="flex w-full items-center justify-center">
                <Rating
                  defaultValue={ratingUsuario}
                  onChange={(_, valor) => handleClickOpen(valor)}
                  disabled={estado === "cancelada" || estado === "finalizada"}
                  sx={{
                    zIndex: "1000",
                    gap: "0",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                />
              </div>
            </div>
          </div>
          <i className="mt-2">{ratingUsuario} estrellas</i>
        </div>
        <div className="bg-[#96d6d0] bg-opacity-20 p-4 rounded-lg space-y-3 text-center">
          <h3 className="font-semibold text-[#239089] text-2xl mb-4">
            Detalles de la Cita
          </h3>
          <div className="flex justify-between items-center space-x-2 text-gray-700">
            <span className="text-lg font-bold ">Fecha:</span>
            <span className="text-lg">
              {new Date(fecha).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center space-x-2 text-gray-700">
            <span className="text-lg font-bold ">Hora:</span>
            <span className="text-lg">{hora}</span>
          </div>
          <div className="flex justify-between items-center space-x-2 text-gray-700">
            <span className="text-lg font-bold ">Lugar:</span>
            <span className="text-lg">{locacion}</span>
          </div>
          <Estado estado={estado} />
        </div>
        <div className="bg-[#f8fffe] p-4 rounded-lg">
          <div className="flex flex-col items-center">
            {isThisAContratistaCita ? (
              <>
                <img
                  onClick={() => navigate(`/profile/${usuarioData.username}`)}
                  src={usuarioData.fotoDePerfil}
                  alt="Perfil Usuario"
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#57bbb4] hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <h2 className="italic text-2xl m-0 p-0 mt-2 text-gray-500 ">
                  Usuario:
                </h2>
                <h4 className="mt-2 font-semibold text-[#239089]">
                  {usuarioData.nombre} {usuarioData.apellido}
                </h4>
                <p>
                  <span className="font-bold text-lg p-0">
                    {" "}
                    {contratistaUsuario.nombre}{" "}
                  </span>{" "}
                  le hizo un trabajo de{" "}
                  <span className="italic text-base p-0">
                    {categoriaData.nombre}
                  </span>{" "}
                  a{" "}
                  <span className="italic text-base p-0">
                    {usuarioData.nombre}
                  </span>
                  , en la cuál, obtuvo una valoración de
                  <span className="font-bold  p-0 ml-2">{ratingUsuario}</span>⭐
                </p>
              </>
            ) : (
              <>
                <img
                  onClick={() =>
                    navigate(`/profile/${contratistaUsuario.username}`)
                  }
                  src={contratistaUsuario.fotoDePerfil}
                  alt="Perfil Usuario"
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#57bbb4] hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <h4 className="mt-2 font-semibold text-[#239089]">
                  {contratistaUsuario.nombre} {contratistaUsuario.apellido}
                </h4>
              </>
            )}
          </div>
        </div>
      </div>

      {isTheUserAllowed && (
        <div className="mt-6 flex justify-end">
          {canItBeCanceled && (
            <button
              onClick={handleCancelCita}
              className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Cancelar Cita</span>
            </button>
          )}
        </div>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Valoración</DialogTitle>
        <DialogContent>
          <h3>
            ¿Quieres calificar a {contratistaUsuario.nombre} con una valoración
            de {ratingValue} estrellas?
          </h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            No
          </Button>
          <Button onClick={handleConfirm} color="success">
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CitaItem;
