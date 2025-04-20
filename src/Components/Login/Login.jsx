import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { loginAuth } from "../../redux/thunks/loginThunk";
import { useContext } from "react";
import { AppContext } from "../../provider/AppContext/AppContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { clientKey } = useContext(AppContext);
  const { onInputChange, email, password } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    dispatch(loginAuth(email, password, clientKey, navigate));
  }

  return (
    <div className=" mb-32 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#96d6d0] to-[#57bbb4] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#239089] mb-2">
              ¡Bienvenido de nuevo!
            </h1>
            <p className="text-gray-600">Nos alegra verte otra vez por aquí</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  required
                  onChange={onInputChange}
                  type="email"
                  name="email"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent transition-all"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  required
                  onChange={onInputChange}
                  type="password"
                  name="password"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#57bbb4] text-white py-3 px-4 rounded-lg hover:bg-[#239089] transform hover:scale-[1.02] transition-all duration-75 font-medium shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <a
                href="/register"
                className="text-[#239089] hover:underline font-medium"
              >
                Regístrate aquí
              </a>
            </p>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
