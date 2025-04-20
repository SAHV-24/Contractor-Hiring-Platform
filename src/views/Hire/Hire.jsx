import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../provider/AppContext/AppContext";
import { isValidMessage } from "../../Helpers/isValidMessage";
import styles from "./Hire.module.css";

export function Hire() {
  const { notificacionDeExito, notificacionDeError, clientKey } =
    useContext(AppContext);
  const navigate = useNavigate();
  const authenticatedUser = useSelector((state) => state.auth.user);
  const [contratista, setContratista] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    idCategoria: "",
    fecha: "",
    locacion: "",
    hora: "",
  });
  const { hiringContratistaUsername } = useParams();

  useEffect(() => {
    const { username } = authenticatedUser;

    if (username === hiringContratistaUsername) navigate("/error404");
    if (!authenticatedUser) navigate("/error404");

    async function verifyIfItIsAContratista() {
      try {
        const response = await fetch(
          `https://server-production-789b.up.railway.app/api/Contratistas/getByUsername/${hiringContratistaUsername}`,
          {
            headers: {
              "jwt-token": clientKey,
            },
          }
        );

        const theContratista = await response.json();
        setContratista(theContratista[0]);
        setIsLoading(false);
      } catch (exc) {
        navigate("/error404");
      }
    }

    verifyIfItIsAContratista();
  }, [authenticatedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let isAnythingEmpty = false;

    Object.values(formData).forEach((data) => {
      if (!data) {
        notificacionDeError("Ninguno de los campos debe de estar vacío!");
        isAnythingEmpty = true;
        return;
      }
    });

    // Combina fecha y hora en un solo objeto Date
    const [year, month, day] = formData.fecha.split("-");
    const [hour, minute] = formData.hora.split(":");
    const inputDate = new Date(year, month - 1, day, hour, minute);
    const currentDate = new Date();

    if (inputDate.toISOString() < currentDate.toISOString()) {
      notificacionDeError("La fecha y hora no pueden ser menores a la actual.");
      return;
    }

    // verifica que no se esté enviando una locación inválida (con carácteres especiales o números)
    if (!isValidMessage(formData.locacion)) {
      notificacionDeError("La locación no está bien escrita!");
      return;
    }

    if (!isAnythingEmpty) {
      try {
        const cita = {
          idUsuario: authenticatedUser._id,
          idContratista: contratista._id,
          idCategoria: formData.idCategoria,
          fecha: new Date(formData.fecha),
          locacion: formData.locacion,
          hora: formData.hora,
          estado: "pendiente",
          ratingUsuario: 0,
        };

        const response = await fetch(
          "https://server-production-789b.up.railway.app/api/Citas/insert",
          {
            headers: {
              "Content-Type": "application/json",
              "jwt-token": clientKey,
            },
            method: "POST",
            body: JSON.stringify({ ...cita }),
          }
        );

        notificacionDeExito("La cita fue creada con éxito!");
        setTimeout(
          () => navigate(`/citas/${authenticatedUser.username}`),
          4000
        );
      } catch (exc) {
        console.error(exc);
      }
    }
  }

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#96d6d0] to-[#57bbb4]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#239089]"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[#96d6d0] to-[#57bbb4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-6 bg-gradient-to-r from-[#57bbb4] to-[#239089] text-white">
            <h1 className="text-3xl font-bold text-center">
              Contratar Servicios Profesionales
            </h1>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div
                className="w-16 h-16 rounded-full bg-white p-1 flex items-center justify-center
              "
              >
                <img
                  src={contratista.usuarioInfo[0].fotoDePerfil}
                  className="w-[50px] h-[50px] object-cover rounded-full bg-gray-200 flex items-center justify-center"
                ></img>
              </div>
              <div>
                <p className="text-xl font-medium">
                  {contratista?.usuarioInfo[0]?.nombre}
                </p>
                <p className="text-sm opacity-90">Profesional Verificado ✓</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-6">
              {/* Categoría */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 ">
                  Categoría de Servicio
                </label>

                <div className="relative">
                  <select
                    name="idCategoria"
                    value={formData.idCategoria}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent sm:text-sm rounded-lg transition-all bg-transparent"
                  >
                    <option value="">Seleccione una categoría</option>
                    {contratista.categoriasDetails.map((cat, key) => (
                      <option
                        key={key}
                        value={cat._id}
                        className="text-gray-700"
                      >
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Grid para fecha y hora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fecha */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha del Servicio
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    min="2024-01-01"
                    max="2024-12-31"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent sm:text-sm rounded-lg transition-all"
                  />
                </div>

                {/* Hora */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Hora del Servicio
                  </label>
                  <input
                    type="time"
                    name="hora"
                    min="06:00"
                    max="23:00"
                    value={formData.hora}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent sm:text-sm rounded-lg transition-all"
                  />
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Ubicación del Servicio
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="locacion"
                    value={formData.locacion}
                    onChange={handleChange}
                    placeholder="Ej: Barrio Los Pinos (sin comas ni puntos)"
                    className="block w-full pl-10 pr-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent sm:text-sm rounded-lg transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-[#57bbb4] hover:bg-[#239089] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#57bbb4] transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                Confirmar Contratación
              </button>
            </div>

            {/* Información adicional */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg
                  className="h-5 w-5 text-[#57bbb4] mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
