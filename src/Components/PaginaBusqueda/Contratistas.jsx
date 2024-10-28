import { useState, useEffect } from "react";

const useContratistas = (category) => {
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
        (a, b) => a.categoriasOfrecidas[0].precioCategoria - b.categoriasOfrecidas[0].precioCategoria
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
        const response = await fetch("http://localhost:3000/api/search", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ category }),
        });
        const results = await response.json();
        setContratistas(results);
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
