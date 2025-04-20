import { useState, useEffect, useContext } from "react";
import { AppContext } from "../provider/AppContext/AppContext";

const useContratistas = (category) => {
  const { clientKey } = useContext(AppContext);
  const [contratistas, setContratistas] = useState([]);
  const [filteredContratistas, setFilteredContratistas] = useState([]);
  const [filtros, setFiltros] = useState({
    masCercano: false,
    menorPrecio: true,
    guardados: false,
  });

  const aplicarFiltros = () => {
    let filtrados = [...contratistas];
    if (filtros.masCercano) {
      filtrados.sort((a, b) => a.distancia - b.distancia);
    }
    if (filtros.menorPrecio) {
      filtrados.sort(
        (a, b) =>
          a.categoriasOfrecidas[0].precioCategoria -
          b.categoriasOfrecidas[0].precioCategoria
      );
    }
    if (filtros.guardados) {
      filtrados = filtrados.filter((contratista) => contratista.guardado);
    }
    setFilteredContratistas(filtrados);
  };

  const manejarFiltro = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    const getContratistas = async () => {
      try {
        console.log(category);
        const response = await fetch(
          "https://server-production-789b.up.railway.app/api/Contratistas/search",
          {
            headers: {
              "Content-Type": "application/json",
              "jwt-token": clientKey,
            },
            method: "POST",
            body: JSON.stringify({ category }),
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
  }, [category]);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, contratistas]);

  return {
    contratistas: filteredContratistas,
    filtros,
    manejarFiltro,
  };
};

export default useContratistas;
