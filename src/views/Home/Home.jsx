import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./Home.css";
import { AppContext } from "../../provider/AppContext/AppContext";

export function Home() {
  const navigate = useNavigate();
  const { clientKey } = useContext(AppContext);
  const [contratistas, setContratistas] = useState([]);

  useEffect(() => {
    const getContratistas = async () => {
      try {
        const response = await fetch(
          "https://server-production-789b.up.railway.app/api/Contratistas/",
          {
            headers: {
              "Content-Type": "application/json",
              "jwt-token": clientKey,
            },
          }
        );
        const results = await response.json();

        // Verificación de que `results` es un array
        if (Array.isArray(results)) {
          setContratistas(results);
        } else {
          console.error("La respuesta de la API no es un array:", results);
          setContratistas([]); // Asegura que `contratistas` sea un array vacío si la respuesta no es válida
        }
      } catch (error) {
        console.error("Error al obtener contratistas:", error);
      }
    };

    getContratistas();
  }, []);

  return (
    <div className=" bg-white mt-16 mb-32">
      {/* Hero Section */}
      <div className=" relative bg-secColor py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex ">
          <div>
            <img
              src="https://i.imgur.com/Dy8iPrO.png"
              className="left-0 ml-[-80px]"
            />
          </div>
          <div className="ml-auto text-right w-full w">
            <h1 className="text-6xl font-bold text-gray-800 mb-8 ">
              ¡Contrata a un buen precio!
            </h1>
            <div className="max-w-xl ml-auto relative">
              <input
                onClick={() => navigate("/search")}
                type="text"
                placeholder="Técnico de Computadores"
                className="w-full px-6 py-3 rounded-full border-2 border-mainColor focus:outline-none focus:border-mainColor"
              />
              <button className="hover:cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-mainColor rounded-full">
                <input className= " hover:cursor-pointer w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center mt-16 text-5xl">
        ¡Los EXPERTOS que más te pueden ayudar en tu proceso!
      </h2>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className={`flex items-center justify-around gap-8`}>
          {contratistas.slice(0, 3).map((contratista, index) => (
            <div
              className="bg-white rounded-lg shadow-2xl p-6 hover:shadow-xl duration-300 hover:cursor-pointer focus:scale-105 hover:translate-y-[-5px] focus:translate-y-[-10px]  focus:shadow-2xl"
              key={index}
            >
              <div className="w-full h-48  rounded-lg mb-4 flex items-center justify-center">
                <img
                  src={contratista?.usuarioDatos?.fotoDePerfil}
                  className="w-[200px] h-[200px] object-contain m-0 p-0"
                />
              </div>
              <div className="m-[0] p-0 flex  justify-between items-center">
                <div>
                  <div className=" rounded w-3/4 mb-2">
                    <h3>{contratista?.usuarioDatos?.nombre}</h3>
                  </div>
                  <div className="h-4 rounded w-1/2 p-0 m-0">
                    <p>{contratista?.especialidad}</p>
                  </div>
                </div>
                <button
                  className="py-2 px-4 rounded-full bg-mainColor text-white font-bold hover:transition-all hover:cursor-pointer hover:bg-terColor"
                  onClick={() =>
                    navigate(`/profile/${contratista.usuarioDatos.username}`)
                  }
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
