import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../provider/AppContext/AppContext";
import { fetchAllCategories } from "../../Helpers/fetchAllCategories";
import { registerContratistaThunk } from "../../redux/thunks/registerContratistaThunk";

const ITEMS_PER_PAGE = 3;

export const CreateContratistaForm = () => {
  const clientToken = useContext(AppContext).clientKey;
  const { notificacionDeExito, notificacionDeError } = useContext(AppContext);
  const [categorias, setCategorias] = useState([]);
  const [especialidad, setEspecialidad] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(1);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const allCategories = await fetchAllCategories(clientToken);
        setCategorias(allCategories);
      } catch (err) {
        setError("Error al cargar las categorías");
      }
    };
    loadCategories();
  }, []);

  const handleEspecialidad = (e) => setEspecialidad(e.target.value);

  const handleSelectCategory = (categoryId) => {
    if (!selectedCategories.some((cat) => cat.categoriaId === categoryId)) {
      setSelectedCategories((prev) => [
        ...prev,
        { categoriaId: categoryId, precioCategoria: 0 },
      ]);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category.categoriaId !== categoryId)
    );
  };

  const categoriesToShow = categorias.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage * ITEMS_PER_PAGE < categorias.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCategoryPrice = (e, _id) => {
    const updatedCategories = selectedCategories.map((category) => {
      if (category.categoriaId === _id) {
        return {
          ...category,
          precioCategoria: parseFloat(e.target.value) || 0,
        };
      }
      return category;
    });
    setSelectedCategories(updatedCategories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let band = false;

    selectedCategories.forEach((cat) => {
      if (cat.precioCategoria > 100000) {
        notificacionDeError("¡El precio de tu hora de trabajo está muy alto!");
        band = true;
        return;
      }
    });

    if (band) return;

    const contratistaObject = {
      usuarioId: user._id,
      especialidad,
      ultimosTrabajos: selectedJobs,
      categoriasOfrecidas: selectedCategories,
    };

    if (selectedCategories.length === 0 || especialidad == "") {
      notificacionDeError("Por favor, completa todos los campos requeridos");
      return;
    }

    try {
      dispatch(
        registerContratistaThunk(
          contratistaObject,
          user.username,
          clientToken,
          navigate
        )
      );
    } catch (exc) {
      handleShowAlert(exc);
    }
  };

  const handleShowAlert = (errorMessage) => {
    setMessage(errorMessage);
    setFlag(flag === 1 ? 0 : 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-32">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8 p-8">
          {/* Header */}
          <div className="text-center pb-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-[#239089]">
              ¡Conviértete en Profesional!
            </h2>
            <p className="mt-2 text-gray-600">
              Únete a nuestra red de expertos y comienza a ofrecer tus servicios
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Especialidad Section */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium text-[#57bbb4]">
                ¿Cuál es tu especialidad?
              </span>
              <input
                type="text"
                onChange={handleEspecialidad}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#57bbb4] focus:ring focus:ring-[#96d6d0] focus:ring-opacity-50 transition-colors"
                placeholder="Ej: Carpintería, Plomería, Electricidad..."
              />
            </label>
          </div>

          {/* Categories Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#239089] flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Categorías de Servicio
            </h3>

            {/* Available Categories */}
            <div className="grid grid-cols-3 gap-4">
              {categoriesToShow.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleSelectCategory(category._id)}
                  disabled={selectedCategories.some(
                    (cat) => cat.categoriaId === category._id
                  )}
                  className={`p-3 text-sm rounded-lg transition-all ${
                    selectedCategories.some(
                      (cat) => cat.categoriaId === category._id
                    )
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#96d6d0] bg-opacity-20 text-[#239089] hover:bg-[#57bbb4] hover:text-white"
                  }`}
                >
                  {category.nombre}
                </button>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-[#57bbb4] bg-white border border-[#57bbb4] rounded-lg hover:bg-[#57bbb4] hover:text-gray transition-colors disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage * ITEMS_PER_PAGE >= categorias.length}
                className="px-4 py-2 text-[#57bbb4] bg-white border border-[#57bbb4] rounded-lg hover:bg-[#57bbb4] hover:text-gray transition-colors disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>

            {/* Selected Categories */}
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-medium text-[#239089]">
                Categorías Seleccionadas
              </h4>
              <div className="space-y-3">
                {selectedCategories.map((category) => (
                  <div
                    key={category.categoriaId}
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#96d6d0] shadow-sm"
                  >
                    <span className="text-gray-700">
                      {
                        categorias.find(
                          (cat) => cat._id === category.categoriaId
                        )?.nombre
                      }
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Precio: $</span>
                        <input
                          type="number"
                          max={100000}
                          min={10000}
                          onChange={(e) =>
                            handleCategoryPrice(e, category.categoriaId)
                          }
                          className="w-24 rounded-md border-gray-300 shadow-sm focus:border-[#57bbb4] focus:ring focus:ring-[#96d6d0] focus:ring-opacity-50"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveCategory(category.categoriaId)
                        }
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#57bbb4] text-white py-3 px-6 rounded-lg hover:bg-[#239089] transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>¡Registrarme como Profesional!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
