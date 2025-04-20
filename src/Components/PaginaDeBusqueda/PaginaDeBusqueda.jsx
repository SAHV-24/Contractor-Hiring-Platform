import { useContext, useEffect, useState } from "react";
import "./PaginaDeBusqueda.css";
import useContratistas from "../../Hooks/useContratistas";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppContext } from "../../provider/AppContext/AppContext";
import { ContratistaCard } from "../ContratistaCard/ContratistaCard";

const PaginaDeBusqueda = () => {
  const { notificacionDeError, clientKey } = useContext(AppContext);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { contratistas } = useContratistas(category);
  const [abrir, setAbrir] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleCategoryChange = (e) => {
    const input = e.target.value;
    setCategory(input);
    const filtered = allCategories.filter((cat) =>
      cat.nombre.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setFilteredCategories([]); // Ocultar sugerencias cuando se selecciona una categoría
  };

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await fetch(
          "https://server-production-789b.up.railway.app/api/Categorias",
          { headers: { "jwt-token": clientKey } }
        );
        const data = await response.json();
        setAllCategories(data);
        setFilteredCategories(data);
      } catch (exc) {
        notificacionDeError("Ha habido un grave error!", exc.message);
      }
    }
    fetchAllCategories();
  }, [clientKey]);

  return (
    <div className="h-[100vh] bg-gradient-to-br  from-white to-[#f0f9f8] p-6 mb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Sección de búsqueda */}
        <div
          className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8"
          onClick={() => setAbrir(!abrir)}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#57bbb4] to-[#239089] bg-clip-text text-transparent">
            -------- ¡Busca aquí a tu{" "}
            <span className="text-terColor p-0 text-4xl">Experto</span>!
            --------
          </h2>
          <div className="relative max-w-xl mx-auto">
            <div className="category-input">
              <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
                onClick={() => setAbrir(!abrir)}
                placeholder="Ej. Electricidad, Plomería..."
                className="block  w-full px-4 py-2 border border-gray-600  border-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#57bbb4] focus:border-transparent transition-all"
              />
            </div>

            {abrir && filteredCategories.length > 0 && (
              <ul className="category-suggestions absolute mx-0  w-full mt-2 bg-white rounded-xl shadow-lg border border-[#96d6d0]/20 max-h-60 overflow-auto z-30">
                {filteredCategories.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat.nombre)}
                    className="suggestion-item p-0 pl-[-30px] ml-0 py-3 list-disc font-medium text-base text-slate-500 font-mon hover:bg-[#f0f9f8] cursor-pointer transition-colors duration-150"
                  >
                    {cat.nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>{" "}
        </div>

        <div className=" flex flex-col items-center justify-center 3 gap-6 w-full">
          {contratistas.map((contratista, index) => (
            <ContratistaCard
              contratista={contratista}
              user={user}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginaDeBusqueda;
