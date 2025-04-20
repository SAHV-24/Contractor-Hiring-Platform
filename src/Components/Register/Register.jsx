import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { registerAuth } from "../../redux/thunks/registerThunk";
import { useContext, useState } from "react";
import { AppContext } from "../../provider/AppContext/AppContext";
import { useNavigate } from "react-router-dom";

export function Register() {
  const { notificacionDeExito, notificacionDeError, clientKey } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fields] = useState([
    "email",
    "nombre",
    "apellido",
    "ciudad",
    "username",
    "password",
    "fotoDePerfil",
  ]);

  const { onInputChange, formState } = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(registerAuth(formState, clientKey, navigate, notificacionDeError, notificacionDeExito));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#96d6d0] to-[#16605b] p-4 py-16">
      <div className="w-full max-w-4xl flex gap-8 items-center">
        {/* Lado izquierdo - Formulario */}
        <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#239089] mb-2">
              Crear una cuenta
            </h1>
            <p className="text-gray-600">
              Únete a nuestra comunidad y descubre todas las posibilidades
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, key) => (
                <div key={key} className="relative group">
                  {field === "password" && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="text-sm text-gray-400 group-hover:text-[#57bbb4] transition-colors">
                        {formState?.password?.length > 0 ? "🔒" : ""}
                      </div>
                    </div>
                  )}
                  {field === "fotoDePerfil" ? (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        Foto de Perfil
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <input
                          className="block ml-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent transition-all w-96
  "
                          name={field}
                          onChange={onInputChange}
                          placeholder="https://mi_imagen.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {field === "username" ? "Nombre de usuario" : field}
                      </label>
                      <input
                        required
                        onChange={onInputChange}
                        type={
                          field === "password"
                            ? "password"
                            : field === "email"
                              ? "email"
                              : "text"
                        }
                        name={field}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent transition-all"
                        placeholder={`Ingresa tu ${field === "username" ? "nombre de usuario" : field}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#57bbb4] text-white py-3 px-4 rounded-lg hover:bg-[#239089] transform hover:scale-[1.02] transition-all duration-75 font-medium shadow-lg hover:shadow-xl"
              >
                Crear cuenta
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/login"
                className="text-[#239089] hover:underline font-medium"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>

        {/* Lado derecho - Imagen decorativa */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-[#57bbb4]/20 to-transparent rounded-2xl" />
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <div className="space-y-4">
                <div className="p-4 bg-[#96d6d0]/10 rounded-lg m-0">
                  <h4>
                    Únete a{" "}
                    <h3 className="inline-block ml-4 font-semibold text-4xl text-[#239089]">
                      E X P E R T
                    </h3>
                  </h4>
                </div>
                <div>
                  <img
                    src="https://st.depositphotos.com/4678277/61523/i/450/depositphotos_615232638-stock-photo-full-body-length-photo-excited.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
